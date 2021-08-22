<template>
  <v-row justify="center">
    <v-dialog
      v-model="editDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="closeEditDialog"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Editar</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="editRecord"
            >
              Salvar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-col cols="12" sm="12" md="7">
          <template>
            <v-form class="mt-10">
              <v-select
                :items="items"
                label="Lançamento"
                dense
                solo
                class="mb-2"
                v-model="lancamento"
              ></v-select>
              <v-select
                :items="lancamento === 'Receita' ? categoria.receita : categoria.despesa"
                label="Categoria"
                item-text=""
                item-value=""
                persistent-hint
                return-object
                single-line
                dense
                solo
                class="mb-4"
                name="categoria"
                v-model="categorias"
              ></v-select> 

              <v-text-field
                label="Descrição"
                name="desc"
                type="text"
                color="success"
                v-model="descForm"
                class="mb-5"
              />
               <v-text-field
                :label="valorForm"
                name="valor"
                v-money="money"
                v-model="nvalue"
              />
            </v-form>
            <v-btn 
              color="error justify-sm-center"
              dark
              :disable="loading" 
              elevation="2" 
              @click="deleteDial"
              >Excluir esse registro</v-btn>
          </template>
        </v-col>
      </v-card>
      <DeleteDialog :id="records.id" @deleted="closeEdit"/>
    </v-dialog>
  </v-row>
</template>
<script>
  import DeleteDialog from '../Lancamentos/DeleteDialog.vue' 
  import { mapState,mapActions } from 'vuex'
  import { VMoney } from 'v-money'
  export default {
    name: 'EditFormDialog',
    components: {
      DeleteDialog
    },
    directives: {money: VMoney},
    data: () =>({
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      loading: false,
      notifications: false,
      sound: true,
      widgets: false,
      items: ['Receita', 'Despesa'],
      conta: ['Minha Carteira', 'Poupança'],
      descricao: '',
      valor: '',
      nvalue: '',
      lancamento: '',
      categorias: '',
      categoria: {
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
        ]
      },

    }),
    computed: {
      ...mapState(['records', 'editDialog', 'deleteDialog']),
      valorForm : {
        get: function() {
          return this.valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(this.records.valor )
        },
        set: function(newValue){
          this.valor = newValue
        }
        
      },
      descForm : {
        get: function(){
         
         return this.descricao = this.records.descricao
         
        },
        set : function(newValue) {
          this.descricao = newValue
        }
      }
    },
    methods: {
      ...mapActions(['setEditDialog', 'setDeleteDialog']),
      closeEditDialog(){
        this.setEditDialog({editDialog: false})
        this.descricao = ''
        this.nvalue = "0,00"
      },
      editRecord(){
        
        if (this.nvalue.length <= 10) {
          if (this.nvalue.includes('.')) {
            let v1 = this.nvalue.split('.')[0]
            let v2 = this.nvalue.split('.')[1]
            var newValue = parseFloat(v1 + v2.replace(',','.'))
          }else {
            newValue = parseFloat(this.nvalue.replace(',','.'))
          }
        }
        const body = {
          tl : this.lancamento || this.records.tipo_lancamento,
          desc: this.descricao || this.records,
          categoria: this.categorias || this.records.categoria,
          valor: newValue || this.records.valor,
          id_reg: this.records.id
        }
        this.$emit('update',body);
        this.closeEditDialog()
      },
      deleteDial(){
        this.setDeleteDialog({deleteDialog : true})
      },
      closeEdit(){
         this.setEditDialog({editDialog: false})
         this.$emit('delete')
      }
   },
   created(){
   }
}
</script>