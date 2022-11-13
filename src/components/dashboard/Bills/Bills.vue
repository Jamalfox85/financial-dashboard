<template lang="">
  <div class="bills_wrapper">
    <div class="header">
      <h1>Bill Report</h1>
      <add-bttn @click="showAddBillModal()" />
    </div>
    <div class="section-main">
      <div class="interval-bttns">
        <button :class="{ active: interval === 1 }" @click="setInterval(1)">
          Weekly
        </button>
        <button :class="{ active: interval === 2 }" @click="setInterval(2)">
          Monthly
        </button>
      </div>
      <div class="content">
        <h6 class="date-range">{{ getTimeFrame() }}</h6>
        <div class="bill-table">
          <div class="table-headers">
            <p>Date</p>
            <p>Bill</p>
            <p>Amount</p>
            <p>Status</p>
          </div>
          <div class="bills" v-for="bill in bills">
            <billBlock :bill="bill" v-if="showBill(bill.bill_date) === true" />
          </div>
        </div>
      </div>
      <add-bill-modal
        :showModal="displayAddBillModal"
        @closeModal="closeAddBillModal"
      />
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";

import moment from "moment";

import BillsDataService from "../../../services/BillsDataService";

import AddBttn from "../General/AddBttn.vue";
import billBlock from "./BillBlock.vue";
import AddBillModal from "../../modals/AddBillModal.vue";

const GET_BILLS_QUERY = gql`
  query getBillsQuery {
    bills {
      id
      name
    }
  }
`;

// 86b27233-68ec-4ff5-ad2a-0aab04d13ba8 (userid)
// 1221dfb2-4a79-423a-9fb7-6cf937ff7908(bill group id)

export default {
  components: { AddBttn, billBlock, AddBillModal },
  data() {
    return {
      bills: null,
      interval: 1,
      displayAddBillModal: false,
    };
  },
  apollo: {
    apolloData: gql`
      query getBillsQuery {
        bills {
          id
          name
        }
      }
    `,
  },
  methods: {
    setInterval(interval) {
      /* 1 = Weekly, 2 = Monthly */
      this.interval = interval;
    },
    getTimeFrame() {
      let weekStart = moment().startOf("isoWeek").format("MMMM DD");
      let weekEnd = moment().endOf("isoWeek").format("MMMM DD");
      if (this.interval === 1) {
        return weekStart + " - " + weekEnd;
      } else {
        return moment().format("MMMM");
      }
    },
    showBill(date) {
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
    BillsDataService.getAll().then((res) => {
      console.log("BILLS: ", res.data);
      this.bills = res.data;
    });
  },
};
</script>
<style lang="scss" scoped>
:root {
  --white: #eaeff2;
  --black: #000;
  --dark-green: #77ad78;
  --light-green: #8fd694;
  --dark-accent: #504b43;
}
.bills_wrapper {
  .header {
    display: flex;
    // justify-content: space-between;
    margin-bottom: 1em;
    h1 {
      font-size: 24px;
      font-weight: bold;
      color: var(--white);
      position: relative;
      z-index: 2;
      &:after {
        content: "Bill Report";
        position: absolute;
        top: 2px;
        right: 2px;
        height: 100%;
        width: 100%;
        z-index: -1;
        -webkit-text-stroke: 1px var(--dark-green);
        color: transparent;
      }
    }
  }
  .section-main {
    .interval-bttns {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1em;
      button {
        height: 25px;
        width: 65px;
        color: var(--black);
        font-size: 12px;
        background-color: var(--dark-green);
        border-radius: 8px;
        margin-left: 8px;
        opacity: 0.6;
        box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.25);
        &.active {
          background-color: var(--light-green);
          font-weight: bold;
          opacity: 1;
        }
      }
    }
    .content {
      width: 100%;
      height: 900px;
      border-radius: 12px;
      background-color: var(--dark-green);
      display: flex;
      flex-direction: column;
      box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.25);
      .date-range {
        align-self: flex-start;
        font-size: 16px;
        margin-bottom: 1em;
        color: var(--white);
        padding: 1em;
      }
      .bill-table {
        width: 100%;
        padding: 0 0.5em;
        .table-headers {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--white);
        }
      }
    }
  }
}
</style>
