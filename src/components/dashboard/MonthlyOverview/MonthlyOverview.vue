<template lang="">
  <div class="monthly-overview-wrapper">
    <div class="section-header flex justify-between items-center">
      <h2 class="text-2xl">Expenses</h2>
      <font-awesome-icon
        class="text-2xl"
        icon="fa-solid fa-triangle-exclamation"
      />
    </div>
    <div class="section-main">
      <div class="total-income">
        <div class="income-line"></div>
        <p class="absolute">$4,200</p>
      </div>
      <div class="bill-group rounded-lg p-3">
        <div class="header flex justify-between items-center">
          <h3 class="text-lg">Check #1</h3>
          <font-awesome-icon
            class="text-lg"
            icon="fa-solid fa-triangle-exclamation"
          />
        </div>
        <div class="bill-group-subtotal">
          <h3>$400</h3>
        </div>
      </div>
      <!-- <div class="timeline-entries">
        <div
          v-for="(entry, index) in timelineEntries"
          class="timeline-entry"
          :style="getEntryStyles(entry, index)"
        >
          <font-awesome-icon
            class="income-icon"
            icon="fa-solid fa-dollar-sign"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import IncomesDataService from "../../../services/IncomeDataService";
import BillsDataService from "../../../services/BillsDataService";

export default {
  data() {
    return {
      timelineEntries: [],
    };
  },
  computed: {},
  methods: {
    getEntryStyles(entry, index) {
      let left: String = index % 2 ? "100%" : "-100%";

      return {
        left: left,
        color: "#fff",
        fontSize: "20px",
      };
    },
  },
  mounted() {
    BillsDataService.getAll().then((res) => {
      this.timelineEntries = [...this.timelineEntries, ...res.data];
    });

    IncomesDataService.getAll().then((res) => {
      this.timelineEntries = [...this.timelineEntries, ...res.data];
    });
  },
};
</script>
<style lang="scss" scoped>
.monthly-overview-wrapper {
  box-shadow: 2px 2px 8px #fff;
  min-height: 80vh;
  .section-header {
    color: #342e37;
    margin-bottom: 2em;
    text-align: left;
  }
  .section-main {
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    position: relative;
    .total-income {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 1.5em;
      .income-line {
        border: solid 1px #a2d729;
        height: 2px;
        width: 100%;
      }
      p {
        background-color: #fff;
        padding: 0 1.5em;
        color: #a2d729;
      }
    }
    .bill-group {
      border: solid 1px #3c91e6;
      min-height: 150px;
      width: 100%;
    }
    .timeline-entries {
      display: flex;
      flex-direction: column;
      margin-top: 12px;
      .timeline-entry {
        height: 20px;
        width: 40px;
        border: solid 2px white;
        position: relative;
        margin: 4px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
