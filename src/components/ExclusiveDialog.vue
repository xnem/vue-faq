<template>
    <v-dialog v-model="exclusiveDialog" persistent max-width="300">
        <v-card>
            <v-card-title class="headline">Caution!</v-card-title>
            <v-card-text>他のユーザーが編集中です。</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close()">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data(){
        return{
            exclusiveDialog: true
        }
    },
    methods: {
        close(){
            this.$emit("dialog-close");
        }
    }
}
</script>