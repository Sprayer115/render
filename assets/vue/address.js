export default {
    data() {
      return {
        name: "",
        address: "",
        rules: [
          val => {
            const specialChars =
            '[`!@#$%^&*()_+-=[]{};\':"\\|<>/?~]/';
            if (specialChars
              .split('')
              .some((specialChar) => val.includes(specialChar))) {
                return "Der Name enthält Sonderzeichen! ";
              } else {
              return true;
            }
          },
        ],
      };
    },
    methods: {
      submitAddress() {
        let url = new URL(origin + "/api/address");
        let data = new FormData();
        data.append("name", this.name);
        data.append("address", this.address);
        fetch(url, {
          method: "POST",
          body: data,
        }).then((result) => {
          this.$router.push("/checkout");
        });
      },
    },
    template: `
      <div class="container">
        <h1>Lieferdaten</h1>
        <v-sheet class="mx-auto">
          <v-form>
            <v-text-field v-model="name" :rules="rules" label="Name"></v-text-field>
            <v-text-field v-model="address" :rules="rules" label="Adresse"></v-text-field>
          </v-form>
        </v-sheet>
  
        <router-link class="btn btn-secondary mr-5 " to="/">Weiter einkaufen</router-link>
        <span class="btn btn-primary" @click="submitAddress">Bestellen</span>
        </div>
        `,
  };
  