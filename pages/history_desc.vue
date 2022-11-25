<template>
    <v-row justify="center" align="center">
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar color="primary" dark>
                    <v-toolbar-title>{{ desclist[0].describe }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="uturn()" text>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <template v-for="lister in desclist" >
                        <v-list-item>
                            <template>
                                <v-list-item-content>
                                    <v-list-item-title v-text="lister.describe"></v-list-item-title>
                                    <v-list-item-subtitle v-text="lister.title"></v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-list-item>

                    <v-divider
                    ></v-divider>
                </template>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog_PDF"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar color="black" dark>
                    <v-toolbar-title>PDF Viewer</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog_PDF = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <embed :src="furl" style="border:none;　width:100%;　height:80vh;">
            </v-card>
        </v-dialog>
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
        dialog: true,
        dialog_PDF: false,
        url: '',
        furl: '',
        desclist:[
            {"title":"会社名","describe":"NOW LOADING..."},
            {"title":"金額","describe":"NOW LOADING..."},
            {"title":"発行日","describe":"NOW LOADING..."},
            {"title":"期限日","describe":"NOW LOADING..."},
            {"title":"メッセージ","describe":"NOW LOADING..."}
        ]
      }
    },
    methods:{
      updateTitle_HOME () {
        // タイトルとして使いたい情報を渡す
        this.$nuxt.$emit('updateTitle_HOME', '')
      },
      preparing_data(){
        setTimeout(() => {
            const fix = this.$store.state.login.fix
            console.log(fix)
            this.$axios({
                method: 'post',
                url: this.$store.state.login.domain + "/hisdata/desc",
                data: {
                    "token":this.getParam('code')
                }
            }).then((res)=> {
                this.desclist[0].describe = res.data.data.company
                this.desclist[1].describe = "¥" + res.data.data.price
                const dates = res.data.data.dates.split('-')
                this.desclist[2].describe = dates[0] + "年" + dates[1] + "月" +dates[2] + "日"
                const due = res.data.data.due.split('-')
                this.desclist[3].describe = due[0] + "年" + due[1] + "月" +due[2] + "日"
                this.desclist[4].describe = res.data.data.message
                this.url = this.$store.state.login.wbdomain + "/pdfb64?link_token=" + res.data.data.link_token
            }).catch((res) => {
                console.log("error" + res)
            })
        }, 400);
      },
      uturn() {
        this.dialog = false
        setTimeout(() => {
            location.href = "/history"
        }, 100);
      },
      getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    },
    mounted () {
        this.$store.commit("login/connection")
        this.updateTitle_HOME()
        this.preparing_data()
    }
}
</script>