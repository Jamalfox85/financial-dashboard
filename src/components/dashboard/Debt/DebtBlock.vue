<template lang="">
  <div>
    <div class="debt_block_wrapper">
      <div class="block-header">
        <h1 class="header-text">{{ debt.name }}</h1>
        <div tabindex="0" @focusout="dropdownActive = false">
          <font-awesome-icon
            class="ellipses-icon"
            icon="fa-solid fa-ellipsis"
            @click="toggleDropdownMenu"
          />
          <div class="details-dropdown-menu" v-if="dropdownActive">
            <p class="dropdown-option" @click="editDebt()">Edit Debt</p>
            <p class="dropdown-option" @click="deleteDebt()">Delete Debt</p>
          </div>
        </div>
      </div>
      <div class="block-main">
        <p class="goal-text">of $ {{ debt.debt_limit }}</p>
        <div class="progress-bar">
          <div
            class="progress-bar-progress"
            :style="{
              width: (debt.current_debt / debt.debt_limit) * 100 + '%',
            }"
          >
            <p class="current-text">$ {{ debt.current_debt }}</p>
          </div>
        </div>
      </div>
    </div>
    <edit-debt-modal
      :debt="debt"
      :showModal="editModalActive"
      @close="hideEditModal"
    />
    <delete-debt-modal
      :showModal="deleteModalActive"
      :debt="debt"
      @close="hideDeleteModal"
    />
  </div>
</template>
<script>
import EditDebtModal from "../../modals/EditDebtModal.vue";
import DeleteDebtModal from "../../modals/DeleteDebtModal.vue";

export default {
  props: ["debt"],
  components: { EditDebtModal, DeleteDebtModal },
  data() {
    return {
      dropdownActive: false,
      editModalActive: false,
      deleteModalActive: false,
      isShowingAddDebtModal: false,
    };
  },
  computed: {
    getPaymentProgress() {
      let color;
      let width = Math.floor(
        (this.debt.debt_amount / this.debt.debt_limit) * 100
      );
      if (width > 70) {
        color = "red";
      } else if (width < 30) {
        color = "green";
      } else {
        color = "yellow";
      }
      return {
        width: width + "%",
        color: color,
      };
    },
  },
  methods: {
    toggleDropdownMenu() {
      this.dropdownActive = !this.dropdownActive;
    },
    editDebt() {
      this.dropdownActive = false;
      this.editModalActive = true;
    },
    deleteDebt() {
      this.dropdownActive = false;
      this.deleteModalActive = true;
    },
    hideEditModal() {
      this.editModalActive = false;
    },
    hideDeleteModal() {
      this.deleteModalActive = false;
    },
  },
};
</script>
<style lang="scss">
:root {
  --white: #eaeff2;
  --black: #000;
  --darker-green: #6f8f72;
  --dark-green: #77ad78;
  --light-green: #8fd694;
  --dark-accent: #504b43;
  --dark-red: #b61408;
  --red: #e3170a;
}
.debt_block_wrapper {
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  border: solid 1px #fff;
  box-shadow: 8px 16px 16px rgba(0, 0, 0, 0.35);
  transition: 0.15s ease-in;
  color: #fff;
  position: relative;
  .block-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
    .header-text {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
      letter-spacing: 4px;
    }
    .ellipses-icon {
      font-size: 1.5em;
      cursor: pointer;
      &:hover {
        color: rgb(201, 201, 201);
        transition: 0.1s ease-in-out;
      }
    }
    .details-dropdown-menu {
      position: absolute;
      right: 0;
      background-color: #79971d;
      width: 100px;
      border-radius: 8px;
      font-size: 0.8em;
      overflow: hidden;
      z-index: 2;
      .dropdown-option {
        padding: 4px 8px;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        &:hover {
          background-color: #a2d729;
        }
      }
    }
  }
  .block-main {
    width: 100%;
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    text-align: center;
    .goal-text {
      margin: 0 8px 4px 0;
      align-self: flex-end;
    }
    .progress-bar {
      height: 1.5em;
      width: 100%;
      border-radius: 16px;
      border: solid 2px #e3170a;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .progress-bar-progress {
        height: 100%;
        background: #e3170a;
        background: linear-gradient(90deg, #e3170a 0%, #9f0f07 85%);
        border-radius: 16px;
        transition: 0.15s ease-in;
        display: flex;
        align-items: center;
        justify-content: center;
        .current-text {
          font-size: 14px;
          position: absolute;
          width: 100%;
          text-shadow: 1px 1px 2px rgb(58, 57, 57);
        }
      }
    }
    .progress-text {
      margin-top: 1em;
      font-size: 14px;
    }
  }
}
</style>
