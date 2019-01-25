<template>
  <div class="">
    <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    >
    <v-jumbotron dark>
          <v-container fill-height>
            <v-layout align-center>
              <v-flex>
                <h3 class="display-3">TypeRacer123</h3>
                <span class="subheading">Mari kuatkan jari tangan kita !!!</span>
              </v-flex>
            </v-layout>
          </v-container>
    </v-jumbotron>
    </v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    components: {
      // HelloWorld
    },
    data () {
      return {
        items: [
          {
            src: 'https://media2.giphy.com/media/QJuyWBWP1Evxm/source.gif'
          },
          {
            src: 'http://66.55.82.218/uploaded_images/119846-Seagate-And-Snapchat-Prove-You-Don-t-Need-To-Be-An-Elite-Hacker-To-....gif'
          },
          {
            src: 'https://media.giphy.com/media/YQitE4YNQNahy/giphy-downsized-large.gif'
          },
          {
            src: 'https://i.imgur.com/pzw4C8l.gif'
          }
        ]
      }
    },
  }
</script>
