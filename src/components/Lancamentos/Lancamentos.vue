<template>
  <v-container grid-list-md style="margin-top: 80px">
    <v-row>
      <v-col cols="12">
        <template>
          <ToolbarByMonth
            class="mb-3 absolute"
            format="YYYY-MM-DD"
            @month="changeMonth"
            :month="$route.query.month"
            :cor="'success'"
          />
        </template>
        <v-card v-if="registro == 0">
          <v-card>
            <v-text class="text-xs-center">
              Não há registros para mostrar desse mês
            </v-text>
          </v-card>
        </v-card>
        <v-card v-for="item in lancamentos" :key="item.id" elevation="6" class="mb-2">
          <v-list three-line>
            <template>
             
             <v-btn   
              icon 
              elevation="3"
              class="float-right mr-2 mt-1 p-1"
              :record="item"
              @click="handleDialog(item)">
              <v-icon >north_east</v-icon>
             </v-btn>
              <v-list-item>
                <v-avatar
                  :color="color"
                  class="mr-7"
                  v-if="
                    item.tipo_lancamento == 'Receita'
                      ? (color = 'success')
                      : (color = 'error')
                  "
                >
                  <v-icon
                    dark
                    v-if="
                      item.tipo_lancamento == 'Receita'
                        ? (icon = 'north')
                        : (icon = 'south')
                    "
                  >
                    {{ icon }}
                  </v-icon>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title class="mb-2">
                    {{ item.categoria }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="font-weight-bold mb-1"
                    v-if="
                      item.tipo_lancamento == 'Receita'
                        ? (classe = 'success--text')
                        : (classe = 'error--text')
                    "
                    :class="classe"
                  >
                    {{ item.tipo_lancamento }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-html="
                      `Dia ${item.created_at
                        .split('T')[0]
                        .substr(-2, 5)
                        .replace('-', '/')}`
                    "
                    class="mb-1"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-html="item.descricao"
                    class="mb-1"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ item.conta }} {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(item.valor)}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="ml-2 mr-5"></v-divider>
            </template>
          </v-list>
        </v-card>
        <AddLancamento/>
        <LancamentoDialog  @insert="inserted"/>
        <EditForm  
          :month="$route.query.month"
          @update="updateRecord"
          @delete="deletRecord"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
import ToolbarByMonth from "@/components/Lancamentos/ToolbarByMonth.vue";
import EditForm from '@/components/Lancamentos/EditDialogForm.vue'
import AddLancamento from '../Lancamentos/AddLacamentoBtn.vue'
import LancamentoDialog from '../Lancamentos/AddLancamentoDialog.vue'
export default {
  name: "Lancamentos",
  components: {
    ToolbarByMonth,
    EditForm,
    AddLancamento,
    LancamentoDialog
  },
  data() {
    return {
      icon: "",
      classe: "",
      color: "",
      search: "",
      registro: [],
      dado : undefined,
    };
  },
  computed: {
    
    lancamentos(){
      return this.registro = this.dado
    }
  },
  methods: {
    ...mapActions(['setEditDialog', 'setRecord']),
    handleDialog(item){
      this.setEditDialog({editDialog : true})
      this.setRecord({records: item})
    },
    async changeMonth(month) {
      
      const url = `https://api-financess.herokuapp.com/api/user/data/getRecords/${localStorage.getItem(
        "uuid"
      )}/${month}`;
      let dados = await axios.get(url, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      if (dados != undefined) {
        this.dado= dados.data
        this.registro = this.dado
        
      }

      if (window.location.reload) {
        this.$router.push({
          path: this.$route.path,
          query: { month }
        })
      }
      
    }, 
    async updateRecord(body){
      let url = `https://api-financess.herokuapp.com/api/user/data/lancamento/${localStorage.getItem("uuid")}`
      let result = await axios.put(url, body, {headers : { Authorization: `${localStorage.getItem("token")}` }})
      if (result) {
        this.changeMonth()
        this.changeMonth(this.$route.query.month)
      } 
    },
    inserted(){
      this.changeMonth()
      this.changeMonth(this.$route.query.month)
    },
    deletRecord() {
        this.changeMonth()
        this.changeMonth(this.$route.query.month)
    }

  },
  created() {
    this.changeMonth() 
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;1,200&display=swap");
.my-auto.font {
  font-style: "Montserrat", sans-serif;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}
</style>