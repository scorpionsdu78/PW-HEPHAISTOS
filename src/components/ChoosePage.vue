<template>
    <v-form>
        <v-list-item one-line v-for="(module) in modules" :key="module.name">
            <v-list-item-content>
                <v-list-item-title>{{module.name}}</v-list-item-title>
                <v-row>
                    <div v-for="(session) in sessions" :key="session.id">
                        <v-col>
                            <v-card color="grey" outlined>
                                <v-card-text>
                                    {{session.name}}
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn :href="'http://localhost:8080/#/Tp/' + session.id + '/exercise/' + null ">
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </div>
                </v-row>
            </v-list-item-content>
        </v-list-item>
    </v-form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    list: []
  }),
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    exercisev (session) {
      return session + 7
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
  },
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession'])
  }

}
</script>
