<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :prevent-click="true"
  >
    <div class="modal-header">
      <h1>Debt Details</h1>
      <font-awesome-icon
        class="closeBttn"
        @click="closeModal"
        icon="fa-solid fa-rectangle-xmark"
      />
    </div>
    <div class="form-wrapper">
      <FormKit
        type="form"
        id="debt-details-form"
        submit-label="Update Debt"
        @submit="updateDebt"
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
        <p>Update the details of your debt.</p>
        <FormKit
          outer-class="modal-name-input"
          type="text"
          name="debtName"
          label="Debt Name"
          placeholder="Vacation"
          validation="required|text"
          help="What are you saving for?"
          v-model="debtName"
        />
        <FormKit
          type="number"
          name="debtLimit"
          label="Debt Limit"
          placeholder="$1,000"
          validation="required|number"
          help="What is your credit limit / total amount taken out?"
          v-model="debtLimit"
        />
        <FormKit
          type="number"
          name="currentAmount"
          label="Current Amount"
          placeholder="$0"
          validation="req50uired|number"
          help="How much have you still owe?"
          v-model="debtAmount"
        />
        <Formkit
          type="button"
          label="Delete"
          class="delete-bttn"
          @click="deleteDebt"
          >Delete</Formkit
        >
      </FormKit>
    </div>
  </vue-final-modal>
</template>
<script>
import DebtDataService from "../../services/DebtDataService";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

export default {
  components: { VueFinalModal, ModalsContainer },
  props: ["showModal", "debt"],
  data() {
    return {
      debtName: null,
      debtAmount: 0,
      debtLimit: 0,
      debtCategory: null,
    };
  },
  methods: {
    updateDebt() {
      let data = {
        debt_name: this.debtName,
        debt_amount: this.debtAmount,
        debt_limit: this.debtLimit,
        debt_category: this.debtCategory,
        UserId: 1,
      };
      DebtDataService.update(this.debt.id, data);
      this.closeModal();
    },
    deleteDebt() {
      DebtDataService.delete(this.debt.id);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
  watch: {
    showModal: {
      handler(newVal, oldVal) {
        this.debtName = this.debt.debt_name;
        this.debtAmount = this.debt.debt_amount;
        this.debtLimit = this.debt.debt_limit;
        this.debtCategory = this.debt.debt_category;
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
