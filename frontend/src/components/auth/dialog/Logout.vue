<template>
  <v-dialog v-model="dialog" width="500px">
    <template v-slot:activator="{on}">
      <v-btn
        v-on="on"
        v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
      >
        Logout
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Are you sure you would like to logout?
      </v-card-title>
      <v-card-actions class="ml-4">
        <v-btn
          color="primary"
          v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
          @click="logout"
        >
          Confirm
        </v-btn>
        <v-btn
          color="secondary"
          v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
          @click="dialog=false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Logout',
  data: () => {
    return{
      dialog: false
    };
  },
  methods: {
    logout(){
      this.$store.commit('auth/_logout', {}, {root: true});
      this.$store.commit("appBar/setAppBarState", 0, {root:true});
      this.dialog = false;
      this.$router.push({name: 'Login'});
    }
  }
}
</script>

<style>

</style>