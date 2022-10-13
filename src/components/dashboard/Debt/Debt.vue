<template lang="">
  <div class="debt_wrapper">
    <div class="header">
      <h1>Debt</h1>
      <add-bttn @click="showAddDebtModal()" />
    </div>
    <div class="main">
      <div class="debt-category" v-for="category in categories">
        <h3 class="category-header">{{ category }}</h3>
        <div class="debt-block-wrapper">
          <div
            v-for="debt in debts"
            :style="{
              display: debt.debt_category === category ? 'block' : 'none',
            }"
          >
            <debt-block :debt="debt" :debtCategories="categories" />
          </div>
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

import AddBttn from "../General/AddBttn.vue";
import DebtBlock from "./DebtBlock.vue";

import AddDebtModal from "../../modals/AddDebtModal.vue";

export default {
  components: {
    AddBttn,
    DebtBlock,
    AddDebtModal,
  },
  data() {
    return {
      categories: [],
      debts: {},
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
        if (item.debt_category == null) {
          return;
        } else this.categories.push(item.debt_category);
      });
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
    margin-bottom: 1em;
    h1 {
      position: relative;
      z-index: 2;
      font-size: 24px;
      font-weight: bold;
      color: var(--white);

      &:after {
        content: "Debt";
        position: absolute;
        top: 2px;
        right: 2px;
        height: 100%;
        width: 100%;
        z-index: -1;
        -webkit-text-stroke: 1px var(--dark-green);
        color: transparent;
      }
    }
  }
  .main {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-x: auto;
    background-color: var(--dark-green);
    border-radius: 12px;
    padding: 1em;
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
