export default {
    data() {
      return {
        order: null,
        checkedRows: []
      };
    },
    methods: {
      getOrder(id) {
        let url = new URL(origin + '/api/getOrder/');
        let data = new FormData();
        data.append("id", id);
        fetch(url, {
            method: "POST",
            body: data,
          })
        .then(res => res.json())
        .catch(error => {
          console.error('Error', error);
          alert(error.message);
          return false;
        })
        .then((data) => {
            console.log(data);
            this.order = data;
        });
      },
      processStorno() {
        if(confirm("Stornierung durchführen?")) {
            let articles = [];
            for (let index = 0; index < this.checkedRows.length; index++) {
                if(this.checkedRows[index]){
                    articles.push(this.order.articles[index].id);
                }
            }
            console.log(articles, "article array");
            let url = new URL(origin + '/api/storno/');
            let data = new FormData();
            data.append("articles", JSON.stringify(articles));
            fetch(url, {
                method: "POST",
                body: data,
            })
            .then(res => res.json())
            .catch(error => {
                console.error('Error', error);
                alert(error.message);
                return false;
            })
            .then(
                this.$router.push("/")
            );
        }
      }
    },  
    created() {
        this.getOrder(this.$route.params.id);
    },
    template: `
        <div class="container" v-if="order != null"> 
            <div >
                <h5>Adresse </h5>
                <div class="row border-b-sm">
                    <div class="col-6">
                        {{ order.address.firstname}} {{ order.address.lastname}} <br>
                        {{ order.address.street}} {{ order.address.street_no}} <br>
                        {{ order.address.zip}} {{ order.address.city}} <br>
                    </div>
                    <div class="col-2 ">
                        {{ order.price }} €
                    </div>
                </div>
            </div>
            <div class="item-content">
                <table class="table">
                    <thead>
                            <th class="text-left">
                                #
                            </th>
                            <th class="text-left">
                                Artikel
                            </th>
                            <th class="text-left">
                                Variante
                            </th>
                            <th class="text-left">
                                Preis
                            </th>
                    </thead>
                    <tbody>
                            <tr v-for="(article,index) in order.articles" :key="index">
                                <td>
                                    <input type="checkbox" v-model="checkedRows[index]">
                                </td>
                                <td>
                                    {{ article.name }}
                                </td>
                                <td>
                                    {{ article.color + " / " + article.size }}
                                </td>
                                <td>
                                    {{ article.price }}
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-md-center">
                <div  class="btn btn-primary" v-if="checkedRows.length > 0" @click="processStorno()"> 
                    Stornierung abschicken
                </div>
            </div>
        </div>
      `,
  };
  



