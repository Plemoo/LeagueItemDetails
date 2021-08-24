<template>
      <b-sidebar id="sidebar-1" title="Sidebar" visible>
        <div class="px-3 py-2 bigger-font">
            <p>
             <router-link to="/ItemsByCategory">Show all Items by Category</router-link>
            </p>
            <p>
                <router-link to="/HowItWorks">How it works</router-link>
            </p>
        </div>          
        <div class="px-3 py-2">
            <p>
                Hover over icons to show their passives.
            </p>
            <p>
                Click on an item to add it to the inventory.
            </p>
            <p>
                Click on the icon of the inventory to remove the item.
            </p>   
        </div>

        <b-container>
            <b-row>
                <b-col>
                    <img fluid v-if="inventory.slot1 == null" src="../img/ItemSlot.jpg" alt="Item Slot 1" class="item-slot"/>            
                    <img fluid v-else @click="removeItem('slot1')" v-bind:src="inventory.slot1.itemImage" alt="Item Slot 1" class="item-slot"/>
                 
                </b-col>
                <b-col>
                    <img fluid v-if="inventory.slot2 == null" src="../img/ItemSlot.jpg" alt="Item Slot 2" class="item-slot"/>            
                    <img fluid v-else @click="removeItem('slot2')" v-bind:src="inventory.slot2.itemImage" alt="Item Slot 2" class="item-slot"/>
                               
                </b-col>
                <b-col>
                    <img fluid v-if="inventory.slot3 == null" src="../img/ItemSlot.jpg" alt="Item Slot 3" class="item-slot"/>            
                    <img fluid v-else @click="removeItem('slot3')" v-bind:src="inventory.slot3.itemImage" alt="Item Slot 3" class="item-slot"/>   
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col>
                    <img fluid v-if="inventory.slot4 == null" src="../img/ItemSlot.jpg" alt="Item Slot 4" class="item-slot"/>            
                    <img fluid v-else @click="removeItem('slot4')" v-bind:src="inventory.slot4.itemImage" alt="Item Slot 4" class="item-slot"/>
                </b-col>
                <b-col>
                    <img fluid v-if="inventory.slot5 == null" src="../img/ItemSlot.jpg" alt="Item Slot 5" class="item-slot"/>            
                    <img fluid v-else  @click="removeItem('slot5')" v-bind:src="inventory.slot5.itemImage" alt="Item Slot 5" class="item-slot"/>
                </b-col> 
                <b-col>
                    <img fluid v-if="inventory.slot6 == null" src="../img/ItemSlot.jpg" alt="Item Slot 6" class="item-slot"/>            
                    <img fluid v-else @click="removeItem('slot6')" v-bind:src="inventory.slot6.itemImage" alt="Item Slot 6" class="item-slot"/>
                   
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="8">
                    Gold:
                </b-col>
                <b-col>
                    {{getAccumulatedItemGold()}}
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="8">
                    Coefficient:
                </b-col>
                <b-col>
                    {{getAccumuilatedCoefficient()}}
                </b-col>
            </b-row>
            <b-row v-for="(valAttr, keyAttr) in getAccumulatedItemAttr()" :key="keyAttr">
                <b-col cols="8">
                    {{keyAttr}}:
                </b-col>
                <b-col>
                    {{valAttr}}
                </b-col>
            </b-row>
        </b-container>
    </b-sidebar>
</template>

<script>
import {EventBus} from "../main.js"

export default {
    name:"Sidebar",
    data(){
        return{
            inventory:{
                slot1:null,
                slot2:null,
                slot3:null,
                slot4:null,
                slot5:null,
                slot6:null,
            }
        }
    },
    mounted(){
        EventBus.$on("addItem", (item)=>{
            var slotNames = Object.keys(this.inventory);
            for(let slot of slotNames){
                if(this.inventory[slot] == null){
                    this.inventory[slot] = item;
                    break;
                }
            }
        })
    },
    methods:{   
        getAccumuilatedCoefficient(){
            var sumCoeficient = 0
            var numberOfItems = 0;
            var slotNames = Object.keys(this.inventory);
            for(let slot of slotNames){
                if(this.inventory[slot] != null){                
                    sumCoeficient += this.inventory[slot].itemCoefficient;
                    numberOfItems++;
                }
            }
            if(numberOfItems != 0 && sumCoeficient != null){
                return sumCoeficient/numberOfItems;
            }else{
                return 0;
            }
        },
        getAccumulatedItemAttr(){
            var attributes = {};
            var slotNames = Object.keys(this.inventory);
            for(let slot of slotNames){
                if(this.inventory[slot] != null){
                    var itemAttr = this.inventory[slot].itemStats; // {Health: [100],...}
                    var keyArr = Object.keys(itemAttr);
                    for(let itemKey of keyArr){
                        if(Object.keys(attributes).includes(itemKey)){ // If the attrubtes object already contains the key, add the attributes
                            attributes[itemKey] = parseInt(attributes[itemKey]) + parseInt(itemAttr[itemKey][0]);
                        }else{ // attributes object does not contain the key, therefore add it
                            attributes[itemKey] = parseInt(itemAttr[itemKey][0]);
                        }
                    }
                }
            }
            return attributes;       
        },
        getAccumulatedItemGold(){
            var gold = 0;
            var slotNames = Object.keys(this.inventory);            
            for(let slot of slotNames){
                if(this.inventory[slot] != null){
                    gold +=this.inventory[slot].itemGold;
                }
            }
            return gold;
        },
        removeItem(slotNumber){
            this.inventory[slotNumber] = null;
        },
        getItemSlotImage(slotNumber){
            var slotImg = null;
            if(this.inventory.length >= slotNumber){
                if(this.inventory[slotNumber-1] != null){
                    slotImg = this.inventory[slotNumber-1].itemImage;
                }
            }
            return slotImg;
        }
    }
}
</script>

<style>
.item-slot{
    width: 70px;
    height: 70px;
}
</style>