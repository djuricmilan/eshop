<template>
  <Auth>
    <template v-slot:left>
      <LoginForm class="mx-xs-4 mx-sm-6 mx-md-8"/>
    </template>
    <template v-slot:right>
      <v-row justify="center" class="fill-height">
        <v-icon color="red lighten-1" :size="$utility.iconSize($vuetify.breakpoint.name)">mdi-account-tie</v-icon>
      </v-row>
    </template>
  </Auth>  
</template>

<script>
import Auth from './template/Auth';
import LoginForm from './form/Login';
export default {
  name: 'Login',
  components: {
    Auth,
    LoginForm
  }
}
</script>

<style>

</style>