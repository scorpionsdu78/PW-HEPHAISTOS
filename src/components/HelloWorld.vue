<template>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="email"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-textarea
              v-model="password"
              label="password"
              :rules="PasswordRules"
              required
              auto-grow
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
            md="12"
          >
          <div class="my-2">
            <v-btn small @click="buttonCliked" :disabled=!valid>submit</v-btn>
          </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    state: false,
    valid: false,
    title: '',
    password: 'duxZ1U8GMs',
    todos: [],
    titleRules: [
      v => !!v || 'title is required', /* ! => oposite !!=> oposite oposite !![anyVar] true if the var is not empty false if the var is empty */
      v => v.length <= 10 || 'Name must be less than 10 characters',
      v => v !== 'francois' || 'francois est pas pd'
    ],
    PasswordRules: [
      v => !!v || 'content is required'
    ],
    email: 'admin@example.com',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  computed: {
    ...mapState('user', ['user']),
    ...mapGetters('user', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('user', ['login']),

    async buttonCliked () {
      if (!this.valid) {
        return
      }
      console.log('the button is cliked', this.email, this.password)
      /* this.axios.post('http://localhost:3000/api/v1/login', {
        username: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({ name: 'Activity' })
        console.log('coucou')
      }).catch((err) => {
        console.log(err)
        console.log('ça marche pas')
      }) */
      await this.login({ email: this.email, password: this.password })
      console.log(this.isAuthenticated)
      this.$router.push({ name: 'ChoosePage' })
    }
  }
}
</script>
