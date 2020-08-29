<template>
  <v-progress-circular
    class="mr-4"
    v-if="showProgress"
    indeterminate
  >
  </v-progress-circular>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'ProgressWrapper',
  computed:{
    ...mapGetters({
      showProgress: 'appBar/getShowProgress'
    })
  }
}
</script>

<style>

</style>