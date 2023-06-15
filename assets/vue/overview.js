export default {
    props: ['article'],
    data() {
      return {
        dialog: true,
      };
    },
    methods: {
        toggleDialog() {
            this.dialog = !this.dialog;
        }
    },
    template: `
              <div class="mt-2">
                  <div class="h4">{{ article.name }}</div>
                  <div class="d-flex justify-content-between">
                      <div class="h6">{{ article.description }} 
                        <span class="ml-1" v-if="article.image" @click="toggleDialog()">(Bild anzeigen)</span>
                      </div>
                      <div>
                          <span class="h6"> {{ article.price }} &euro;</span>
                          <span :id="article.id" class="ml-2 btn btn-outline-primary" @click="$emit('order', article.id)">Bestellen</span>
                      </div>
                      <p></p>
                      <div class="dialog" v-if="dialog">
                        <div class="dialog-content">    
                          <button @click="toggleDialog()" class="close-icon" >x</button>
                          <div v-if="article.articleVariants[0] != null">
                            <img :src="'https://wetebucket.s3.us-west-2.amazonaws.com/'+article.articleVariants[0].image_path">
                          </div>
                        </div>
                      </div>
                  </div>
            </div>`
  };
  