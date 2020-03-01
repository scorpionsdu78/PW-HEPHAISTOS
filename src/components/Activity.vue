<template>
    <v-form>
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="titre"
                    label="titre"
                ></v-text-field>
                </v-col>
                <v-col>
                    <v-combobox
                    v-model="select"
                    :items="items"
                    label="language"
                    ></v-combobox>
                </v-col>
                <v-col>
                    <v-btn small color="primary" @click="onSave">add</v-btn>
                </v-col>
            </v-row>
            <v-row> </v-row>
            <v-row>
                <v-col>
                    <h4>CONSIGNE</h4>
                    <v-textarea
                    v-model="consigne"
                    autocomplete="consigne"
                    rows=10
                    ></v-textarea>
                </v-col>
                <v-col>
                    <h4>UNIT TEST</h4>
                    <CodeEditor
                    v-model="test"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-row>
                        <v-col>
                            <h4>sandBox</h4>
                        </v-col>
                        <v-col>
                         <v-btn small color="primary" @click="onTest">test</v-btn>
                        </v-col>
                    </v-row>
                    <CodeEditor
                    v-model="sandBox"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                    class="mx-auto"
                    style="padding: 20px; margin-top: 20px"
                    >
                    <h2 style="color: #a0a0a0">Console output :</h2>
                    <code
                        style="height: 45rem; color: #a0a0a0; padding: 2px; overflow: auto; font-size: 12px; width: 100%"
                        color="black"
                    >{{consoleOutput}}</code>
                    </v-card>
                </v-col>
            </v-row>
            <v-col
          cols="6"
          md="6">
          <v-card
            class="mx-auto"
            style="padding: 20px; margin-top: 20px"
            >
            <h2 style="color: #a0a0a0">Test results :</h2>
            <div
              style="height: 45rem; color: #a0a0a0; padding: 15px; overflow: auto">

              <div v-for="(result, index) in resultTest" :key="result.name">

                <v-card
                  v-if="!result.failure"
                  color="#117711"
                  dark
                  style="margin: 10px 0px 0px 0px;"
                  >
                  <v-row>
                    <v-col md="1" class="d-flex align-center" style="max-width: 40px">
                      <v-icon style="padding-left: 15px">mdi-check</v-icon>
                    </v-col>
                    <v-col md="10">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle>{{result.file}} - {{result.name}} - {{result.time}}ms</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>

                    <v-col md="1" style="max-width: 30px">
                      <v-btn
                        icon
                        @click="closeResult(index)"
                      >
                        <v-icon>mdi-close-circle</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card
                  v-if="result.failure"
                  color="#771111"
                  dark
                  style="margin: 10px 0px 0px 0px;"
                  >
                  <v-row>
                    <v-col md="1" class="d-flex align-center" style="max-width: 40px">
                      <v-icon style="padding-left: 15px">mdi-alert-circle</v-icon>
                    </v-col>
                    <v-col md="10">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-content>{{result.failure.message}}</v-list-item-content>
                          <code v-if="!result.stacktraceHidden" style="font-size: 12px">{{result.failure.stacktrace}}</code>
                          <v-list-item-subtitle>{{result.file}} - {{result.name}} - {{result.time}}ms</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>

                    <v-col md="1" style="max-width: 40px">
                      <v-btn
                        icon
                        @click="closeResult(index)"
                      >
                        <v-icon>mdi-close-circle</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        v-if="result.stacktraceHidden"
                        @click="result.stacktraceHidden = false"
                      >
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        v-if="!result.stacktraceHidden"
                        @click="result.stacktraceHidden = true"
                      >
                        <v-icon>mdi-chevron-up</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>

              </div>

            </div>
          </v-card>
        </v-col>
        </v-container>
        <v-dialog v-model="dialog">
            <v-card-text>{{message}}</v-card-text>
            <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            close
          </v-btn>
        </v-dialog>
    </v-form>
</template>

<script>
import CodeEditor from '@/components/CodeEditor'
export default {
  components: {
    CodeEditor
  },
  data: () => ({
    items: ['python', 'c'],
    titre: '',
    select: '',
    consigne: '',
    test: '',
    sandBox: '',
    consoleOutput: '',
    message: '',
    dialog: false,
    resultTest: []
  }),
  methods: {
    onSave () {
      console.log('test submit', this.titre, this.select, this.consigne, this.test)
      this.axios.post('http://localhost:3000/api/v1/exercise', {
        instructions: this.consigne,
        lang: this.select,
        title: this.titre,
        tests: this.test,
        solution: '',
        template_regions: ['ceci est un ', 'test'],
        template_regions_rw: [0, 2],
        difficulty: 1,
        score: 1,
        creation_date: new Date('January 31 1980 12:30')
      }).then((sucess) => {
        console.log(sucess)
        this.dialog = true
        this.message = 'ajout reussit'
      }).catch((err) => {
        console.log(err)
      })
    },
    onTest () {
      console.log('sandbox', this.test, this.select, this.sandBox)
      this.axios.post('http://localhost:3000/api/v1/exercise/sandbox', {
        lang: this.select,
        tests: this.test,
        solution: this.sandBox
      }).then((result) => {
        console.log(result)
        this.consoleOutput = result.data.stdout
        this.resultTest.length = 0
        result.data.result.tests.forEach((result) => {
          result.stacktraceHidden = true
          this.resultTest.push(result)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    closeResult (index) {
      this.resultTest.splice(index, 1)
    }
  }
}
</script>
