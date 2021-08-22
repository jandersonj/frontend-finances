<template>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      style="position:fixed;"
      class="mr-4"
      title="Adicionar"
    >
      
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="light-blue darken-4"
          dark
          fab
        >
          <v-icon v-if="fab">
            close
          </v-icon>
          <v-icon v-else>
            add
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        title="Receita"
        @click="handleDialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        title="Despesa"
        @click="handleDialogDespesa"
      >
        <v-icon>remove</v-icon>
      </v-btn>
    </v-speed-dial>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      dialog : true
    }),
    methods: {
        ...mapActions(['setDialog','setColor', 'setTitleL']),
        handleDialog(){
            this.setDialog({dialog : true})
            this.setColor({l_color : "success"})
            this.setTitleL({l_title: 'Lançar Receita'})
        },
        handleDialogDespesa(){
            this.setDialog({dialog : true})
            this.setColor({l_color : "error"})
            this.setTitleL({l_title: 'Lançar Despesa'})
        }
    }

}
</script>