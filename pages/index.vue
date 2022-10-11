<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="justify-center">
        <FileCenter />
      </v-card>
    </v-col>
    <v-overlay :value="overlay" color="#fff" :opacity="1" style="color: #000;">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
    <p style="font-size: 1.3em; display:inline; margin-left: 20px;">Now Loading...</p>
  </v-overlay>
  </v-row>
</template>

<script>

export default {
  name: 'IndexPage',
  data () {
    return {
      logintoken: '',
      overlay: true
    }
  },
  methods:{
    updateTitle_HOME () {
      // タイトルとして使いたい情報を渡す
      this.$nuxt.$emit('updateTitle_HOME', 'Moodocs AQUA')
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
                "due":res.data.due
              }
              this.$store.commit("login/login_mut",resdata)
              setTimeout(() => {
                this.overlay = false
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
  },
  mounted () {
    this.updateTitle_HOME()
    this.$store.commit("login/connection")
    this.web_login(localStorage.getItem('login_token'))
  }
}
</script>
