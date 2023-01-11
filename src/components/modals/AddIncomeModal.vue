<template>
  <div class="modal-overlay-wrapper">
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      :prevent-click="true"
    >
      <div class="modal-header">
        <h1>Add Income</h1>
        <font-awesome-icon
          class="closeBttn"
          @click="closeModal"
          icon="fa-solid fa-rectangle-xmark"
        />
      </div>
      <div class="form-wrapper">
        <FormKit
          type="form"
          id="add-income-form"
          :classes="{
            outer: 'form-wrapper',
          }"
          submit-label="Submit"
          @submit="submitIncome"
        >
          <p>Add the details of your income stream.</p>
          <FormKit
            type="text"
            name="incomeName"
            label="Income Name"
            placeholder="Full Time Job"
            validation="required|text"
            help="Which income stream are you listing?"
            v-model="incomeName"
          />
          <FormKit
            type="number"
            name="incomeAmount"
            label="Income Amount (Monthly)"
            placeholder="$1,000"
            validation="required|number"
            help="How much do you make monthly?"
            v-model="incomeAmount"
          />
        </FormKit>
      </div>
    </vue-final-modal>
  </div>
</template>
<script>
import IncomeDataService from "../../services/IncomeDataService";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

export default {
  components: { VueFinalModal, ModalsContainer },
  props: ["showModalProp"],
  data() {
    return {
      showModal: this.showModalProp,
      incomeName: "",
      incomeAmount: 0,
    };
  },
  methods: {
    submitIncome() {
      let data = {
        income_name: this.incomeName,
        income_amount: this.incomeAmount,
        UserId: 1,
      };
      IncomeDataService.create(data);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal", true);
    },
  },
  watch: {
    showModal: {
      handler(newVal, oldVal) {
        (this.incomeName = ""), (this.incomeAmount = 0);
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
</style>
