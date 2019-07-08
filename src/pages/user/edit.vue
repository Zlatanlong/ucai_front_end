<template lang="pug">
div
  Row(type="flex" justify="center" class="code-row-bg" align="middle")
    Col(:xs="22" :sm="10" :md="10" :lg="10")
      h2 编辑个人资料
      h1 {{user.name}}
      Tooltip(content="邮箱暂时不支持更改") 邮箱 {{user.email}}
      Form(ref="userform" :model="user" :rules="rules")
        FormItem(label="联系电话" prop="phonenum")
          Input(v-model="user.phonenum" placeholder="请输入您的联系方式" number)
        FormItem(label="联系QQ" prop="qq")
          Input(v-model="user.qq" placeholder="请输入您的QQ" number)
        FormItem(label="入学年份" prop="enrollmentYear")
          Select(v-model="user.enrollmentYear" placeholder="选择入学年份")
            Option(v-for="(item, index) in yearList" :value="item" :key="index") {{item}}
        FormItem
          Button(@click="handleSubmit('userform')") 保存
          Button(@click="$router.push('/user/' + user.id + '/info')" style="margin-left:20px") 返回个人信息
</template>

<script>
import Store from '@/store.js'
export default {
  name: 'edit',
  data () {
    return {
      user: {},
      yearList: [],
      rules: {
        phonenum: [
          {type: 'number', message: '请输入正确的手机号', trigger: 'blur'}
        ],
        qq: [
          {type: 'number', message: '请输入正确的qq', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    getYearList () {
      for (let i = 2018; i > 1990; i--) {
        this.yearList.push(i)
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.put(`/user/change/userinfo/${this.user.id}`, {
            phonenum: this.user.phonenum,
            qq: this.user.qq,
            enrollmentYear: this.user.enrollmentYear
          }).then(res => {
            if (res.data.code === 0) {
              this.$Message.success('提交成功！')
              Store.setIfLoginAction(this.user)
              this.$router.push(`/user/${this.user.id}/info`)
            } else {
              this.$Message.error('提交失败,未知错误')
            }
          }, err => {
            console.log(err)
            this.$Message.error('提交失败,服务器错误')
          })
        } else {
          this.$Message.error('提交失败!')
        }
      })
    }
  },
  created () {
    if (!Store.state.ifLogin) {
      this.$router.push('/login')
    } else {
      this.user = Store.state.user
      this.getYearList()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
