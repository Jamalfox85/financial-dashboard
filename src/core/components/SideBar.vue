<template>
  <div class="sidebar-wrapper">
    <div class="logo">
      <h1>Financial Dashboard</h1>
    </div>
    <div class="profile-group">
      <div class="portrait-group">
        <div class="outer-ring"></div>
        <div class="inner-ring"></div>
        <div class="portrait"></div>
      </div>
      <div class="icon-group">
        <font-awesome-icon class="icon" icon="fa-solid fa-play" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss">
/* This page has an image with complex relative path - Portrait */
:root {
  --black: #000;
  --dark-green: #77ad78;
  --light-green: #8fd694;
  --active-green: #8fd694;
}
.sidebar-wrapper {
  position: relative;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
  border-radius: 12px;
  color: #edf2ef;
  background-color: var(--dark-green);
  .logo {
    position: relative;
    display: flex;
    align-items: center;
    h1 {
      font-size: clamp(24px, 4vw, 36px);
      margin-left: 4px;
      position: relative;
      z-index: 2;
    }
    h1:after {
      content: "Financial Dashboard";
      position: absolute;
      top: 2px;
      right: 2px;
      height: 100%;
      width: 100%;
      z-index: -1;
      -webkit-text-stroke: 2px var(--black);
      color: transparent;
    }
  }
  .profile-group {
    position: relative;
    display: flex;
    align-items: center;
    .portrait-group {
      position: relative;
      height: 90px;
      width: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 1em;
      .outer-ring {
        position: absolute;
        height: 100%;
        width: 100%;
        border: solid 1px var(--light-green);
        border-radius: 50%;
        transition: 0.1s ease-in-out;
      }
      .inner-ring {
        position: absolute;
        height: 85%;
        width: 85%;
        border: solid 4px var(--light-green);
        border-radius: 50%;
        transition: 0.1s ease-in-out;
      }
      .portrait {
        position: absolute;
        height: 65%;
        width: 65%;
        border-radius: 50%;
        background-image: url("../../assets/images/portrait.jpeg");
        background-size: cover;
        transition: 0.3 ease-in-out;
      }
    }
    .icon-group {
      position: relative;
      height: 20px;
      width: 20px;
      transform: rotate(90deg);
      .icon {
        position: absolute;
      }
    }
    /* Hover State */
    &:hover {
      cursor: pointer;
      .outer-ring {
        animation: outer-ring-animation 1s infinite;
      }
      .inner-ring {
        animation: inner-ring-animation 1s infinite;
      }
      .icon-group .icon {
        animation: arrow-animation 0.8s infinite;
      }
    }
  }
}

@keyframes arrow-animation {
  /* Why margin-left? - Element is being rotated 90deg */
  0% {
    margin-left: 0px;
  }
  50% {
    margin-left: 5px;
  }
  100% {
    margin-left: 0px;
  }
}

@keyframes inner-ring-animation {
  0% {
    height: 85%;
    width: 85%;
  }
  50% {
    height: 100%;
    width: 100%;
  }
  100% {
    height: 85%;
    width: 85%;
  }
}
@keyframes outer-ring-animation {
  0% {
    height: 100%;
    width: 100%;
  }
  50% {
    height: 75%;
    width: 75%;
  }
  100% {
    height: 100%;
    width: 100%;
  }
}
</style>
