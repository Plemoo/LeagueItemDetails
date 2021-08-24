<template>
    <b-row class="pb-3">
      <b-col md="2" @mouseenter="showPassive()" @mouseleave="hidePassive()">
        <b-img-lazy class="icon" v-bind:src="itemImg"/>
      </b-col>
      <b-col md="3">
        <p>{{itemName}}</p>
      </b-col>
      <b-col md="2">
        <p><b-img :src="require('../img/IconsStats/Gold.png')" rounded alt="Rounded image"></b-img> {{itemGold}}</p>
      </b-col>
      <b-col md="3">

          <!-- <p v-for="(valAttr, keyAttr) in itemAttributes" :key="keyAttr"> {{keyAttr}}: {{valAttr[0]}} -->
          <div v-for="(valAttr, keyAttr) in itemAttributes" :key="keyAttr" class="attributes">
           <b-img :src="require('../img/IconsStats/Armor_icon.png')" rounded v-if="keyAttr == 'Armor'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Ability_power_icon.png')" rounded v-else-if="keyAttr == 'AbilityPower'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Armor_penetration_icon.png')" rounded v-else-if="keyAttr == 'ArmorPenetration'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Armor_penetration_icon.png')" rounded v-else-if="keyAttr == 'Lethality'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>           
           <b-img :src="require('../img/IconsStats/Attack_damage_icon.png')" rounded v-else-if="keyAttr == 'AttackDamage'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Attack_speed_icon.png')" rounded v-else-if="keyAttr == 'AttackSpeed'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Cooldown_reduction_icon.png')" rounded v-else-if="keyAttr == 'AbilityHaste'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Critical_strike_chance_icon.png')" rounded v-else-if="keyAttr == 'CriticalStrikeChance'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Heal_and_shield_power_icon.png')" rounded v-else-if="keyAttr == 'HealandShieldPower'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Health_icon.png')" rounded v-else-if="keyAttr == 'Health'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Health_regeneration_icon.png')" rounded v-else-if="keyAttr == 'BaseHealthRegen'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Life_steal_icon.png')" rounded v-else-if="keyAttr == 'LifeSteal'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Magic_penetration_icon.png')" rounded v-else-if="keyAttr == 'MagicPenetration'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Magic_resistance_icon.png')" rounded v-else-if="keyAttr == 'MagicResist'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Mana_icon.png')" rounded v-else-if="keyAttr == 'Mana'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Mana_regeneration_icon.png')" rounded v-else-if="keyAttr == 'BaseManaRegen'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Movement_speed_icon.png')" rounded v-else-if="keyAttr == 'MoveSpeed'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Movement_speed_icon.png')" rounded v-else-if="keyAttr == 'PercentMoveSpeed'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>           
           <b-img :src="require('../img/IconsStats/Physical_vamp_icon.png')" rounded v-else-if="keyAttr == 'PhysicalVamp'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <b-img :src="require('../img/IconsStats/Omnivamp_icon.png')" rounded v-else-if="keyAttr == 'Omnivamp'" alt="Rounded image" class="statIcon" v-b-tooltip.hover.left :title="keyAttr"></b-img>
           <div v-else>{{keyAttr}}:</div>
      {{valAttr[0]}}
          </div>
          
      </b-col>
      <b-col md="2">
        <p> {{itemCoefficient}} %</p>
      </b-col>
      <div v-show="passiveState" v-if="itemPassive != ''" class="passiveText" triggers="hover" placement="bottom">
        {{itemPassive}}
      </div>
    </b-row >
</template>

<script>
export default {
  name: 'Item',
  data(){
    return{
    passiveState:false
    }
  },
  props: {
    itemImg: String,
    itemGold: Number,
    itemPassive: String,
    itemAttributes: Object,
    itemName: String,
    itemCoefficient: Number,
    itemValue: Number
  },
  methods:{
    showPassive(){
      this.passiveState= true;
    },
    hidePassive(){
      this.passiveState = false;
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.icon{
  float:left;
}

.passiveText{
  position: absolute;
    background: rgba(230, 230, 230, 0.9);
    margin-left: 80px;
    padding: 5px;
    border-radius: 15px;
    z-index: 9999;
}
.statIcon{
filter: invert(100%)
}
</style>
