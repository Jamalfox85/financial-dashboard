<template lang="">
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
      <debt-block v-for="debt in debts" :debt="debt" />
    </div>
    <add-debt-modal
      :debtCategories="categories"
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
      categories: [],
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
      console.log("DEBTS LOADED");
      console.log(debts);
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
    }
  }
  .main {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-x: auto;
    border-radius: 12px;
    box-shadow: 8px 16px 16px rgba(0, 0, 0, 0.25);
    .debt-category {
      margin-right: 2em;
      padding: 1em;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .category-header {
        font-size: 16px;
        color: var(--white);
        margin-bottom: 1em;
      }
      .debt-block-wrapper {
        display: flex;
        flex-direction: column;
        height: 120px;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 1em;
        & > * {
          margin-bottom: 12px;
        }
        &::-webkit-scrollbar {
          width: 4px;
          height: 40px;
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
