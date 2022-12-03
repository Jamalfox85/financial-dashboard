<template lang="">
  <div class="credit_wrapper">
    <div class="header">
      <h1 class="section-header">CREDIT</h1>
    </div>
    <div class="main" id="chart">
      <apexchart
        type="radialBar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // series: [67],
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
                color: "#eaeff2",
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: "22px",
                color: "#eaeff2",
                formatter: function (val) {
                  return val + " pts";
                },
              },
            },
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ["Credit Score"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        colors: ["#a2d729"],
      },
    };
  },
  setup() {
    let score = 600;
    return {
      series: [score],
    };
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
  .main {
    color: var(--white);
    display: flex;
    flex-direction: column;
    margin-top: 2em;
    .credit-text {
      font-size: 96px;
      text-shadow: 16px 32px 32px rgba(0, 0, 0, 0.4);
    }
    .update-bttn {
      width: 125px;
      height: 35px;
      border-radius: 8px;
      background-color: var(--dark-green);
      text-shadow: 16px 32px 32px rgba(0, 0, 0, 0.4);
      transition: 0.15s ease-in;
      &:hover {
        background-color: var(--light-green);
        cursor: pointer;
      }
    }
  }
}
</style>
