<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 lg6>
                <v-menu class="picker-date"
                        ref="menu1"
                        :close-on-content-click="false"
                        v-model="menu1"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"

                >
                    <v-text-field
                            slot="activator"
                            v-model="dateFormatted"
                            label="Date"
                            hint="MM/DD/YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date = parseDate(dateFormatted)"
                    ></v-text-field>
                    <v-date-picker class="picker" v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
            </v-flex>


        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            date: null,
            dateFormatted: null,
            menu1: false,
            menu2: false
        }),

        computed: {
            computedDateFormatted () {
                return this.formatDate(this.date)
            }
        },

        watch: {
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            }
        },

        methods: {
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            }
        }
    }
</script>
<style scoped>
    .picker-date:active{
        top: 0;
    }
    .picker-date{
        /*background-color: #0a0a0a;*/
    }

</style>