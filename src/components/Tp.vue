<template>
    <v-container>
      <v-col cols="12"
        md="0" align-self="start">
        <v-card>
          <div v-for="(exercise) in list" :key="exercise.id">
            <v-card color="grey" outlined>
              <v-card-text>
                {{exercise.title}}
              </v-card-text>
              <v-btn :href="'http://localhost:8080/#/Tp/' + $route.params.id + '/exercise/' + exercise.id">
                  <v-icon>mdi-eye</v-icon>
              </v-btn>
            </v-card>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-row>
          <v-card
            elevation="4"
            class="mx-auto"
            style="padding-left: 20px; padding-right: 20px">
            <div class="d-flex align-center">
              <h2 style="padding-left: 2%; display: inline-block">{{exercise.title}} </h2>
              <label>{{exercise.instructions}}</label>
              <v-btn :href="'http://localhost:8080/#/choose/'">
                  <v-icon>mdi-eye</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-btn
                color="success"
                class="mb-2"
                tile
                small
                @click="runSolution"
              >
                      Run
                  <v-icon>mdi-play</v-icon>
                </v-btn>
              <CodeEditor
                ref="editorSolution"
              />
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <TestsResult
                    :testsName="(!exercise.loading) ? exercise.test_names : { loading: true }"
                    :testsResult="lastAttemptResults.tests"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-container>
</template>

<script>
import CodeEditor from '@/components/CodeEditor.vue'
import TestsResult from '@/components/TestsResult.vue'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CodeEditor,
    TestsResult
  },
  data: () => ({
    list: [],
    editorSolution: null

  }),
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapState('attempts', ['attempts', 'lastAttemptResults']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExerciseById', 'getExercisesBySessionId']),
    ...mapGetters('attempts', ['getLastAttemptForExercise']),

    moduleId () {
      return parseInt(this.$route.params.moduleId)
    },
    module () {
      return this.modules.find(module => module.id === this.moduleId) || { name: 'Loading...' }
    },
    sessionId () {
      return parseInt(this.$route.params.id)
    },
    exerciseId () {
      return parseInt(this.$route.params.exerciseId)
    },
    exercise () {
      return this.getExerciseById(this.exerciseId) || { lang: 'python', loading: true }
    },
    lastAttempt () {
      return this.getLastAttemptForExercise(this.exerciseId)
    }

  },
  async mounted () {
    await this.fetchModules()
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )
    console.log(this.$route.params.id)
    this.list = this.getExercisesBySessionId(parseInt(this.$route.params.id))
    console.log(this.list)
    console.log(this.exercise.instructions)
  },
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('attempts', ['fetchLastAttemptForExercise']),
    ...mapActions('attempts', ['createAttemptForSession']),

    async runSolution () {
      console.log('running solution...')

      this.editorSolution = this.$refs.editorSolution

      const solution = this.editorSolution.editor.getValue()
      console.log(this.exercise.id)
      console.log(this.sessionId)
      await this.createAttemptForSession({ exerciseId: this.exercise.id, sessionId: this.sessionId, solution })

      await this.getLastAttemptForExercise({ exerciseId: this.exerciseId })
    }
  }
}
</script>
