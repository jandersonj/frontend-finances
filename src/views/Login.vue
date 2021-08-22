<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-flex xs2 sm3 md4 lg4 xl5 style="position:absolute; right:25px; top:50px; z-index: 999;">
            <v-alert :type="type" :value="showAlert" v-if="msg" dense>{{msg}}</v-alert>
        </v-flex> 
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2"
                        >Login</h1>
                        <v-spacer></v-spacer>
                        <v-form class="mt-10" name="login">
                          <v-text-field
                            label="Nome"
                            name="nome"
                            prepend-icon="person"
                            type="text"
                            color="primary"
                            v-model.trim="$v.user.nome.$model"
                            :success="!$v.user.nome.$invalid"
                            :error-messages="nomeErrors"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="pass"
                            prepend-icon="lock"
                            type="password"
                            color="primary"
                            v-model.trim="$v.user.pass.$model"
                            :success="!$v.user.pass.$invalid"
                            :error-messages="passwordErrors"
                          />
                        </v-form>
                         <h3 class="text-center mt-4">user: jader senha: admin</h3>
                      </v-card-text>
                      <div class="text-center mt-3 mb-6">
                        <v-btn rounded color="primary" @click="submit" 
                        :disabled="!$v.user.pass.$invalid && !$v.user.nome.$invalid ? !loginDissabled : loginDissabled"
                        :loading="loading">Entrar</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="primary">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Olá! Não tem conta ainda?</h1>
                        <h5
                          class="text-center"
                        >Crie uma conta e cuida agora de suas finanças pessoais.</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">Registrar</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="primary">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Já tem conta?</h1>
                        <h5
                          class="text-center"
                        >Clique no botão abaixo e vá para a área de login</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Login</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 mb-9">Registrar-se</h1>
                        <v-spacer></v-spacer>
                        <v-form class="mt-10" name="signin">
                          <v-text-field
                            label="Nome"
                            name="nome"
                            prepend-icon="person"
                            type="text"
                            color="primary"
                             v-model.trim="$v.valid.name.$model"
                            :success="!$v.valid.name.$invalid"
                            :error-messages="nomeRErrors"
                          />
                          <v-text-field
                            label="Email"
                            name="email"
                            prepend-icon="email"
                            type="text"
                            color="primary"
                            v-model.trim="$v.valid.email.$model"
                            :success="!$v.valid.email.$invalid"
                            :error-messages="emailErrors"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="pass"
                            prepend-icon="lock"
                            type="password"
                            color="primary"
                            v-model.trim="$v.valid.password.$model"
                            :success="!$v.valid.password.$invalid"
                            :error-messages="passwordRErrors"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5 mb-6">
                        <v-btn rounded color="primary"
                        @click="signIn"
                        :disabled="(!$v.valid.password.$invalid && !$v.valid.name.$invalid && !$v.valid.email.$invalid) ? !registerDisabled : registerDisabled">Registrar</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'


import axios from 'axios'
export default {
  data: () => ({
    loading : false,
    type: '',
    msg: '',
    showAlert: false,
    loginDissabled : true,
    registerDisabled: true,
    step: 1,
    user: {
      nome: '',
      pass:  '',
    },
    valid:{
      name: '',
      password: '',
      email: ''
    }
  }),
  props: {
    source: String
  },
  validations: {
    user: {
      nome: {
        required
      },
      pass: {
        required,
        minLength: minLength(5)
      }
    },
    valid: {
      name: {
        required
      },
      password: {
        required,
        minLength: minLength(5)
      },
      email: {
        required,
        email
      }
    }

  },
  computed:{

    emailErrors(){
      const errors = []
      const email = this.$v.valid.email
      if (!email.$dirty) {return errors}
      !email.required && errors.push('Email é obrigatório!')
      !email.email && errors.push('Insira um email válido')
      return errors
    },
    nomeErrors(){
      const errors = []
      const nome = this.$v.user.nome
      if (!nome.$dirty) {return errors}
      !nome.required && errors.push('Insira o nome para login')
      return errors
    },
    nomeRErrors(){
      const errors = []
      const nome = this.$v.valid.name
      if (!nome.$dirty) {return errors}
      !nome.required && errors.push('Insira o nome para login')
      return errors
    },
    passwordErrors(){
      const errors = []
      const pass = this.$v.user.pass
      if (!pass.$dirty) {return errors}
      !pass.required && errors.push('Insira a sua senha!')
      !pass.minLength && errors.push('A senha deve conter pelo menos 5 caracteres!')
      return errors
    },
    passwordRErrors(){
      const errors = []
      let pass = this.$v.valid.password
      if (!pass.$dirty) {return errors}
      !pass.required && errors.push('Insira a sua senha!')
      !pass.minLength && errors.push('A senha deve conter pelo menos 5 caracteres!')
      return errors
    }
  },
  methods:{
    submit(){
      let nome = document.forms.login.elements.nome.value
      let pass = document.forms.login.elements.pass.value
      this.loading = true

      axios.post('https://api-financess.herokuapp.com/api/user/authLogin', {nome, pass})
      .then(res => {
        if(res.data.token){
            setTimeout(()=> (this.loading = false),1000)
            localStorage.setItem("token", `Bearer ${res.data.token}`)
            localStorage.setItem("uuid", `${res.data.uuid}`)
            this.$router.push('/dashboard')
        }else {
          this.type = 'error'
          this.showAlert = true
          this.msg = res.data.err
          this.loading = false
          setTimeout(()=> {
            this.showAlert = false
            
          },2000)
        }
        
      }).catch(err => { console.log(err) })
      
    },
    signIn(){
      let nome = document.forms.signin.elements.nome.value
      let pass = document.forms.signin.elements.pass.value
      let email = document.forms.signin.elements.email.value

      axios.post("https://api-financess.herokuapp.com/api/user/signup", {nome, pass, email})
      .then(res => {
      
        if (res.data.err) {

          console.log(res.data.err);
          this.type = "error"
          this.showAlert = true
          this.msg = res.data.err
          setTimeout(()=> {
            this.showAlert = false
          },4000)

        } else {
          this.type = "success"
          this.showAlert = true
          this.msg = res.data.msg
          setTimeout(()=> {
            this.showAlert = false
          },4000)
        }
        
      }).catch(err => {
        console.log(err);
      })
    }
  }
};
</script>