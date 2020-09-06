<template>
  <v-card>
    <v-card-title @click="$router.push({path: `product/${product.id}`})" :style="{cursor: 'pointer'}">
      {{product.productName}}
    </v-card-title>
    <v-card-text @click="$router.push({path: `product/${product.id}`})" :style="{cursor: 'pointer'}">
      {{product.productDescription}}
    </v-card-text>
    <v-card-actions class="ml-2">
      <v-row class="my-n5">
        <v-col cols="12" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <v-text-field
            outlined
            dense
            label="Amount"
            type="number"
            :min="0"
            :max="product.availability"
            v-model="amount"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <v-btn
            color="primary"
            v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
            class="ml-n2"
            @click="_addToCart()"
            :disabled="amount==0"
          >
            Add to cart
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
export default{
  name: 'ProductItem',
  props: [
    'product'
  ],
  data: () => {
    return{
      amount: 0
    };
  },
  methods: {
    ...mapActions({
      addToCart: 'shoppingCart/addToCart'
    }),
    _addToCart(){
      let obj = {
        productId: this.product.id,
        amount: this.amount
      }
      this.addToCart(obj);
    }
  }
}
</script>

<style scoped>

</style>