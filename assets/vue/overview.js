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


      <div class="float-child" style="display: table-cell;">
        <div class="card">
          <div v-if="article.image_path != null">
          <img :src="'https://wetebucket.s3.us-west-2.amazonaws.com/'+article.image_path" class="center">
          </div>
          <div v-else>
          <img src="/images/shirtPics/rosa.jpg" class="center">
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
              <div class="col-4 ml-10"> 
                <p class="">
                <span style="text-align: center;"> {{ article.price }} &euro;</span>
                </p>
              </div>
              <div class="col-4"> 
                <select class="dropdown-menu-dark" v-model="selected_size">
                  <option value="-1">Größe Wählen</option> 
                  <v-select v-model="location" :items="article.variantSizes" label="size"></v-select>
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