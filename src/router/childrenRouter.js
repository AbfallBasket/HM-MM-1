// 引入右侧index子组件
import chart from '../views/chart/chart';
import enterprise from '../views/enterprise/enterprise';
import question from '../views/question/question';
import subject from '../views/subject/subject';
import user from '../views/user/user';

export default [
    {
        path: 'chart',
        component: chart,
        meta: {
            title: '数据概览',
            roles: ['超级管理员','管理员', '老师'],
            fullpath:'/index/chart',
            icon:'el-icon-pie-chart',
        },
    },
    {
        path: 'user',
        component: user,
        meta: {
            title: '用户列表',
            roles: ['超级管理员','管理员', '老师'],
            fullpath:'/index/user',
            icon:'el-icon-user',
        },
    }, {
        path: 'question',
        component: question,
        meta: {
            title: '题库列表',
            roles: ['超级管理员','管理员', '老师', '学生'],
            fullpath:'/index/question',
            icon:'el-icon-edit-outline'
        },
    }, {
        path: 'enterprise',
        component: enterprise,
        meta: {
            title: '企业列表',
            roles: ['超级管理员','管理员'],
            fullpath:'/index/enterprise',
            icon:'el-icon-office-building'
        },
    }, {
        path: 'subject',
        component: subject,
        meta: {
            title: '学科列表',
            roles: ['超级管理员','管理员'],
            fullpath:'/index/subject',
            icon:'el-icon-notebook-2'
        },
    }
];