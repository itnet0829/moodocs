<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="justify-center">
        <FileCenter />
      </v-card>
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
      this.$nuxt.$emit('updateTitle_HOME', 'Moodocs Uploader')
    }
  },
  mounted () {
    this.updateTitle_HOME()
    this.$store.commit("login/connection")
  }
}
</script>
