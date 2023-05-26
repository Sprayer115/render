export default {
    data() {
      return {
        categories: [],
        om: "",
      };
    },
    created() {
      let url = new URL(origin + "/api/category");
      fetch(url)
        .then((res) => res.json())
        .then((data) => (this.categories = data));
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
              <div class="mt-2" v-for="article in category.articles">
                <overview :article='article' @order="order"></overview>
              </div>
          </div>
          <router-link class="btn btn-primary" to="/basket">To Shopping Basked</router-link>
      </div>`,
  };
  