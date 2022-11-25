<template>
  <div class="savingsGoal_wrapper">
    <div class="header">
      <h1 class="section-header">SAVINGS</h1>
      <font-awesome-icon
        class="add-savings-icon"
        icon="fa-solid fa-square-plus"
        @click="showModal()"
      />
    </div>
    <div class="savings-goals">
      <savings-goal-block
        class="savings-block"
        v-for="goal in goals"
        :goal="goal"
      />
    </div>
    <add-savings-goal-modal :showModal="displayModal" @close="hideModal" />
  </div>
</template>

<script>
import SavingsDataService from "../../../services/SavingsDataService";
import AddBttn from "../General/AddBttn.vue";
import SavingsGoalBlock from "./SavingsGoalBlock.vue";
import AddSavingsGoalModal from "../../modals/AddSavingsGoalModal.vue";
import { sessionDetails } from "../../../userData";
import { computed, watchEffect, reactive } from "vue";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";

const GET_SAVINGS_GOALS = gql`
  query ($userId: uuid!) {
    savings(where: { userid: { _eq: $userId } }) {
      id
      current_amount
      goal_amount
      name
    }
  }
`;

export default {
  components: {
    AddBttn,
    SavingsGoalBlock,
    AddSavingsGoalModal,
  },
  data() {
    return {
      goals: [],
      displayModal: false,
      session: sessionDetails,
    };
  },
  methods: {
    showModal() {
      this.displayModal = true;
    },
    hideModal() {
      this.displayModal = false;
    },
  },
  mounted() {
    const variables = reactive({
      userId: this.session.user.id,
    });
    const { result } = useQuery(GET_SAVINGS_GOALS, variables);
    const goals = computed(() => result.value?.savings ?? []);
    watchEffect(() => {
      this.goals = goals;
    });
  },
};
</script>

<style lang="scss">
:root {
  --white: #eaeff2;
  --black: #000;
  --dark-green: #77ad78;
  --light-green: #8fd694;
  --dark-accent: #504b43;
}
.savingsGoal_wrapper {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
    width: 100%;

    .section-header {
      position: relative;
      z-index: 2;
      font-size: 24px;
      font-weight: bold;
      color: var(--white);
      letter-spacing: 8px;
    }
    .add-savings-icon {
      color: #a2d729;
      font-size: 2em;
    }
  }
  .savings-goals {
    height: 200px;
    width: 100%;
    display: flex;
    overflow: auto;
    &::-webkit-scrollbar {
      height: 12px;
      width: 100%;
    }
    &::-webkit-scrollbar-thumb {
      height: 10px;
      border-radius: 12px;
      background-color: var(--white);
    }
    &::-webkit-scrollbar-track {
      height: 20px;
      border-radius: 12px;
      background-color: var(--dark-accent);
    }
  }
}
</style>
