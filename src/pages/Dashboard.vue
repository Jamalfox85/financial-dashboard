<template>
  <div class="dashboard-wrapper p-2">
    <div class="grid-wrapper">
      <monthly-overview class="monthly-overview" />
      <!-- <savings-goal class="savingsGoals" />
      <bills class="bills" />
      <credit class="credit"></credit>
      <debt class="debt" />
      <income class="income" />
      <div class="netIncome"></div> -->
    </div>
  </div>
</template>

<script setup>
import MonthlyOverview from "../components/dashboard/MonthlyOverview/MonthlyOverview.vue";
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
      border: solid 1px rgba(0, 0, 0, 0.25);
      padding: 12px;
    }
    .monthly-overview {
      grid-row: span 6;
      grid-column: span 6;
    }
    .savingsGoals {
      // grid-area: savingsGoals;
      // flex-grow: 1;
      grid-row: 1/2;
      grid-column: 4/13;
    }
    .bills {
      // grid-area: bills;
      // flex-grow: 1;
      grid-row: span 3;
      grid-column: span 1;
    }
    .credit {
      // grid-area: credit;
      // flex-grow: 1;
      grid-row: span 1;
      grid-column: span 1;
    }
    .debt {
      // grid-area: debt;
      // flex-grow: 1;
      grid-row: span 1;
      grid-column: span 2;
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
