<template>
  <div class="dashboard-wrapper text-center p-2">
    <div class="grid-wrapper">
      <savings-goal class="savingsGoals" />
      <bills class="bills" />
      <credit class="credit"></credit>
      <debt class="debt" />
      <income class="income" />
      <!-- <div class="netIncome"></div> -->
    </div>
  </div>
</template>

<script>
import SavingsGoal from "../components/dashboard/SavingsGoal/SavingsGoal.vue";
import PaycheckTimeline from "../components/dashboard/PaycheckTimeline.vue";
import WeeklyFocus from "../components/dashboard/WeeklyFocus.vue";
import Accounts from "../components/dashboard/Accounts.vue";
import Bills from "../components/dashboard/Bills/Bills.vue";
import Debt from "../components/dashboard/Debt/Debt.vue";
import Credit from "../components/dashboard/Credit/Credit.vue";
import Income from "../components/dashboard/Income/Income.vue";

export default {
  components: {
    SavingsGoal,
    PaycheckTimeline,
    Credit,
    WeeklyFocus,
    Accounts,
    Bills,
    Debt,
    Income,
  },
};
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
    grid-template-areas:
      "savingsGoals savingsGoals savingsGoals bills"
      "credit debt debt bills"
      "income income netIncome bills";
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    & > * {
      position: relative;
      background-color: var(--brown);
      border-radius: 12px;
      border: solid 1px rgba(0, 0, 0, 0.25);
      box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 1em;
    }
    .savingsGoals {
      grid-area: savingsGoals;
      flex-grow: 1;
    }
    .bills {
      grid-area: bills;
      flex-grow: 1;
    }
    .credit {
      grid-area: credit;
      flex-grow: 1;
    }
    .debt {
      grid-area: debt;
      flex-grow: 1;
    }
    .income {
      grid-area: income;
      flex-grow: 1;
    }
    .netIncome {
      grid-area: netIncome;
      flex-grow: 1;
    }
  }
}
</style>
