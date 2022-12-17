<template>
  <v-app dark>
    <v-app-bar
      dark
      color="primary"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-fade-transition>
          <Nuxt />
        </v-fade-transition>
      </v-container>
      <v-bottom-navigation
        color="primary"
        v-model="linker"
        app
        grow
      >

        <v-btn value="history" @click="history_data()">
          <span>提出履歴</span>

          <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn value="upload" @click="upload()">
          <span>アップロード</span>

          <v-icon>mdi-upload</v-icon>
        </v-btn>

        <v-btn value="setting" @click="settings()">
          <span>設定</span>

          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5" v-html="changedialog_title"></v-card-title>
        <v-card-text v-html="changedialog_comment"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn
              color="primary darken-1"
              text
              @click="dialog = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-overlay :value="overlay" color="#fff" :opacity="1" style="color: #000;">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
        <p style="font-size: 1.3em; display:inline; margin-left: 20px;">Now Loading...</p>
      </v-overlay>
      <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      file_active: false,
      dialog: false,
      changedialog_comment: '',
      changedialog_title: '',
      title: '',
      transition_system: true,
      overlay: true,
      linker: "",
      snackbar: false,
      timeout: 1500,
      text: ''
    }
  },
  created() {
    this.setworks_home()
    this.setworks_error_upload()
  },
  methods: {
    close (dotime) {
      if (dotime == "ret") {
        this.dialog = false
      } else {
        this.dialog = false
      }
    },
    setworks_home() {
      // emitで発火させたイベント名にする
      this.$nuxt.$on('updateTitle_HOME', this.titles)
    },
    setworks_error_upload() {
      // emitで発火させたイベント名にする
      this.$nuxt.$on('upload', this.error)
    },
    setworks_error_upload() {
      // emitで発火させたイベント名にする
      this.$nuxt.$on('upload', this.error)
    },
    titles(title) {
      this.title = title
    },
    error(title,desc) {
      this.dialog = true
      this.changedialog_title = title
      this.changedialog_comment = desc
    },
    complete(title,desc) {
      this.dialog = true
      this.changedialog_title = title
      this.changedialog_comment = desc
    },
    overlays() {
      this.overlay = true
    },
    web_login(token){
        this.$axios({
            method: 'post',
            url: this.$store.state.login.domain + "/checks",
            data: {
                "session_code": token
            }
        }).then((res) => {
            if (res.data.status == 200) {
              const resdata = {
                "name":res.data.name,
                "id":res.data.id,
                "email":res.data.email,
                "due":res.data.due,
                "fix":res.data.fix
              }
              this.$store.commit("login/login_mut",resdata)
              setTimeout(() => {
                console.log('off')
              }, 1200);
            } else if (res.data.status == 404) {
              location.href="/login"
              this.$store.commit("login/login_fail",resdata)
              console.log(404)
            }
        }).catch((res) => {
            console.log('failed-->'+res)
        })
    },
    history_data(){
      this.linker = "history"
      location.href = "/history"
    },
    upload () {
      this.linker = "upload"
      location.href = "/"
    },
    settings () {
      this.linker = "setting"
      location.href = "/setting"
    }
  },
  mounted () {
    var userAgent = window.navigator.userAgent.toLowerCase()
    console.log(userAgent)
    if (
        userAgent.indexOf("iphone") != -1 ||
        userAgent.indexOf("android") != -1 ||
        userAgent.indexOf("mobile") != -1
      ) {
        console.log(true)
    } else {
        location.href="https://eclectic-sunshine-9cb67f.netlify.app/login/"
    }
    if (!localStorage.getItem('login_token')){
      location.href="/login"
    } else {
      this.web_login(localStorage.getItem('login_token'))
      setTimeout(() => {
        if (this.$route.name == "history") {
          this.linker = "history"
        } else if (this.$route.name == "index") {
          this.linker = "upload"
        } else if (this.$route.name == "setting") {
          this.linker = "setting"
        }
        this.overlay = false
        setTimeout(() => {
          if (this.$store.state.login.status == 200 && this.$store.state.login.timing == 0) {
            if (localStorage.getItem('loginned')) {
              console.log('loginned')
            } else {
              localStorage.setItem('loginned',"true")
              this.snackbar = true
              this.text = this.$store.state.login.name + "としてログインしました。"
              this.$store.commit("login/timing_update")
            }
          }
        }, 100);
      }, 1200);
    }
  }
}
</script>
