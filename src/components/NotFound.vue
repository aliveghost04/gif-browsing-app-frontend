<template>
<v-container text-xs-center fill-height>
<v-layout align-center>
    <v-flex xs12 align-center>
        <v-icon class="not-found" color="warning">report</v-icon>
        <h2>404 - Page not found</h2>
        <v-btn
            flat
            :to="{
                name: 'home'
            }"
        >
            <v-icon>home</v-icon>&nbsp;
            Home
        </v-btn>
    </v-flex>
</v-layout>
</v-container>
</template>

<style scoped>
    .not-found {
        font-size: 10em;
    }
</style>
