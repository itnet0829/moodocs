<template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
            <v-list two-line>
                <v-list-item-group>
                    <template v-for="lister in settinglist[0]" >
                        <v-list-item>
                            <template>
                                <v-list-item-content @click="desc(lister.link_token)">
                                    <v-list-item-title v-text="lister.company + ' / ' + lister.dates.split('-')[0] + '年' + lister.dates.split('-')[1] + '月' + lister.dates.split('-')[2] + '日'"></v-list-item-title>
                                    <v-list-item-subtitle v-text="'¥'+ lister.price"></v-list-item-subtitle>
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
        overlay: true,
        settinglist:[]
      }
    },
    methods:{
      updateTitle_HOME () {
        // タイトルとして使いたい情報を渡す
        this.$nuxt.$emit('updateTitle_HOME', '提出履歴')
      },
      preparing_data(){
        setTimeout(() => {
            const fix = this.$store.state.login.fix
            console.log(fix)
            this.$axios({
                method: 'post',
                url: this.$store.state.login.domain + "/hisdata",
                data: {
                    "fix":fix
                }
            }).then((res)=> {
                this.settinglist.push(res.data.data)
            }).catch((res) => {
                console.log("error" + res)
            })
        }, 400);
      },
      desc(link) {
        location.href = "/history_desc?code=" + link
      }
    },
    mounted () {
        this.$store.commit("login/connection")
        this.updateTitle_HOME()
        this.preparing_data()
    }
}
</script>