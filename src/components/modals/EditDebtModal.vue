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
      <form class="flex flex-col text-white" @submit.prevent="updateDebt()">
        <p class="mb-5">Enter debt details.</p>
        <label for="debt_name" class="flex flex-col mb-3"
          >Debt Name
          <input
            id="debt_name"
            name="debt_name"
            type="text"
            placeholder="Credit Card #1"
            v-model="debtName"
            class="p-2 mb-3 rounded-md text-input w-40"
          />
        </label>
        <label for="current_debt" class="flex flex-col mb-3"
          >Current Debt
          <input
            id="current_debt"
            name="current_debt"
            type="number"
            placeholder="$700"
            v-model="currentDebt"
            class="p-2 mb-3 rounded-md text-input w-40"
          />
        </label>
        <label for="debt_limit" class="flex flex-col mb-3"
          >Debt Limit
          <input
            id="debt_limit"
            name="debt_limit"
            type="number"
            placeholder="$1,200"
            v-model="debtLimit"
            class="p-2 mb-3 rounded-md text-input w-40"
          />
        </label>
        <button type="submit" class="submit-bttn">Update Debt</button>
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
  props: ["showModalProp", "savingsGoal", "debt"],
  components: { VueFinalModal, ModalsContainer },
  data() {
    return {
      showModal: this.showModalProp,
      debtName: this.debt.name,
      currentDebt: this.debt.current_debt,
      debtLimit: this.debt.debt_limit,
      session: sessionDetails,
    };
  },
  setup() {
    const { mutate: updateDebtRecord } = useMutation(gql`
      mutation updateDebtRecord(
        $name: String!
        $current_debt: bigint!
        $debt_limit: bigint!
        $id: uuid!
      ) {
        update_debts(
          where: { id: { _eq: $id } }
          _set: {
            name: $name
            current_debt: $current_debt
            debt_limit: $debt_limit
          }
        ) {
          returning {
            id
          }
        }
      }
    `);
    return {
      updateDebtRecord,
    };
  },
  methods: {
    updateDebt() {
      this.updateDebtRecord({
        name: this.debtName,
        current_debt: this.currentDebt,
        debt_limit: this.debtLimit,
        id: this.debt.id,
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
