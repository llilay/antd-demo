import Vue from 'vue';
import Vuex from 'vuex';
// import state from './store/state';
// import getters from './store/getter';
// import mutations from './store/mutation';
// import actions from './store/action';
// import modules from './store/module';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    // state,
    // getters,
    // mutations,
    // actions,
    // modules
});
