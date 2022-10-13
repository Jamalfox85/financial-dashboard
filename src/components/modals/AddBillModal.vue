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
            validation="required|text"
            help="Which bill are you listing?"
            v-model="billName"
          />
          <FormKit
            type="number"
            name="billAmount"
            label="Bill Amount"
            placeholder="$125"
            validation="required|number"
            help="How much do you pay?"
            v-model="billAmount"
          />
          <FormKit
            type="number"
            name="dueDate"
            label="Due Date"
            placeholder="28"
            validation="required|number"
            help="What day of the month is it due?"
            v-model="dueDate"
          />
        </FormKit>
      </div>
    </vue-final-modal>
  </div>
</template>
<script>
import BillsDataService from "../../services/BillsDataService";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

export default {
  components: { VueFinalModal, ModalsContainer },
  props: ["showModal"],
  data() {
    return {
      billName: null,
      billAmount: null,
      dueDate: null,
    };
  },
  methods: {
    submitBill() {
      let formattedDate;
      if (this.dueDate.length === 1) {
        formattedDate = "0" + this.dueDate;
      } else formattedDate = this.dueDate;
      let data = {
        bill_name: this.billName,
        bill_amount: this.billAmount,
        bill_date: formattedDate /* Format ex. = '30' */,
        bill_paid: false,
        Userid: 1,
      };
      BillsDataService.create(data);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal", true);
    },
  },
  watch: {
    showModal: {
      handler(newVal, oldVal) {
        this.billName = null;
        this.billAmount = null;
        this.dueDate = null;
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
  border: solid 2px red;
}
</style>
