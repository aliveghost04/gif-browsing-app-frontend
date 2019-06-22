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
            <v-toolbar-title>Registry form</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field v-model="user.firstName" prepend-icon="person" label="First Name" type="text"></v-text-field>
                <v-text-field v-model="user.lastName" prepend-icon="person" label="Last Name" type="text"></v-text-field>
                <v-text-field v-model="user.email" prepend-icon="email" label="Email" type="email"></v-text-field>
                <v-text-field v-model="user.password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
        <v-btn
            block
            color="primary"
            @click="register"
        >
            Register
        </v-btn>
        </v-card-actions>
    </v-card>
</v-flex>
</v-layout>
</v-container>
</template>

<script>
import Auth from '../services/Auth';

export default {
  name: 'Register',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async register() {
      try {
        const isEmailValid = /^\w+\@\w+\.\w+$/.test(this.user.email);

        if (!isEmailValid) {
          throw new Error('Invalid email');
        }

        await Auth.register(this.user);
        this.$router.push({
          name: 'login',
        });
      } catch (e) {
        this.$store.commit('alert', {
          message: e.message,
        });
        console.error(e);
      }
    },
  },
};
</script>
