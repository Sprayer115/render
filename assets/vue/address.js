export default {
    data() {
      return {
        name: "",
        addresses: [],
        selected_address: "",
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
      created() {
        console.log("address created");
        let url = new URL(origin + "/api/address");
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.addresses = data;
  
          });
      },
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
            <select v-if="addresses != []" v-model="selected_address">
              <option v-for="address in addresses" :value="address.id">
                {{ address.firstname + " " + address.lastname + " " + address.street + " " + address.street_no + " " + address.city + " " + address.zip }}
              </option>
            </select>
            <div v-else class="btn btn-primary" href="/account/address/new">Adressen verwalten</div>
          </v-form>
        </v-sheet>
  
        <router-link class="btn btn-secondary mr-5 " to="/">Weiter einkaufen</router-link>
        <span class="btn btn-primary" @click="submitAddress">Bestellen</span>
        </div>
        `,
  };
  