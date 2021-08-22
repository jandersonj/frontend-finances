<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          :color="l_color"
        >
          <v-btn
            icon
            dark
            @click="closeDialog"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{l_title}}</v-toolbar-title>
          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="deep-purple accent-4"
          ></v-progress-linear>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-scale-transition>
              <v-btn
                dark
                text
                @click="submit"
              >
                Incluir
              </v-btn>
            </v-scale-transition>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
          <v-container>
            <v-col cols="12" sm="12" md="7">
                <template>
                  <v-alert :color="type" :value="alert" v-if="msg" dense>{{msg}}</v-alert>
                    <v-form class="mt-10">
                      <v-select
                        :items="categorias"
                        label="Categoria"
                        dense
                        solo
                        class="mb-3"
                        :error-messages="categoryErrors"
                        v-model.trim="$v.categoria.$model"
                        :success="!$v.categoria.$invalid"
                         @blur="$v.categoria.$touch()"
                      ></v-select>
                      <v-select
                        :items="conta"
                        label="Conta"
                        dense
                        solo
                        class="mb-3"
                        :error-messages="contaErrors"
                        v-model.trim="$v.contaValue.$model"
                        :success="!$v.contaValue.$invalid"
                        @blur="$v.contaValue.$touch()"
                      ></v-select>
                      <v-text-field
                        label="Descrição"
                        name="desc"
                        type="text"
                        color="success"
                        class="mb-3"
                        :error-messages="descErrors"
                        v-model.trim="$v.desc.$model"
                        :success="!$v.desc.$invalid"
                         @blur="$v.desc.$touch()"
                      />
                      <v-text-field
                        label="Valor R$"
                        name="valor"
                        :error-messages="valorErrors"
                        v-model.trim="$v.valor.$model"
                        :success="!$v.valor.$invalid"
                        @blur="$v.valor.$touch()"
                        v-money="money"
                      />
                    </v-form>
                </template>
            </v-col>
          </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { VMoney } from 'v-money'
import axios from 'axios'
export default {
    mixins: [validationMixin],
    directives: {money: VMoney},
    data: () => ({
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      items: [],
      receita:[
        'Benefícios', 
        'Comissão',
        'Fixa',
        'Rendimentos',
        'Serviços',
        'Vendas',
        'Benefícios'
      ],
      despesa:[
        'Alimentação',
        'Carro',
        'Educação',
        'Lazer',
        'Moradia',  
        'Pagamentos',
        'Saúde',
        'Transporte',
        'Vestuário'
      ],
      conta: ['Minha Carteira', 'Minha Poupança'],
      contaValue : '',
      valor: '',
      categoria: '',
      desc : '',
      loading: false,
      alert : false,
      type: '',
      msg: '',
    }),
     validations: {
      categoria :  { required },
      contaValue : { required },
      desc : { required },
      valor : { required },
    },
    computed: {
      ...mapState(['dialog','l_color','l_title']),
      categorias(){
        if (this.l_title === 'Lançar Receita') {
          return this.items = this.receita
        }
        if (this.l_title === 'Lançar Despesa') {
          return this.items = this.despesa
        }
      },
      categoryErrors(){
        const errors = []
        if (!this.$v.categoria.$dirty) return errors
        !this.$v.categoria.required && errors.push('Categoria é obrigatório.')
        return errors
      },
      contaErrors(){
        const errors = []
        if (!this.$v.contaValue.$dirty) return errors
        !this.$v.contaValue.required && errors.push('Campo obrigatório.')
        return errors
      },
      descErrors(){
        const errors = []
        if (!this.$v.desc.$dirty) return errors
        !this.$v.desc.required && errors.push('Campo obrigatório.')
        return errors
      },
      valorErrors(){
        const errors = []
        if (!this.$v.valor.$dirty) return errors
        !this.$v.valor.required && errors.push('Campo obrigatório.')
        return errors
      }
    },
    methods:{
      ...mapActions(['setDialog']),
      closeDialog(){
        
        this.$v.$reset()
        this.desc = '',
        this.contaValue = '',
        this.valor = '',
        this.categoria  = ''
        this.setDialog({dialog: false})

      },
      async submit(){
        this.$v.$touch()
        if (!this.$v.$invalid) {
          let tipo = this.l_title === 'Lançar Receita' ? 'Receita' : 
          this.l_title === 'Lançar Despesa' ? 'Despesa' : ''

          let conta = this.contaValue === 'Minha Carteira' ? 1 :
          this.contaValue === 'Minha Poupança' ? 2 : null
          
          if (this.valor.length <= 10) {
            if (this.valor.includes('.')) {
              let v1 = this.valor.split('.')[0]
              let v2 = this.valor.split('.')[1]
              var newValue = parseFloat(v1 + v2.replace(',','.'))
            }else {
              newValue = parseFloat(this.valor.replace(',','.'))
            }
          }

          const body = {
            tipo : tipo,
            desc : this.desc,
            categoria : this.categoria,
            valor: newValue,
            id_conta : conta
          }

          this.linearLoad()

          const URL = `https://api-financess.herokuapp.com/api/user/data/lancamento/${localStorage.getItem("uuid")}`
          const response = await axios.post(URL, body, {headers : { 
            Authorization: `${localStorage.getItem("token")}`
          }})

          if(response.status == 200) {
            this.alert = true
            this.type = 'success'
            this.msg = response.data.msg
            this.loading = false
            setTimeout(()=>{
              this.alert = false
            },2000)
          }else {
            setTimeout(()=>{
              this.alert = true
              this.type = 'error'
              this.msg = response.data.err
            },2000)
          }
          this.$emit('insert')
         }
      },
      linearLoad() {
        this.loading = true
      }
    },
    created(){ 
    
    }

}
</script>