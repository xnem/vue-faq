<template>
    <v-dialog v-model="errorDialog" persistent max-width="300">
        <v-card>
            <v-card-title class="headline">Error!</v-card-title>
            <v-card-text>サーバ処理に失敗しました。</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close()">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data(){
        return{
            errorDialog: true
        }
    },
    methods: {
        close(){
            this.$emit("dialog-close");
        }
    }
}
</script>