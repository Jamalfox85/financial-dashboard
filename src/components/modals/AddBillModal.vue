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
        <FormKit
          type="form"
          id="add-bill-form"
          :classes="{
            outer: 'form-wrapper',
          }"
          submit-label="Add Bill"
          @submit="submitBill"
        >
          <p>Enter the details of your bill so we can help you keep track!</p>
          <FormKit
            type="text"
            name="billName"
            label="Bill Name"
            placeholder="Electricity"
            validation=""
            help="Which bill are you listing?"
            v-model="billName"
          />
          <FormKit
            type="number"
            name="billAmount"
            label="Bill Amount"
            placeholder="$125"
            validation=""
            help="How much do you pay?"
            v-model="billAmount"
          />
          <FormKit
            type="number"
            name="dueDate"
            label="Due Date"
            placeholder="28"
            validation=""
            help="What day of the month is it due?"
            v-model="dueDate"
          />
          <FormKit
            type="select"
            name="frequency"
            label="Bill Frequency"
            validation=""
            help="How often do you pay this bill?"
            v-model="frequency"
            :options="{ 31: 'Monthly', 32: 'Weekly' }"
          />
          <FormKit
            type="select"
            name="billGroups"
            label="Bill Groups"
            validation=""
            help="Which Bill Group Will This Bill Belong To?"
            v-model="billGroup"
            :options="formatBillGroups"
          />
        </FormKit>
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
  border: 1px solid var(--white);
  border-radius: 12px;
  background: var(--white);
  width: 600px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
  h1 {
    font-size: 24px;
  }
  .closeBttn {
    height: 2em;
  }
}
.form-wrapper {
  border: solid 2px red;
}
</style>
