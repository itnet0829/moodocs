<template>
    <v-card>
        <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel
                v-for="(item,i) in file"
                :key="i"
            >
                <v-expansion-panel-header>
                    {{ item.filename }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-btn color="error" v-if="item.id > 1" @click="hear('delete',item.id)">フォームの削除</v-btn>
                    <v-container>
                        <input
                            style="display: none"
                            ref="input"
                            type="file"
                            accept="application/pdf"
                            @change="selectedFile()"
                        >
                        <v-layout text-xs-center wrap>
                            <v-flex xs12>
                                <div style="text-align: left; font-size: 1.0em; margin-bottom: 20px;">{{ item.filecom }}</div>
                                <v-btn color="primary" @click="btnclick(item.random_code)" style="width: 100%;">{{ item.filebtn }}</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-container>
                        <div style="text-align: left; font-size: 1.0em; margin-bottom: 20px;" v-html="'❷.請求する会社を選択してください。'"></div>
                        <template>
                                <v-select
                                    :items="itemData"
                                    label="会社名"
                                    v-model="item.company"
                                    required
                                ></v-select>
                        </template>
                    </v-container>
                    <v-container>
                        <div style="text-align: left; font-size: 1.0em; margin-bottom: 20px; white-space: pre-wrap;" v-html="'❸.請求金額を入力してください。\n(数字専用。コンマは不要です。)'"></div>
                        <template>
                            <v-text-field
                                label="請求金額"
                                type="number"
                                v-model="item.price"
                            ></v-text-field>
                        </template>
                    </v-container>
                    <v-container>
                        <div style="text-align: left; font-size: 1.0em; margin-bottom: 20px;" v-html="'❹.請求期限を入力してください。'"></div>
                        <template>
                            <v-row>
                                <v-col
                                    class="d-flex"
                                    cols="4"
                                    sm="4"
                                    style ="margin-left: 0px; margin-top: 20px; margin-bottom: 20px;"
                                >
                                    <v-select
                                        :items="itemyears"
                                        label="年"
                                        v-model="item.due.year"
                                        dense
                                    ></v-select>
                                </v-col>
                                <v-col
                                    class="d-flex"
                                    cols="3"
                                    sm="3"
                                    style ="margin-left: 15px; margin-top: 20px; margin-bottom: 20px;"
                                >
                                    <v-select
                                        :items="itemmonths"
                                        label="月"
                                        v-model="item.due.month"
                                        dense
                                    ></v-select>
                                </v-col>
                                <v-col
                                    class="d-flex"
                                    cols="3"
                                    sm="3" 
                                    style="margin-left: 20px; margin-top: 20px; margin-bottom: 20px;"
                                >
                                    <v-select
                                        :items="itemday"
                                        label="日"
                                        v-model="item.due.day"
                                        dense
                                    ></v-select>
                                </v-col>
                            </v-row>  
                        </template>
                    </v-container>
                    <v-container>
                        <div style="text-align: left; font-size: 1.0em; margin-bottom: 20px;" v-html="'❺.請求書は何月に発行しましたか？'"></div>
                        <template>
                            <v-row>
                                <v-col
                                    class="d-flex"
                                    cols="4"
                                    sm="4"
                                    style ="margin-left: 0px; margin-top: 20px; margin-bottom: 20px;"
                                >
                                    <v-select
                                        :items="itemyears"
                                        label="年"
                                        v-model="item.upload_date.year"
                                        dense
                                    ></v-select>
                                </v-col>
                                <v-col
                                    class="d-flex"
                                    cols="3"
                                    sm="3"
                                    style ="margin-left: 15px; margin-top: 20px; margin-bottom: 20px;"
                                >
                                    <v-select
                                        :items="itemmonths"
                                        label="月"
                                        v-model="item.upload_date.month"
                                        dense
                                    ></v-select>
                                </v-col>
                                <v-col
                                    class="d-flex"
                                    cols="3"
                                    sm="3" 
                                    style="margin-left: 20px; margin-top: 20px; margin-bottom: 20px;"
                                >
                                    <v-select
                                        :items="itemday"
                                        label="日"
                                        v-model="item.upload_date.day"
                                        dense
                                    ></v-select>
                                </v-col>
                            </v-row>  
                        </template>
                    </v-container>
                    <v-container>
                        <div style="text-align: left; font-size: 1.0em; margin-bottom: 20px;" v-html="'❻.備考または、メッセージを入力してください。'"></div>
                        <template>
                            <v-textarea
                                label="メッセージ"
                                height="300px"
                                v-model="item.message"
                                style="margin-top: -80px;"
                            ></v-textarea>
                        </template>
                    </v-container>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-btn style="width:100%; margin-top: 10px;" color="primary" @click="addDocuments"><v-icon>mdi-plus</v-icon>新しく請求書を追加する</v-btn>
        <div style="text-align: center; font-size: 18px; margin-top: 60px; white-space: pre-wrap;" v-html="'◉提出するファイルとその他項目に\n不備がない場合は、\nそのまま下記のボタンを押してください。'"></div>
        <v-btn style="width:100%; margin-top: 50px; margin-bottom: 90px; height:60px; font-size: 20px;" color="purple darken-1" dark @click="hear('uploader_boot')" class="justify-center"><v-icon>mdi-file</v-icon>請求書を提出する</v-btn>
        <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card color="grey lighten-2">
        <v-toolbar
          dark
        >
          <v-toolbar-title v-html="tool_title"></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-img src="http://flat-icon-design.com/f/f_object_154/s256_f_object_154_0bg.png" max-height="210" max-width="210" style="margin: 0 auto; margin-top: 160px;"></v-img>
        <div style="font-size: 1.3em; color:#000; width:80%;margin: 0 auto; margin-top: 10px; text-align: center;">{{ file_name }}</div>
        <div style="font-size: 1.1em; color:#000; width:80%;margin: 0 auto; margin-top: 5px; text-align: center;">{{ counter }} / {{ file.length}}</div>
        <div style="font-size: 1.7em; color:#000; width:80%;margin: 0 auto; margin-top: 20px; text-align: center;">{{ Math.ceil(upload_percentage)}}%</div>
        
        <v-progress-linear
            v-model="upload_percentage"
            color="primary"
            height="4"
            style="text-align: center; width: 80%; margin: 0 auto; margin-top: 0px;"
        >
        </v-progress-linear>
        <div style="font-size: 1.1em; color:#000; width:80%;margin: 0 auto; margin-top: 40px; text-align: center;">{{ progress_words }}</div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="hearing_dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ hear_title }}
        </v-card-title>
        <v-card-text>{{ hear_comment }}</v-card-text>
        <v-card-actions>
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
            @click="hearing_dialog = false"
          >
            いいえ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-card>

</template>
<script>
export default {
    data() {
        return {
            data: false,
            dialog: false,
            counter:0,
            tool_title: '',
            file_name: 'Please wait...',
            itemData: ['電気校','合同会社ANT','ANT AGENT','INF','千万事屋レイ','Subir','将軍','other'],
            isUploading: false,
            panelen: 0,
            panel: [0],
            active_code: '',
            upload_percentage: 0,
            progress_words: 'windo',
            file: [],
            server_org: "server",
            activic_code: '',
            domain: "",
            hearing_dialog: false,
            hear_title: '',
            hear_comment: '',
            hear_tags: '',
            delete_num: 0,
            itemday: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            itemmonths: [1,2,3,4,5,6,7,8,9,10,11,12],
            itemyears: [],
        }
    },
    methods: {
        btnclick(code) {
            this.active_code = code
            this.$refs.input[0].click()
        },
        selectedFile() {
            this.isUploading = true;
            const file = this.$refs.input[0].files[0]
            var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            var N=16
            try{
                this.file.forEach(function(obj){
                    if (obj.random_code == this.active_code){
                        obj.filename = file.name
                        obj.filebtn = '再度選択する'
                        obj.filecom = '❶.PDFファイルが選択されました。(' + file.name + ')'
                        const reader = new FileReader()
                        reader.readAsDataURL(file)
                        reader.onload = () => {
                            obj.base64pdf = reader.result
                        }
                        this.active_code = ''
                    }
                },this)
            } catch (e) {
                console.log('Error warning' + e)
                this.file.forEach(function(obj){
                    if (obj.random_code == this.active_code){
                        obj.filename = 'ファイルを提出する。'
                        obj.filebtn = 'ファイルを選択する'
                        obj.filecom = '❶.PDFファイル情報'
                        this.active_code = ''
                    }
                },this)
            }
        },
        addDocuments() {
            this.$vuetify.goTo(0)
            var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            var N=16
            this.panelen += 1
            this.file.push({
                'id': this.file.length+1,
                'random_code': Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join(''),
                'string_random_code':'',
                'filename':'ファイルを提出',
                'filebtn': 'ファイルを選択する',
                'filecom': '❶.PDFファイル情報',
                'link_token':'',
                'name':this.$store.state.login.name,
                'company':'',
                'price': '',
                'login_token':localStorage.getItem('login_token'),
                'due':{
                    'year':'',
                    'month':'',
                    'day':''
                },
                'upload_date': {
                    'year':'',
                    'month':'',
                    'day':''
                },
                'message':'',
                'base64pdf':''
            })
            this.panel.push(this.panelen)
            console.log(this.file)
            this.panel.shift()
        },
        if_deploying_serv () {
            if (this.server_org == "server") {
                this.domain = "https://moodocs.ant-group2022.com/apps/public/api"
            } else if (this.server_org == "pc") {
                this.domain = "http://localhost:8000/api"
            }
        },
        logined_preparing() {
            var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            var N=16
            if (this.$store.state.login.status == 200) {
                this.file.push({
                    'id': this.file.length+1,
                    'random_code': Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join(''),
                    'string_random_code':'',
                    'filename':'ファイルを提出',
                    'filebtn': 'ファイルを選択する',
                    'filecom': '❶.PDFファイル情報',
                    'name':this.$store.state.login.name,
                    'company':'',
                    'price': '',
                    'login_token':localStorage.getItem('login_token'),
                    'due':{
                        'year':'',
                        'month':'',
                        'day':''
                    },
                    'upload_date': {
                        'year':'',
                        'month':'',
                        'day':''
                    },
                    'message':'',
                    'base64pdf':''
                })
                console.log(this.file)
            } else if (this.$store.state.login.status == 404) {

            }
        },
        workspace (file_info) {

            this.$axios({
                method: 'post',
                url: this.domain + "/gas",
                data: file_info
            }).then((res) => {
                if (res.data.status == 200) {
                    this.$nuxt.$emit('upload', '完了','ファイル提出が完了しました。')
                    this.dialog = false
                    this.file = []
                    this.logined_preparing()
                    return true
                } else if (res.data.status == 404) {
                    this.dialog = false
                    this.$nuxt.$emit('upload', 'エラー','Security check failed.')
                    return false
                }
            }).catch((res) => {
                this.dialog = false
                this.$nuxt.$emit('workspace', '通信エラー','管理者にお問い合わせください。')
                return false
            })
        },
        year_update() {
            const dt = new Date()
            this.itemyears.push(dt.getFullYear())
            this.itemyears.push(dt.getFullYear()+1)
        },
        upload_task(obj) {
            console.log(obj)
            this.file_name = obj.filename
            this.activic_code
            this.counter += 1

                // 起点 0%

                setTimeout(() => {
                    const Q1 = this.wordscheck(obj)

                    if (Q1 == false) {
                        this.counter = 0
                        return false // 処理終了
                    }

                    this.upload_percentage += 10 / this.file.length
                    this.progress_words = 'データ情報をサーバーへ格納しています。'

                    setTimeout(() => {
                        const data_info = {
                            "name":obj.name,
                            "company":obj.company,
                            "price":new Intl.NumberFormat().format(obj.price),
                            "message":obj.message,
                            "random_code":obj.random_code,
                            "due":obj.due.year + "-" + obj.due.month + "-" + obj.due.day,
                            "now":obj.upload_date.year + "-" + obj.upload_date.month + "-" + obj.upload_date.day,
                            "login":obj.login_token
                        }

                        const Q2 = this.data_insert(data_info)

                        if (Q2 == false) {
                            this.counter = 0
                            return false // 処理終了
                        }

                        this.upload_percentage += 15 / this.file.length
                        this.progress_words = 'トークンをセーブしています。'


                        setTimeout(() => {
                            obj.link_token = this.activic_code
                            this.upload_percentage += 5 / this.file.length
                            this.progress_words = 'ファイルをサーバーへアップロードしています。'

                            const file_info = {
                                "pdf":obj.base64pdf,
                                "filename":obj.filename,
                                "datacode":obj.random_code,
                                "login_token":obj.login_token
                            }

                            const Q3 = this.file_insert(file_info)

                            if (Q3 == false) {
                                this.counter = 0
                                return false // 処理終了
                            }


                            this.upload_percentage += 40 / this.file.length
                            this.progress_words = 'ファイル情報を組織のワークスペースへ送信中です。'

                            setTimeout(() => {
                                const file = {
                                    "company":obj.company,
                                    "price":new Intl.NumberFormat().format(obj.price),
                                    "message":obj.message,
                                    "due":obj.due.year + "-" + obj.due.month + "-" + obj.due.day,
                                    "now":obj.upload_date.year + "-" + obj.upload_date.month + "-" + obj.upload_date.day,
                                    "link_token":obj.random_code,
                                    "login":obj.login_token
                                }

                                const Q4 = this.workspace(file)

                                if (Q4 == false) {
                                    this.counter = 0
                                    return false // 処理終了
                                }
                                setTimeout(() => {

                                    this.upload_percentage += 30 / this.file.length
                                    this.progress_words = 'もうすぐで提出が完了します。'

                                    
                                }, 1000);
                            }, 100);
                        }, 2000);
                    }, 2000);
                }, 100);

            this.counter = 0
        },
        hear(whats,itemcord){
            if (whats == 'uploader_boot') {
                this.hearing_dialog = true
                this.hear_title = 'ファイルを提出しますか？'
                this.hear_comment = this.file.length + '個のフォームデータがあります。そのまま提出してもよろしいでしょうか？'
                this.hear_tags = 'uploader_boot'
            } else if (whats == 'delete') {
                this.hearing_dialog = true
                this.delete_num = itemcord
                this.hear_title = 'フォームデータを削除しますか？'
                this.hear_comment = itemcord + '個目のフォームデータを削除します。よろしいでしょうか？'
                this.hear_tags = 'delete'
            }
        },
        boot(whats) {
            if (whats == 'uploader_boot') {
                this.hearing_dialog = false
                this.upload()
            } else if (whats == 'delete') {
                this.hearing_dialog = false
                this.formdelete(this.delete_num)
            }
        },
        upload() {
            this.dialog = true
            this.tool_title = '請求書を提出しています。'
            this.progress_words = 'フォーム情報をチェックしています。'

            for(const obj of this.file){
                setTimeout(() => {
                    this.upload_task(obj)
                }, 1000)
            }

            this.upload_percentage = 0
        },
        wordscheck (obj) {
            if (obj.base64pdf == '') {　// 文字スキャン PDFファイル
                this.dialog = false
                this.$nuxt.$emit('upload', 'ファイルが選択されていません。','ファイルを選んでください。\n該当:'+ obj.id + '番目のフォーム')
                return false
            } else if (obj.company == '') { // 文字スキャン 請求会社名
                this.dialog = false
                this.$nuxt.$emit('upload', '会社名が選択されていません。','請求する会社名を選んでください。\n該当:'+ obj.id + '番目のフォーム')
                return false
            } else if (obj.price == '' || obj.price.indexOf('-') != -1) { // 文字スキャン 金額
                if (obj.price == '') {
                    this.dialog = false
                    this.$nuxt.$emit('upload', '金額が入力されていません。','金額を入力してください。\n該当:'+ obj.id + '番目のフォーム')
                    return false
                } else if (obj.price.indexOf('-') != -1) {
                    this.dialog = false
                    this.$nuxt.$emit('upload', '金額エラー','金額にマイナスをつけてはいけません。\n該当:'+ obj.id + '番目のフォーム')
                    return false
                }
            } else if (obj.due.year == '' || obj.due.month == '' || obj.due.day == '') { // 文字スキャン 期限
                this.dialog = false
                var body = ''
                if (obj.due.year == '') {
                    body += '期限年が入力されていません。\n'
                    this.$nuxt.$emit('upload', '期限を入力してください。',body + '\n該当:'+ obj.id + '番目のフォーム')
                    return false
                } else if (obj.due.month == '') {
                    body += '期限月が入力されていません。\n'
                    this.$nuxt.$emit('upload', '期限を入力してください。',body + '\n該当:'+ obj.id + '番目のフォーム')
                    return false
                } else if (obj.due.day == '') {
                    body += '期限日が入力されていません。'
                    this.$nuxt.$emit('upload', '期限を入力してください。',body + '\n該当:'+ obj.id + '番目のフォーム')
                    return false
                }
                return false
            } else if (obj.upload_date.year == '' || obj.upload_date.month == '' || obj.upload_date.day == '') { // 文字スキャン 発行年月日
                this.dialog = false 
                var body = ''
                if (obj.upload_date.year == '') {
                    body += '発行年が入力されていません。\n'
                    this.$nuxt.$emit('upload', '請求書発行日を入力してください。',body + '\n該当:'+ obj.id + '番目のフォーム')
                    return false
                } else if (obj.upload_date.month == '') {
                    body += '発行月が入力されていません。\n'
                    this.$nuxt.$emit('upload', '請求書発行日を入力してください。',body + '\n該当:'+ obj.id + '番目のフォーム')
                    return false
                } else if (obj.upload_date.day == '') {
                    body += '発行日が入力されていません。'
                    this.$nuxt.$emit('upload', '請求書発行日を入力してください。',body + '\n該当:'+ obj.id + '番目のフォーム')
                    return false
                }
                return false
            } else if (obj.message == '') { // 文字スキャン 金額
                this.dialog = false
                this.$nuxt.$emit('upload', 'メッセージが入力されていません。','メッセージを入力してください。\n該当:'+ obj.id + '番目のフォーム')
                return false
            }
            return true
        },
        data_insert(data_info){
            this.$axios({
                method: 'post',
                url: this.domain + "/uploading_data",
                data: data_info
            }).then((res) => {
                const signal = ''
                if (res.data.status == 200) {
                    this.activic_code = res.data.token
                    return res.data.token
                } else if (res.data.status == 404) {
                    this.dialog = false
                    this.$nuxt.$emit('upload', 'エラー','Security check failed.')
                    console.error('ログインに失敗しました。 DATA-CODE')
                    return false
                }
            }).catch((res) => {
                this.dialog = false
                this.$nuxt.$emit('upload', '通信エラー','管理者にお問い合わせください。')
                return false
            })
        },
        file_insert(file_info){
            this.$axios({
                method: 'post',
                url: this.domain + "/uploading_file",
                data: file_info,
                header: {
                    'Content-Type':'application/json'
                }
            }).then((res) => {
                if (res.data.status == 200) {
                    return true
                } else if (res.data.status == 404) {
                    this.dialog = false
                    this.activic_code = ''
                    this.$nuxt.$emit('upload', 'エラー','Security check failed.')
                    console.error('ログインに失敗しました。 FILE-CODE')
                    return false
                }
            }).catch((res) => {
                this.dialog = false
                this.$nuxt.$emit('upload', '通信エラー','管理者にお問い合わせください。')
                return false
            })
        },
        formdelete (id) {
            console.log('ok')
            this.file.splice(id-1, 1);
            this.file.forEach(function(obj){
                if(obj.id > id) {
                    obj.id -= id-1
                }
            },this)
            console.log(this.file)
        }
    },
    mounted () {
        setTimeout(() => {
            this.if_deploying_serv ()
            this.$store.commit("login/connection")
            setTimeout(() => {
                this.logined_preparing()
            }, 300);
            this.year_update()
        }, 500);
    }
}
</script>
