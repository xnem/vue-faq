<template>
    <v-dialog v-model="deleteDialog" persistent max-width="300">
        <v-card>
            <v-card-title class="headline">削除確認</v-card-title>
            <v-card-text>本当に削除しますか？</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close()">キャンセル</v-btn>
                <v-btn color="red" text @click="deleteContent">削除</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data(){
        return{
            deleteDialog: true
        }
    },
    methods: {
        close(){
            this.$emit("dialog-close");
        },
        deleteContent(){
            this.$emit("delete-content");
        }
    }
}
</script>