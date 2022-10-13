<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :prevent-click="true"
  >
    <div class="modal-header">
      <h1>Add Goal</h1>
      <font-awesome-icon
        class="closeBttn"
        @click="closeModal"
        icon="fa-solid fa-rectangle-xmark"
      />
    </div>
    <div class="form-wrapper">
      <FormKit
        type="form"
        id="add-goal-form"
        submit-label="Add Goal"
        @submit="submitGoal"
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
        <p>
          Enter the details of your latest savings goal. We'll help keep track
          of it!
        </p>
        <FormKit
          outer-class="modal-name-input"
          type="text"
          name="goalName"
          label="Goal Name"
          placeholder="Vacation"
          validation="required|text"
          help="What are you saving for?"
          v-model="goalName"
        />
        <FormKit
          type="number"
          name="goalAmount"
          label="Goal Amount"
          placeholder="$1,000"
          validation="required|number"
          help="How much do you want to save?"
          v-model="goalAmount"
        />
        <FormKit
          type="number"
          name="currentAmount"
          label="Current Amount"
          placeholder="$0"
          validation="required|number"
          help="How much have you saved so far?"
          v-model="currentAmount"
        />
      </FormKit>
    </div>
  </vue-final-modal>
</template>
<script>
import { ref } from "vue";
import SavingsDataService from "../../services/SavingsDataService";

import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

export default {
  props: ["showModal"],
  components: { VueFinalModal, ModalsContainer },
  data() {
    return {
      goalName: null,
      currentAmount: null,
      goalAmount: null,
    };
  },
  methods: {
    submitGoal() {
      let data = {
        savings_name: this.goalName,
        goal_amount: this.goalAmount,
        current_amount: this.currentAmount,
        Userid: 1,
      };
      SavingsDataService.create(data);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close", "closed");
    },
  },
  watch: {
    showModal: {
      handler(newVal, oldVal) {
        this.goalName = null;
        this.currentAmount = null;
        this.goalAmount = null;
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
</style>
