<template>
  <v-container fluid fill-height>
    <v-row >
      <v-col cols="12" md="6">
        <slot name="left">
        </slot>
      </v-col>

      <v-col cols="12" md="6">
        <slot name="right">
        </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style>

</style>