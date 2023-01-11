<script setup>
import { form } from "@formkit/inputs";
import { ref } from "vue";
import { supabase } from "../supabase";

const loading = ref(false);
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const formErrorMessage = ref("");

/* logInType 0 = Sign Up, LogInType = 1 = Log In */
let logInType = ref(0);

const switchLogInType = () => {
  formErrorMessage.value = "";
  logInType.value = logInType.value == 0 ? 1 : 0;
};

const handleLogin = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
  } catch (error) {
    formErrorMessage.value = "Password is incorrect!";
  } finally {
    loading.value = false;
  }
};

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    formErrorMessage.value = "Passwords do not match!";
    return;
  } else {
    try {
      // Use the Supabase provided method to handle the signup
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      if (!error) {
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
      }
      alert("Account created successfully! Check your email to confirm.");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }
};

const handleFormSubmit = () => {
  formErrorMessage.value = "";
  if (logInType.value === 0) {
    handleSignup();
  } else {
    handleLogin();
  }
};
</script>

<template>
  <div class="auth_wrapper">
    <div class="side-content">
      <p class="logo">Tauro</p>
      <div class="main-text">
        <h1 class="main-auth-text">Welcome to Tauro Finance.</h1>
        <h2 class="secondary-auth-text">
          Its time to take back control of your financial future.
        </h2>
      </div>
      <img
        class="auth-login-image"
        src="../assets/images/undraw_credit_card_re_blml.png"
      />
    </div>
    <div class="form-content">
      <!-- Sign Up Header -->
      <div class="form-header" v-if="logInType === 0">
        <h1 class="form-header-text">Sign Up</h1>
        <h2 class="form-subheader-text">
          Already have an account?
          <button @click="switchLogInType" class="switch-login-type">
            Log In Here!
          </button>
        </h2>
      </div>
      <!-- Log In Header -->
      <div class="form-header" v-if="logInType === 1">
        <h1 class="form-header-text">Log In</h1>
        <h2 class="form-subheader-text">
          Don't have an account?
          <button @click="switchLogInType" class="switch-login-type">
            Sign Up Here!
          </button>
        </h2>
      </div>
      <div class="form-wrapper">
        <p class="form-error-message">{{ formErrorMessage }}</p>
        <form class="form-main" @submit.prevent="handleFormSubmit">
          <div class="user-name" v-if="logInType === 0">
            <label for="firstName" class="input-label">
              First Name
              <input
                class="form-input"
                type="text"
                v-model="firstName"
                id="firstName"
                name="firstName"
                :required="logInType === 0"
              />
            </label>
            <label for="lastName" class="input-label">
              Last Name
              <input
                class="form-input"
                type="text"
                v-model="lastName"
                id="lastName"
                name="lastName"
                :required="logInType === 0"
              />
            </label>
          </div>
          <label for="email" class="input-label">
            Email
            <input
              class="form-input"
              type="email"
              v-model="email"
              id="email"
              name="email"
              required
            />
          </label>
          <label for="password" class="input-label">
            Password
            <input
              class="form-input"
              type="password"
              v-model="password"
              id="password"
              name="password"
              required
            />
          </label>
          <label
            for="confirmPassword"
            class="input-label"
            v-if="logInType === 0"
          >
            Confirm Password
            <input
              class="form-input"
              type="password"
              v-model="confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              :required="logInType === 0"
            />
          </label>
          <button class="auth-submit-bttn" type="submit">
            {{ logInType === 0 ? "Create an Account" : "Log In" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth_wrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
  padding: 2em;
  .side-content {
    border: solid 2px #a2d729;
    background: rgb(162, 215, 41);
    background: linear-gradient(
      0deg,
      rgba(162, 215, 41, 1) 0%,
      rgba(70, 215, 32, 1) 70%
    );
    border-radius: 12px;
    width: 450px;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .logo {
      font-size: 24px;
    }
    .main-text {
      .main-auth-text {
        font-size: 48px;
        margin-bottom: 12px;
      }
      .secondary-auth-text {
        font-size: 24px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
          sans-serif;
        font-weight: lighter;
      }
    }
  }
  .form-content {
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .form-header {
      margin-bottom: 4em;
      .form-header-text {
        font-size: 46px;
      }
      .switch-login-type {
        color: #a2d729;
        transition: 0.05s ease-in;
        position: absolute;
        margin-left: 4px;
        &:hover {
          color: #46d729;
          font-size: 1.1em;
        }
      }
    }
    .form-wrapper {
      .form-error-message {
        color: #d7c929;
      }
      .form-main {
        max-width: 500px;
        margin-top: 1em;
        .user-name {
          display: flex;
          justify-content: space-between;
          .input-label input {
            width: 100%;
          }
        }
        .input-label {
          color: #fff;
          display: flex;
          flex-direction: column;
          margin: 0 1em 1em 0;
          font-size: 20px;
          input {
            width: 100%;
            margin-top: 8px;
            border-radius: 8px;
            background-color: transparent;
            border: solid 1px #fff;
            padding: 8px 24px;
          }
        }
      }
      .auth-submit-bttn {
        margin-top: 2em;
        padding: 0.5em 1em;
        font-size: 24px;
        border-radius: 8px;
        background: rgb(162, 215, 41);
        background: linear-gradient(
          180deg,
          rgba(162, 215, 41, 1) 0%,
          rgba(70, 215, 32, 1) 70%
        );
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .auth_wrapper {
    flex-direction: column;
    .side-content {
      width: 100%;
      margin-bottom: 1em;
      .main-text {
        .main-auth-text {
          font-size: 32px;
          margin-bottom: 8px;
        }
        .secondary-auth-text {
          font-size: 16px;
        }
      }
      .auth-login-image {
        display: none;
      }
    }
  }
  .form-content {
    justify-content: space-evenly !important;
    padding: 0 !important;
  }
}
</style>
