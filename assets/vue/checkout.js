export default {
    data() {
      return {
        name: "",
        address: "",
        basket: []
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
    created() {
        let url = new URL(origin + '/api/basket');
        fetch(url)
        .then(res => res.json())
        .then(data => {
          this.basket = data.basket,
          this.address = data.address;
        })
    },
    template: `
    <div class="container">
      <div class="h2">Bestellung</div>

      <ul class="list-group mb-4">                
        <li class="list-group-item" v-for="item in basket">{{ item.name }}</li>
      </ul>

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
  