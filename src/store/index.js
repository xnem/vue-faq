import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isEdit: false, // 編集モードならtrue、新規モードならfalse
        fromView: false, // 閲覧画面から遷移してきたかどうかの判断に使う
        faq: [], // 1つのQ&Aのidとquestionとanswer
        faqs: [], // 検索結果
        displayNumberOfHit: false  // Homeに検索ヒット数を表示するか否か
    }
})