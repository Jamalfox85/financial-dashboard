<template lang="">
  <div>
    <div class="block-wrapper" @click="showGoalDetailsModal">
      <div class="block-header">
        <h1 class="header-text">{{ goal.savings_name }}</h1>
      </div>
      <div class="block-main">
        <h1 class="current-text">$ {{ goal.current_amount }}</h1>
        <p class="goal-text">of $ {{ goal.goal_amount }}</p>
        <div class="progress-bar">
          <div
            class="progress-bar-progress"
            :style="{
              width: (goal.current_amount / goal.goal_amount) * 100 + '%',
            }"
          ></div>
        </div>
      </div>
    </div>
    <goal-details-modal
      :showModal="isShowingGoalDetailsModal"
      :goal="goal"
      @close="hideGoalDetailsModal"
    />
  </div>
</template>
<script>
import SavingsDataService from "../../../services/SavingsDataService";

import GoalDetailsModal from "../../modals/SavingsDetailsModal.vue";

export default {
  props: ["goal"],
  components: { GoalDetailsModal },
  data() {
    return {
      isShowingGoalDetailsModal: false,
    };
  },
  methods: {
    showGoalDetailsModal() {
      this.isShowingGoalDetailsModal = true;
    },
    hideGoalDetailsModal() {
      this.isShowingGoalDetailsModal = false;
    },
  },
};
</script>
<style lang="scss">
:root {
  --white: #eaeff2;
  --black: #000;
  --dark-green: #77ad78;
  --light-green: #8fd694;
  --dark-accent: #504b43;
}
.block-wrapper {
  height: 140px;
  width: 170px;
  padding: 1em;
  border-radius: 12px;
  background-color: var(--dark-green);
  box-shadow: 8px 16px 16px rgba(0, 0, 0, 0.35);
  transition: 0.15s ease-in;
  .block-header {
    display: flex;
    .header-text {
      font-size: 12px;
      font-weight: bold;
      margin: 0;
      color: var(--white);
    }
  }
  .block-main {
    width: 100%;
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    .current-text {
      align-self: flex-start;
      font-size: 32px;
      color: var(--white);
      text-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
      margin-left: 8px;
    }
    .goal-text {
      align-self: flex-end;
      color: var(--white);
      opacity: 50%;
      margin: 0 8px 4px 0;
    }
    .progress-bar {
      height: 8px;
      width: 100%;
      background-color: var(--white);
      border-radius: 16px;
      .progress-bar-progress {
        height: 100%;
        background-color: var(--light-green);
        border-radius: 16px;
        transition: 0.15s ease-in;
      }
    }
    .progress-text {
      margin-top: 1em;
      font-size: 14px;
    }
  }

  &:hover {
    background-color: var(--light-green);
    transform: scale(1.15);
    cursor: pointer;
    .block-main {
      .progress-bar {
        .progress-bar-progress {
          background-color: var(--dark-green);
        }
      }
    }
  }
}
</style>
