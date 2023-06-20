export default {
    data() {
      return {
        basket: [],
      };
    },
    created() {
      getBasket();
    },
    methods: {
      deleteFromBasket(index) {
        let url = new URL(origin + '/api/basket');
        let data = new FormData();
        data.append("index", index);
        fetch(url, {
          method: "DELETE",
          body: data,
        })
        .then(res => res.json())
        .catch(error => {
          alert("Konnte nicht entfernt werden.");
          return false;
        })
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
    template: `
      <h1>Einkaufskorb</h1>
      <div class="mx-4">
      <ul class="list-group mb-4">                
        <li class="list-group-item" v-for="item in basket">
          <div class="row">
            <div class="col-8"> {{ item.name }} </div>
            <div class="col-2">
              <div id="deleteFromBasket" @click="deleteFromBasket(item.index)" class="btn-xs btn-primary">
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
  