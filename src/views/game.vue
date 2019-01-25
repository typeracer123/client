<template>
  <div>
    <h1>{{ word }}</h1>
    <v-form
      >
        <v-text-field
          v-model="type"
          @keyup="checker"
        ></v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'ongame',
  data () {
    return {
      type: '',
      word: 'sayang opo kowe krungu jerite ati ku berharap engkau kembali'
    }
  },
  methods: {
    checker: async function () {
      try {
        console.log(this.$route)
        if (this.type === this.word) {
          console.log(this.$route.params.roomId)
          await db.collection('rooms').doc(this.$route.params.roomId).update({
            winner: localStorage.getItem('username')
          })
        }
      } catch (err) {
        console.error(err)
      }
    },
    listen: function () {
      var listeningRoom = db.collection('rooms').doc(this.$route.params.roomId).onSnapshot( async (doc) => {
        if (doc.data().winner) {
          await swal(`${doc.data().winner} is the winner!!!`, {
            buttons: true
          })
          listeningRoom()
          await db.collection('rooms').doc(this.$route.params.roomId).delete()
          this.$router.push('/lobby ')
        }
      })
    }
  },
  mounted () {
    this.listen()
  }
}
</script>

<style>

</style>
