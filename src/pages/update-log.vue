<template lang="pug">
div
  h1 这个是更新日志
  Row(type="flex" justify="center" class="code-row-bg")
    Col(span="10")
      Card
        h1(slot="title") 用了iview
        p 辛紫麒试一试推git
</template>

<script>
export default {
  name: 'updata-log'
}
</script>

<style lang="stylus" scoped>

</style>
