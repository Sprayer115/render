export default {
    data() {
      return {
        basket: [],
      };
    },
    methods: {
      deleteFromBasket(index) {
        if (confirm("Are you sure you want to delete this item?")) {
          let url = new URL(origin + '/api/basket');
          let data = new FormData();
          data.append("index", index);
          fetch(url, {
            method: "DELETE",
            body: data,
          })
          .then(res => {
            if (res.status !== 200) {
              alert(res.statusText);
            }
            return res.json();
          })
          .then(this.basket.splice(index, 1));
        }
      },
      getBasket() {
        let url = new URL(origin + '/api/basket');
        fetch(url)
        .then(res => res.json())
        .catch(error => {
          alert("Konnte Einkaufskorb nicht laden.");
          return false;
        })
        .then(data => this.basket = data.basket);
      }
    }, 
    mounted() {
      this.getBasket();
    },
     
    template: `
      <h1>Einkaufskorb</h1>
      <div class="mx-4">
      <ul class="list-group mb-4">
        <li class="list-group-item list-group-item-action active">
          <div class="row">
            <div class="col-3 font-size-mobile">Bild</div>
            <div class="col-2 font-size-mobile"> Artikel</div>
            <div class="col-4 font-size-mobile">Beschreibung</div>
            <div class="col-1 font-size-mobile">Preis</div>
            <div class="col-2 ml-auto text-end">
            </div>
          </div>
          
        </li>
        <li class="list-group-item" v-for="(item, index) in basket">
          <div class="row">
            <div class="col-3 font-size-mobile"> 
            <div class="basket-picture">  <img :src="'https://wetebucket.s3.us-west-2.amazonaws.com/'+item.image_path" class="center"> </div></div>
            <div class="col-2 font-size-mobile"> {{ item.name }} </div>
            <div class="col-4 font-size-mobile"> {{ item.description }} </div>
            <div class="col-1 ml-auto font-size-mobile"> {{ item.price }} </div>

            <div class="col-2 ml-auto text-end">
              <div id="deleteFromBasket" @click="confirm(deleteFromBasket(index))" class="btn-xs">
                <i class="fa fa-trash icons" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <router-link class="btn btn-secondary mr-5" to="/">Weiter einkaufen</router-link>
      <router-link class="btn btn-primary" to="/address">Bestellung abschliessen</router-link>
      </div>
      `,
  };
  