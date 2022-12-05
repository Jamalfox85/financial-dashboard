<template lang="">
  <div :style="{ width: '100%' }">
    <div class="block-wrapper">
      <div class="block-header">
        <h1 class="header-text">{{ goal.name }}</h1>
        <font-awesome-icon
          class="ellipses-icon"
          icon="fa-solid fa-ellipsis"
          @click="showGoalDetailsModal"
        />
      </div>
      <div class="block-main">
        <p class="goal-text">of $ {{ goal.goal_amount }}</p>
        <div class="progress-bar">
          <div
            class="progress-bar-progress"
            :style="{
              width: (goal.current_amount / goal.goal_amount) * 100 + '%',
            }"
          >
            <p class="current-text">$ {{ goal.current_amount }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <goal-details-modal
      :showModal="isShowingGoalDetailsModal"
      :goal="goal"
      @close="hideGoalDetailsModal"
    /> -->
  </div>
</template>
<script>
import SavingsDataService from "../../../services/SavingsDataService";

// import GoalDetailsModal from "../../modals/SavingsDetailsModal.vue";

export default {
  props: ["goal"],
  components: {},
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
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  border: solid 1px #a2d729;
  box-shadow: 8px 16px 16px rgba(0, 0, 0, 0.35);
  transition: 0.15s ease-in;
  // background: linear-gradient(transparent 50%, #a2d729 50%);
  .block-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
    .header-text {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
      color: var(--white);
      letter-spacing: 4px;
    }
    .ellipses-icon {
      color: white;
      font-size: 1.5em;
    }
  }
  .block-main {
    width: 100%;
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    text-align: center;
    .goal-text {
      color: #fff;
      margin: 0 8px 4px 0;
      align-self: flex-end;
    }
    .progress-bar {
      height: 1.5em;
      width: 100%;
      border-radius: 16px;
      border: solid 2px #a2d729;
      overflow: hidden;
      .progress-bar-progress {
        height: 100%;
        background-color: #a2d729;
        border-radius: 16px;
        transition: 0.15s ease-in;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #504b43;
        .current-text {
          font-size: 14px;
          margin-left: 8px;
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
