<template>
    <v-toolbar :color="cor">
        <v-row align="center">
            <v-col xs="1">
                <div class="text-xs-left d-felx justify-start">
                    <v-btn icon  @click="decrement">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </div>
            </v-col>
            <v-col xs="10">
                <v-toolbar-title class="text-xs-center d-flex justify-center mr-3">
                    <span>{{currentMonth}}</span>
                </v-toolbar-title>
            </v-col>
            <v-col xs="1">
                <div class="text-xs-right d-flex justify-end">
                    <v-btn icon flat @click="increment">
                        <v-icon>chevron_right</v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-toolbar>
</template>
<script>
import moment from 'moment'
export default {
    name: 'ToolbarByMonth',
    props: {
        format: String,
        month: String,
        cor: String
    },
    data(){
        return {
            date: undefined
        }
    },
    computed: {
        currentMonth(){
            return this.date.format("MMMM YYYY")
        },
        color(){
            return this.cor
        }
        
    },
    methods: {
        emit(){
            this.$emit('month', this.date.format(this.format))
        },
        increment(){
            this.date = this.date.clone().add(1,'month')
            this.emit()
        },
        decrement(){
            this.date = this.date.clone().subtract(1,'month')
            this.emit()
        },
        setCurrentMonth(){
            this.date = this.month ? moment(this.month, this.format) : moment()
        }
    },
    created(){
        this.setCurrentMonth()
        this.emit()
    }

}
</script>