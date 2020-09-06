<template>
  <v-container fluid>
    <v-card v-if="!!product">
      <v-card-title>
        Here you can find details about our product {{product.productName}}
      </v-card-title>
      <v-card-text>
        {{product.productDescription}}
      </v-card-text>
      <v-container class="mx-3">
        <v-row>
          <v-col xs="6" sm="4" align="end">
            <v-text-field
              outlined
              label="Amount"
              type="number"
              :min="0"
              :max="product.availability"
              v-model="amount"
            >
            </v-text-field>
          </v-col>
          <v-col xs="6" sm="4" md="2" align="end">
            <v-btn
              color="primary"
              v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
              @click="_addToCart()"
              :disabled="amount==0"
            >
              Add to cart
            </v-btn>
          </v-col>
          <v-col xs="12" sm="1" md="1" align="start">
            <v-btn
              color="secondary"
              v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
              @click="$router.push({name: 'Home'})"
            >
              Back
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default{
  name: 'ProductDetails',
  props: [
    'id'
  ],
  data: () => {
    return{
      amount: 0
    };
  },
  watch: {
    id(newValue){
      this.fetchSelectedProduct(newValue);
      this.amount = 0;
    }
  },
  computed:{
    ...mapGetters({
      product: 'productView/getSelectedProduct'
    })
  },
  created(){
    this.fetchSelectedProduct(this.id);
  },
  methods:{
    ...mapActions({
      fetchSelectedProduct: 'productView/fetchSelectedProduct',
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