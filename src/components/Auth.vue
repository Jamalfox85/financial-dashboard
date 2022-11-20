<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "fox.jamal@outlook.com",
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
      email: "fox.jamal@outlook.com",
      password: "test123",
    });
    if (error) throw error;
  } catch (error) {
    alert(error.error_description || error.message);
  }
};
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
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
  </form>
</template>
