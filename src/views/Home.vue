<template>
    <div>
        <v-card width="800px" class="mx-auto mt-5">
            <v-card-title>
                <h1 class="display-1">FAQ</h1>
                <v-spacer></v-spacer>
                <div align="right" v-show="this.$store.state.displayNumberOfHit">検索結果：{{this.faqs.length}}件</div>
            </v-card-title>

            <v-card-text>
                <v-form>
                    <v-text-field prepend-icon="mdi-magnify" label="検索ワード" v-model="word" autocomplete="off"/>
                    <v-card-actions>
                        <v-btn id="search" block=true color="deep-orange" @click="searchFAQ">Search</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn block=true @click="toAdd">Add Content</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card width="800px" class="mx-auto mt-5" v-for="faq in faqs" :key="faq.createAt">
            <v-card-title>
                <h3>Q.{{ faq[1] }}</h3>
            </v-card-title>
            <v-card-title>
                <h5>A.{{ faq[2] }}</h5>
            </v-card-title>
            <v-card-actions>
                <v-btn @click="toView(faq)">View</v-btn><v-btn @click="checkLock(faq)">Edit</v-btn>
            </v-card-actions>
        </v-card>

        <!-- 未入力ダイアログ -->
        <BlankDialog v-if="blankDialog" message="検索ワードを入力してください。" v-on:dialog-close="blankDialog=false"></BlankDialog>

        <!-- サーバー処理エラーダイアログ -->
        <ErrorDialog v-if="errorDialog" v-on:dialog-close="errorDialog=false"></ErrorDialog>

        <!-- 排他制御ダイアログ -->
        <ExclusiveDialog v-if="exclusiveDialog" v-on:dialog-close="exclusiveDialog=false"></ExclusiveDialog>

    </div>
</template>

<script>
import router from '../router';
import axios from 'axios';
import ErrorDialog from '../components/ErrorDialog.vue';
import BlankDialog from '../components/BlankDialog.vue';
import ExclusiveDialog from '../components/ExclusiveDialog.vue';

export default {
    components: {
        ErrorDialog: ErrorDialog,
        BlankDialog: BlankDialog,
        ExclusiveDialog: ExclusiveDialog
    },
    data(){
        return{
            faqs: this.$store.state.faqs,
            word: "",
            blankDialog: false,
            errorDialog: false,
            exclusiveDialog: false
        }
    },
    methods:{
        toView(faq){
            this.$store.state.faq = faq;
            router.push('/view');
        },
        toAdd(){
            router.push('/edit');
        },
        checkLock(faq){
            /*
                排他制御のチェック
            */
            axios.get(
                "/api/check",
                {
                    params: {
                        qandaid: faq[0]
                    }                
                }
            ).then( response => {
                if(response.data.data[0][0] > 0){ // 他のユーザーが編集中の場合、排他ダイアログを表示
                    this.exclusiveDialog = true;
                }else{
                    this.toEdit(faq);
                }
            }).catch(error => {
                console.log(error);
                this.errorDialog = true;
            })
        },
        toEdit(faq){
            /*
                排他ロックをして編集画面に遷移
            */
            axios.post(
                "/api/lock/",
                {
                    qandaid: faq[0]
                }
            ).then( response => {
                console.log(response);
                this.$store.state.faq = faq;
                this.$store.state.isEdit = true;
                router.push('/edit');
            }).catch( error => {
                console.log(error);
                this.errorDialog = true;
            })
        },
        searchFAQ(){
            if(this.word == ""){
                this.blankDialog = true;
            }else{
                /*
                    検索APIを実行
                */
                axios.get(
                    "/api/search",
                    {
                        params: {
                            word: this.word
                        }
                    }
                ).then( response => {
                    document.getElementById("search").blur();
                    this.faqs = response.data.data;
                    this.$store.state.faqs = this.faqs;
                    this.$store.state.displayNumberOfHit = true;
                }).catch( error => {
                    console.log(error + " 検索に失敗しました。");
                    this.errorDialog = true;
                });
            }
        }
    }
}
</script>