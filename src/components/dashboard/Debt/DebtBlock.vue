<template lang="">
  <div class="debt_block_wrapper">
    <h1>{{ title }}</h1>
    <div class="debt-block-main">
      <div class="debt-progress-bar">
        <div class="progress" :style="{ width: getPaymentProgress }" />
      </div>
      <font-awesome-icon
        class="fa-icon"
        icon="pen-to-square"
        @click="showUpdateDebtModal"
      />
      <font-awesome-icon class="fa-icon" icon="trash" @click="deleteDebt" />
    </div>
    <update-debt-modal
      :id="id"
      :title="title"
      :debt="debt"
      :limit="limit"
      :category="category"
      :debtCategories="debtCategories"
      :showModal="displayUpdateDebtModal"
      @closeModal="hideUpdateDebtModal"
    />
  </div>
</template>
<script>
import DebtDataService from "../../../services/DebtDataService";

import UpdateDebtModal from "../../modals/UpdateDebtModal.vue";

export default {
  props: ["id", "title", "debt", "limit", "category", "debtCategories"],
  components: { UpdateDebtModal },
  data() {
    return {
      displayUpdateDebtModal: false,
    };
  },
  computed: {
    getPaymentProgress() {
      return (this.debt / this.limit) * 100 + "%";
    },
  },
  methods: {
    showUpdateDebtModal() {
      this.displayUpdateDebtModal = true;
    },
    hideUpdateDebtModal() {
      this.displayUpdateDebtModal = false;
    },
    deleteDebt() {
      DebtDataService.delete(this.id);
    },
  },
};
</script>
<style lang="scss">
.debt_block_wrapper {
  width: 200px;
  border: solid 2px blue;
  border-radius: 12px;
  box-shadow: 2px 2px 5px #444;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em;
  .debt-block-main {
    width: 100%;
    display: flex;
    align-items: center;
    .debt-progress-bar {
      height: 10px;
      width: 80%;
      border: solid 2px green;
      border-radius: 12px;
      margin-right: 0.5em;
      .progress {
        height: 100%;
        background-color: green;
      }
    }
  }
}
</style>
