<template lang="">
  <div class="bill_wrapper">
    <div
      class="bill"
      :class="{
        late: billDate <= today && billPaid === 0,
        upcoming: billDate < today + 7 && billDate > today && billPaid === 0,
        paid: billPaid === 1,
        future: billDate > today + 7 && billPaid === 0,
      }"
    >
      <small class="bill-date">{{ billDate }}</small>
      <div class="bill-block">
        <p class="bill-name">{{ billName }}</p>
        <p class="bill-price">${{ billAmount }}</p>
      </div>
      <div class="bill-icon">
        <img :src="triangleRed" v-if="billDate <= today && billPaid === 0" />
        <img :src="circleCheck" v-else-if="billPaid === 1" />
        <div v-else></div>
      </div>
      <font-awesome-icon
        class="fa-icon"
        icon="pen-to-square"
        @click="showUpdateBillModal"
      />
      <font-awesome-icon class="fa-icon" icon="trash" @click="deleteBill" />
    </div>
    <update-bill-modal
      :showModal="displayUpdateBillModal"
      @closeModal="closeUpdateBillModal"
      :id="id"
      :name="billName"
      :date="billDate"
      :amount="billAmount"
    />
  </div>
</template>
<script>
import triangleRed from "../../../assets/images/triangle-red.png";
import circleCheck from "../../../assets/images/circle-check.png";

import BillsDataService from "../../../services/BillsDataService";
import moment from "moment";

import UpdateBillModal from "../../modals/UpdateBillModal.vue";

let today = moment().date();

export default {
  props: ["id", "billName", "billDate", "billAmount", "billPaid"],
  components: { UpdateBillModal },
  data() {
    return {
      triangleRed: triangleRed,
      circleCheck: circleCheck,
      today: today,
      billId: this.id,
      displayUpdateBillModal: false,
    };
  },
  methods: {
    showUpdateBillModal() {
      this.displayUpdateBillModal = true;
    },
    closeUpdateBillModal() {
      this.displayUpdateBillModal = false;
    },
    deleteBill() {
      BillsDataService.delete(this.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.bill_wrapper {
  margin: 0.5em 0;
  .bill {
    display: flex;
    align-content: center;
    width: 100%;
    .bill-date {
      color: #363537;
      margin-right: 1em;
      display: flex;
      align-items: center;
    }
    .bill-block {
      height: fit-content;
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-radius: 16px;
      background-color: #d9d9d9;
      color: #363537;
      border: solid 1px #363537;
      .bill-name,
      .bill-price {
        background-color: #0cce6b;
        border-radius: 16px;
        padding: 4px 10px;
        margin-bottom: 0;
      }
      .bill-name {
        width: 45%;
      }
      .bill-price {
        width: 20%;
      }
    }
    .bill-icon {
      margin: 0 0.5em;
      width: 25px;
      display: flex;
      align-items: center;
      img {
        width: 25px;
      }
    }
    .fa-icon {
      margin: auto 0.5em;
      height: 20px;
    }

    /* Bill States */
    &.late {
      .bill-block {
        color: #edf2ef;
      }
      .bill-name,
      .bill-price {
        background-color: #ef2d56;
      }
    }
    &.upcoming {
      .bill-name,
      .bill-price {
        background-color: #dced31;
      }
    }
    &.future {
      .bill-name,
      .bill-price {
        background-color: #cccfce;
      }
    }
    &.paid {
      .bill-block,
      .bill-name,
      .bill-price {
        background-color: #0cce6b;
      }
    }
  }
}
</style>
