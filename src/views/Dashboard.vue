<template>
<div>
  <Dashboard />   
    <v-container grid-list-md style="margin-top:80px;">
      <v-layout>
        <v-flex>
          <template>
            <ToolbarByMonth
              class="mb-3 absolute"
              format="YYYY-MM-DD"
              @month="changeMonth"
              :month="$route.query.month"
              :cor="'primary'"
            />
          </template>
          <v-row no-gutters>
            <v-col cols="12" xs="12" sm="12" md="4" lg="4">
              <v-card
                class="pa-1 rounded mb-5 ml-auto mr-auto"
                outlined
                tile
                color="#FB8C00"
                max-width="370"
              >
                <v-card-title>Saldo {{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(dados.saldo)}}
                  <v-icon class="ml-auto" light large>account_balance</v-icon>
                </v-card-title>
                <v-card-text align-items="end">
                  <span> Poup: {{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(dados.saldoPoupanca)}}</span>
                  <span class="float-center ml-4"> Saldo Geral: {{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(dados.saldoGeral)}}</span>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="4" lg="4">
              <v-card
                class="pa-1 rounded mb-5 ml-auto mr-auto"
                outlined
                tile
                color="success"
                max-width="370"
              >
              <v-card-title>Receita {{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(dados.receita)}}
                <v-icon class="ml-auto" light large>north</v-icon>
              </v-card-title>
               <v-card-text align-items="end">
                  <span> Receita Geral: {{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(dados.receitaGeral)}}</span>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="4" lg="4">
              <v-card
                class="pa-1 rounded mb-5 ml-auto mr-auto"
                outlined
                tile
                color="error"
                max-width="370"
              >
              <v-card-title>Despesa {{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(dados.despesa)}}
                <v-icon class="ml-auto" light large>south</v-icon>
              </v-card-title>
              <v-card-text align-items="end">
                  <span> Despesa Geral: {{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(dados.despesaGeral)}}</span>
              </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters align-center>
            <v-col cols="12" xs="12" sm="12" md="6" class="px-1">
              <v-card
              class=" rounded mb-5"
              outlined
              tile
              height="380">
              <v-card-text >
                <h2 class="font-weight-light mb-4">Receitas vs Despesas</h2>
                  <pie-chart 
                    :refresh="60"
                    prefix="R$ " 
                    decimal="," 
                    :donut="true" 
                    :data="donutData"></pie-chart>
              </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" class="px-1">
              <v-card 
              class=" rounded"
              outlined
              tile align-senf="end"
              height="380">
              <v-card-text >
                <h2 class="font-weight-light mb-4">Despesas por categorias</h2>
                  <column-chart 
                    :refresh="60"
                    prefix="R$ " 
                    decimal="," 
                    :data="barData"></column-chart> 
              </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
  </v-container>
</div>

</template>

<script>
import axios from 'axios'
import Dashboard from '@/components/Dashboard/Dashboard.vue'
import ToolbarByMonth from '../components/Lancamentos/ToolbarByMonth.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    Dashboard,
    ToolbarByMonth
  },
  data(){
    return {
      dados:{},
      donutData: undefined,
      donutOptions: undefined,
      barData: undefined,
      barOptions: undefined,
      colOptions: undefined,
      colData: undefined,
      receita: undefined,
      despesa: undefined
    }
  },
  methods: {
    donutChart(value1, value2){
      this.donutData =  [
        ['Receita', value1],
        ['Despesa', value2] 
      ]
        
    },
    barChart(data){
      if(data.length > 0) {
        let dados = []
        for(let i=0; i<=data.length; i++) {
          dados[i] = [data[i].categoria, data[i].sum] 
          this.barData = dados
        }
        
      }else {
        this.barData = undefined
      }

    },
    ...mapActions(['setTitle']),
    async changeMonth(month){

      let res = await axios.get(`https://api-financess.herokuapp.com/api/user/data/${localStorage.getItem("uuid")}/${month}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })
      try {
        if (res) {
        
          this.dados = res.data.data    
          
          this.despesa = res.data.data.despesaC

          this.donutChart(this.dados.receita, this.dados.despesa)

          this.barChart(this.despesa)
        
        }
      } catch (error) {
        console.log(error);
      }
     
      

       if (window.location.reload) {
        this.$router.push({
          path: this.$route.path,
          query: { month }
        })
      }
    }
   },

  created(){
    this.changeMonth()
    this.setTitle({title: 'Dashboard'}) 
  },
  mouted(){
    this.changeMonth()
  }
}


</script>
