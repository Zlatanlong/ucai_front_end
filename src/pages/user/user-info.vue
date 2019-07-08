<template lang="pug">
  div.tab-one
    Card
      Row(type="flex" justify="start" class="code-row-bg" align="middle")
        Col(span="")
          Avatar(shape="square" size="large"
          :src="user.userHeadUrl"
          style="color: #f56a00;background-color: #fde3cf;") {{user.name===undefined?'':user.name.substring(0,1)}}
        Col(span="")
          Modal(v-model="model" title="上传头像" @on-ok="upload")
            h3 图片格式限制：jpg, jpeg, png
            h3 图片大小限制：我们压缩后要求小于0.2MB（约200KB）所以尽量小一点
            p tips: 压缩率通常可达90%或以上哦！
            Upload(action="" :format="['jpg','jpeg','png']" :max-size="1024" :before-upload="handleUpload" @on-exceeded-size="uploadError")
              Button(type="info") 点击上传头像
              div(v-if="this.file !== null") 已选择文件：{{this.file.name}}，点击重新选择
                Progress(:percent="percent") 压缩进度
          Badge(dot v-if="user.userHeadUrl === null")
            Button(@click="model = true" type="text") 修改头像
          Button(v-else @click="model = true" type="text") 修改头像
        Col(span="" offset="1")
          h2 {{user.name}}
      p 个人信息
      p email: {{user.email === null ? '请完善' : user.email}}
      p 入学年份: {{user.enrollmentYear === null ? '请完善' : user.enrollmentYear}}
      p 联系电话: {{user.phonenum === null ? '请完善' : user.phonenum}}
      p qq: {{user.qq === null ? '请完善' : user.qq}}
      Button.button(@click="toChangeProfile") 编辑个人资料
</template>

<script>
import lrz from 'lrz'
import Store from '@/store.js'
export default {
  name: '',
  props: ['userId'],
  data () {
    return {
      user: {},
      model: false,
      percent: 0,
      file: null
    }
  },
  methods: {
    getUser () {
      this.$http.get('/user/get').then(res => {
        if (res.data.code === 0) {
          this.user = res.data.data
        } else {
          this.$Message.error('未知错误')
        }
      }, err => {
        console.log(err)
        this.$Message.error('服务器开小差了')
      })
    },
    handleUpload (file) {
      let originFile = file
      this.percent = 50
      lrz(originFile).then(
        (rst) => {
          if (rst.fileLen <= 200000) {
            this.file = this.dataURLtoFile(rst.base64, rst.origin.name)
            this.percent = 100
          } else {
            this.$Message.error('图片过大，请换一张小一点的一定行！')
            this.file = null
          }
        }
      ).catch(err => console.log(err))
      return false
    },
    dataURLtoFile (dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, {type: mime})
    },
    upload () {
      if (this.file !== null) {
        let formData = new FormData()
        formData.append('id', this.userId)
        formData.append('file', this.file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$Spin.show()
        this.$http.post('/user/change/userhead', formData, config).then(res => {
          this.$Spin.hide()
          if (res.data.code === 0) {
            this.$Message.success('上传成功')
            Store.setIfLoginAction(res.data.data)
            this.user.userHeadUrl = res.data.data.userHeadUrl
            this.file = null
            this.percent = 0
          } else if (res.data.code === -1) {
            this.$Message.error('上传失败：图片过大')
          }
        }).catch(err => {
          console.log(err)
          this.$Spin.hide()
          this.$Message.error('上传失败')
        })
      }
    },
    uploadError () {
      this.$Message.err('上传失败')
    },
    toChangeProfile () {
      this.$router.push('/edit')
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style scoped lang="stylus">
.tab-one{
    p{
      margin 20px auto
    }
    .button{
      margin-top 20px
    }
  }
</style>
