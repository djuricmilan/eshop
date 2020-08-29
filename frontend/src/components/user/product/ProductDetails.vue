<template>
  <v-card>
    <v-card-title>
      Here you can find details about our product {{product(id).productName}}
    </v-card-title>
    <v-card-text>
      {{product(id).productDescription}}
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="ml-2"
        color="primary"
        v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
      >
        Add to cart
      </v-btn>
      <v-btn
        color="secondary"
        v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
        @click="$router.push({name: 'Home'})"
      >
        Back
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex';
export default{
  name: 'ProductDetails',
  props: [
    'id'
  ],
  computed:{
    ...mapGetters({
      product: 'productView/getProduct'
    })
  }
}
</script>

<style scoped>

</style>