<template>
  <div class="">
    <center><h1>{{name}}</h1></center>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <center><h1>{{roommaster}} (Master)</h1></center>
          <br>
          <img style="width:250px;height:250px;" src="https://cdn3.iconfinder.com/data/icons/cool-avatars-2/190/00-07-2-512.png" alt="">
        </v-flex>
        <v-flex xs6>
          <center><h1>{{opponent}}</h1></center>
          <br>
          <img style="width:250px;height:250px;" src="https://cdn4.iconfinder.com/data/icons/cool-avatars-2/190/00-01-512.png" alt="">
        </v-flex>
      </v-layout>
      <div v-if="opponent !='Waiting player ...'" class="">
        <v-btn color="orange" dark @click="startGame">START GAME</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
  // import room from '../components/room'

  export default {
    components: {

    },
    data:() => {
      return {
        name:"",
        roommaster: "",
        opponent: "Waiting player ..."
      }
    },
    methods: {
      startGame() {
        db.collection("rooms").doc(this.$route.params.roomId).update({
            status: 'Battle'
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
      }
    },
    mounted() {
      console.log(this)
      db.collection("rooms").doc(this.$route.params.roomId)
        .onSnapshot((doc) => {
        this.name = doc.data().name
        this.roommaster = doc.data().roommaster
        this.opponent = doc.data().opponent

        if (doc.data().status == 'Battle') {
          this.$router.push(`/lobby/${this.$route.params.roomId}/play`)
        }

      });
    }
  }
</script>
