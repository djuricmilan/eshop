<template>
  <v-navigation-drawer
      app
      v-if="content[appBarState].collapsable"
      v-model="_drawerLeft"
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
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'LeftDrawer',
  computed: {
    ...mapGetters({
      drawerLeft: 'appBar/getDrawerLeft',
      content: "appBar/getContent",
      appBarState: "appBar/getAppBarState",
    }),
    _drawerLeft:{
      get(){
        return this.drawerLeft;
      },
      set(newValue){
        this.$store.commit('appBar/setDrawerLeft', newValue, {root:true});
      }
    }
  }
}
</script>

<style>

</style>