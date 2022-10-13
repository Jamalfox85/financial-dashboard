<template lang="">
  <div class="income_wrapper">
    <div class="header">
      <h1>Income</h1>
      <add-bttn @click="showAddIncomeModal()" />
    </div>
    <div class="main">
      <div class="income-blocks">
        <income-block v-for="income in incomeStreams" :income="income" />
      </div>
      <div class="income-text">
        Total: <span>{{ totalIncome }}</span>
      </div>
    </div>
    <add-income-modal
      :showModal="displayAddIncomeModal"
      @closeModal="closeAddIncomeModal()"
    />
  </div>
</template>
<script>
import IncomesDataService from "../../../services/IncomeDataService";

import AddBttn from "../General/AddBttn.vue";
import IncomeBlock from "./IncomeBlock.vue";

import AddIncomeModal from "../../modals/AddIncomeModal.vue";

export default {
  components: { AddBttn, IncomeBlock, AddIncomeModal },
  data() {
    return {
      incomeStreams: null,
      displayAddIncomeModal: false,
      totalIncome: null,
    };
  },
  methods: {
    showAddIncomeModal() {
      this.displayAddIncomeModal = true;
    },
    closeAddIncomeModal() {
      this.displayAddIncomeModal = false;
    },
  },
  mounted() {
    IncomesDataService.getAll().then((res) => {
      let incomeStreamsData = res.data;
      this.incomeStreams = incomeStreamsData;

      incomeStreamsData.map((item) => {
        this.totalIncome = this.totalIncome + item.incomeAmount;
      });
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
.income_wrapper {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
    width: 250px;
    h1 {
      position: relative;
      z-index: 2;
      font-size: 24px;
      font-weight: bold;
      color: var(--white);
      &:after {
        content: "Income";
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
    flex-direction: column;
    .income-blocks {
      display: flex;
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      width: 90%;
      height: 200px;
      padding: 2em;
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
    .income-text {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      color: var(--white);
      font-size: 24px;
      span {
        margin-left: 0.5em;
        color: var(--light-green);
      }
    }
  }
}
</style>
