<template>
  <div class="debt_wrapper">
    <div class="header">
      <h1 class="section-header">DEBT</h1>
      <font-awesome-icon
        class="add-debt-icon"
        icon="fa-solid fa-square-plus"
        @click="showAddDebtModal()"
      />
    </div>
    <div class="debts">
      <debt-block class="debt-block" v-for="debt in debts" :debt="debt" />
    </div>
    <add-debt-modal
      :showModal="displayAddDebtModal"
      @closeModal="hideAddDebtModal"
    />
  </div>
</template>
<script>
import DebtDataService from "../../../services/DebtDataService";
import AddBttn from "../General/AddBttn.vue";
import DebtBlock from "./DebtBlock.vue";
import AddDebtModal from "../../modals/AddDebtModal.vue";
import { sessionDetails } from "../../../userData";
import { computed, watchEffect, reactive } from "vue";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";

const GET_DEBTS = gql`
  query ($userId: uuid!) {
    debts(where: { userid: { _eq: $userId } }) {
      id
      current_debt
      debt_limit
      name
    }
  }
`;

export default {
  components: {
    AddBttn,
    DebtBlock,
    AddDebtModal,
  },
  data() {
    return {
      debts: [],
      displayAddDebtModal: false,
      session: sessionDetails,
    };
  },
  methods: {
    showAddDebtModal() {
      this.displayAddDebtModal = true;
    },
    hideAddDebtModal() {
      this.displayAddDebtModal = false;
    },
  },
  mounted() {
    const variables = reactive({
      userId: this.session.user.id,
    });
    const { result } = useQuery(GET_DEBTS, variables);
    const debts = computed(() => result.value?.debts ?? []);
    watchEffect(() => {
      this.debts = debts;
    });
  },
};
</script>
<style lang="scss">
:root {
  --white: #eaeff2;
  --black: #000;
  --darker-green: #6f8f72;
  --dark-green: #77ad78;
  --light-green: #8fd694;
  --dark-accent: #504b43;
  --dark-red: #b61408;
  --red: #e3170a;
}
.debt_wrapper {
  // overflow: hidden;
  overflow-y: scroll;
  overflow-x: visible;
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
    .add-debt-icon {
      color: #fff;
      font-size: 2em;
      cursor: pointer;
      &:hover {
        color: rgb(232, 231, 231);
      }
    }
  }
  .debts {
    height: 100%;
    overflow-y: scroll;
    overflow-x: visible;
    padding-bottom: 2em;
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
    .debt-block {
      margin-bottom: 1em;
    }
  }
}
</style>
