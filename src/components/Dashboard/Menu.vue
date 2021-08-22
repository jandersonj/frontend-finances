<template>
    <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    :mini-variant="mini"
    absolute
    temporary
    >
    <!-- lista do avatar -->
    <v-list>

        <v-list-item v-if="mini" @click.stop="mini = !mini">
            <v-list-item-action>
                <v-icon>chevron_right</v-icon>
            </v-list-item-action>
        </v-list-item>

        <v-list-item tag="div" class="px-2">

            <v-list-item-avatar>
               <v-img src="../../assets/img/avatar.jpeg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{user}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn icon @click.stop="mini = !mini">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
            </v-list-item-action> 
        </v-list-item>
    </v-list>
    <!-- fim lista do avatar -->
    <!-- intems da lista -->
    <v-list class="pt-0">
        <v-divider dense></v-divider>
        <v-list-item 
        v-for="(item,index) in items"  
        :key="index"
        :to="item.url"
        :exact="item.exact"
        @click.stop="$emit('input', false)">
        
        <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>

        </v-list-item>
    </v-list>
     <!-- fim da lista -->


    </v-navigation-drawer>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Menu',
    props: {
        value: Boolean
    },
    data: () => ({
        items: [
            {title : 'Home', icon: 'dashboard', url: '/dashboard', exact: true},
            {title : 'Lançamentos', icon: 'account_balance_wallet', url: '/lancamentos', exact: true},
            {title : 'Sair', icon: 'logout', url: '/sair', exact: true}
        ],
        mini: false,
        user: {}
    }),
    async created() {
       localStorage.getItem("uuid")
       let result = await axios.get(`https://api-financess.herokuapp.com/api/user/name/${localStorage.getItem("uuid")}`,{
           headers: {
               Authorization: `${localStorage.getItem("token")}` 
           }
       })
       this.user = result.data[0].name
    }
} 
</script>