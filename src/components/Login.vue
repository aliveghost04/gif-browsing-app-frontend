<template>
<v-container fluid fill-height>
<v-layout align-start justify-center>
<v-flex xs12 sm8 md4>
    <div class="text-xs-center">
        <router-link :to="{
            name: 'home'
        }">
            <img class="mb-4"
                src="../assets/logo.png"
            >
        </router-link>
    </div>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field prepend-icon="person" name="login" label="Email" type="text"></v-text-field>
                <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
        <v-btn color="primary" block>Login</v-btn>
        </v-card-actions>
    </v-card>
</v-flex>
</v-layout>
</v-container>
</template>
