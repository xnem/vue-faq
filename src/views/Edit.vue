<template>
    <div>
        <v-card width="800px" class="mx-auto mt-5">
            <v-card-actions>
                <v-btn @click="toBefore">Back</v-btn>
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
                        <v-btn block=true color="deep-orange" @click="createFAQ">Save</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-form>
        </v-card>
        <!-- エラーダイアログ -->
        <v-dialog v-model="errorDialog" persistent max-width="300">
            <v-card>
                <v-card-title class="headline">Error!</v-card-title>
                <v-card-text>サーバ処理に失敗しました。</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="errorDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 未入力ダイアログ -->
        <v-dialog v-model="blankDialog" persistent max-width="300">
            <v-card>
                <v-card-title class="headline">Caution!</v-card-title>
                <v-card-text>QuestionとAnswerは入力必須です。</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="blankDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import router from '../router';
import axios from 'axios';
export default {
    data(){
        return{
            question: "",
            answer: "",
            blankDialog: false,
            errorDialog: false
        }
    },
    created(){
        this.question = this.$store.state.faq[1];
        this.answer = this.$store.state.faq[2];
    },
    methods: {
        createFAQ(){
            if(!this.$store.state.isEdit){  // 新規作成ならこっち
                if(this.question == "" || this.answer == ""){
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
                    )
                    .then( response => {
                        console.log(response + "新規データ保存に成功しました。");
                        this.$store.state.faqs = [];
                        this.$store.state.displayNumberOfHit = false;
                        router.push('/');
                        }
                    ).catch( error => {
                        console.log(error + "新規データ保存に失敗しました。");
                        this.errorDialog = true;
                    });
                }
            }else{  // 編集ならこっち
                if(this.question == "" || this.answer == ""){
                    this.blankDialog = true;
                }else{
                    /*
                        データupdateのAPIを実行
                    */
                    axios.post(
                        "api/update/",
                        {
                            qandaid: this.$store.state.faq[0],
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
                    }
                    ).catch( error => {
                        console.log(error + "上書き保存に失敗しました。");
                        this.errorDialog = true;
                    })
                }
            }
        },
        toBefore(){
            if(!this.$store.state.fromView){
                this.$store.state.isEdit = false;
                this.$store.state.faq = [];
                if(this.$store.state.faqs.length == 0){
                    this.$store.state.displayNumberOfHit = false;
                }
                router.push('/');
            }else{
                this.$store.state.isEdit = false;
                this.$store.state.fromView = false;
                router.push('/view');
            }
        }
    }
}
</script>