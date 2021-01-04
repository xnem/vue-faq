<template>
    <div>
        <v-card width="800px" class="mx-auto mt-5">
            <v-card-actions>
                <v-btn v-if="!this.$store.state.fromView && !this.$store.state.isEdit" @click="toHome">Back</v-btn>
                <v-btn v-else @click="unlock">Back</v-btn>
            </v-card-actions><br>
            <v-form>
                <v-card-text>
                    <v-card-title>
                        <h1 class="display-1">Question</h1>
                    </v-card-title>
                    <v-text-field prepend-icon="mdi-lead-pencil" v-model="question" autocomplete="off"/><br>
                    <v-card-title>
                        <h1 class="display-1">Answer</h1>
                    </v-card-title>
                    <v-textarea auto-grow prepend-icon="mdi-lead-pencil" v-model="answer" autocomplete="off"/><br>
                    <v-card-actions>
                        <v-btn v-if="!this.$store.state.isEdit" block=true color="deep-orange" @click="createFAQ">Save</v-btn>
                        <v-btn v-else block=true color="deep-orange" @click="updateFAQ">Save</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-form>
        </v-card>

        <!-- 未入力ダイアログ -->
        <BlankDialog v-if="blankDialog" message="QuestionとAnswerは入力必須です。" v-on:dialog-close="blankDialog=false"></BlankDialog>

        <!-- サーバー処理エラーダイアログ -->
        <ErrorDialog v-if="errorDialog" v-on:dialog-close="errorDialog=false"></ErrorDialog>        
    </div>
</template>

<script>
import router from '../router';
import axios from 'axios';
import ErrorDialog from '../components/ErrorDialog.vue';
import BlankDialog from '../components/BlankDialog.vue';

export default {
    components: {
        ErrorDialog: ErrorDialog,
        BlankDialog: BlankDialog
    },
    data(){
        return{
            qandaid: 0,
            question: "",
            answer: "",
            blankDialog: false,
            errorDialog: false
        }
    },
    created(){
        this.qandaid = this.$store.state.faq[0];
        this.question = this.$store.state.faq[1];
        this.answer = this.$store.state.faq[2];
    },
    methods: {
        createFAQ(){
            if(this.question == "" || this.answer == "" || this.question == null || this.answer == null){
                this.blankDialog = true;
            }else{
                /*
                    新規データ保存のAPIを実行
                */
                axios.post(
                    "/api/insert/",
                    {
                        question: this.question,
                        answer: this.answer
                    },
                    {
                        withCredentials: true
                    }
                ).then( response => {
                    console.log(response + "新規データ保存に成功しました。");
                    this.$store.state.faqs = [];
                    this.$store.state.displayNumberOfHit = false;
                    router.push('/');
                }).catch( error => {
                    console.log(error + "新規データ保存に失敗しました。");
                    this.errorDialog = true;
                });
            }
        },
        updateFAQ(){
            if(this.question == "" || this.answer == "" || this.question == null || this.answer == null){
                this.blankDialog = true;
            }else{
                /*
                    データupdateのAPIを実行
                */
                axios.post(
                    "api/update/",
                    {
                        qandaid: this.qandaid,
                        question: this.question,
                        answer: this.answer
                    },
                    {
                        withCredentials: true
                    }
                ).then( response => {
                    console.log(response + "上書き保存に成功しました。");
                    this.$store.state.isEdit = false;
                    this.$store.state.faq = [];
                    this.$store.state.faqs = [];
                    this.$store.state.displayNumberOfHit = false;
                    router.push('/');
                }).catch( error => {
                    console.log(error + "上書き保存に失敗しました。");
                    this.errorDialog = true;
                })
            }
        },
        unlock(){
            /*
                排他ロックの解除
            */
            axios.delete(
                "/api/unlock",
                {
                    params: {
                        qandaid: this.qandaid
                    }
                }
            ).then( response => {
                console.log(response);
                if(this.$store.state.fromView){
                    this.toView();
                }else{
                    this.toHome();
                }
            }).catch( error => {
                console.log( error + "排他解除に失敗しました。");
                this.errorDialog = true;
            })
        },
        toView(){
            this.$store.state.isEdit = false;
            this.$store.state.fromView = false;
            router.push('/view');
        },
        toHome(){
            this.$store.state.isEdit = false;
            this.$store.state.faq = [];
            if(this.$store.state.faqs.length == 0){
                this.$store.state.displayNumberOfHit = false;
            }
            router.push('/');
        }
    }
}
</script>