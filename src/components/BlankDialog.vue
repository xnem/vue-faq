<template>
    <v-dialog v-model="blankDialog" persistent max-width="300">
        <v-card>
            <v-card-title class="headline">Caution!</v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close()">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["message"],
    data(){
        return{
            blankDialog: true
        }
    },
    methods: {
        close(){
            this.$emit("dialog-close");
        }
    }
}
</script>