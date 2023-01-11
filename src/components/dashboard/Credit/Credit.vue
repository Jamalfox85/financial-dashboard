<template lang="">
  <div class="credit_wrapper">
    <div class="header">
      <h1 class="section-header">CREDIT SCORE</h1>
    </div>
    <div class="credit-main" id="chart">
      <apexchart
        v-if="creditScore"
        type="radialBar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <button @click="showModal" class="update-score-bttn">Update Score</button>
    </div>
    <update-credit-modal
      :showModalProp="displayModal"
      :currentScore="creditScore"
      @close="hideModal"
    />
  </div>
</template>
<script>
import { sessionDetails } from "../../../userData";
import { computed, watchEffect, reactive } from "vue";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";
import UpdateCreditModal from "../../modals/UpdateCreditModal.vue";

const GET_CREDIT_SCORE = gql`
  query ($userId: uuid!) {
    credit(where: { user_id: { _eq: $userId } }) {
      credit_score
    }
  }
`;

export default {
  components: { UpdateCreditModal },
  data() {
    return {
      session: sessionDetails,
      displayModal: false,
      creditScore: null,
      series: [30],
      chartOptions: {
        chart: {
          height: 350,
          type: "radialBar",
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -115,
            endAngle: 115,
            dataLabels: {
              name: {
                fontSize: "16px",
                color: "",
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: "36px",
                color: "#a2d729",
                formatter: function (val) {
                  /* Reverse operations used to calculate Series from Credit Score */
                  let newVal = Math.ceil((val * 900) / 100);
                  return newVal + " pts";
                },
              },
            },
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ["Credit Score"],
        colors: ["#a2d729"],
      },
    };
  },
  methods: {
    showModal() {
      this.displayModal = true;
    },
    hideModal() {
      this.displayModal = false;
    },
  },
  mounted() {
    const variables = reactive({
      userId: this.session.user.id,
    });
    const { result } = useQuery(GET_CREDIT_SCORE, variables);
    const creditData = computed(() => result.value?.credit ?? []);
    watchEffect(() => {
      const creditScore = creditData.value[0]?.credit_score;
      let chartPercentage = (creditScore / 900) * 100;
      this.creditScore = creditScore;
      this.series = [chartPercentage];
    });
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
.credit_wrapper {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
    width: 100%;

    .section-header {
      position: relative;
      z-index: 2;
      font-size: 24px;
      font-weight: bold;
      color: var(--white);
      letter-spacing: 8px;
    }
    .add-savings-icon {
      color: #a2d729;
      font-size: 2em;
    }
  }
  .credit-main {
    color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2em;
    .credit-text {
      font-size: 96px;
      text-shadow: 16px 32px 32px rgba(0, 0, 0, 0.4);
    }
    .update-score-bttn {
      width: 180px;
      height: 50px;
      font-size: 1.25em;
      border-radius: 8px;
      background-color: #a2d729;
      text-shadow: 16px 32px 32px rgba(0, 0, 0, 0.4);
      transition: 0.15s ease-in;
      background: rgb(162, 215, 41);
      background: linear-gradient(
        180deg,
        rgba(162, 215, 41, 1) 0%,
        rgba(70, 215, 32, 1) 70%
      );
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
