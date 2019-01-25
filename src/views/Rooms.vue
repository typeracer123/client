<template>
  <div class="">
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
        <v-btn v-if="room.opponent =='Waiting player ...'" color="blue" dark @click="joinRoom()">JOIN</v-btn>
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

    },
    data: function() {
      return {
        rooms: []
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
