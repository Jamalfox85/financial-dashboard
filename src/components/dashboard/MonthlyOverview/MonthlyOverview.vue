<template lang="">
  <div class="monthly-overview-wrapper">
    <div class="section-header flex justify-between items-center">
      <h2 class="text-2xl">Expenses</h2>
      <font-awesome-icon
        class="text-2xl"
        icon="fa-solid fa-square-plus"
        @click="showAddBillGroupModal()"
      />
    </div>
    <div class="section-main relative">
      <div class="total-income">
        <div class="income-line"></div>
        <p class="absolute">{{ formatAmount(total) }}</p>
      </div>
      <div v-for="(group, index) in combinedBillGroupData">
        <div class="bill-group relative rounded-lg p-3 mb-8">
          <div class="header flex justify-between items-center mb-4">
            <h3 class="text-lg">{{ group.name }}</h3>
            <div>
              <font-awesome-icon
                class="text-lg"
                icon="fa-solid fa-square-plus"
                @click="showAddBillModal()"
              />
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="text-lg ml-2"
                @click="deleteBillGroup(group)"
              />
            </div>
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
                <tr v-for="bill in group.bills">
                  <td class="bill-name">{{ bill.name }}</td>
                  <td class="bill-date">{{ formatDate(bill.date) }}</td>
                  <td class="bill-amount">{{ formatAmount(bill.amount) }}</td>
                  <td class="bill-status flex items-center">
                    <div
                      class="bill-status-icon mr-2"
                      :style="{
                        backgroundColor:
                          bill.status == 1 ? '#a2d729' : '#9e2b25',
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
                      <font-awesome-icon
                        icon="fa-solid fa-trash"
                        @click="deleteBill(bill)"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bill-group-subtotal rounded-lg p-2 text-white absolute">
            <h3 class="">{{ formatAmount(getBillGroupTotal(group.bills)) }}</h3>
          </div>
        </div>
        <div class="subtotal-income">
          <div class="income-line"></div>
          <p class="absolute">
            {{ formatAmount(getRemainingBalance(index)) }}
          </p>
        </div>
      </div>
    </div>
    <add-bill-modal
      :showModal="displayAddBillModal"
      :billGroups="billGroups"
      @closeModal="closeAddBillModal"
    />
    <add-bill-group-modal
      :showModal="displayAddBillGroupModal"
      @closeModal="closeAddBillGroupModal"
    />
  </div>
</template>
<script lang="ts">
import { computed, watchEffect } from "vue";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";
import AddBillModal from "../../modals/AddBillModal.vue";
import AddBillGroupModal from "../../modals/AddBillGroupModal.vue";
import moment from "moment";
import { reactive } from "vue";
import { sessionDetails } from "../../../userData";

const GET_BILLS_QUERY = gql`
  query ($userId: uuid!) {
    bills(where: { user_id: { _eq: $userId } }) {
      id
      name
      amount
      bill_group_id
      date
    }
    bill_groups(where: { user_id: { _eq: $userId } }) {
      id
      group_name
    }
    incomes(where: { userid: { _eq: $userId } }) {
      id
      name
      amount
      frequency
    }
  }
`;

export default {
  components: { AddBillModal, AddBillGroupModal },
  data() {
    return {
      billGroups: [],
      bills: [],
      incomes: [],
      combinedBillGroupData: [],
      total: 0,
      amountPaid: 0,
      displayAddBillModal: false,
      displayAddBillGroupModal: false,
      session: sessionDetails,
    };
  },
  setup() {
    const { mutate: deleteBillRecord } = useMutation(gql`
      mutation deleteBillRecord($id: uuid!) {
        delete_bills(where: { id: { _eq: $id } }) {
          returning {
            id
          }
        }
      }
    `);
    const { mutate: deleteBillGroupRecord } = useMutation(gql`
      mutation deleteBillGroupRecord($id: uuid!) {
        delete_bill_groups(where: { id: { _eq: $id } }) {
          returning {
            id
          }
        }
      }
    `);
    return {
      deleteBillRecord,
      deleteBillGroupRecord,
    };
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
    getRemainingBalance(currentGroupIndex) {
      for (let i = currentGroupIndex; i >= 0; i--) {
        let amountPaid = 0;
        let groupTotal = this.combinedBillGroupData[i].totalAmount;
        amountPaid += groupTotal;
        return this.total - amountPaid;
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
      return this.getNetIncome - this.getBillGroupTotal(bills);
    },
    deleteBill(bill) {
      console.log(bill);
      window.alert(`Bill "${bill.name}" Deleted`);
      this.deleteBillRecord({ id: bill.id });
    },
    deleteBillGroup(group) {
      window.alert(`Bill Group "${group.name}" Deleted`);
      this.deleteBillGroupRecord({ id: group.id });
    },
    showAddBillModal() {
      this.displayAddBillModal = true;
    },
    closeAddBillModal() {
      this.displayAddBillModal = false;
    },
    showAddBillGroupModal() {
      this.displayAddBillGroupModal = true;
    },
    closeAddBillGroupModal() {
      this.displayAddBillGroupModal = false;
    },
  },
  mounted() {
    const variables = reactive({
      userId: this.session.user.id,
    });
    const { result } = useQuery(GET_BILLS_QUERY, variables);
    const bills = computed(() => result.value?.bills ?? []);
    const billGroups = computed(() => result.value?.bill_groups ?? []);
    const incomes = computed(() => result.value?.incomes ?? []);
    watchEffect(() => {
      this.bills = bills;
      this.billGroups = billGroups;
      this.incomes = incomes;

      const combinedBillInfo: object[] = [];
      let billGroupTotalCost: number = 0;
      this.billGroups.map((item, index) => {
        /* Decide which bills are in the group */
        let matchingBills = bills.value.filter((bill) => {
          if (bill.bill_group_id === item.id) {
            billGroupTotalCost += bill.amount;
            return true;
          }
        });
        /* Set up interface and create object */
        interface billGroupInterface {
          id: String[];
          name: String[];
          bills: string[];
          totalAmount: number;
        }
        let billGroupObject: billGroupInterface = {
          id: item.id,
          name: item.group_name,
          bills: matchingBills,
          totalAmount: billGroupTotalCost,
        };
        /* Push object to data array */
        combinedBillInfo.push(billGroupObject);
      });
      this.combinedBillGroupData = combinedBillInfo;

      /* 31 = monthly, 32 = bi-monthly */
      let monthlyIncome = 0;
      this.incomes.map((item, index) => {
        if (item.frequency === 32) {
          monthlyIncome += item.amount * 2;
        } else if (item.frequency === 31) {
          monthlyIncome += item.amount;
        }
      });
      this.total = monthlyIncome;
    });
  },
};
</script>
<style lang="scss" scoped>
.monthly-overview-wrapper {
  box-shadow: 2px 2px 8px #fafffd;
  min-height: 80vh;
  background-color: #fff;
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
        overflow-x: scroll;
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
