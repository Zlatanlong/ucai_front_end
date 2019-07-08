<template lang="pug">
Row(type="flex" justify="center" class="code-row-bg")
  Col(:xs="22" :sm="18" :md="14" :lg="10")
    h4.title 添加菜品
    Form(ref="form" :model="form" :rules="rules" label-position="top")
      FormItem(label="菜名" prop="name")
        Input(v-model="form.name" placeholder="请输入菜名")
      FormItem(label="餐厅" prop="restaurantId")
        Select(v-model="form.restaurantId" filterable)
          Option(v-for="(item, index) in restaurantList" :key="index" :value="item.id") {{item.name}}
      FormItem(label="价格" prop="price")
        Input(v-model="form.price" placeholder="请输入价格" number)
      FormItem(label="描述" prop="description")
        Input(v-model="form.description" placeholder="请输入描述，让大家更快了解菜品" type="textarea" :autosize="{minRows: 3,maxRows: 3}")
      FormItem(label="上传图片（必传）")
        Upload(:before-upload="handleUpload" action="" :format="['jpg','jpeg','png']"
        :max-size="2048")
          Button(icon="ios-cloud-upload-outline") 上传图片
          div(v-if="this.form.file !== null") 已选择文件：{{this.form.file.name}}，点击重新选择
      FormItem
        Button(type="primary" @click="handleSubmit('form')") 提交
        Button(@click="handleReset('form')" style="float:right") 重填
</template>

<script>
export default {
  name: 'add-dish',
  data () {
    return {
      form: {
        name: '',
        price: null,
        file: null,
        description: '',
        restaurantId: null,
        restaurantName: ''
      },
      rules: {
        name: [
          {required: true, message: '名字不能为空', trigger: 'blur'}
        ],
        restaurantId: [
          {required: true, type: 'number', message: '请选择餐厅', trigger: 'blur'}
        ],
        price: [
          {required: true, type: 'number', message: '请输入正确的价格'}
        ]
      },
      restaurantList: []
    }
  },
  methods: {
    handleUpload (file) {
      this.form.file = file
      return false
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.form.file === null) {
            this.$Message.error('请上传图片！')
            return
          }
          let formData = new FormData()
          formData.append('file', this.form.file)
          formData.append('name', this.form.name)
          formData.append('price', this.form.price)
          formData.append('description', this.form.description)
          formData.append('restaurantId', this.form.restaurantId)
          formData.append('restaurantName', this.getRestaurantName(this.form.restaurantId))
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$Spin.show()
          this.$http.post('/dish-manager/add', formData, config).then(res => {
            this.$Spin.hide()
            if (res.data.code === 0) {
              this.$Modal.success({
                title: '添加成功',
                content: '是否继续添加？',
                onOk: () => {
                  this.$router.push('/manager-dish/add')
                },
                onCancel: () => {
                  this.$router.push('/manager-dish')
                }
              })
            } else if (res.data.code === 3) {
              this.$Message.error('请登录菜管!')
              this.$router.push('/manager-dish/adminLogin')
            } else {
              this.$Message.error('提交失败！')
            }
          }, err => {
            this.$Spin.hide()
            this.$Message.error('提交失败！')
            console.log(err)
          })
        } else {
          this.$Message.error('提交失败！')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getRestaurantName (id) {
      for (let i = 0; i < this.restaurantList.length; i++) {
        if (this.restaurantList[i].id === id) {
          return this.restaurantList[i].name
        }
      }
    }
  },
  created () {
    this.$http.get('/restaurant/get/all').then(res => {
      this.restaurantList = res.data.data
    }, err => {
      console.log(err)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .title{
    margin 20px auto
  }
</style>
