<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-3 d-flex justify-center">
        <div style="width: 90%; margin:0 auto; padding-top: 10px;">
          <div style="text-align: left; font-size: 1.3em;">ユーザーIDまたは、メールアドレスを入力してください。</div>
          <div style="text-align: left; font-size: 1.0em; margin-bottom: 20px;">ここにID情報を入れて送信したら、LINEにてパスワード情報をお知らせします。</div>
          <v-text-field
              name="user"
              type="name"
              v-model="mail"
              :counter="25"
              label="ユーザーIDまたは、メールアドレス"
              required
          ></v-text-field>
          <v-btn
                @click="send_mail"
                color="primary"
                dark
                style="width: 23vw; position: absolute; left: 0; right: 0; margin: auto; margin-top:50px;"
            >送信
          </v-btn>
          <v-btn
                @click="home"
                color="red"
                text
                dark
                style="width: 40vw; position: absolute; left: 0; right: 0; margin: auto; margin-top:100px;"
            >ログイン画面へ戻る
          </v-btn>
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
      mail:"",
    }
  },
  methods: {
    updateTitle () {
      // タイトルとして使いたい情報を渡す
      this.$nuxt.$emit('updateTitle', 'パスワードの送信')
    },
    send_mail() {
      const data = {
        "mail":this.mail
      }
      this.$axios({
        method: 'post',
        url: this.domain + "/forgot",
        data: data
      }).then((res) => {
        if (res.data.status === 200) {
          this.$nuxt.$emit('login', 'パスワードを送信しました。','LINEをご確認ください。')
        } else if (res.data.status === 404) {
          this.$nuxt.$emit('login', 'エラー','入力されたID or メールアドレスは見つかりませんでした。')
        }
      }).catch((res) => {
        console.log('failed-->'+res)
      })
    },
    home() {
      location.href="/login"
    }
     
  },
  mounted () {
    this.updateTitle()
    this.$store.commit("login/connection")
  }
}
</script>
