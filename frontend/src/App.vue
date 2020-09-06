<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <LeftDrawer/>
    <AppBar/>
    <RightDrawer/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import LeftDrawer from './components/user/appBar/LeftDrawer';
import AppBar from './components/user/appBar/AppBar';
import RightDrawer from './components/user/appBar/RightDrawer';
export default {
  name: 'App',
  components: {
    LeftDrawer,
    AppBar,
    RightDrawer
  }
}
</script>

<style>

</style>
