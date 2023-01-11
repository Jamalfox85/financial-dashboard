<template lang="">
  <div class="monthly-overview-wrapper">
    <div class="header flex justify-between items-center mb-5">
      <h1 class="section-header">EXPENSES</h1>
      <font-awesome-icon
        class="add-bill-group-icon"
        icon="fa-solid fa-square-plus"
        @click="showAddBillGroupModal()"
      />
    </div>
    <div class="section-main relative">
      <div class="total-income">
        <div class="income-line"></div>
        <p class="">{{ formatAmount(total) }}</p>
        <div class="income-line"></div>
      </div>
      <p class="mb-3 text-center">
        * Click a bill's status button to update it.
      </p>
      <div v-for="(group, index) in combinedBillGroupData">
        <div class="bill-group relative rounded-lg p-3 mb-8">
          <div class="header flex justify-between items-center mb-4">
            <h3 class="text-lg">{{ group.name }}</h3>
            <div>
              <font-awesome-icon
                class="text-lg add-bill-icon"
                icon="fa-solid fa-square-plus"
                @click="showAddBillModal()"
              />
              <font-awesome-icon
                icon="fa-solid fa-pen-to-square"
                class="text-lg ml-2 pen-edit-icon"
                @click="showEditBillGroupModal(group)"
              />
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="text-lg ml-2 trashcan-delete-icon"
                @click="showDeleteBillGroupModal(group)"
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
                    <button
                      class="bill-status-bttn bill-status-paid"
                      @click="updateBillStatus(bill)"
                      v-if="bill.status === 1"
                    >
                      Paid
                    </button>
                    <button
                      class="bill-status-bttn bill-status-unpaid"
                      @click="updateBillStatus(bill)"
                      v-else
                    >
                      Unpaid
                    </button>
                  </td>
                  <td class="bill-actions">
                    <div class="flex">
                      <font-awesome-icon
                        icon="fa-solid fa-pen-to-square"
                        class="mr-4 pen-edit-icon"
                        @click="showEditBillModal(bill)"
                      />
                      <font-awesome-icon
                        icon="fa-solid fa-trash"
                        class="trashcan-delete-icon"
                        @click="showDeleteBillModal(bill)"
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
          <p class="">
            {{ formatAmount(getRemainingBalance(index)) }}
          </p>
          <div class="income-line"></div>
        </div>
      </div>
    </div>
    <add-bill-modal
      :showModalProp="displayAddBillModal"
      :billGroups="billGroups"
      @closeModal="closeAddBillModal"
    />
    <add-bill-group-modal
      :showModalProp="displayAddBillGroupModal"
      @closeModal="closeAddBillGroupModal"
    />
    <delete-bill-modal
      :showModalProp="displayDeleteBillModal"
      :bill="billToDelete"
      @close="closeDeleteBillModal"
    />
    <delete-bill-group-modal
      :showModalProp="displayDeleteBillGroupModal"
      :billGroup="billGroupToDelete"
      @close="closeDeleteBillGroupModal"
    />
    <edit-bill-modal
      :showModalProp="displayEditBillModal"
      :bill="billToEdit"
      :billGroups="billGroups"
      @closeModal="closeEditBillModal"
    />
    <edit-bill-group-modal
      :showModalProp="displayEditBillGroupModal"
      :billGroup="billGroupToEdit"
      @closeModal="closeEditBillGroupModal"
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
import DeleteBillModal from "../../modals/DeleteBillModal.vue";
import DeleteBillGroupModal from "../../modals/DeleteBillGroupModal.vue";
import EditBillModal from "../../modals/EditBillModal.vue";
import EditBillGroupModal from "../../modals/EditBillGroupModal.vue";

const GET_BILLS_QUERY = gql`
  query ($userId: uuid!) {
    bills(where: { user_id: { _eq: $userId } }) {
      id
      name
      amount
      bill_group_id
      date
      frequency
      status
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
  components: {
    AddBillModal,
    AddBillGroupModal,
    DeleteBillModal,
    DeleteBillGroupModal,
    EditBillModal,
    EditBillGroupModal,
  },
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
      displayDeleteBillModal: false,
      displayDeleteBillGroupModal: false,
      session: sessionDetails,
      billToDelete: {},
      billGroupToDelete: {},
      displayEditBillModal: false,
      displayEditBillGroupModal: false,
      billToEdit: {},
      billGroupToEdit: {},
    };
  },
  setup() {
    const { mutate: editBillStatus } = useMutation(gql`
      mutation editBillRecord($status: bigint!, $billId: uuid!) {
        update_bills(
          where: { id: { _eq: $billId } }
          _set: { status: $status }
        ) {
          returning {
            id
          }
        }
      }
    `);
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
      editBillStatus,
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
    getRemainingBalance(currentGroupIndex) {
      for (let i = currentGroupIndex; i >= 0; i--) {
        let amountPaid = 0;
        let groupTotal = this.combinedBillGroupData[i].totalAmount;
        amountPaid += groupTotal;
        return this.total - amountPaid;
      }
    },
    updateBillStatus(bill) {
      let newStatus = bill.status === 1 ? 0 : 1;
      this.editBillStatus({ billId: bill.id, status: newStatus });
      console.log(bill);
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
    showDeleteBillModal(bill) {
      this.billToDelete = bill;
      this.displayDeleteBillModal = true;
    },
    closeDeleteBillModal() {
      this.displayDeleteBillModal = false;
    },
    showDeleteBillGroupModal(billGroup) {
      this.billGroupToDelete = billGroup;
      this.displayDeleteBillGroupModal = true;
    },
    closeDeleteBillGroupModal() {
      this.displayDeleteBillGroupModal = false;
    },
    showEditBillModal(bill) {
      this.billToEdit = bill;
      this.displayEditBillModal = true;
    },
    closeEditBillModal() {
      this.displayEditBillModal = false;
    },
    showEditBillGroupModal(billGroup) {
      this.billGroupToEdit = billGroup;
      this.displayEditBillGroupModal = true;
    },
    closeEditBillGroupModal() {
      this.displayEditBillGroupModal = false;
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
  overflow-y: scroll;
  &::-webkit-scrollbar {
    height: 12px;
    width: 100%;
  }
  &::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 12px;
    background-color: #a2d729;
  }
  &::-webkit-scrollbar-track {
    height: 20px;
    border-radius: 12px;
    background-color: #78971d58;
  }
  .pen-edit-icon {
    &:hover {
      cursor: pointer;
      transition: 0.1s ease-in;
      color: rgb(175, 175, 175);
    }
  }
  .trashcan-delete-icon {
    &:hover {
      cursor: pointer;
      transition: 0.1s ease-in;
      color: #e3170a;
    }
  }
  .header {
    .section-header {
      position: relative;
      z-index: 2;
      font-size: 24px;
      font-weight: bold;
      color: var(--white);
      letter-spacing: 8px;
    }
    .add-bill-group-icon {
      color: #fff;
      font-size: 2em;
      cursor: pointer;
      transition: 0.1s ease-in;
      &:hover {
        color: rgb(175, 175, 175);
      }
    }
  }
  .section-main {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    color: var(--white);

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
        width: 45%;
      }
      p {
        padding: 0 1.5em;
        color: #a2d729;
      }
    }
    .bill-group {
      border: solid 1px #72971d;
      min-height: 150px;
      width: 100%;
      .add-bill-icon {
        cursor: pointer;
        transition: 0.1s ease-in;
        &:hover {
          color: rgb(175, 175, 175);
        }
      }
      .bill-group-main {
        margin-bottom: 2em;
        overflow-x: scroll;
        table {
          width: 100%;
          thead {
            padding: 0.25em;
            tr {
              background-color: #a2d7294b;
            }
          }
          th,
          td {
            padding: 8px;
          }
          tr {
            border-bottom: solid 1px #a2d729;
          }
        }
        .bill-status-bttn {
          padding: 2px 8px;
          border-radius: 8px;
          cursor: pointer;
          &.bill-status-paid {
            background-color: #a2d729;
          }
          &.bill-status-unpaid {
            background-color: #9e2b25;
          }
        }
      }
      .bill-group-subtotal {
        background-color: #a2d729;
        display: inline-block;
        bottom: -2px;
        right: -2px;
      }
    }
  }
}
</style>
