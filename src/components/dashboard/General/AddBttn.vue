<template lang="">
  <div class="add-button">
    <font-awesome-icon class="icon" icon="fa-solid fa-plus" />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
:root {
  --white: #eaeff2;
  --dark-green: #77ad78;
}
.add-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
  height: 30px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: var(--dark-green);
  color: var(--white);
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.25);
  .icon {
    height: 20px;
  }
}
</style>
