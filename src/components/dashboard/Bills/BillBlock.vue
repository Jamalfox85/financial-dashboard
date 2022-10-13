<template lang="">
  <div class="bill_wrapper">
    <div
      class="bill"
      :class="{
        late: bill.bill_date <= today && bill.bill_paid === 0,
        paid: bill.bill_paid === 1,
        future: bill.bill_date > today + 7 && bill.bill_paid === 0,
      }"
      @click="showUpdateBillModal"
    >
      <div class="bill-block">
        <div class="bill-date">
          <p>{{ formattedBillDate() }}</p>
        </div>
        <p class="bill-name">{{ bill.bill_name }}</p>
        <p class="bill-price">${{ bill.bill_amount }}</p>
      </div>
      <div class="bill-icon">
        <font-awesome-icon
          v-if="bill.bill_date <= today && bill.bill_paid === 0"
          class="warning-icon"
          icon="fa-solid fa-triangle-exclamation"
        />
        <font-awesome-icon
          class="check-icon"
          v-if="bill.bill_paid === 1"
          icon="fa-solid fa-circle-check"
        />
        <div v-else></div>
      </div>
    </div>
    <bill-details-modal
      :showModal="isShowingBillDetailsModal"
      @close="closeUpdateBillModal"
      :bill="bill"
    />
  </div>
</template>
<script>
import triangleRed from "../../../assets/images/triangle-red.png";
import circleCheck from "../../../assets/images/circle-check.png";

import moment from "moment";

import BillDetailsModal from "../../modals/BillDetailsModal.vue";

let today = moment().date();

export default {
  props: ["bill"],
  components: { BillDetailsModal },
  data() {
    return {
      triangleRed: triangleRed,
      circleCheck: circleCheck,
      today: today,
      isShowingBillDetailsModal: false,
    };
  },
  methods: {
    formattedBillDate() {
      let month = moment().format("MM");
      return month + "/" + this.bill.bill_date;
    },
    showUpdateBillModal() {
      this.isShowingBillDetailsModal = true;
    },
    closeUpdateBillModal() {
      this.isShowingBillDetailsModal = false;
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
.bill_wrapper {
  margin: 0.5em 0;
  .bill {
    display: flex;
    align-content: center;
    width: 100%;
    .bill-block {
      height: 30px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-radius: 8px;
      font-size: 12px;
      color: var(--white);
      background-color: var(--dark-accent);
      box-shadow: 8px 16px 16px rgba(0, 0, 0, 0.25);
      & > * {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
      }
      .bill-date {
        height: 100%;
        width: 20%;
        border-right: solid 1px var(--white);
      }
      .bill-name {
        width: 60%;
        justify-content: flex-start;
        border-right: solid 1px var(--white);
      }
      .bill-price {
        width: 20%;
        min-width: 55px;
      }
    }
    .bill-icon {
      margin: 0 0.5em;
      width: 25px;
      display: flex;
      align-items: center;
    }

    /* Bill States */
    &.late {
      .bill-block {
        background-color: var(--dark-red);
      }
      &:hover {
        .bill-block {
          background-color: #f0190a !important;
        }
      }
    }
    &.paid {
      .bill-block {
        background-color: var(--darker-green);
      }
    }
    &:hover {
      cursor: pointer;
      .bill-block {
        background-color: var(--light-green);
        transform: scale(1.15);
        opacity: 1;
        transition: 0.15s ease-in;
      }
    }
  }
}
</style>
