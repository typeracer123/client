<template>
  <div class="">
    <center><h1>Create Room</h1></center>
    <v-form v-model="valid">
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
            winner: ""
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
        roomName: ""
      }
    },
    created() {
      db.collection("rooms").onSnapshot((querySnapshot) => {
        this.rooms = []
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);

          let obj = doc.data()
          obj.id = doc.id

          this.rooms.push(obj)
        });
      });
    }
  }
</script>
