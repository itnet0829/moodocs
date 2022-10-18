<template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
            <v-list two-line>
                <v-list-item-group>
                    <template v-for="lister in settinglist" >
                        <v-list-item>
                            <template>
                                <v-avatar :style="{backgroundColor: lister.color }" @click="setting_first_button(lister.func)">
                                  <v-icon dark>
                                    {{ lister.icon }}
                                  </v-icon>
                                </v-avatar>
                                <v-list-item-content @click="setting_first_button(lister.func)" style="margin-left: 10px;">
                                    <v-list-item-title v-text="lister.name"></v-list-item-title>
                                    <v-list-item-subtitle v-text="lister.desc"></v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-list-item>

                    <v-divider
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
      </v-col>
      <v-dialog
      v-model="hearing_dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ hear_title }}
        </v-card-title>
        <v-card-text v-if="hear_types === 'yes_or_no' || hear_types === 'ok'">{{ hear_comment }}</v-card-text>
        <v-card-text v-if="hear_types === 'texttype'">
          {{ hear_comment }}
          <v-text-field :label="inputtype" :type="input" v-model="hear_text_field"></v-text-field>
        </v-card-text>
        
        <v-card-actions v-if="hear_types === 'yes_or_no'">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="boot(hear_tags)"
          >
            はい
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="close(closed_tags)"
          >
            いいえ
          </v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="hear_types === 'texttype'">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="close(closed_tags)"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="primary"
            @click="hear(hear_tags)"
          >
            OK
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="hear_types === 'ok'">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="close(closed_tags)"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="account_list_setting"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="account_list_setting = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>アカウント詳細設定</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line>
      <v-list-item-group
      >
      <v-subheader
      >詳細設定</v-subheader>
      <v-divider></v-divider>
        <template v-for="(item, index) in changer_api_setting">
          <v-list-item >
            <template>
              <v-list-item-content @click="setting_second_button(item.func)">
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-divider
          v-if="index < changer_api_setting.length"
          :key="index"
          ></v-divider>
        </template>
        <v-fab-transition>
    </v-fab-transition>
      </v-list-item-group>
    </v-list>
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
        hearing_dialog: false,
        hear_title: '',
        hear_comment: '',
        hear_tags: '',
        closed_tags: '',
        hear_types: '',
        inputtype: '',
        input: '',
        hear_text_field: '',
        account_list_setting: false,
        settinglist: [
          {"name":"ログアウト","desc":"このシステムからログアウトします。","func":"logout","icon":"mdi-logout","color":"#0099ff"},
          {"name":"アカウント詳細設定","desc":"あなたが登録している情報を変更します。","func":"account_setting","icon":"mdi-cog","color":"#0099ff"},
        ],
        changer_api_setting: [
          {"name":"名前の変更","desc":"あなたの名前を変更します。","func":"name","icon":"mdi-form-textbox","color":"#0099ff"},
          {"name":"メールアドレスの変更","desc":"あなたのメールアドレスを変更します。","func":"mail","icon":"mdi-card-account-mail","color":"#0099ff"},
          {"name":"IDの変更","desc":"あなたのIDを変更します。","func":"id","icon":"mdi-card-account-details","color":"#0099ff"},
          {"name":"パスワードの変更","desc":"あなたのパスワードを変更します。","func":"pass","icon":"mdi-form-textbox-password","color":"#0099ff"},
        ]
      }
    },
    methods:{
      updateTitle_HOME () {
        // タイトルとして使いたい情報を渡す
        this.$nuxt.$emit('updateTitle_HOME', 'Moodocs 設定')
      },
      setting_first_button (trigger) {
        if (trigger == 'logout') {
          this.hearing_dialog = true
          this.hear_title = 'ログアウト'
          this.hear_comment = 'ログアウトしますか？'
          this.hear_tags = 'logout'
          this.closed_tags = 'logout'
          this.hear_types = 'yes_or_no'
        } else if (trigger == 'account_setting') {
          this.account_list_setting = true
        }
      },
      setting_second_button(trigger) {
         if (trigger == 'name') {
          this.hearing_dialog = true
          this.hear_title = '名前の変更'
          this.hear_comment = '変更する名前を入力してください。'
          this.hear_tags = trigger
          this.closed_tags = trigger
          this.hear_types = 'texttype'
          this.inputtype = '名前'
          this.input = "text"
        } else if (trigger == 'mail') {
          this.hearing_dialog = true
          this.hear_title = 'メールアドレスの変更'
          this.hear_comment = '変更するメールアドレスを入力してください。'
          this.hear_tags = trigger
          this.closed_tags = trigger
          this.hear_types = 'texttype'
          this.inputtype = 'メールアドレス'
          this.input = "text"
        } else if (trigger == 'id') {
          this.hearing_dialog = true
          this.hear_title = 'IDの変更'
          this.hear_comment = '変更するIDを入力してください。'
          this.hear_tags = trigger
          this.closed_tags = trigger
          this.hear_types = 'texttype'
          this.inputtype = 'ID'
          this.input = "text"
        } else if (trigger == 'pass') {
          this.hearing_dialog = true
          this.hear_title = 'パスワードをの変更'
          this.hear_comment = '変更するパスワードを入力してください。'
          this.hear_tags = trigger
          this.closed_tags = trigger
          this.hear_types = 'texttype'
          this.inputtype = 'パスワード'
          this.input = "password"
        }
      },
      close(closed_tags) {
        if (closed_tags == 'logout') {
          this.hearing_dialog = false
          this.hear_types = ''
        } else if (closed_tags == 'name') {
          this.hearing_dialog = false
          this.hear_types = ''
          this.hear_text_field = ''
        } else if (closed_tags == 'id') {
          this.hearing_dialog = false
          this.hear_types = ''
          this.hear_text_field = ''
        } else if (closed_tags == 'mail') {
          this.hearing_dialog = false
          this.hear_types = ''
          this.hear_text_field = ''
        } else if (closed_tags == 'pass') {
          this.hearing_dialog = false
          this.hear_types = ''
          this.hear_text_field = ''
        } else if (closed_tags == 'h_name') {
          this.hearing_dialog = false
          setTimeout(() => {
            this.hearing_dialog = true
            this.hear_title = '名前の変更'
            this.hear_comment = '変更する名前を入力してください。'
            this.hear_tags = 'name'
            this.closed_tags = 'name'
            this.hear_types = 'texttype'
            this.inputtype = '名前'
          }, 300);
        } else if (closed_tags == 'h_mail') {
          this.hearing_dialog = false
          setTimeout(() => {
            this.hearing_dialog = true
            this.hear_title = 'メールアドレスの変更'
            this.hear_comment = '変更するメールアドレスを入力してください。'
            this.hear_tags = 'mail'
            this.closed_tags = 'mail'
            this.hear_types = 'texttype'
            this.inputtype = 'メールアドレス'
          }, 300);
        } else if (closed_tags == 'h_id') {
          this.hearing_dialog = false
          setTimeout(() => {
            this.hearing_dialog = true
            this.hear_title = 'IDの変更'
            this.hear_comment = '変更するIDを入力してください。'
            this.hear_tags = 'id'
            this.closed_tags = 'id'
            this.hear_types = 'texttype'
            this.inputtype = 'ID'
          }, 300);
        } else if (closed_tags == 'h_pass') {
          this.hearing_dialog = false
          setTimeout(() => {
            this.hearing_dialog = true
            this.hear_title = 'パスワードをの変更'
            this.hear_comment = '変更するパスワードを入力してください。'
            this.hear_tags = 'pass'
            this.closed_tags = 'pass'
            this.hear_types = 'texttype'
            this.inputtype = 'パスワード'
          }, 300);
        }else {
          this.hearing_dialog = false
        }
      },
      boot(tags) {
        if (tags == 'logout') {
          localStorage.removeItem('login_token')
          location.href = "/"
        } else if (tags == 'name') {
          this.hearing_dialog = false
          this.name_change(this.hear_text_field)
        } else if (tags == 'mail') {
          this.hearing_dialog = false
          this.mail_change(this.hear_text_field)
        } else if (tags == 'id') {
          this.hearing_dialog = false
          this.id_change(this.hear_text_field)
        } else if (tags == 'pass') {
          this.hearing_dialog = false
          this.pass_change(this.hear_text_field)
        }
      },
      hear (tags) {
        if (tags == 'name') {
          this.hearing_dialog = false
          setTimeout(() => {
            if (this.hear_text_field != "") {
              this.hear_types = 'yes_or_no'
              this.hear_title = '名前の変更'
              this.hear_comment = 'この名前にしてもよろしいでしょうか？→ '+ this.hear_text_field
              this.hearing_dialog = true
              this.closed_tags = 'h_name'
            } else {
              this.hear_types = 'ok'
              this.hear_title = 'FormError'
              this.hear_comment = '名前を入力してください！'
              this.hearing_dialog = true
              this.closed_tags = 'h_name'
            }
          }, 300);
        } else if (tags == 'mail') {
          this.hearing_dialog = false
          setTimeout(() => {
            if (this.hear_text_field != "") {
              this.hear_types = 'yes_or_no'
              this.hear_title = 'メールアドレスの変更'
              this.hear_comment = 'このメールアドレスにしてもよろしいでしょうか？→ '+ this.hear_text_field
              this.hearing_dialog = true
              this.closed_tags = 'h_mail'
            } else {
              this.hear_types = 'ok'
              this.hear_title = 'FormError'
              this.hear_comment = 'メールアドレスを入力してください！'
              this.hearing_dialog = true
              this.closed_tags = 'h_mail'
            }
          }, 300);
        } else if (tags == 'id') {
          this.hearing_dialog = false
          setTimeout(() => {
            if (this.hear_text_field != "") {
              this.hear_types = 'yes_or_no'
              this.hear_title = 'IDの変更'
              this.hear_comment = 'このIDに変更してもよろしいでしょうか？→ '+ this.hear_text_field
              this.hearing_dialog = true
              this.closed_tags = 'h_id'
            } else {
              this.hear_types = 'ok'
              this.hear_title = 'FormError'
              this.hear_comment = 'IDを入力してください！'
              this.hearing_dialog = true
              this.closed_tags = 'h_id'
            }
          }, 300);
        } else if (tags == 'pass') {
          this.hearing_dialog = false
          setTimeout(() => {
            if (this.hear_text_field != "") {
              this.hear_types = 'yes_or_no'
              this.hear_title = 'パスワードの変更'
              this.hear_comment = 'このパスワードに変更してもよろしいでしょうか？。→ '+ this.hear_text_field
              this.hearing_dialog = true
              this.closed_tags = 'h_pass'
            } else {
              this.hear_types = 'ok'
              this.hear_title = 'FormError'
              this.hear_comment = 'パスワードを入力してください！'
              this.hearing_dialog = true
              this.closed_tags = 'h_pass'
            }
          }, 300);
        }
      },
      name_change(name) {
        const id = localStorage.getItem('login_token')
        const cloud_data = {
          'token':id,
          'new_name': name,
        }
        this.$store.commit('changer/connection')
        setTimeout(() => {
          this.$store.dispatch('changer/change_is_name',cloud_data)
          setTimeout(() => {
            const s = this.$store.getters["changer/connections"]
            console.log(s)
            if (s == 200) {
              this.hear_types = 'ok'
              this.hear_title = '変更が完了しました！'
              this.hear_comment = 'あなたの名前です。→ '+ this.hear_text_field
              this.hearing_dialog = true
              this.closed_tags = 'end'
              this.hear_text_field = ''
              this.$store.commit('changer/reset_network')
            } else if (s == 500) {
              this.hear_types = 'ok'
              this.hear_title = 'エラー！'
              this.hear_comment = '管理者に連絡してください。'
              this.hearing_dialog = true
              this.closed_tags = 'end'
              this.hear_text_field = ''
              this.$store.commit('changer/reset_network')
            }
          }, 400);
        }, 200);
      },
      id_change(id) {
        const token = localStorage.getItem('login_token')
        const cloud_data = {
          'token':token,
          'new_id': id,
        }
        this.$store.commit('changer/connection')
        setTimeout(() => {
          this.$store.dispatch('changer/change_is_id',cloud_data)
          setTimeout(() => {
            const s = this.$store.getters["changer/connections"]
            console.log(s)
            if (s == 200) {
              this.hear_types = 'ok'
              this.hear_title = '変更が完了しました！'
              this.hear_comment = 'あなたのIDです。→ '+ this.hear_text_field
              this.hearing_dialog = true
              this.closed_tags = 'end'
              this.hear_text_field = ''
              this.$store.commit('changer/reset_network')
            } else if (s == 500) {
              this.hear_types = 'ok'
              this.hear_title = 'エラー！'
              this.hear_comment = '管理者に連絡してください。'
              this.hearing_dialog = true
              this.closed_tags = 'end'
              this.hear_text_field = ''
              this.$store.commit('changer/reset_network')
            }
          }, 400);
        }, 200);
      },
      mail_change(mail) {
        const token = localStorage.getItem('login_token')
        const cloud_data = {
          'token':token,
          'new_mail': mail,
        }
        this.$store.commit('changer/connection')
        setTimeout(() => {
          this.$store.dispatch('changer/change_is_mail',cloud_data)
          setTimeout(() => {
            const s = this.$store.getters["changer/connections"]
            console.log(s)
            if (s == 200) {
              this.hear_types = 'ok'
              this.hear_title = '変更が完了しました！'
              this.hear_comment = 'あなたのメールアドレスです。→ '+ this.hear_text_field
              this.hearing_dialog = true
              this.closed_tags = 'end'
              this.hear_text_field = ''
              this.$store.commit('changer/reset_network')
            } else if (s == 500) {
              this.hear_types = 'ok'
              this.hear_title = 'エラー！'
              this.hear_comment = '管理者に連絡してください。'
              this.hearing_dialog = true
              this.closed_tags = 'end'
              this.hear_text_field = ''
              this.$store.commit('changer/reset_network')
            }
          }, 400);
        }, 200);
      },
      pass_change(pass) {
        const token = localStorage.getItem('login_token')
        const cloud_data = {
          'token':token,
          'new_pass': pass,
        }
        this.$store.commit('changer/connection')
        setTimeout(() => {
          this.$store.dispatch('changer/change_is_pass',cloud_data)
          setTimeout(() => {
            const s = this.$store.getters["changer/connections"]
            console.log(s)
            if (s == 200) {
              this.hear_types = 'ok'
              this.hear_title = '変更が完了しました！'
              this.hear_comment = 'パスワードを変更しました。'
              this.hearing_dialog = true
              this.closed_tags = 'end'
              this.hear_text_field = ''
              this.$store.commit('changer/reset_network')
            } else if (s == 500) {
              this.hear_types = 'ok'
              this.hear_title = 'エラー！'
              this.hear_comment = '管理者に連絡してください。'
              this.hearing_dialog = true
              this.closed_tags = 'end'
              this.hear_text_field = ''
              this.$store.commit('changer/reset_network')
            }
          }, 400);
        }, 200);
      }
    },
    mounted () {
      this.updateTitle_HOME()
    }
}
</script>