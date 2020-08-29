<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-navigation-drawer
      app
      v-if="content[appBarState].collapsable"
      v-model="drawerLeft"
    >
      <v-list dense nav>
        <v-list-item
          v-for="item in content[appBarState].collapseOptions"
          :key="item.optionIndex"
          @click="$router.push({name: item.name})"
        >
          <!-- Opcija iz navigation drawera -->
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{item.name}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar 
      app
      :color="$vuetify.theme.themes.light.appBar"
    >
      <v-app-bar-nav-icon
        v-if="content[appBarState].collapsable"
        @click="drawerLeft = !drawerLeft"
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
        @click="drawerRight = !drawerRight"
        class="ml-5"
        v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
      >
        mdi-cart
      </v-icon>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-if="content[appBarState].collapsable"
      v-model="drawerRight"
      right
    >
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Logout from './components/auth/dialog/Logout';
import ProgressWrapper from './components/wrapper/ProgressWrapper';
import {mapGetters} from 'vuex';
export default {
  name: 'App',
  components: {
    Logout,
    ProgressWrapper
  },
  data: () => {
    return{
      drawerLeft: false,
      drawerRight: false
    };
  },
  computed: {
    ...mapGetters({
      appBarState: "appBar/getAppBarState",
      content: "appBar/getContent"
    })
  }
}
</script>

<style>

</style>
