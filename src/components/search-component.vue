<template lang="pug">
  Row(type="flex" justify="center" class="code-row-bg" align="middle")
    Col(span="20")
      AutoComplete(
      v-model="searchSth"
      :data="searchAdvice"
      :filter-method="filterMethod"
      placeholder="搜索菜菜或餐厅")
    Col(span="4")
      Button(@click="search" type="primary" icon="ios-search")
</template>

<script>
export default {
  name: 'search-component',
  data () {
    return {
      searchSth: '',
      searchAdvice: []
    }
  },
  methods: {
    filterMethod (value, option) {
      if (value === '') {
        return
      }
      return option.indexOf(value) !== -1
    },
    search () {
      if (this.searchSth !== '') {
        this.$router.push('/search/' + this.searchSth)
        this.searchSth = ''
        this.$emit('search')
      }
    }
  },
  created () {
    this.$http.get('/dish/get/all').then(
      res => {
        if (res.data.code === 0) {
          for (let i = 0; i < res.data.data.length; i++) {
            this.searchAdvice.push(res.data.data[i].name)
          }
        }
      }, err => {
        console.log(err)
      }
    )
    this.$http.get('/restaurant/get/all').then(
      res => {
        if (res.data.code === 0) {
          for (let i = 0; i < res.data.data.length; i++) {
            this.searchAdvice.push(res.data.data[i].name)
          }
        }
      }, err => {
        console.log(err)
      }
    )
  }
}
</script>

<style scoped lang="stylus">
</style>
