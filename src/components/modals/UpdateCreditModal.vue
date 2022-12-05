<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :prevent-click="true"
  >
    <div class="modal-header">
      <h1>CREDIT DETAILS</h1>
      <font-awesome-icon
        class="closeBttn"
        @click="closeModal()"
        icon="fa-solid fa-rectangle-xmark"
      />
    </div>
    <div class="form-wrapper">
      <form class="flex flex-col text-white">
        <p>Update your current credit score.</p>
        <label for="credit_score" class="flex flex-col mb-5">
          Credit Score
          <input
            id="credit_score"
            name="credit_score"
            type="text"
            v-model="currentScore"
            class="p-2 my-3 rounded-md text-input w-28"
          />
        </label>
        <button type="submit" @click="updateScore()" class="submit-bttn">
          Update Score
        </button>
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
  props: ["showModal", "currentScore"],
  components: { VueFinalModal, ModalsContainer },
  data() {
    return {
      session: sessionDetails,
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
      this.updateCreditScore({
        userId: this.session.user.id,
        creditScore: this.currentScore,
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
}
</style>
