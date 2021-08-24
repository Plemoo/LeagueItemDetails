<template>
<div>
      <h1 class="text-center display-3">How it works</h1>
      <div class="bigger-font">
    <p>
       <router-link class="tall-font" to="/ItemsByCategory">Here</router-link> you will find all the <b>Items</b> of the selected <b>Patch</b> with their <b>Attributes</b>, <b>Gold</b> and a <b>Coefficient</b>.
    </p>
    <p>
      If you open the <b>Sidebar</b> (click on "Show Sidebar" infront the Image), you can see an <b>Inventory</b>, where you can add Items by <b>clicking</b> on them. To remove them you have to click on the inventory icon.
    </p>
    <p>
      For the calculation of the <b>Coefficient</b>, the Item of category, which has the lowest Gold value is used as reference. Depending on that Gold to Attribut Value ratio, the coefficient for the other Items will be calculated.
    </p>
    <p>
      Please be aware that I am not able to interpret the abilities of an Item into the coefficient. Therefore the coefficient should be used as an general indicator.
    </p>
      </div>
</div>
</template>

<script>
export default {
  name: 'HowItWorks'
}
</script>

<style>
.bigger-font{
  font-size: 20px;
}
.tall-font{
  font-size: 25px;
}
</style>