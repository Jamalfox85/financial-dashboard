<template lang="">
  <div class="credit_wrapper">
    <div class="header">
      <h1 class="header-text">Credit</h1>
    </div>
    <div class="main">
      <h1 class="credit-text">679</h1>
      <button class="update-bttn">Update</button>
    </div>
  </div>
</template>
<script>
export default {};
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
    h1 {
      position: relative;
      z-index: 2;
      font-size: 24px;
      font-weight: bold;
      color: var(--white);
      &:after {
        content: "Credit";
        position: absolute;
        top: 2px;
        right: 2px;
        height: 100%;
        width: 100%;
        z-index: -1;
        -webkit-text-stroke: 1px var(--dark-green);
        color: transparent;
      }
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
