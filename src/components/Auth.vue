<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const loading = ref(false);
const email = ref("");

/* logInType 0 = Sign Up, LogInType = 1 = Log In */
let logInType = ref(1);

const switchLogInType = () => {
  logInType.value = logInType.value == 0 ? 1 : 0;
};

const handleLogin = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "testemail@email.com",
      password: "test123",
    });
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};

const handleSignup = async () => {
  try {
    // Use the Supabase provided method to handle the signup
    const { error } = await supabase.auth.signUp({
      // email: email.value,
      // password: password.value,
      email: "testemail@email.com",
      password: "test123",
    });
    if (error) throw error;
  } catch (error) {
    alert(error.error_description || error.message);
  }
};
</script>

<template>
  <!-- <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
        <input
          type="submit"
          class="button block"
          :value="'Sign Up'"
          :disabled="loading"
          @click="handleSignup"
        />
      </div>
    </div>
  </form> -->
  <div class="auth_wrapper">
    <!-- Sign Up -->
    <div class="auth_main_content" v-if="logInType === 0">
      <div class="auth_type_text">
        <h2>Sign Up</h2>
        <h3>
          Already have an account?
          <button @click="switchLogInType" class="switch-login-type">
            Log In Here</button
          >.
        </h3>
      </div>
      <form class="form-content" @submit.prevent="handleSignup">
        <label class="form-label">Email</label>
        <input class="form-input" type="text" />
        <label class="form-label">Password</label>
        <input class="form-input" type="text" />
        <button class="auth-bttn" type="submit">Submit</button>
      </form>
      <div class="alternative-login-options">
        <img class="alternative-login-img" src="../assets/icons/github.png" />
        <img class="alternative-login-img" src="../assets/icons/apple.png" />
        <img class="alternative-login-img" src="../assets/icons/google.png" />
      </div>
      <img
        class="auth-login-image"
        src="../assets/images/undraw_credit_card_re_blml.png"
      />
    </div>

    <!-- Log In -->
    <div class="auth_main_content" v-if="logInType === 1">
      <div class="auth_type_text">
        <h2>Log In</h2>
        <h3>
          New to Tauro Finance?
          <button @click="switchLogInType" class="switch-login-type">
            Create an Account Here</button
          >.
        </h3>
      </div>
      <form class="form-content" @submit.prevent="handleLogin">
        <label class="form-label">Email</label>
        <input class="form-input" type="text" />
        <label class="form-label">Password</label>
        <input class="form-input" type="text" />
        <button class="auth-bttn" type="submit">Submit</button>
      </form>
      <div class="alternative-login-options">
        <img class="alternative-login-img" src="../assets/icons/github.png" />
        <img class="alternative-login-img" src="../assets/icons/apple.png" />
        <img class="alternative-login-img" src="../assets/icons/google.png" />
      </div>
      <img
        class="auth-login-image"
        src="../assets/images/undraw_credit_card_re_blml.png"
      />
    </div>
    <div class="auth_side_content">
      <h1 class="main-auth-text">Welcome to Tauro Finance</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth_wrapper {
  display: flex;
  background-color: #342e37;
  color: #fff;
  height: 100vh;
  width: 100%;
  padding: 2em 0;
  .auth_main_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
    border: solid 2px #a2d729;
    width: 70%;
    border-radius: 0 24px 24px 0;
    padding: 2em 10vw;
    position: relative;
    .auth_type_text {
      margin-bottom: 2em;
      h2 {
        font-size: 36px;
      }
      .switch-login-type {
        color: #a2d729;
      }
    }
    .form-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 24px;

      .form-label {
        letter-spacing: 4px;
        margin-bottom: 1em;
      }
      .form-input {
        border-radius: 24px;
        border: solid 1px #a2d729;
        background-color: rgba(255, 255, 255, 0.1);
        width: 400px;
        margin-bottom: 3em;
      }
      .auth-bttn {
        background-color: #a2d729;
        width: 150px;
        border-radius: 24px;
      }
    }
    .alternative-login-options {
      display: flex;
      margin-top: 6em;
      .alternative-login-img {
        margin-right: 2em;
      }
    }
    .auth-login-image {
      position: absolute;
      bottom: 4em;
      right: -7em;
      transform: rotate(-15deg);
      width: 50%;
    }
  }
  .auth_side_content {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    .main-auth-text {
      font-size: 48px;
      width: 350px;
    }
  }
}
</style>
