<template lang="">
  <div>
    <div class="debt_block_wrapper" @click="showDebtDetailsModal">
      <div class="block-header">
        <h1 class="header-text">{{ debt.name }}</h1>
        <font-awesome-icon class="ellipses-icon" icon="fa-solid fa-ellipsis" />
      </div>
      <div class="block-main">
        <p class="goal-text">of $ {{ debt.debt_limit }}</p>
        <div class="progress-bar">
          <div
            class="progress-bar-progress"
            :style="{
              width: (debt.current_debt / debt.debt_limit) * 100 + '%',
            }"
          >
            <p class="current-text">$ {{ debt.current_debt }}</p>
          </div>
        </div>
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
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  border: solid 1px #fff;
  box-shadow: 8px 16px 16px rgba(0, 0, 0, 0.35);
  transition: 0.15s ease-in;
  .block-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
    .header-text {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
      color: var(--white);
      letter-spacing: 4px;
    }
    .ellipses-icon {
      color: white;
      font-size: 1.5em;
    }
  }
  .block-main {
    width: 100%;
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    text-align: center;
    .goal-text {
      color: #fff;
      margin: 0 8px 4px 0;
      align-self: flex-end;
    }
    .progress-bar {
      height: 1.5em;
      width: 100%;
      border-radius: 16px;
      border: solid 2px #e3170a;
      .progress-bar-progress {
        height: 100%;
        background-color: #e3170a;
        border-radius: 16px;
        transition: 0.15s ease-in;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        .current-text {
          font-size: 14px;
          margin-left: 8px;
        }
      }
    }
    .progress-text {
      margin-top: 1em;
      font-size: 14px;
    }
  }
}
</style>
