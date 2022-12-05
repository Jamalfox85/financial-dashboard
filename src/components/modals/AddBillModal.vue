<template>
  <div class="modal-overlay-wrapper">
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      :prevent-click="true"
    >
      <div class="modal-header">
        <h1>Add Bill</h1>
        <font-awesome-icon
          class="closeBttn"
          @click="closeModal"
          icon="fa-solid fa-rectangle-xmark"
        />
      </div>
      <div class="form-wrapper">
        <form class="flex flex-col text-white">
          <p class="mb-5">
            Enter the details of your bill so we can help you keep track!
          </p>
          <label for="bill_name" class="flex flex-col mb-3"
            >Bill Name
            <input
              id="bill_name"
              name="bill_name"
              type="text"
              placeholder="Electricity"
              v-model="billName"
              class="p-2 mb-3 rounded-md text-input w-40"
            />
          </label>
          <label for="bill_amount" class="flex flex-col mb-3"
            >Bill Amount
            <input
              id="bill_amount"
              name="bill_amount"
              type="number"
              placeholder="$125"
              v-model="billAmount"
              class="p-2 mb-3 rounded-md text-input w-40"
            />
          </label>
          <label for="due_date" class="flex flex-col mb-3"
            >Due Date
            <input
              id="due_date"
              name="due_date"
              type="number"
              placeholder="28"
              v-model="dueDate"
              class="p-2 mb-3 rounded-md text-input w-40"
            />
          </label>
          <label for="frequency" class="flex flex-col mb-3">
            Frequency
            <select
              id="frequency"
              name="frequency"
              type="select"
              v-model="frequency"
              class="p-2 mb-3 rounded-md text-input w-40"
            >
              <option v-for="option in frequencyOptions">
                {{ option }}
              </option>
            </select>
          </label>
          <label
            for="bill_groups"
            :options="formatBillGroups"
            class="flex flex-col mb-3"
          >
            Bill Group
            <select
              id="bill_groups"
              name="bill_groups"
              type="select"
              v-model="billGroup"
              class="p-2 mb-3 rounded-md text-input w-40"
            >
              <option v-for="option in formatBillGroups">{{ option }}</option>
            </select>
          </label>
          <button type="submit" @click="submitBill()" class="submit-bttn">
            Add Bill
          </button>
        </form>
      </div>
    </vue-final-modal>
  </div>
</template>
<script>
import BillsDataService from "../../services/BillsDataService";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { computed, watchEffect } from "vue";
import gql from "graphql-tag";
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";

export default {
  components: { VueFinalModal, ModalsContainer },
  props: ["showModal", "billGroups"],
  data() {
    return {
      billName: null,
      billAmount: null,
      dueDate: null,
      frequency: 1,
      billGroup: null,
      frequencyOptions: { 31: "Monthly", 32: "Weekly" },
    };
  },
  setup() {
    const { mutate: addBillRecord } = useMutation(gql`
      mutation addBillRecord(
        $name: String!
        $date: date!
        $bill_group_id: uuid!
        $amount: bigint!
        $frequency: bigint!
        $user_id: uuid!
      ) {
        insert_bills(
          objects: {
            name: $name
            date: $date
            bill_group_id: $bill_group_id
            amount: $amount
            frequency: $frequency
            user_id: $user_id
          }
        ) {
          returning {
            id
          }
        }
      }
    `);
    return {
      addBillRecord,
    };
  },
  computed: {
    formatBillGroups() {
      let formattedBillGroups = {};
      this.billGroups.map((item, index) => {
        formattedBillGroups[item.id] = item.group_name;
      });
      return formattedBillGroups;
    },
  },
  methods: {
    submitBill() {
      console.log("Groups: ", this.billGroups);
      this.addBillRecord({
        name: this.billName,
        date: `2022-11-${this.dueDate}`,
        bill_group_id: this.billGroup,
        amount: this.billAmount,
        frequency: this.frequency,
        user_id: "86b27233-68ec-4ff5-ad2a-0aab04d13ba8",
      });
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal", true);
    },
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
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #a2d729;
  border-radius: 12px;
  background: #342e37;
  width: 600px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
  color: #fff;
  h1 {
    font-size: 24px;
    letter-spacing: 4px;
  }
  .closeBttn {
    height: 2em;
    cursor: pointer;
  }
}

.text-input {
  color: #342e37;
}
.submit-bttn {
  background-color: #a2d729;
  padding: 8px 4px;
  width: 140px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 1em;
}
</style>
