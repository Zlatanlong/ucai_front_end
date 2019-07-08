<template>
  <div>
    <Modal
      v-model="modal"
      title="激活失败！"
      @on-ok="ok"
      @on-cancel="ok"
      @on-visible-change="ok">
      <p>感谢您的注册！</p>
      <p>激活失败！</p>
      <p>请检查邮件</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'activate-success',
  data () {
    return {
      modal: true
    }
  },
  methods: {
    ok () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>

</style>
