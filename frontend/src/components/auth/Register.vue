<template>
  <Auth>
    <template v-slot:left>
      <RegisterForm class="mx-xs-4 mx-sm-6 mx-md-8"/>
    </template>
    <template v-slot:right>
      <v-row justify="center" class="fill-height">
        <v-icon color="red lighten-1" :size="$utility.iconSize($vuetify.breakpoint.name)">mdi-cart-plus</v-icon>
      </v-row>
    </template>
  </Auth>
</template>

<script>
import Auth from './template/Auth';
import RegisterForm from './form/Register';
export default {
  name: 'Register',
  components: {
    Auth,
    RegisterForm
  }
}
</script>

<style>

</style>