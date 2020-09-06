<template>
  <v-app-bar 
      app
      :color="$vuetify.theme.themes.light.appBar"
    >
    <v-app-bar-nav-icon
      v-if="content[appBarState].collapsable"
      @click="$store.commit('appBar/setDrawerLeft', !drawerLeft, {root:true})"
    ></v-app-bar-nav-icon>
    <v-spacer/>
    <span
      v-for="item in content[appBarState].nonCollapseOptions"
      :key="item.optionIndex"
    >
      <v-btn
        v-if="item.navigable"
        v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
        @click="$router.push({name: item.componentName})"
        class="mr-xs-2 mr-sm-3 mr-md-4 mr-lg-5 mr-xl-6"
      >
        {{item.optionText}}
      </v-btn>
      <component
        v-if="item.hasChild"
        v-bind:is="item.child.childName"
      >
      </component>
    </span>
    <v-icon
      v-if="content[appBarState].collapsable"
      @click="$store.commit('appBar/setDrawerRight', !drawerRight, {root:true})"
      class="ml-5"
      v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
    >
      mdi-cart
    </v-icon>
  </v-app-bar>
</template>

<script>
import Logout from '../../auth/dialog/Logout';
import ProgressWrapper from '../../wrapper/ProgressWrapper';
import { mapGetters } from 'vuex';
export default {
  name: 'AppBar',
  components: {
    Logout,
    ProgressWrapper
  },
  computed: {
    ...mapGetters({
      drawerLeft: 'appBar/getDrawerLeft',
      drawerRight: 'appBar/getDrawerRight',
      appBarState: "appBar/getAppBarState",
      content: "appBar/getContent"
    })
  }
}
</script>

<style>

</style>