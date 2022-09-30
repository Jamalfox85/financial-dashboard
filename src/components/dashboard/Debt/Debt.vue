<template lang="">
  <div class="debt_wrapper">
    <div class="header">
      <h1>Debt</h1>
      <img
        src="../../../assets/images/circle-plus.png"
        @click="showAddDebtModal()"
      />
    </div>
    <div class="main">
      <div class="debt-category" v-for="category in categories">
        <h3 class="category-header">{{ category }}</h3>
        <div class="debt-block-wrapper" v-for="debt in debts">
          <debt-block
            :id="debt.id"
            :title="debt.debt_name"
            :debt="debt.debt_amount"
            :limit="debt.debt_limit"
            :category="debt.debt_category"
            :debtCategories="categories"
            v-if="category === debt.debt_category"
          />
        </div>
      </div>
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

import DebtBlock from "./DebtBlock.vue";
import AddDebtModal from "../../modals/AddDebtModal.vue";

export default {
  components: {
    DebtBlock,
    AddDebtModal,
  },
  data() {
    return {
      categories: [],
      debts: [],
      displayAddDebtModal: false,
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
    DebtDataService.getAll().then((res) => {
      this.debts = res.data;
    });
    DebtDataService.getCategories().then((res) => {
      let categoryList = res.data.categories;
      categoryList.map((item, index) => {
        this.categories.push(item.debt_category);
      });
    });
  },
};
</script>
<style lang="scss">
.debt_wrapper {
  width: 100%;
  height: 100%;
  border: solid 2px #333;
  padding: 1em;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
    width: 250px;
    h1 {
      font-size: 24px;
      font-weight: bold;
      width: fit-content;
    }
    img {
      height: 28px;
    }
  }
  .main {
    display: flex;
    align-items: flex-start;
    .debt-category {
      width: 30%;
      border: solid 2px red;
      margin: 1em;
      padding: 1em;
      .category-header {
        font-weight: bold;
        border: solid 1px #777;
        border-radius: 12px;
        box-shadow: 2px 2px 5px #444;
        margin-bottom: 1em;
      }
      .debt-block-wrapper {
        margin-bottom: 0.5em;
      }
    }
  }
}
</style>
