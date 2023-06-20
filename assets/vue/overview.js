export default {
  props: ['article'],
  data() {
    return {
      dialog: true,
      selected_size: -1,
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
          <div v-if="article.image_path != null">
          <img :src="'https://wetebucket.s3.us-west-2.amazonaws.com/'+article.image_path" class="center">
          </div>
          <br>
        <div class="h4" style="text-align:center">{{ article.name }}</div>
          <div class="dialog" v-if="dialog">
            <div class="dialog-content">    
            </div>
          </div>
          <div class="d-flex justify-content-between">
          <p class="article-text-desc">
            <div class="article-text-desc">{{ article.description }} </div>
          </p>
          </div>
          <br>
          <div>
            <div class="row">
              <div class="col-4 text-start"> 
                <p class="article-text-desc">
                <span class="article-text-desc"> {{ article.price }} &euro;</span>
                </p>
              </div>
              <div class="col-2 text-end"> 
                <select class="" v-model="selected_size">
                  <option value="-1">Größe Wählen</option> 
                  <option v-for="size in article.variantSizes" :key="size.id" :value="size.id" :disabled="size.stock < 1">
                    {{ size.name }}
                  </option>
                </select>
              </div>
            </div>
          <br>
          <span :id="article.id" v-if="selected_size > 0" class="ml-2 btn btn-outline-primary article-text-desc" @click="$emit('order', selected_size)">Bestellen</span>
          </div>
          <p></p>
        </div>
      </div>

     </div>`
};