<template>
  <div class="dashboard-wrapper p-2">
    <div class="grid-wrapper">
      <!-- <img class="dashboard-img-card" src="../assets/images/cardimage.png" /> -->
      <!-- <monthly-overview class="monthly-overview" /> -->
      <savings-goal class="savingsGoals" />
      <!-- <div class="savings_and_debt"> -->
      <!-- <debt class="debt" /> -->
      <!-- </div> -->
      <!-- <bills class="bills" /> -->
      <!-- <credit class="credit"></credit> -->
      <!-- <img class="dashboard-img-bars" src="../assets/images/investing.png" /> -->
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
      background-color: #423c47bb;
    }
    .savingsGoals {
      grid-row: span 1;
      grid-column: span 12;
      height: 240px;
    }
    .dashboard-img-card {
      grid-row: span 2;
      grid-column: span 6;
      border: none;
    }
    .monthly-overview {
      grid-row: span 9;
      grid-column: span 6;
    }
    .savings_and_debt {
      grid-row: span 9;
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
    .dashboard-img-bars {
      grid-row: span 3;
      grid-column: span 3;
      border: none;
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
