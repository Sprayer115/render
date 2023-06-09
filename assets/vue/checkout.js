export default {
    data() {
      return {
        name: "",
        address: "",
        basket: [],
        total: 0,
      };
    },
    methods: {
      order() {
        let url = new URL(origin + '/api/order');
        fetch(url)
        .then(res => res.json())
        .catch(error => {
          console.error('Error', error);
          alert(error.message);
          return false;
        })
        .then(this.$router.push("/confirmation"))
      }
    },  
    async created() {
        let url = new URL(origin + '/api/basket');
        await fetch(url)
        .then(res => res.json())
        .then(data => {
          this.basket = data.basket,
          this.address = data.address;
        })
        console.log("foreaching")
        this.basket.forEach(element => {
          console.log(element);
          this.total += element.price;
        });
    },
    template: `
    <div class="container">
      <div class="h2">Bestellung</div>

      <ul class="list-group mb-4">                
      <li class="list-group-item" v-for="(item, index) in basket">
        <div class="row">
          <div class="col-3"> 
          <div class="basket-picture">  <img :src="'https://wetebucket.s3.us-west-2.amazonaws.com/'+item.image_path" class="center"> </div></div>
          <div class="col-2 font-size-mobile"> {{ item.name }}  {{ item.color }} / {{ item.size }} </div>
          <div class="col-1 ml-auto font-size-mobile"> {{ item.price }} &euro;</div>
        </div>
      </li>
      </ul>
      <div class="text-end"> Gesamt:     {{ total }} &euro;</div>
      <div class="h2">Lieferdaten</div>
        <div class="h4">
            Name: {{ address.firstname + " " + address.lastname }}
        </div>
        <div class="h4">
            Adresse: {{ address.street + " " + address.street_no + " " + address.city + " " + address.zip }}
        </div>
        <div class="mt-4">
          <router-link class="btn btn-secondary mr-5" to="/address">Zurück</router-link>
          <span class="btn btn-primary" @click="order()">Kostenpflichtig bestellen</span>
        </div>
      </div>
      `,
  };
  