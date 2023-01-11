<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :prevent-click="true"
  >
    <div class="modal-header">
      <h1>Goal Details</h1>
      <font-awesome-icon
        class="closeBttn"
        @click="closeModal"
        icon="fa-solid fa-rectangle-xmark"
      />
    </div>
    <div class="form-wrapper">
      <form
        class="flex flex-col text-white"
        @submit.prevent="updateSavingsGoal()"
      >
        <p class="mb-5">Enter savings goal details.</p>
        <label for="goal_name" class="flex flex-col mb-3"
          >Goal Name
          <input
            id="goal_name"
            name="goal_name"
            type="text"
            placeholder="Vacation"
            v-model="goalName"
            class="p-2 mb-3 rounded-md text-input w-40"
          />
        </label>
        <label for="current_amount" class="flex flex-col mb-3"
          >Current Amount
          <input
            id="current_amount"
            name="current_amount"
            type="number"
            placeholder="$6,000"
            v-model="currentAmount"
            class="p-2 mb-3 rounded-md text-input w-40"
          />
        </label>
        <label for="goal_amount" class="flex flex-col mb-3"
          >Goal Amount
          <input
            id="goal_amount"
            name="goal_amount"
            type="number"
            placeholder="$1,000"
            v-model="goalAmount"
            class="p-2 mb-3 rounded-md text-input w-40"
          />
        </label>
        <button type="submit" class="submit-bttn">Update Goal</button>
      </form>
    </div>
  </vue-final-modal>
</template>
<script>
import gql from "graphql-tag";
import { VueFinalModal, ModalsContainer } from "vue-final-modal";
import { useMutation } from "@vue/apollo-composable";
import { sessionDetails } from "../../userData";

export default {
  props: ["showModalProp", "savingsGoal", "goal"],
  components: { VueFinalModal, ModalsContainer },
  data() {
    return {
      goalName: this.goal.name,
      currentAmount: this.goal.current_amount,
      goalAmount: this.goal.goal_amount,
      session: sessionDetails,
    };
  },
  computed: {
    showModal() {
      return this.showModalProp;
    },
  },
  setup() {
    const { mutate: updateSavingsRecord } = useMutation(gql`
      mutation updateSavingsRecord(
        $name: String!
        $goal_amount: bigint!
        $current_amount: bigint!
        $id: uuid!
      ) {
        update_savings(
          where: { id: { _eq: $id } }
          _set: {
            name: $name
            goal_amount: $goal_amount
            current_amount: $current_amount
          }
        ) {
          returning {
            id
          }
        }
      }
    `);
    return {
      updateSavingsRecord,
    };
  },
  methods: {
    updateSavingsGoal() {
      this.updateSavingsRecord({
        name: this.goalName,
        goal_amount: this.goalAmount,
        current_amount: this.currentAmount,
        id: this.goal.id,
      });
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
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
  &:hover {
    background-color: #8cbb20;
  }
}
</style>
