<template>
<div>
  <Modal
    v-model="modal"
    title="激活成功！"
    @on-ok="ok"
    @on-cancel="ok"
    @on-visible-change="ok">
    <p>感谢您的注册！</p>
    <p>激活成功！</p>
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
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
