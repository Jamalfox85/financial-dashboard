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
        <FormKit
          type="form"
          id="add-bill-form"
          :classes="{
            outer: 'form-wrapper',
          }"
          submit-label="Add Bill Group"
          @submit="submitBillGroup"
        >
          <p>What is the name of this bill group?</p>
          <FormKit
            type="text"
            name="billGroupName"
            label="Bill Group Name"
            placeholder="15th - 31st"
            validation=""
            help="What is the name of this bill group"
            v-model="billGroupName"
          />
        </FormKit>
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
</style>
