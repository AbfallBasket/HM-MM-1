


import Vue from 'vue';

import moment from '../../node_modules/moment';

Vue.filter('myTime',(value) =>{
    return moment(value).format('YYYY-MM-DD');
});















