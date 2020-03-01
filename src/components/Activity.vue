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
                    <v-btn small color="primary" @click="onSave">Primary</v-btn>
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
        </v-container>
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
    sandBox: ''
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
      }).then((sucess) => {
        console.log(sucess)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
