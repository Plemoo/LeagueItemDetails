<template>
<div>
   <div id="pixiDiv"></div>
   
</div>
</template>

<script>
import {getApp} from "../service/meinHuhn.js"
export default {
  name: 'Game',
  mounted () {
    getApp();
    document.getElementById('pixiDiv').appendChild(getApp())
  },
}
</script>

<style>
</style>