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
                <v-text-field v-model="email"
                  prepend-icon="email"
                  name="login"
                  label="Email"
                  type="text"
                ></v-text-field>
                <v-text-field @keyup.enter="login"
                  v-model="password"
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
        <v-btn
            block
            color="primary"
            @click="login"
        >
            Login
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
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const isEmailValid = /^\w+\@\w+\.\w+$/.test(this.email);

        if (!isEmailValid) {
          throw new Error('Invalid email');
        }

        const { token } = await Auth.authenticate({
          email: this.email,
          password: this.password,
        });
        this.$store.commit('login', token);
        this.$router.push({
          name: 'home',
        });
      } catch (e) {
        if (e.response) {
          if (e.response.status === 401) {
            this.$store.commit('alert', {
              message: 'Email or password invalid',
            });
          } else if (e.response.data && e.response.data.error) {
            this.$store.commit('alert', {
              message: e.response.data.error,
            });
          }
        } else {
          this.$store.commit('alert', {
            message: e.message,
          });
        }
        console.error(e);
      }
    },
  },
};
</script>
