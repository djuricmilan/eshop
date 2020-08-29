<template>
  <div>
    <v-card>
      <v-card-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form">
          <v-text-field
            :rules="$utility.notEmptyRule('Username')"
            required
            outlined
            clearable
            v-model="user.username"
            label="Username"
          ></v-text-field>
          <v-text-field
            :rules="$utility.notEmptyRule('Password')"
            required
            outlined
            clearable
            v-model="user.password"
            label="Password"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center mt-n5">
        <v-btn
          :disabled="!isFormValid"
          @click="loginEvent"
          color="primary"
          v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
        >
          Submit
        </v-btn>

        <v-btn
          @click="resetEvent"
          color="secondary"
          v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
        >
          Reset
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="snackbarError"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'LoginForm',
  data: () => {
    return {
      snackbar: false,
      timeout: 5000,
      snackbarText: '',

      isFormValid: false,
      user: {
        username: '',
        password: ''
      }
    };
  },

  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    loginEvent(){
      this.login(this.user).then(
        () => {
          this.$router.push({name: 'Home'});
        },
        (message) => {
          this.snackbarText = message;
          this.snackbar = true;
        }
      );
    },
    resetEvent(){
      this.$refs.form.reset();
    }
  }
}
</script>

<style>

</style>