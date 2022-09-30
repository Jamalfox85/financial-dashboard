<template>
  <div class="modal-overlay-wrapper">
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      :preventClick="true"
    >
      <button class="modal__close" @click="closeModal">X</button>
      <span class="modal__title">Add Debt</span>
      <hr />
      <div class="modal__content">
        <p>Enter details of your Debt Form</p>
        <div class="modal-form">
          <label for="debt-name">
            <span class="label">Debt Name</span>
            <input id="debt-name" v-model="debtName" />
          </label>
          <label for="debt-amount">
            <span class="label">Debt Amount</span>
            <input id="debt-amount" v-model="debtAmount" />
          </label>
          <label for="debt-amount">
            <span class="label">Debt Limit</span>
            <input id="debt-amount" v-model="debtLimit" />
          </label>
          <label for="debt-due-date">
            <span class="label">Debt Category</span>
            <select id="debt-due-date" v-model="debtCategory">
              <option v-for="category in debtCategories">
                {{ category }}
              </option>
            </select>
          </label>
        </div>
      </div>
      <hr />
      <div class="modal__action">
        <button id="closeModal" @click="closeModal">cancel</button>
        <button id="confirmModal" @click="submitDebt">confirm</button>
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
      debtAmount: 0,
      debtLimit: 0,
      debtCategory: null,
    };
  },
  methods: {
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
        this.debtAmount = 0;
        this.debtLimit = 0;
        this.debtCategory = null;
      },
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  width: 600px;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: left;
}
.modal__content {
  flex-grow: 1;
  .modal-form {
    display: flex;
    flex-direction: column;
    label /* Input Group */ {
      margin: 0.5em 0;
      .label /* Input Label Only */ {
        font-weight: bold;
        margin: 0.5em;
      }
      input {
        border: solid 1px black;
        border-radius: 8px;
        padding: 0 1em;
      }
    }
  }
}
.modal__action {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
  #closeModal {
    border: solid 1px black;
    border-radius: 12px;
    padding: 4px 8px;
    margin: 0 0.5em;
  }
  #confirmModal {
    border: solid 1px black;
    border-radius: 12px;
    padding: 4px 8px;
    margin: 0 0.5em;
  }
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div.modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
