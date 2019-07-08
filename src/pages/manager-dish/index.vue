<template lang="pug">
div
  Row(type="flex" justify="center" class="code-row-bg")
    Col(:xs="22" :sm="18" :md="14" :lg="10")
      h2 菜品管理系统
      span.link(@click="to('/manager-dish/adminLogin')") 登录
      span.link(@click="to('/manager-dish/add')") 添加
      span.link(@click="to('/manager-dish/adminOperator')") 管理
  router-view
</template>

<script>
export default {
  name: 'index',
  methods: {
    to (path) {
      // this.$router.go(-1)
      this.$router.push('/manager-dish')
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus" scoped>
.link{
  margin-right 20px
  color #4469ff
  cursor:pointer
}
</style>
