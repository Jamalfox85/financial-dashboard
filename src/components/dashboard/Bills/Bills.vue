<template lang="">
  <div class="bills_wrapper">
    <div class="header">
      <h1>Bill Report</h1>
      <img :src="circlePlus" @click="showAddBillModal()" />
    </div>
    <div class="section-main">
      <div class="section-header">
        <!-- <h3 class="date-interval">Weekly</h3> -->
        <div class="interval-bttns">
          <button :class="{ active: interval === 1 }" @click="setInterval(1)">
            Weekly
          </button>
          <button :class="{ active: interval === 2 }" @click="setInterval(2)">
            Monthly
          </button>
        </div>
        <h6 class="date-range">{{ weeklyRange }}</h6>
      </div>
      <div class="bills" v-for="bill in bills">
        <billBlock
          :id="bill.id"
          :billName="bill.bill_name"
          :billDate="bill.bill_date"
          :billAmount="bill.bill_amount"
          :billPaid="bill.bill_paid"
          v-if="showBill(bill.bill_date) === true"
        />
      </div>
      <add-bill-modal
        :showModal="displayAddBillModal"
        @closeModal="closeAddBillModal"
      />
    </div>
  </div>
</template>
<script>
import circlePlus from "../../../assets/images/circle-plus.png";

import moment from "moment";

import BillsDataService from "../../../services/BillsDataService";
import billBlock from "./BillBlock.vue";
import AddBillModal from "../../modals/AddBillModal.vue";

export default {
  components: { billBlock, AddBillModal },
  data() {
    return {
      circlePlus: circlePlus,
      bills: null,
      interval: 1,
      weeklyRange: null,
      displayAddBillModal: false,
    };
  },
  methods: {
    setInterval(interval) {
      /* 1 = Weekly, 2 = Monthly */
      this.interval = interval;
    },
    showBill(date) {
      /* 1 = Weekly, 2 = Monthly */
      if (this.interval === 1) {
        let weekStart = moment().startOf("isoWeek").format("YYYY-MM-DD");
        let weekEnd = moment().endOf("isoWeek").format("YYYY-MM-DD");
        let formattedDate = moment().format("YYYY-MM-") + date;
        return moment(formattedDate).isBetween(weekStart, weekEnd);
      }
      if (this.interval === 2) {
        /* Revise formula to only show bills this month */
        let daysThisMonth = moment().daysInMonth();
        return date <= daysThisMonth;
      }
    },
    showAddBillModal() {
      this.displayAddBillModal = true;
    },
    closeAddBillModal() {
      this.displayAddBillModal = false;
    },
  },
  mounted() {
    let weekStart = moment().startOf("isoWeek").format("MMMM DD");
    let weekEnd = moment().endOf("isoWeek").format("MMMM DD");
    this.weeklyRange = weekStart + " - " + weekEnd;

    BillsDataService.getAll().then((res) => {
      this.bills = res.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.bills_wrapper {
  height: 100%;
  width: 500px;
  border-radius: 16px;
  padding: 1em;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
    h1 {
      font-size: 24px;
      font-weight: bold;
    }
    img {
      height: 100%;
    }
  }
  .section-main {
    display: flex;
    flex-direction: column;
    .section-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2em;
      .date-interval {
        font-size: 16px;
        font-weight: normal;
      }
      .interval-bttns {
        margin-bottom: 8px;
        border: solid 1px #363537;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        align-items: center;
        button {
          height: 30px;
          width: 80px;
          color: #363537;
          font-size: 0.7em;
          overflow: hidden;
          background-color: #8f767644;
          &.active {
            color: #edf2ef;
            background-color: #0cce6b;
            font-weight: bold;
            font-size: 1em;
          }
        }
      }
      .date-range {
        font-size: 12px;
        color: #7e7e7e;
      }
    }
  }
}
</style>
