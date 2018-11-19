import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		id: '',
		name: '',
		user_id: '',
		user_phone: '',
		user_name: '',
		isLoading: false,
		token: '',
		network: true,
		bottomNav: {
			active: 0,
			arr: [
				{
					to: '/',
					icon: {
						normal: 'https://pic.qianxiangbank.com/waps/images/bottom-nav-main.png',
						active: 'https://pic.qianxiangbank.com/waps/images/bottom-nav-main-act.png'
					}
				},
				{
					to: '/topics',
					icon: {
						normal: 'https://pic.qianxiangbank.com/waps/images/bottom-nav-myaccount.png',
						active: 'https://pic.qianxiangbank.com/waps/images/bottom-nav-myaccount-act.png'
					}
				},
				{
					to: '/my',
					icon: {
						normal: 'https://pic.qianxiangbank.com/waps/images/bottom-nav-myaccount.png',
						active: 'https://pic.qianxiangbank.com/waps/images/bottom-nav-myaccount-act.png'
					}
				}
			]
		},
		isBack: false,
		topHomeNavPath: '',
		homeNav: 0,
		backPath: ''
	},
	getters: {
		getNet: state => {
			return state.network;
		}
	},
	mutations: {
		changeNetwork (state, bool) {
			state.network = bool;
		},
		loginSuccess (state, token) {
			state.token = token;
		},
		changeBottomNav (state, obj) {
			state.bottomNav.arr[0].to = obj;
		},
		changeBottomActive (state, obj) {
			state.bottomNav.active = obj;
		},
		changeBack (state, bool) {
			state.isBack = bool;
		},
		changeBackPath (state, value) {
			state.backPath = value;
		},
		changeHomeNav (state, value) {
			state.homeNav = value;
		},
		setUserInfo (state, id, name) {
			state.id = id;
			state.name = name;
		},
		changeLoading (state, bool) {
			state.isLoading = bool;
		}

	},
	actions: {}
});
