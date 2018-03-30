<template lang="pug">
  div
    h1 hello and {{stuff}} 1
    | Here is some more stuff
</template>
<script>
export default {
  name: 'my-component',
  data: function () {
    return {
      stuff: '1 Dribble a little bit more.'
    }
  },
}
</script>
<!-- let's add some style too :) -->
<style scoped zlang="scss">

$zeColor : green;

h1 {
  color: $zeColor;
}
</style>
