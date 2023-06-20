export default {
    data() {
      return {
        categories: [],
        om: "",
      };
    },
    mounted() {
      console.log(this.$route.query)
      let url = new URL(origin + "/api/category");
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.categories = data;

        });
    },
    methods: {
      order: function (id) {
        let url = new URL(origin + "/api/basket");
        let data = new FormData();
        data.append("id", id);
        fetch(url, {
          method: "POST",
          body: data,
        }).then((result) => {
          this.$router.push("/basket");
        });
      },
    },
    template: `
      <div class="container">
          <span class="h1">Artikel</span>
          <div class="my-5" v-for="category in this.categories">
            <span class="h3">{{ category.name }}</span>
            <hr>
            <div class="float-container" style="width: 100%; display: table;">
              <div class="mt-2" v-for="article in category.articles">
                <overview :article='article' @order="order"></overview>
              </div>
          </div>
          </div>
          <div class="place-bottom">
            <router-link class="btn btn-primary" to="/basket">To Shopping Basked</router-link>
            <br>
            <br>
            <br>
            <br>
            <br>

          </div>
          
      </div>`,
  };
  