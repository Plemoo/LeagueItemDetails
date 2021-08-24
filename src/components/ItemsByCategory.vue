<template>
<div>
  <b-overlay :show="loading" rounded="sm" fixed no-wrap></b-overlay>
  <b-btn id="back-to-top" pill class="back-to-top" variant="outline-danger" v-b-toggle.sidebar-1 role="button"><b-icon icon="layout-sidebar" aria-hidden="true"></b-icon></b-btn>
<b-row>
  <b-col cols="12" md="4">
      <b-dropdown id="dropdown-form" text="Search in Items" ref="dropdown" class="m-2" style="width:100%">
        <b-dropdown-form style="width:400px">
          <b-row class="mb-2">
            <b-col>
              <b-form-input v-model="itemNameSearch" placeholder="Search Items by Name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-form inline>
              <b-col cols="2">
                <b-button :pressed="buttonStates.leGoldSearchOperator" @click="buttonStates.leGoldSearchOperator = true;buttonStates.geGoldSearchOperator = false;" pill><b>&le;</b></b-button>
              </b-col>
              <b-col cols="2">
                <b-button :pressed="buttonStates.geGoldSearchOperator" @click="buttonStates.geGoldSearchOperator = true;buttonStates.leGoldSearchOperator = false;" pill><b>&ge;</b></b-button>
              </b-col>
              <b-col cols="8">
                <b-form-input v-model="itemGoldSearch" placeholder="Search Items by Gold"></b-form-input>
              </b-col>
            </b-form>
          </b-row>
          <b-row>
            <b-form inline>
              <b-col cols="2">
                <b-button :pressed="buttonStates.leCoefficientSearchOperator" @click="buttonStates.leCoefficientSearchOperator = true;buttonStates.geCoefficientSearchOperator = false;" pill><b>&le;</b></b-button>
              </b-col>
              <b-col cols="2">
                <b-button :pressed="buttonStates.geCoefficientSearchOperator" @click="buttonStates.geCoefficientSearchOperator = true;buttonStates.leCoefficientSearchOperator = false;" pill><b>&ge;</b></b-button>
              </b-col>
              <b-col cols="8">
                <b-form-input class="col-xs-4" v-model="itemCoefficientSearch" placeholder="Search Items by Coefficient"></b-form-input>
              </b-col>
            </b-form>
          </b-row>
        </b-dropdown-form>
      </b-dropdown>
  </b-col>
  <b-col cols="12" md="4">
      <b-dropdown :text="displayedPatch" class="m-2" style="width:100%">
        <b-dropdown-item-button @click="selectPatch(patch)" v-for="patch in patches" :key="patch">{{patch}}</b-dropdown-item-button>
      </b-dropdown>
  </b-col>
<b-col cols="12" md="4">
      <b-dropdown :text="displayedSorting" class="m-2" style="width:100%">
        <b-dropdown-item-button @click="sortByCategoryAscending()">Sort by Category Asc</b-dropdown-item-button>
        <b-dropdown-item-button @click="sortByCategoryDescending()">Sort by Category Desc</b-dropdown-item-button>
        <b-dropdown-item-button @click="sortByCoefficientAscending()">Sort by Coefficient Asc</b-dropdown-item-button>
        <b-dropdown-item-button @click="sortByCoefficientDescending()">Sort by Coefficient Desc</b-dropdown-item-button>
        <b-dropdown-item-button @click="sortByGoldAscending()">Sort by Gold Asc</b-dropdown-item-button>
        <b-dropdown-item-button @click="sortByGoldDescending()">Sort by Gold Desc</b-dropdown-item-button>
      </b-dropdown>
</b-col>
</b-row>
<b-row>
  <b-col class="d-none d-md-block">
      <b-card flex-fill no-body class="itemsByCategory justify-content-center" style="width:inherit">
        <b-tabs pills card vertical>
          <div v-for="(itemArray, categoryKey, index) in allItemsInCategories" :key="categoryKey" style="display:flex;">
            <category :categoryNumber="index" :categoryHeading="categoryKey" class="categoryCol">
              <div v-for="(item, key) in itemArray" :key="key">
                <item @click.native="addItemToBus(item)"
                :itemName="item.itemName"
                :itemValue="item.itemValue"
                :itemAttributes="item.itemStats"
                :itemGold="item.itemGold"
                :itemImg="item.itemImage"
                :itemCoefficient="item.itemCoefficient"
                :itemPassive="item.passiveString"></item>
              </div>
            </category>
          </div>
        </b-tabs>
      </b-card>
      </b-col>
        <b-col class="d-md-none">
      <b-dropdown text="Categories" class="m-2" variant="primary" style="width:100%">
        <b-dropdown-item-button @click="setActiveCategoryForMobile(category)" v-for="category in categoryNames" :key="category">{{category}}</b-dropdown-item-button>
      </b-dropdown>
        </b-col>
</b-row>
<b-row class="d-md-none">
  <b-col v-for="item in allItemsInCategories[selectedCategoryMobile]" :key="item.itemName">
                <item @click.native="addItemToBus(item)"
                :itemName="item.itemName"
                :itemValue="item.itemValue"
                :itemAttributes="item.itemStats"
                :itemGold="item.itemGold"
                :itemImg="item.itemImage"
                :itemCoefficient="item.itemCoefficient"
                :itemPassive="item.passiveString"></item>
  </b-col>
</b-row>
</div>
</template>

<script>
import Category from './Category'
import _ from "lodash"
import Item from './Item.vue'
import {getDataFromMiddleware, getPatches, postData} from "../service/GetService"
import {EventBus} from "../main.js"
//import axios from "axios"
export default {
  name: 'ItemsByCategory',
  components: {
    Item,
    Category
  },
  data(){
    return {
      selectedCategoryMobile:"",
      loading:true,
      itemNameSearch:"",
      itemGoldSearch:"",
      itemCoefficientSearch:"",
      buttonStates:{
        geGoldSearchOperator:false,
        leGoldSearchOperator:false,
        geCoefficientSearchOperator:false,
        leCoefficientSearchOperator:false
      },
      searchString:"",
      displayedPatch:"Select Patch",
      displayedSorting:"Sort Items by",
      jsonData:[],
      categoryNames:[],
      patches:[],
      allItemsInCategories:{}
      }
    },
      created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
    watch:{
      buttonStates:{
        deep:true,
        handler(){
        this.filteredItems();
        },
      },
      itemNameSearch:function(){
        this.filteredItems()
      },
      itemGoldSearch:function(){
        this.filteredItems()
      },
      itemCoefficientSearch:function(){
        this.filteredItems()
      }
    },
    methods:{
      handleScroll(){
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("back-to-top").style.display = "block";
      } else {
        document.getElementById("back-to-top").style.display = "none";
      }
      },
      setActiveCategoryForMobile(category){
        console.log(category);
        this.selectedCategoryMobile = category;
      },
      addItemToBus(item){
        EventBus.$emit("addItem", item);
      },
        filteredItems(){
        this.allItemsInCategories = _.cloneDeep(this.jsonData);
         this.categoryNames.forEach(element => {
           this.allItemsInCategories[element] = _.filter(this.allItemsInCategories[element],(item)=>{
             let boolGold = true;
            if(this.itemGoldSearch!= ""){
              if(this.buttonStates.geGoldSearchOperator){
                boolGold =  item.itemGold >= this.itemGoldSearch;
              }else if(this.buttonStates.leGoldSearchOperator){
                boolGold =  item.itemGold <= this.itemGoldSearch;
              }else{
                boolGold = item.itemGold == this.itemGoldSearch;
              }
            }
            let boolName = true;
            if(this.itemNameSearch!= ""){
              boolName =  item.itemName.toLowerCase().includes(this.itemNameSearch.toLowerCase()) 
            }
            let boolCoefficient = true;
            if(this.itemCoefficientSearch != ""){
              if(this.buttonStates.geCoefficientSearchOperator){
                boolCoefficient =  item.itemCoefficient >= this.itemCoefficientSearch;
              }else if(this.buttonStates.leCoefficientSearchOperator){
               boolCoefficient = item.itemCoefficient <= this.itemCoefficientSearch;
              }else{
                boolCoefficient = item.itemCoefficient == this.itemCoefficientSearch;
              }
            }
            return boolName && boolGold && boolCoefficient;
           })
         })
      },
      patchIsNotSelcted(){
        if(this.displayedPatch == ""){
          return true;
        }else{
          return false;
        }
      },
      sortingIsNotSelcted(){
        if(this.displayedSorting == ""){
          return true;
        }else{
          return false;
        }
      },
      selectPatch(selectedPatch){
          postData("/api/itemsByCategory",selectedPatch).then((items)=>{
            this.allItemsInCategories = items;
            this.displayedPatch = selectedPatch;
          })

      },
        sortByCoefficientAscending(){
          this.displayedSorting = "Sort by Coefficient Asc";
          this.categoryNames.forEach(element => {
            this.allItemsInCategories[element].sort((item1, item2) => {
                return item1["itemCoefficient"] - item2["itemCoefficient"]; // niedrig-hoch
            })
          });
        },
        sortByCoefficientDescending(){
          this.displayedSorting = "Sort by Coefficient Desc";
          this.categoryNames.forEach(element => {
            this.allItemsInCategories[element].sort((item1, item2) => {
                return item2["itemCoefficient"] - item1["itemCoefficient"]; // hoch-niedrig
            })
          });
        },
        sortByGoldAscending(){
          this.displayedSorting = "Sort by Gold Asc"; 
          this.categoryNames.forEach(element => {
            this.allItemsInCategories[element].sort((item1, item2) => {
                return item1["itemGold"] - item2["itemGold"]; // niedrig-hoch
            })
          });
        },
        sortByGoldDescending(){
          this.displayedSorting = "Sort by Gold Desc"; 
          this.categoryNames.forEach(element => {
            this.allItemsInCategories[element].sort((item1, item2) => {
                return item2["itemGold"] - item1["itemGold"]; // hoch-niedrig
            })
          });
        },
        sortByCategoryAscending(){
          this.displayedSorting = "Sort by Category Asc"; 
          this.categoryNames.forEach(element => {
            this.allItemsInCategories[element].sort((item1, item2) => {
                return item1["itemStats"][element][0] - item2["itemStats"][element][0] ; // hoch-niedrig
            })
          });
        },
        sortByCategoryDescending(){
          this.displayedSorting = "Sort by Category Desc"; 
          this.categoryNames.forEach(element => {
            this.allItemsInCategories[element].sort((item1, item2) => {
                return item2["itemStats"][element][0]  - item1["itemStats"][element][0] ; // hoch-niedrig
            })
          });
        }
    },
      
      async beforeCreate () {
        this.loading = true;
        try{
          this.jsonData = await getDataFromMiddleware();
          this.patches = await getPatches();
          this.allItemsInCategories = this.jsonData;
          this.categoryNames = Object.keys(this.jsonData);
          this.selectedCategoryMobile = this.categoryNames[0];
          this.loading = false;
          
        }catch(err){
          this.loading = false;
        }
        // getDataFromMiddleware().then(resp=>{
        //   this.categoryNames = Object.keys(resp);
        //   this.jsonData = resp;
        //   this.allItemsInCategories = resp;
        //   this.loading = false;
        // })
        // getPatches().then(patchArray=>{
        //   this.patches = patchArray;
        // })
      
  }
}
</script>

<style>
#app {
  display: inline-flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.itemsByCategory{
display: inline-flex;
}

.categoryCol{
float: left;
}
#back-to-top {
    position: fixed;
    top: 25px;
    left: 25px;
    display: none;
    z-index: 500;
}

</style>
