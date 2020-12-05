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
                        <v-btn block=true @click="toEdit">Add Content</v-btn>
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
                <v-btn @click="toView(faq)">View</v-btn><v-btn @click="toEdit2(faq)">Edit</v-btn>
            </v-card-actions>
        </v-card>

        <!-- 未入力ダイアログ -->
        <v-dialog v-model="blankDialog" persistent max-width="300">
            <v-card>
                <v-card-title class="headline">Caution!</v-card-title>
                <v-card-text>検索ワードを入力してください。</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="blankDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
    </div>
</template>

<script>
import router from '../router';
import axios from 'axios';

export default {
    data(){
        return{
            faqs: this.$store.state.faqs,
            word: "",
            blankDialog: false,
            errorDialog: false
        }
    },
    methods:{
        toView(faq){
            this.$store.state.faq = faq;
            router.push('/View');
        },
        toEdit(){
            router.push('/Edit');
        },
        toEdit2(faq){
            this.$store.state.faq = faq;
            this.$store.state.isEdit = true;
            router.push('/Edit');
        },
        searchFAQ(){
            if(this.word == ""){
                this.blankDialog = true;
            }else{
                /*
                    検索APIを実行
                */
                axios.get(
                    "/api/search/",
                    {
                        params: {
                            word: this.word
                        }
                    }
                ).then( response => {
                    console.log("検索に成功しました。");
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