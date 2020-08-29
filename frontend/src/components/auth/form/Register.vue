<template>
  <div>
    <v-card>
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-form
          v-model="isFormValid"
          ref="form"
        >
          <v-text-field
            :rules="[...$utility.notEmptyRule('Username'), ...$utility.doesNotContain(takenUsernames, 'username')]"
            required
            outlined
            clearable
            v-model="newEntity.username"
            label="Username"
          ></v-text-field>
          <v-text-field
            :rules="$utility.notEmptyRule('Password')"
            required
            outlined
            clearable
            v-model="newEntity.password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            :rules="[...$utility.notEmptyRule('Repeated password'), ...$utility.equalsRule('Password', newEntity.password)]"
            required
            outlined
            clearable
            v-model="repeatedPassword"
            label="Repeated password"
            type="password"
          ></v-text-field>
          <v-text-field
            :rules="$utility.notEmptyRule('Email')"
            required
            outlined
            clearable
            type="email"
            v-model="newEntity.email"
            label="Email"
          ></v-text-field>
          <vue-google-autocomplete
            class="locationComponent"
            id="map"
            :key="key"
            placeholder="Default shipping address"
            v-on:placechanged="getAddressData"
          >
          </vue-google-autocomplete>
          
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center mt-n5">
        <v-btn
          color="primary"
          :disabled="!isFormValid"
          @click="_register"
          v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
        >
          Submit
        </v-btn>
        <v-btn
          color="secondary"
          v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
          @click="reset"
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
import { mapGetters, mapActions } from 'vuex';
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  name: 'RegisterForm',
  components: {
    VueGoogleAutocomplete
  },
  data: () => {
    return {
      key: 0,
      snackbar: false,
      snackbarText: null,
      timeout: 5000,
      isFormValid: false,
      repeatedPassword: '',
      newEntity: {
        username: '',
        password: '',
        email: '',
        shippingAddress: {}
      },
    };
  },
  computed: {
    ...mapGetters({
      takenUsernames: 'auth/takenUsernames'
    })
  },
  mounted(){
    this.fetchUsernames();
  },
  methods: {
    ...mapActions({
      fetchUsernames: 'auth/fetchUsernames',
      register: 'auth/register',
    }),
    getAddressData(data){
      this.newEntity.shippingAddress.country = data.country;
      this.newEntity.shippingAddress.city = data.locality;
      this.newEntity.shippingAddress.street = data.route;
    },
    reset(){
      this.$refs.form.reset();
      this.key += 1;
      this.newEntity.shippingAddress = {};
    },
    _register(){
      if(!this.newEntity.shippingAddress.country)
        this.newEntity.shippingAddress = null;
      this.newEntity.role = this.$utility.user;
      let that = this;
      this.register(this.newEntity).then(
        () => {
          setTimeout(
            () => {
              this.$router.push({name: 'Login'});
            },
            3000
          );
        },
        (error) => {
          this.snackbarText = error;
          this.snackbar = true;
          that.reset();
        }
      );
    }
  }
}
</script>

<style>
.locationComponent::placeholder{
  font-size: 15px;
}
.locationComponent{
  width: 100%;
  height: 50px;
  border: 1px solid gray;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding-left: 10px;
}
</style>