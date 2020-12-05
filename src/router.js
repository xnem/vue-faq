// npm install vue-routerを実行してからこのファイルを作成
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import View from './views/View.vue';
import Edit from './views/Edit.vue';

// プラグインの適用。vue-routerを使うという宣言。
Vue.use(Router);

// pathとコンポーネントとをマッピングする。
export default new Router({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/view',
            component: View
        },
        {
            path: '/edit',
            component: Edit
        }
    ]
});