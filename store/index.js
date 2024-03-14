import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		HTTP:"https://api.cdszly.cn/ckapi", //https://api.cdszly.cn/ckapi http://192.168.0.126:6100
		wxappMPID:"wx7ea51ce444247ef1",//微信小程序id 
	},
	modules: {
		user
	},
	getters
})

export default store
