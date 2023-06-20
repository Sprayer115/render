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


      <div class="float-child" style="width: 200px; display: table-cell;">
        <div class="card">
          <div v-if="article.articleVariants[0] != null">
          <img :src="'https://wetebucket.s3.us-west-2.amazonaws.com/'+article.articleVariants[0].image_path" class="center">
          </div>
          <br>
        <div class="h4" style="text-align:center">{{ article.name }}</div>
          <div class="dialog" v-if="dialog">
            <div class="dialog-content">    
            </div>
          </div>
          <div class="d-flex justify-content-between">
          <p class="article-text-desc">
            <div class="article-text-desc">{{ article.description }} 
          </p>
          </div>
          <br>
          <div>
          <p class="article-text-desc">
          <span class="article-text-desc"> {{ article.price }} &euro;</span>
          </p>
          <br>
          <span :id="article.id" class="ml-2 btn btn-outline-primary article-text-desc" @click="$emit('order', article.id)">Bestellen</span>
          </div>
          <p></p>
        </div>
      </div>

     </div>`
};