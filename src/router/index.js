import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import ('@/views/home')
const Layout = () => import ('@/views/layout')
const Question = () => import ('@/views/question')
const Vedio = () => import ('@/views/video')
const User = () => import ('@/views/user')
const Profile = () => import ('@/views/user/profile')
const Chat = () => import ('@/views/user/chat')
const Login = () => import ('@/views/login')
const Article = () => import ('@/views/article')
const Search = () => import ('@/views/search')
const SearchResult = () => import ('@/views/search/result')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout, //  页面展示
    children: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/question',
      component: Question
    },
    {
      path: '/vedio',
      component: Vedio
    },
    {
      path: '/user',
      component: User
    }
    ]
  },
  {
    path: '/user/profile',
    component: Profile // 个人资料
  },
  {
    path: '/user/chat',
    component: Chat //  小智同学
  },
  {
    path: '/login',
    component: Login // 登陆组件
  },
  {
    path: '/article',
    component: Article // 文章内容
  },
  {
    path: '/search',
    component: Search // 文章内容
  },
  {
    path: '/search/result',
    component: SearchResult // 文章内容
  }
]

const router = new VueRouter({
  routes
})

export default router
