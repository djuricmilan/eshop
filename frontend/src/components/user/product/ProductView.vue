<template>
  <div>
    <!-- filter toolbar -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-toolbar
            flat
            class="mt-4 mb-n4"
          >
            <v-select
              v-model="_selectedCategories"
              :items="_categories"
              label="Categories"
              class="mt-5"
              multiple
              chips
              deletable-chips
              clearable
            >
            </v-select>
            <v-spacer/>
            <v-range-slider
              v-model="_priceRange"
              label="Price range"
              class="mt-5"
              thumb-label="always"
              :color="$vuetify.theme.themes.light.slider"
              :max="maxPrice"
              :key="key"
            >
            </v-range-slider>
            <v-spacer/>
            <v-btn
              color="primary"
              v-bind="$utility.buttonSize($vuetify.breakpoint.name)"
              @click="filter"
            >
              Filter
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>
    </v-container>

    <!-- product grid -->
    <v-container fluid>
      <v-row
        v-for="index in (_rowNumber + 1)"
        :key="index"
      >
        <v-col
          v-for="product in _row(index - 1)"
          :key="100+product.id"
          cols="12"
          :xs="_spacePerProduct"
          :sm="_spacePerProduct"
          :md="_spacePerProduct"
          :lg="_spacePerProduct"
          :xl="_spacePerProduct"
        >
          <ProductItem :product="product"/>
        </v-col>
      </v-row>
    </v-container>

    <!-- Pagination -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-pagination
            v-model="_chunkIndex"
            :length="amountOfChunks"
            @input="next"
          >
          </v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import ProductItem from './ProductItem';
export default{
  name: 'ProductView',
  components: {
    ProductItem
  },
  data: () => {
    return{
      selectedCategories: [],
      key: 12312
    };
  },
  computed: {
    ...mapGetters({
      products: 'productView/getProducts',
      categories: 'productView/getCategories',
      quantity: 'productView/getQuantity',
      priceRange: 'productView/getPriceRange',
      maxPrice: 'productView/getMaxPrice',
      categoryNames: 'productView/getCategoryNames',
      amountOfChunks: 'productView/getAmountOfChunks',
      chunkIndex: 'productView/getChunkIndex'
    }),
    _chunkIndex:{
      get(){
        return this.chunkIndex + 1;
      },
      set(newValue){
        this.$store.commit('productView/_chunkIndex', newValue - 1, {root: true});
      }
    },
    _selectedCategories:{
      get(){
        return this.categoryNames;
      },
      set(newValue){
        this.$store.commit('productView/_categoryNames', newValue, {root: true});
      }
    },
    _categories(){
      return this.categories.map(x => x.name);
    },
    _priceRange:{
      get(){
        return this.priceRange;
      },
      set(newValue){
        this.$store.commit('productView/_priceRange', newValue, {root: true});
      }
    },
    _rowsOfProducts(){
      const arr = [...this.products];
      let retval = [];
      for(let i = 0; i < this._rowNumber; i++)
        retval.push(arr.slice(i * this._columnNumber, (i + 1) * this._columnNumber));
      return retval;
    },
    _row(){
      return (index) => this._rowsOfProducts[index];
    },
    _rowNumber(){
      return this.quantity / this._columnNumber;
    },
    _columnNumber(){
      if(this.$vuetify.breakpoint.name == 'xs'){
        return 1;
      }
      else if(this.$vuetify.breakpoint.name == 'sm'){
        return 2;  
      }
      else{
        return 4;
      }
    },
    _spacePerProduct(){
      return 12 / this._columnNumber;
    }
  },
  created(){
    this.getMaxPrice().then(() => this.key += 1, null);
    this.getProducts();
    this.getCategories();
  },
  methods: {
    ...mapActions({
      getProducts: 'productView/getProducts',
      getCategories: 'productView/getCategories',
      getMaxPrice: 'productView/getMaxPrice'
    }),
    filter(){
      this.$store.commit('productView/_chunkIndex', 0, {root: true});
      this.$store.commit('appBar/setShowProgress', true, {root: true});
      this.getProducts().then(() => {
        this.$store.commit('appBar/setShowProgress', false, {root: true});
      });
    },
    next(chunkIndex){
      this.$store.commit('appBar/setShowProgress', true, {root: true});
      chunkIndex -= 1; //because the code is zero based whereas the pagination component is 1 based
      this.$store.commit('productView/_chunkIndex', chunkIndex, {root: true});
      this.getProducts().then(() => {
        this.$store.commit('appBar/setShowProgress', false, {root: true});
      });
    }
  }
}
</script>

<style scoped>
</style>