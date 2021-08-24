<template>
<b-tab :title="categoryHeading">
  <b-row >
      <b-col md="2">
      </b-col>
      <b-col md="3">
        <h4>Name</h4>
      </b-col>
      <b-col md="2">
         <h4>Gold</h4>
      </b-col>
      <b-col md="3">
        <h4>Attributes</h4>
      </b-col>
      <b-col md="2">
        <h4>Efficiency</h4>
      </b-col>
  </b-row >        
  <slot></slot>
</b-tab>

     <!-- <b-button v-b-toggle="'collapse-'+categoryNumber" variant="primary">{{categoryHeading}}</b-button>
    <b-collapse :id="'collapse-'+categoryNumber" class="mt-2">
      <b-card>
              <h1>{{categoryHeading}}</h1>
      </b-card>
      <slot></slot>
    </b-collapse> -->

</template>

<script>
export default {
  name: 'Category',
  props: {
    categoryHeading: String,
    categoryNumber: Number
  },
  methods:{

  }
}
</script>

<!-- v-b-toggle.collapse-1 Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#category{
float: left;

}
</style>
