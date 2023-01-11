<template>
  <div class="sidebar-wrapper">
    <div class="logo">
      <h1>Tauro Finance</h1>
    </div>
    <div class="portrait-group">
      <img src="../../assets/images/portrait.jpeg" />
    </div>
    <div class="nav-links">
      <nav>
        <h2 class="nav-link">
          <font-awesome-icon
            class="nav-link-icon"
            icon="fa-solid fa-house"
          />Dashboard
        </h2>
        <h2 class="nav-link">
          <font-awesome-icon
            class="nav-link-icon"
            icon="fa-solid fa-wallet"
          />Spending
        </h2>
        <h2 class="nav-link">
          <font-awesome-icon
            class="nav-link-icon"
            icon="fa-brands fa-cc-discover"
          />Credit Report
        </h2>
        <h2 class="nav-link">
          <font-awesome-icon
            class="nav-link-icon"
            icon="fa-solid fa-calendar"
          />Schedule
        </h2>
      </nav>
    </div>
    <div class="profile-group">
      <!-- <button class="button block profile-option" :disabled="loading">
        <font-awesome-icon class="nav-link-icon" icon="fa-solid fa-user" />Edit
        Profile
      </button> -->
      <button
        class="button block profile-option"
        @click="signOut"
        :disabled="loading"
      >
        <font-awesome-icon
          class="nav-link-icon"
          icon="fa-solid fa-arrow-right-from-bracket"
        />
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "../../supabase";
import { onMounted, ref, toRefs } from "vue";

const props = defineProps(["session"]);
const { session } = toRefs(props);

const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_url = ref("");

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    const { user } = session.value;
    if (error && status !== 406) throw error;
  } catch (error) {
    // alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    // alert(error.message);
  } finally {
    loading.value = false;
  }
}
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
  height: auto;
  width: 250px;
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-radius: 12px;
  color: #edf2ef;
  border: solid 2px #a2d729;
  background: rgb(162, 215, 41);
  background: linear-gradient(
    180deg,
    rgba(162, 215, 41, 1) 0%,
    rgba(70, 215, 32, 1) 70%
  );
  .logo {
    font-size: 1.5em;
    margin-bottom: 2em;
  }
  .portrait-group {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2em;
    img {
      width: 75%;
      border-radius: 50%;
    }
  }
  .nav-links,
  .profile-group {
    .nav-link,
    .profile-option {
      font-size: 1.25em;
      margin-bottom: 12px;
      padding: 0.5em;
      transition: 0.1s ease-in-out;
      border-radius: 8px;
      .nav-link-icon {
        margin-right: 0.75em;
      }
      &:hover {
        background-color: #79971d;
        cursor: pointer;
      }
    }
  }
  .profile-group {
    position: relative;
    margin-top: auto;
    button {
      background-color: #342e37;
      width: 100%;
      text-align: left;
    }
  }
}

@media screen and (max-width: 700px) {
  .sidebar-wrapper {
    flex-direction: row;
    flex-wrap: wrap;
    .portrait-group {
      display: none;
    }
    .nav-links nav {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      .nav-link {
        width: 50%;
      }
    }
    .profile-group {
      display: flex;
      width: 100%;
      button {
        margin: 0.5em;
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .nav-links nav {
    .nav-link {
      width: 100% !important;
    }
  }
  .profile-group {
    flex-wrap: wrap;
    button {
      width: 100%;
    }
  }
}
</style>
