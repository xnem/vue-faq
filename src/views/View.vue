<template>
    <div>
        <v-card width="800px" class="mx-auto mt-5">
            <v-card-actions>
                <v-btn @click="backHome">Back</v-btn>
                <v-btn @click="editContent">Edit</v-btn>
                <v-spacer></v-spacer>
                <v-icon @click="displayDeleteDialog">mdi-delete</v-icon>
            </v-card-actions>
            <v-card-title>
                <h1 class="display-1">Q.{{ question }}</h1>
            </v-card-title>
            <v-card-title>
                <h5 style="white-space:pre-wrap;">A.{{ answer }}</h5>
            </v-card-title>
        </v-card>

        <!-- 削除確認ダイアログ -->
        <v-dialog v-model="deleteDialog" persistent max-width="300">
            <v-card>
                <v-card-title class="headline">削除確認</v-card-title>
                <v-card-text>本当に削除しますか？</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="deleteDialog = false">キャンセル</v-btn>
                    <v-btn color="red" text @click="deleteContent">削除</v-btn>
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
            question: "",
            answer: "",
            deleteDialog: false,
            errorDialog: false
        }
    },
    created(){
        this.question = this.$store.state.faq[1];
        this.answer = this.$store.state.faq[2];
    },
    methods: {
        backHome(){
            this.$store.state.faq = [];
            router.push('/');
        },
        editContent(){
            this.$store.state.isEdit = true;
            this.$store.state.fromView = true;
            router.push('/edit');
        },
        displayDeleteDialog(){
            this.deleteDialog = true;
        },
        deleteContent(){
            axios.delete(
                "/api/delete/",
                {
                    params: {
                        qandaid: this.$store.state.faq[0]
                    }
                }
            ).then( response => {
                console.log(response);
                this.$store.state.faq = [];
                this.$store.state.faqs = [];
                this.$store.state.displayNumberOfHit = false;
                router.push('/');
            }).catch( error => {
                console.log(error + "削除に失敗しました。");
                this.errorDialog = true;
            })
        }
    }
}
</script>