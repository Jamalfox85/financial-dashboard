<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :prevent-click="true"
  >
    <div class="modal-header">
      <h1>Delete Bill</h1>
      <font-awesome-icon
        class="closeBttn"
        @click="closeModal"
        icon="fa-solid fa-rectangle-xmark"
      />
    </div>
    <div class="form-wrapper">
      <form class="flex flex-col text-white" @submit.prevent="deleteBill()">
        <p class="mb-5">
          Are you sure you want to delete this bill? All data associated with
          this bill will also be erased.
        </p>
        <button type="submit" class="submit-bttn">Delete Bill</button>
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
  props: ["showModal", "savingsGoal", "bill"],
  components: { VueFinalModal, ModalsContainer },

  setup() {
    const { mutate: DELETE_BILL } = useMutation(gql`
      mutation DELETE_BILL($id: uuid!) {
        delete_bills(where: { id: { _eq: $id } }) {
          returning {
            id
          }
        }
      }
    `);
    return {
      DELETE_BILL,
    };
  },
  methods: {
    deleteBill() {
      this.DELETE_BILL({ id: this.bill.id });
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
    transition: 0.1s ease-in;
    &:hover {
      color: rgb(175, 175, 175);
    }
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
