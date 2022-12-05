<template>
  <div class="modal-overlay-wrapper">
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      :prevent-click="true"
    >
      <div class="modal-header">
        <h1>Add Bill Group</h1>
        <font-awesome-icon
          class="closeBttn"
          @click="closeModal"
          icon="fa-solid fa-rectangle-xmark"
        />
      </div>
      <div class="form-wrapper">
        <form class="flex flex-col text-white">
          <p class="mb-5">What is the name of this bill group?</p>
          <label for="bill_group_name" class="flex flex-col mb-3"
            >Bill Group Name
            <input
              id="bill_group_name"
              name="bill_group_name"
              type="text"
              placeholder="Utilities"
              v-model="billGroupName"
              class="p-2 mb-3 rounded-md text-input w-40"
            />
          </label>
          <button type="submit" @click="submitBill()" class="submit-bttn">
            Add Bill
          </button>
        </form>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { computed, watchEffect } from "vue";
import gql from "graphql-tag";
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";

export default {
  components: { VueFinalModal, ModalsContainer },
  props: ["showModal"],
  data() {
    return {
      billGroupName: null,
    };
  },
  setup() {
    const { mutate: addBillGroupRecord } = useMutation(gql`
      mutation addBillGroupRecord($groupName: String!) {
        insert_bill_groups(
          objects: {
            group_name: $groupName
            user_id: "86b27233-68ec-4ff5-ad2a-0aab04d13ba8"
          }
        ) {
          returning {
            id
          }
        }
      }
    `);
    return {
      addBillGroupRecord,
    };
  },
  methods: {
    submitBillGroup() {
      this.addBillGroupRecord({ groupName: this.billGroupName });
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal", true);
    },
  },
  watch: {
    showModal: {
      handler(newVal, oldVal) {
        this.billGroupName = null;
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
