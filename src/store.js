const SCHOOL_KEY = 'upccaicaischool'// 保存选择的学校
const LOGED_KEY = 'upccaicailoged'// 用户是否登录的状态保存，保存登录用户的用户和id
const SHOWIMG_KEY = 'upccaicaiifshowimg'// 用户是否登录的状态保存，保存登录用户的用户和id
const SHOWRECOMMMEND_KEY = 'upccaicaiifshowrecommend'// 用户是否登录的状态保存，保存登录用户的用户和id
const state = { // 状态库，将会被共享
  // 这里要注意 其他vue用的时候必须把state全拿走 不然检测不到里面数据的变化
  user: JSON.parse(window.localStorage.getItem(LOGED_KEY || '')), // 判断登录的用户名
  ifLogin: JSON.parse(window.localStorage.getItem(LOGED_KEY || '')) !== null,
  ifShowImg: JSON.parse(window.localStorage.getItem(SHOWIMG_KEY || '')) === null ? true : JSON.parse(window.localStorage.getItem(SHOWIMG_KEY || '')),
  ifShowRecommend: JSON.parse(window.localStorage.getItem(SHOWRECOMMMEND_KEY || '')) === null ? true : JSON.parse(window.localStorage.getItem(SHOWRECOMMMEND_KEY || '')),
  // noticesCount: JSON.parse(window.localStorage.getItem(NOTICE_COUNT || ''))
  noticesCount: 0
}

export default {
  debug: true,
  state: state,
  navState: 0,
  setIfLoginAction (newValue) {
    this.state.user = newValue
    this.state.ifLogin = true
    this.saveLogin(newValue)
  },
  setIfShowImg (newValue) {
    this.state.ifShowImg = newValue
    this.saveShowImg(newValue)
  },
  setIfShowRecommend (newValue) {
    this.state.ifShowRecommend = newValue
    this.saveShowRecommend(newValue)
  },
  setNoticesCount (nV) {
    this.state.noticesCount = nV
  },
  clearIfLoginAction () {
    this.state.user = ''
    this.state.ifLogin = false
    this.saveLogin(null)
  },
  saveLogin (un) {
    // 注销传 null
    window.localStorage.setItem(LOGED_KEY, JSON.stringify(un))
  },
  saveSchool (school) {
    window.localStorage.setItem(SCHOOL_KEY, JSON.stringify(school))
  },
  saveShowImg (ifShowImg) {
    window.localStorage.setItem(SHOWIMG_KEY, JSON.stringify(ifShowImg))
  },
  saveShowRecommend (ifShowRecommend) {
    window.localStorage.setItem(SHOWRECOMMMEND_KEY, JSON.stringify(ifShowRecommend))
  }
}
