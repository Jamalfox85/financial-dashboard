<template lang="">
  <div>
    <div class="debt_block_wrapper" @click="showDebtDetailsModal">
      <div class="debt-name">
        <h1>{{ debt.debt_name }}</h1>
        <h1>{{ getPaymentProgress.width }}</h1>
      </div>
      <div class="debt-progress-bar">
        <div
          class="progress"
          :style="{
            width: getPaymentProgress.width,
            backgroundColor: getPaymentProgress.color,
          }"
        ></div>
      </div>
    </div>
    <debt-details-modal
      :debt="debt"
      :showModal="isShowingDebtDetailsModal"
      @close="hideDebtDetailsModal"
    />
  </div>
</template>
<script>
import DebtDataService from "../../../services/DebtDataService";

import DebtDetailsModal from "../../modals/DebtDetailsModal.vue";

export default {
  props: ["debt"],
  components: { DebtDetailsModal },
  data() {
    return {
      isShowingDebtDetailsModal: false,
    };
  },
  computed: {
    getPaymentProgress() {
      let color;
      let width = Math.floor(
        (this.debt.debt_amount / this.debt.debt_limit) * 100
      );
      if (width > 70) {
        color = "red";
      } else if (width < 30) {
        color = "green";
      } else {
        color = "yellow";
      }
      return {
        width: width + "%",
        color: color,
      };
    },
  },
  methods: {
    showDebtDetailsModal() {
      this.isShowingDebtDetailsModal = true;
    },
    hideDebtDetailsModal() {
      this.isShowingDebtDetailsModal = false;
    },
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
.debt_block_wrapper {
  width: 200px;
  color: var(--white);
  display: flex;
  flex-direction: column;
  text-align: left;
  transition: 0.15s ease-in;
  .debt-name {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
  }
  .debt-progress-bar {
    height: 4px;
    width: 80%;
    border-radius: 12px;
    margin-right: 0.5em;
    background-color: var(--white);
    .progress {
      height: 100%;
      background-color: green;
    }
  }
  &:hover {
    background-color: var(--light-green);
    color: var(--black);
    border-radius: 8px;
    border: solid 1px var(--dark-green);
    box-shadow: 8px 16px 16px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    padding: 0.5em;
  }
}
</style>
