<template lang="">
  <Particles
    id="tsparticles"
    :options="options"
    :particlesInit="particlesInit"
  />
</template>
<script lang="ts">
import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
// import { loadStarsPreset } from "tsparticles-preset-stars";

export default {
  data() {
    options: {
      preset: "stars";
    }
  },
  methods: {
    // async particlesInit(engine: Engine) {
    //   await loadStarsPreset(engine);
    // },
  },
};
</script>
<style lang=""></style>
