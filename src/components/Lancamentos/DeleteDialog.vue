<template>
  <v-row justify="center" color="error" dark>
    <v-dialog
      v-model="deleteDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
         Excluir lançamento
        </v-card-title>

        <v-card-text>
          Tem certeza que deseja excluir esse lançamento?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            dark
            @click="closeDialog"
          >
            Cancelar
          
          </v-btn>

          <v-btn
            color="success"
            dark
            @click="submit"
            :loading="loading"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

import axios from 'axios'
import { mapState, mapActions } from 'vuex'

  export default {
    name: 'DeleteDialog',
    props: {
      id: Number
    },
    data () {
      return {
        loading : false
      }
    },
    computed: {
      ...mapState(['deleteDialog'])
    },
    methods: {
      ...mapActions(['setDeleteDialog']),
      async submit(){ 

        this.loading = true

        const URL = `https://api-financess.herokuapp.com/api/user/data/lancamento/${this.id}`
        let response = await axios.delete(URL, {headers: {
          Authorization: `${localStorage.getItem("token")}`
        }})
        if (response.status == 200){

          this.closeDialog()
          setTimeout(()=> (this.loading = false),1000)
          this.$emit('deleted')

        }else {
          
          this.loading = false
        }
      },
      closeDialog(){
        this.setDeleteDialog({deleteDialog : false})
      }
    },
    created(){
      
    }
  }
</script>