<template>
  <v-navigation-drawer
    app
    v-if="content[appBarState].collapsable && !!shoppingCart"
    v-model="_drawerRight"
    right
  >
    <v-list dense nav>
      <v-list-item
        v-for="item in shoppingCart.productItems"
        :key="item.id"
      >
        <!-- Opcija iz navigation drawera -->
        <v-list-item-action>
          <v-icon @click="removeFromShoppingCart(item.id)">mdi-delete</v-icon>
        </v-list-item-action>
        <v-list-item-content
          @click="navigate(item.product.id)"
          :style="{cursor: 'pointer'}"
        >
          <v-list-item-title>
            {{item.product.productName}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'RightDrawer',
  computed: {
    ...mapGetters({
      drawerRight: "appBar/getDrawerRight",
      shoppingCart: "shoppingCart/getShoppingCart",
      appBarState: "appBar/getAppBarState",
      content: "appBar/getContent"
    }),
    _drawerRight:{
      get(){
        return this.drawerRight;
      },
      set(newValue){
        this.$store.commit('appBar/setDrawerRight', newValue, {root:true});
      }
    }
  },
  methods: {
    ...mapActions({
      removeFromCart: 'shoppingCart/removeFromCart'
    }),
    removeFromShoppingCart(productItemId){
      this.removeFromCart(productItemId);
    },
    navigate(id){
      this.$router.push({path: `/product/${id}`});
    }
  }
}
</script>

<style>

</style>