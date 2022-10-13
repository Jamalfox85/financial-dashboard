<template lang="">
  <div class="income-block" @click="showIncomeDetailsModal">
    <h2 class="income-name">{{ income.incomeName }}</h2>
    <font-awesome-icon class="income-icon" icon="fa-solid fa-dollar-sign" />
    <h1 class="income-amount">${{ income.incomeAmount }}</h1>
  </div>
  <income-details-modal
    :showModal="isShowingIncomeDetailsModal"
    @close="hideIncomeDetailsModal"
    :income="income"
  />
</template>
<script>
import IncomeDetailsModal from "../../modals/IncomeDetailsModal.vue";
export default {
  props: ["income"],
  components: { IncomeDetailsModal },
  data() {
    return {
      isShowingIncomeDetailsModal: false,
    };
  },
  methods: {
    showIncomeDetailsModal() {
      this.isShowingIncomeDetailsModal = true;
    },
    hideIncomeDetailsModal() {
      this.isShowingIncomeDetailsModal = false;
    },
  },
};
</script>
<style lang="scss">
.income-block {
  height: 170px;
  width: 140px;
  background-color: var(--dark-green);
  box-shadow: 8px 16px 16px rgba(0, 0, 0, 0.25);
  margin-right: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--white);
  border-radius: 12px;
  padding: 1em;
  transition: 0.15s ease-in;
  .income-name {
    align-self: flex-start;
    font-size: 16px;
  }
  .income-icon {
    font-size: 42px;
    opacity: 0.5;
  }
  .income-amount {
    align-self: center;
    text-shadow: 8px 16px 16px rgba(0, 0, 0, 0.25);
    font-size: 32px;
  }
  &:hover {
    background-color: var(--light-green);
    transform: scale(1.15);
    cursor: pointer;
  }
}
</style>
