export default {
    data() {
      return {
        orders: []
      };
    },
    methods: {
      getOrders() {
        let url = new URL(origin + '/api/orderHistory');
        fetch(url)
        .then(res => res.json())
        .catch(error => {
          console.error('Error', error);
          alert(error.message);
          return false;
        })
        .then((data) => {
            console.log(data);
            this.orders = data;
  
        });
      }
    },  
    mounted() {
        this.getOrders();
    },
    template: `
        <div class="container"> 
            <div class="item-content">
                <table class="table">
                    <thead>
                            <th class="text-left">
                                #
                            </th>
                            <th class="text-left">
                                Datum
                            </th>
                            <th class="text-left">
                                Anazhl Artikel
                            </th>
                            <th class="text-left">
                                Preis
                            </th>
                    </thead>
                    <tbody>
                            <tr v-for="order in orders">
                                <td>
                                    <router-link class="btn btn-secondary mr-5" :to="{ name: 'detail', params: { id: order.id } }">
                                        {{ order.id }}
                                    </router-link>
                                </td>
                                <td>
                                    {{ order.createdAt }}
                                </td>
                                <td>
                                    {{ order.articles.length }}
                                </td>
                                <td>
                                    {{ order.price }}
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
      `,
  };
  



