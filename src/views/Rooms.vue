<template>
  <div class="">
    <center><h1>Create Room</h1></center>
    <v-form>
      <v-container>
        <v-layout align-center justify-center>
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="roomName"
              label="Room's name"
              required
            ></v-text-field>
          </v-flex>
          <v-btn color="blue" dark @click="createRoom()">Create Room</v-btn>
        </v-layout>
      </v-container>
    </v-form>
    <br>
    <center><h1>Avaiable Rooms</h1></center>
    <br>
    <v-card v-for="room in rooms">
      <v-card-title>
        <strong>{{room.name}}</strong>
        <v-divider
        class="mx-3"
        inset
        vertical
      ></v-divider>
      Current Player: {{room.roommaster}}
      <v-divider
        class="mx-3"
        inset
        vertical
      ></v-divider>
      Status: <strong>{{room.status}}</strong>
      <v-divider
        class="mx-3"
        inset
        vertical
      ></v-divider>
        <v-btn v-if="room.opponent =='Waiting player ...'" color="blue" dark @click="joinRoom(room.id)">JOIN</v-btn>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
  // import room from '../components/room'

  export default {
    components: {

    },
    methods: {
      createRoom() {
        db.collection("rooms").add({
            name: this.roomName,
            opponent: "Waiting player ...",
            roommaster: localStorage.getItem('username'),
            status: "Waiting for player",
            winner: "",
            question: this.question[Math.floor(Math.random()*3)]
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.$router.push(`/lobby/${docRef.id}`)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
      },

      joinRoom(id) {
        db.collection("rooms").doc(id).update({
          opponent: localStorage.getItem('username'),
          status: "Played"
        })
        .then(() => {
            console.log("Document successfully written!");
            this.$router.push(`/lobby/${id}`)
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
      }
    },
    data: function() {
      return {
        rooms: [],
        roomName: "",
        question: [
          's4y4n9 0p0 k0w3 krun9u j3r1te at1 ku b3rh4r4p 3ngkau k3mb4l1',
          'w4h g1l4 jug4 l0e j4g0 b4ng3t ng0din9 ny4 j4d1 p1ng1n gu3',
          'l1v3 c0d3 k3m4r3n k0k sus4h s1 k4k k4t4ny4 g4mpa4ng h3h3',
          'Wie freu ich mich der Sommerwonne! by August Heinrich Hoffmann von Fallersleben'
        ]
      }
    },
    mounted() {
      console.log('Haiii ini lobyyyyyyyyyyyyyy');
      db.collection("rooms").onSnapshot((querySnapshot) => {
        this.rooms = []
        querySnapshot.forEach((doc) => {
          console.log('rooms', doc)
          console.log(`${doc.id} => ${doc.data()}`);

          let obj = doc.data()
          obj.id = doc.id

          this.rooms.push(obj)
        });
      }, function(error) {
        console.log(error);
      });
    }
  }
</script>
