<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :prevent-click="true"
  >
    <div class="modal-header">
      <h1>UPDATE CREDIT SCORE</h1>
      <font-awesome-icon
        class="closeBttn"
        @click="closeModal()"
        icon="fa-solid fa-rectangle-xmark"
      />
    </div>
    <div class="form-wrapper">
      <form class="flex flex-col text-white" @submit.prevent="updateScore()">
        <p class="mb-5">Update your current credit score.</p>
        <p class="error-message">{{ errorMessage }}</p>
        <label for="credit_score" class="flex flex-col mb-5">
          Credit Score
          <input
            id="credit_score"
            name="credit_score"
            type="text"
            v-model="currentCreditScore"
            class="p-2 my-3 rounded-md text-input w-28"
          />
        </label>
        <button type="submit" class="submit-bttn">Update Score</button>
      </form>
    </div>
  </vue-final-modal>
</template>
<script>
import { ref } from "vue";
import SavingsDataService from "../../services/SavingsDataService";
import gql from "graphql-tag";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { useMutation } from "@vue/apollo-composable";
import { sessionDetails } from "../../userData";

export default {
  props: ["showModalProp", "currentScore"],
  components: { VueFinalModal, ModalsContainer },
  data() {
    return {
      showModal: this.showModalProp,
      session: sessionDetails,
      errorMessage: null,
      currentCreditScore: this.currentScore,
    };
  },
  setup() {
    const { mutate: updateCreditScore } = useMutation(
      gql`
        mutation ($userId: uuid!, $creditScore: bigint!) {
          update_credit(
            where: { user_id: { _eq: $userId } }
            _set: { credit_score: $creditScore }
          ) {
            returning {
              credit_score
            }
          }
        }
      `
    );
    return {
      updateCreditScore,
    };
  },
  methods: {
    updateScore() {
      let validScore =
        this.currentScore > 300 && this.currentScore < 850 ? true : false;
      if (validScore) {
        this.updateCreditScore({
          userId: this.session.user.id,
          creditScore: this.currentScore,
        });
        this.closeModal();
      } else {
        this.errorMessage =
          "ERROR: Please enter a valid score. Credit scores range from 300 to 850";
      }
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
    &:hover {
      color: rgb(208, 205, 205);
    }
  }
}
.error-message {
  color: #d41b0e;
  margin-bottom: 1em;
}
.text-input {
  color: #342e37;
}

.submit-bttn {
  background: rgb(162, 215, 41);
  background: linear-gradient(
    180deg,
    rgba(162, 215, 41, 1) 0%,
    rgba(70, 215, 32, 1) 70%
  );
  width: 180px;
  height: 50px;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 1em;
  font-size: 1.25em;
}
</style>
