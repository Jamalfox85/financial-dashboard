<template>
  <div class="modal-overlay-wrapper">
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      :prevent-click="true"
    >
      <div class="modal-header">
        <h1>Track Debt</h1>
        <font-awesome-icon
          class="closeBttn"
          @click="closeModal"
          icon="fa-solid fa-rectangle-xmark"
        />
      </div>
      <div class="form-wrapper">
        <FormKit
          type="form"
          id="add-debt-form"
          :classes="{
            outer: 'form-wrapper',
          }"
          submit-label="Submit"
          @submit="submitDebt"
        >
          <p>Enter the details of your debt so we can help you keep track!</p>
          <FormKit
            type="text"
            name="debtName"
            label="Debt Name"
            placeholder="Credit Card #1"
            validation="required|text"
            help="Which bill are you listing?"
            v-model="debtName"
          />
          <FormKit
            type="number"
            name="debtAmount"
            label="Debt Amount"
            placeholder="$0"
            validation="required|number"
            help="How much do you owe?"
            v-model="debtAmount"
          />
          <FormKit
            type="number"
            name="debtLimit"
            label="Limit / Max"
            placeholder="$2000"
            validation="required|date"
            help="What is your credit limit / max amount borrowed?"
            v-model="debtLimit"
          />
          <FormKit
            type="select"
            name="debtCategory"
            label="Choose A Category"
            placeholder="Credit Cards"
            validation="required"
            help="Which best describes this type of debt?"
            :options="formatDebtCategories()"
            v-model="debtCategory"
          />
        </FormKit>
      </div>
    </vue-final-modal>
  </div>
</template>
<script>
import DebtDataService from "../../services/DebtDataService";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

export default {
  components: { VueFinalModal, ModalsContainer },
  props: ["showModal", "debtCategories"],
  data() {
    return {
      debtName: null,
      debtAmount: null,
      debtLimit: null,
      debtCategory: null,
    };
  },
  methods: {
    formatDebtCategories() {
      let formattedList = [];
      this.debtCategories.map((item) => {
        if (item === "") {
          console.log("PING");
          return;
        } else formattedList.push(`${item}`);
      });
      return formattedList;
    },
    submitDebt() {
      let data = {
        debt_name: this.debtName,
        debt_amount: this.debtAmount,
        debt_limit: this.debtLimit,
        debt_category: this.debtCategory,
        UserId: 1,
      };
      DebtDataService.create(data);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal", true);
    },
  },
  watch: {
    showModal: {
      handler(newVal, oldVal) {
        this.debtName = null;
        this.debtAmount = null;
        this.debtLimit = null;
        this.debtCategory = null;
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
