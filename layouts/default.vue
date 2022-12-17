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
      overlay: true
    }
  },
  created() {
    this.setworks_login()
    this.setworks_error()
  },
  methods: {
    close (dotime) {
      if (dotime == "ret") {
        this.dialog = false
      } else {
        this.dialog = false
      }
    },
    setworks_login() {
      // emitで発火させたイベント名にする
      this.$nuxt.$on('updateTitle_LOGIN', this.titles)
    },
    setworks_error() {
      // emitで発火させたイベント名にする
      this.$nuxt.$on('login', this.error)
    },
    setworks_loading_screen() {
      // emitで発火させたイベント名にする
      this.$nuxt.$on('login', this.overlays)
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
    setTimeout(() => {
      if (this.$route.name == 'login') {
        this.overlay = false
      } else if (this.$route.name == 'index' && this.$store.state.login.status == 200) {
        this.overlay = false
      }
    }, 1200);
  }
}
</script>
