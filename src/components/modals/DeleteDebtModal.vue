<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :prevent-click="true"
  >
    <div class="modal-header">
      <h1>Delete Debt</h1>
      <font-awesome-icon
        class="closeBttn"
        @click="closeModal"
        icon="fa-solid fa-rectangle-xmark"
      />
    </div>
    <div class="form-wrapper">
      <form class="flex flex-col text-white" @submit.prevent="deleteDebt()">
        <p class="mb-5">Are you sure you want to delete this debt?</p>
        <button type="submit" class="submit-bttn">Delete Debt</button>
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
    };
  },
  setup() {
    const { mutate: DELETE_DEBT } = useMutation(gql`
      mutation DELETE_DEBT($id: uuid!) {
        delete_debts(where: { id: { _eq: $id } }) {
          returning {
            id
          }
        }
      }
    `);
    return {
      DELETE_DEBT,
    };
  },
  methods: {
    deleteDebt() {
      console.log("DEBT: ", this.debt);
      this.DELETE_DEBT({ id: this.debt.id });
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
  background-color: #e3170a;
  padding: 8px 4px;
  width: 140px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 1em;
  &:hover {
    background-color: #b81206;
  }
}
</style>
