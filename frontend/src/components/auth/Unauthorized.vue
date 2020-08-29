<template>
  <v-container fill-height class="white" fluid>
    <v-row justify="center" class="mb-n10 pb-n10">
      <p class="text-xs-caption text-sm-body-1 text-md-h6 text-lg-h3 text-xl-h1">Unauthorized access</p>
    </v-row>
    <v-row justify="center">
      <v-btn fab color="pink" class="mt-n16" v-bind="$utility.buttonSize($vuetify.breakpoint.name)">
        <v-icon @click="redirect">mdi-home</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Unauthorized',
  methods: {
    redirect(){
      const role = localStorage.getItem('role');
      if(role == this.$utility.user)
        this.$router.push({name: 'home'});
    }
  }
}
</script>

<style>

</style>