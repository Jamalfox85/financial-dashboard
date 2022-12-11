<template lang="">
  <div>
    <div class="block-wrapper">
      <div class="block-header">
        <h1 class="header-text">{{ goal.name }}</h1>
        <div tabindex="0" @focusout="dropdownActive = false">
          <font-awesome-icon
            class="ellipses-icon"
            icon="fa-solid fa-ellipsis"
            @click="toggleDropdownMenu"
          />
          <div class="details-dropdown-menu" v-if="dropdownActive">
            <p class="dropdown-option" @click="editGoal()">Edit Goal</p>
            <p class="dropdown-option" @click="deleteGoal()">Delete Goal</p>
          </div>
        </div>
      </div>
      <div class="block-main">
        <p class="goal-text">of $ {{ goal.goal_amount }}</p>
        <div class="progress-bar">
          <div
            class="progress-bar-progress"
            :style="{
              width: (goal.current_amount / goal.goal_amount) * 100 + '%',
            }"
          ></div>
          <p class="current-text">$ {{ goal.current_amount }}</p>
        </div>
      </div>
    </div>
    <edit-savings-modal
      :showModal="editModalActive"
      :goal="goal"
      @close="hideEditModal"
    />
    <delete-savings-modal
      :showModal="deleteModalActive"
      :goal="goal"
      @close="hideDeleteModal"
    />
  </div>
</template>
<script>
import EditSavingsModal from "../../modals/EditSavingsModal.vue";
import DeleteSavingsModal from "../../modals/DeleteSavingsModal.vue";

export default {
  components: { EditSavingsModal, DeleteSavingsModal },
  props: ["goal"],
  data() {
    return {
      dropdownActive: false,
      editModalActive: false,
      deleteModalActive: false,
    };
  },
  methods: {
    toggleDropdownMenu() {
      this.dropdownActive = !this.dropdownActive;
    },
    editGoal() {
      this.dropdownActive = false;
      this.editModalActive = true;
    },
    deleteGoal() {
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
.block-wrapper {
  width: 250px;
  padding: 8px;
  margin-right: 1em;
  border-radius: 12px;
  border: solid 1px #a2d729;
  box-shadow: 8px 16px 16px rgba(0, 0, 0, 0.35);
  transition: 0.15s ease-in;
  color: #fff;
  .block-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
    position: relative;
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
      border: solid 2px #a2d729;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .progress-bar-progress {
        height: 100%;
        background: rgb(162, 215, 41);
        background: linear-gradient(
          90deg,
          rgba(162, 215, 41, 1) 0%,
          rgba(70, 215, 32, 1) 70%
        );
        border-radius: 16px;
        transition: 0.15s ease-in;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #504b43;
      }
      .current-text {
        font-size: 14px;
        position: absolute;
        width: 100%;
        text-shadow: 1px 1px 2px rgb(58, 57, 57);
      }
    }
    .progress-text {
      margin-top: 1em;
      font-size: 14px;
    }
  }
}
</style>
