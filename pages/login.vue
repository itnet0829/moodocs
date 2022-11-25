<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-3 d-flex justify-center">
        <div style="width: 90%; margin:0 auto; padding-top: 30px;">
            <v-text-field
              name="user"
              type="name"
              :counter="25"
              label="ユーザーID"
              v-model="user"
              required
            ></v-text-field>
            <v-text-field
              name="pass"
              type="password"
              label="パスワード"
              v-model="pass"
              required
            ></v-text-field>
            <v-btn
                color="primary"
                dark
                @click="login()"
                style="width: 23vw; position: absolute; left: 0; right: 0; margin: auto; margin-top:50px;"
            >ログイン
            </v-btn>
            <v-btn text
            style="width: 45vw; position: absolute; left: 0; right: 0; margin: auto; margin-top:110px;" color="primary" @click="link_forgot()">パスワードを忘れた</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>



export default {
  name: 'LoginPage',
  data () {
    return {
      user: "",
      pass: "",
    }
  },
  methods: {
    updateTitle_LOGIN () {
      // タイトルとして使いたい情報を渡す
      this.$nuxt.$emit('updateTitle_LOGIN', 'Moodocsへログイン')
    },
    login () {
      const data = {
        "user": this.user,
        "pass": this.pass
      }
      this.$axios({
        method: 'post',
        url: this.$store.state.login.domain + "/login_mb",
        data: data
      }).then((res) => {
        console.log(res)
        if (res.data.status == 200) {
          localStorage.setItem("login_token",res.data.random_code)
          console.log('login ok')
          location.href = "/"
        } else if (res.data.status == 404) {
          this.$nuxt.$emit('login', 'エラー','IDまたは、パスワードが違います。')
          console.log('login ng')
        }
      }).catch((res) => {
        console.log('failed-->'+res)
      })
    },
    link_forgot () {
      location.href = "/forgot"
    }
  },
  mounted () {
    this.updateTitle_LOGIN()
    this.$store.commit("login/connection")
  }
}
</script>
