<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :prevent-click="true"
  >
    <div class="modal-header">
      <h1>Bill Details</h1>
      <font-awesome-icon
        class="closeBttn"
        @click="closeModal"
        icon="fa-solid fa-rectangle-xmark"
      />
    </div>
    <div class="form-wrapper">
      <FormKit
        type="form"
        id="bill-details-form"
        submit-label="Update Bill"
        @submit="updateBill"
        :classes="{
          outer: 'mb-5',
          label: 'block mb-1 font-bold text-sm',
          inner:
            'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
          input:
            'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
          help: 'text-xs text-gray-500',
        }"
      >
        <p>Update the details of your bill.</p>
        <FormKit
          outer-class="modal-name-input"
          type="text"
          name="billName"
          label="Bill Name"
          placeholder="Electricity"
          validation="required|text"
          help="What are you paying for?"
          v-model="billName"
        />
        <FormKit
          type="number"
          name="billAmount"
          label="Bill Amount"
          placeholder="$1,000"
          validation="required|number"
          help="How much do you need to pay?"
          v-model="billAmount"
        />
        <FormKit
          type="number"
          name="billDate"
          label="Bill Date"
          placeholder="0"
          validation="required|number"
          help="When do you typically pay?"
          v-model="dueDate"
        />
        <Formkit
          type="button"
          label="Delete"
          class="delete-bttn"
          @click="deleteBill"
          >Delete</Formkit
        >
      </FormKit>
    </div>
  </vue-final-modal>
</template>
<script>
import BillsDataService from "../../services/BillsDataService";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

export default {
  components: { VueFinalModal, ModalsContainer },
  props: ["showModalProp", "bill"],
  data() {
    return {
      billName: null,
      billAmount: 0,
      dueDate: null,
      billId: null,
    };
  },
  computed: {
    showModal() {
      return true;
    },
  },
  methods: {
    updateBill() {
      let data = {
        bill_name: this.billName,
        bill_amount: this.billAmount,
        bill_date: this.dueDate /* Format ex. = '30' */,
        bill_paid: false,
        Userid: 1,
      };
      BillsDataService.update(this.bill.id, data);
      this.closeModal();
    },
    deleteBill() {
      BillsDataService.delete(this.bill.id);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
  watch: {
    showModal: {
      handler(newVal, oldVal) {
        this.billName = this.bill.bill_name;
        this.billAmount = this.bill.bill_amount;
        this.dueDate = this.bill.bill_date;
      },
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
  display: flex;
  .formkit-inner {
    border: solid 4px blue;
  }
}
.modal-name-input,
.my-class .foo-bar {
  border: solid 4px blue;
}
.delete-bttn {
  padding: 8px 4px;
  width: 140px;
  border-radius: 4px;
  text-align: center;
  background-color: red;
  color: #fff;
  margin-bottom: 1em;
  cursor: pointer;
}
</style>
