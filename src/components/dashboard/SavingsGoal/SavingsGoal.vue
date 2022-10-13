<template>
  <div>
    <div class="savingsGoal_wrapper">
      <div class="header">
        <h1>Savings Goals</h1>
        <add-bttn @click="showModal()" />
      </div>
      <div class="savings-goals">
        <savings-goal-block
          class="savings-block"
          v-for="goal in goals"
          :goal="goal"
        />
      </div>
    </div>
    <add-savings-goal-modal :showModal="displayModal" @close="hideModal" />
  </div>
</template>

<script>
import SavingsDataService from "../../../services/SavingsDataService";

import AddBttn from "../General/AddBttn.vue";
import SavingsGoalBlock from "./SavingsGoalBlock.vue";

import AddSavingsGoalModal from "../../modals/AddSavingsGoalModal.vue";

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
    SavingsDataService.getAll().then((res) => {
      let rawGoalsArray = res.data;
      let filteredArray = rawGoalsArray.sort((a, b) => {
        if (a.savings_name < b.savings_name) {
          return -1;
        } else if (a.savings_name > b.savings_name) {
          return 1;
        }
        return 0;
      });
      this.goals = filteredArray;
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
    width: 250px;
    h1 {
      position: relative;
      z-index: 2;
      font-size: 24px;
      font-weight: bold;
      color: var(--white);
      &:after {
        content: "Savings Goals";
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
  .savings-goals {
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: auto;
    padding: 0 1em 12px;
    .savings-block {
      margin-right: 1em;
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
