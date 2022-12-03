<template>
  <div class="dashboard-wrapper p-2">
    <div class="grid-wrapper">
      <monthly-overview class="monthly-overview" />
      <div class="savings_and_debt">
        <savings-goal class="savingsGoals" />
        <debt class="debt" />
      </div>
      <!-- <bills class="bills" /> -->
      <credit class="credit"></credit>
      <!-- <income class="income" />
      <div class="netIncome"></div> -->
    </div>
  </div>
</template>

<script setup>
import MonthlyOverview from "../components/dashboard/MonthlyOverview/MonthlyOverview.vue";
import SavingsGoal from "../components/dashboard/SavingsGoal/SavingsGoal.vue";
import Debt from "../components/dashboard/Debt/Debt.vue";
import Credit from "../components/dashboard/Credit/Credit.vue";
</script>

<style lang="scss">
:root {
  --brown: rgba(109, 76, 61, 0.8); /* Hex: #6d4c3d */
}
.dashboard-wrapper {
  min-height: 100vh;
  width: 100%;
  margin-top: 1em;
  .grid-wrapper {
    height: 100%;
    width: 90vw;
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    & > * {
      position: relative;
      border-radius: 12px;
      border: solid 1px #a2d729;
      padding: 12px;
      // background-color: #473f4b;
    }
    .monthly-overview {
      grid-row: span 12;
      grid-column: span 6;
    }
    .savings_and_debt {
      grid-row: span 12;
      grid-column: span 3;
      border: none;
      .savingsGoals {
        margin-bottom: 2em;
      }
    }
    .credit {
      // grid-area: bills;
      // flex-grow: 1;
      grid-row: span 3;
      grid-column: span 3;
    }
    .bills {
      // grid-area: credit;
      // flex-grow: 1;
      grid-row: span 1;
      grid-column: span 1;
    }
    .income {
      // grid-area: income;
      // flex-grow: 1;
      grid-row: span 1;
      grid-column: span 1;
    }
    .netIncome {
      // grid-area: netIncome;
      // flex-grow: 1;
      grid-row: span 2;
      grid-column: span 1;
    }
  }
}
</style>
