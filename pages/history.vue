<template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
            <v-list two-line v-if="ac_settings">
                <v-list-item-group>
                    <template v-for="lister in settinglist" >
                        <v-list-item>
                            <template>
                                <v-list-item-content @click="dialog_open(lister.func)">
                                    <v-list-item-title v-text="lister.name"></v-list-item-title>
                                    <v-list-item-subtitle v-text="''"></v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-list-item>

                    <v-divider
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
</template>
  
<script>
  
export default {
    name: 'IndexPage',
    layout:'home',
    data () {
      return {
        logintoken: '',
        overlay: true
      }
    },
    methods:{
      updateTitle_HOME () {
        // タイトルとして使いたい情報を渡す
        this.$nuxt.$emit('updateTitle_HOME', '過去のデータ')
      }
    },
    mounted () {
        this.updateTitle_HOME()
    }
}
</script>