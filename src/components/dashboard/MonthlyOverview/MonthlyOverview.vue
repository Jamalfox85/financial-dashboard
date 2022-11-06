<template lang="">
  <div class="monthly-overview-wrapper">
    <div class="section-header flex justify-between items-center">
      <h2 class="text-2xl">Expenses</h2>
      <font-awesome-icon
        class="text-2xl"
        icon="fa-solid fa-triangle-exclamation"
      />
    </div>
    <div class="section-main relative">
      <div class="total-income">
        <div class="income-line"></div>
        <p class="absolute">{{ formatAmount(getNetIncome) }}</p>
      </div>
      <div class="bill-group relative rounded-lg p-3 mb-8">
        <div class="header flex justify-between items-center mb-4">
          <h3 class="text-lg">Check #1</h3>
          <font-awesome-icon
            class="text-lg"
            icon="fa-solid fa-triangle-exclamation"
          />
        </div>
        <div class="bill-group-main">
          <table class="table-auto rounded-lg">
            <thead class="mb-8">
              <tr class="text-left">
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="mt-8">
              <tr v-for="bill in bills">
                <td class="bill-name">{{ bill.name }}</td>
                <td class="bill-date">{{ formatDate(bill.date) }}</td>
                <td class="bill-amount">{{ formatAmount(bill.amount) }}</td>
                <td class="bill-status flex items-center">
                  <div
                    class="bill-status-icon mr-2"
                    :style="{
                      backgroundColor: bill.status == 1 ? '#a2d729' : '#9e2b25',
                    }"
                  ></div>
                  {{ formatStatus(bill.status) }}
                </td>
                <td class="bill-actions">
                  <div class="flex">
                    <font-awesome-icon
                      icon="fa-solid fa-pen-to-square"
                      class="mr-4"
                    />
                    <font-awesome-icon icon="fa-solid fa-trash" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bill-group-subtotal rounded-lg p-2 text-white absolute">
          <h3 class="">{{ formatAmount(getBillGroupTotal(bills)) }}</h3>
        </div>
      </div>
      <div class="subtotal-income">
        <div class="income-line"></div>
        <p class="absolute">{{ formatAmount(getSubtotalIncome(bills)) }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import IncomesDataService from "../../../services/IncomeDataService";
import BillsDataService from "../../../services/BillsDataService";

import moment from "moment";

export default {
  data() {
    return {
      bills: [],
      incomes: [],
    };
  },
  computed: {
    getNetIncome() {
      /* 31 = monthly, 32 = bi-monthly */
      let total = 0;
      this.incomes.map((item, index) => {
        if (item.frequency === 32) {
          total = total + item.amount * 2;
        } else if (item.frequency === 31) {
          total = total + item.amount;
        }
      });
      return total;
      // return this.formatAmount(total);
    },
  },
  methods: {
    formatDate(date) {
      return moment().format("MMM ") + date;
    },
    formatAmount(amount) {
      return Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
    formatStatus(status) {
      if (status == 1) {
        return "paid";
      } else {
        return "unpaid";
      }
    },
    getBillGroupTotal(bills) {
      let total = 0;
      bills.map((item, index) => {
        total = total + item.amount;
      });
      return total;
      // return this.formatAmount(total);
    },
    getSubtotalIncome(bills) {
      console.log(this.getNetIncome);
      console.log(this.getBillGroupTotal(bills));
      return this.getNetIncome - this.getBillGroupTotal(bills);
    },
  },
  mounted() {
    BillsDataService.getAll().then((res) => {
      console.log("BILLS: ", res.data);
      this.bills = res.data;
    });

    IncomesDataService.getAll().then((res) => {
      console.log("INCOMES: ", res.data);
      this.incomes = res.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.monthly-overview-wrapper {
  box-shadow: 2px 2px 8px #fafffd;
  min-height: 80vh;
  .section-header {
    color: #342e37;
    margin-bottom: 2em;
    text-align: left;
  }
  .section-main {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .total-income,
    .subtotal-income {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 1.5em;
      .income-line {
        border: solid 1px #a2d729;
        height: 2px;
        width: 100%;
      }
      p {
        background-color: #fafffd;
        padding: 0 1.5em;
        color: #a2d729;
      }
    }
    .bill-group {
      border: solid 1px #3c91e6;
      min-height: 150px;
      width: 100%;
      .bill-group-main {
        margin-bottom: 2em;
        table {
          width: 100%;
          thead {
            padding: 0.25em;
            tr {
              background-color: #3c91e64b;
            }
          }
          th,
          td {
            padding: 8px;
          }
          tr {
            border-bottom: solid 1px #3c91e6;
          }
        }
        .bill-status-icon {
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background-color: #a2d729;
        }
      }
      .bill-group-subtotal {
        background-color: #3c91e6;
        display: inline-block;
        bottom: -2px;
        right: -2px;
      }
    }
  }
}
</style>
