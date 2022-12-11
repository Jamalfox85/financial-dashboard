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
        <form class="flex flex-col text-white" @submit.prevent="submitDebt()">
          <p class="mb-5">
            Enter the details of your debt so we can help you keep track!
          </p>
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
          <label for="debt_amount" class="flex flex-col mb-3"
            >Debt Amount
            <input
              id="debt_amount"
              name="debt_amount"
              type="number"
              placeholder="$2000"
              v-model="debtAmount"
              class="p-2 mb-3 rounded-md text-input w-40"
            />
          </label>
          <label for="debt_limit" class="flex flex-col mb-3"
            >Debt Limit
            <input
              id="debt_limit"
              name="debt_limit"
              type="number"
              placeholder="$4000"
              v-model="debtLimit"
              class="p-2 mb-3 rounded-md text-input w-40"
            />
          </label>
          <button type="submit" class="submit-bttn">Add Bill</button>
        </form>
      </div>
    </vue-final-modal>
  </div>
</template>
<script lang="js">
import DebtDataService from "../../services/DebtDataService";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { useMutation } from "@vue/apollo-composable";
import { sessionDetails } from "../../userData";
import gql from "graphql-tag";

export default {
  components: { VueFinalModal, ModalsContainer },
  props: ["showModal", "debtCategories"],
  data() {
    return {
      debtName: null,
      debtAmount: null,
      debtLimit: null,
      debtCategory: null,
      session: sessionDetails,
    };
  },
  setup() {
    const { mutate: addDebtRecord } = useMutation(gql`
      mutation addDebtRecord(
        $name: String!
        $current_debt: bigint!
        $debt_limit: bigint!
        $userid: uuid!
      ) {
        insert_debts(
          objects: {
            name: $name
            current_debt: $current_debt
            debt_limit: $debt_limit
            userid: $userid
          }
        ) {
          returning {
            id
          }
        }
      }
    `);
    return {
      addDebtRecord,
    };
  },
  methods: {
    submitDebt() {
      this.addDebtRecord({
        name: this.debtName,
        current_debt: this.debtAmount,
        debt_limit: this.debtLimit,
        userid: this.session.user.id,
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
