<template>
  <ProductView/>
</template>

<script>
import ProductView from './product/ProductView';
export default {
  name: "Home",
  components: {
    ProductView
  },
  mounted(){
    this.$store.commit('appBar/setAppBarState', 1, {root: true});
  }
}
</script>

<style>

</style>