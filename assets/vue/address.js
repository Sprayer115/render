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
    created() {
      console.log("created");
      this.fetchAddresses();
    },
    methods: {
      submitAddress() {
        let url = new URL(origin + "/api/address");
        let data = new FormData();
        data.append("address", this.selected_address);
        fetch(url, {
          method: "POST",
          body: data,
        }).then((result) => {
          console.log(result);
          this.$router.push("/checkout");

        });
        //this.$route.params.address = this.selected_address;

      },
      fetchAddresses() {
        let url = new URL(origin + "/api/address");
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            data.forEach(address => {
              address.value = address.id;
              address.title = address.firstname + " " + address.lastname+ " " + address.street + " " + address.street_no;
              address.text = address.firstname + " " + address.lastname+ " " + address.street + " " + address.street_no;
            });
            console.log(data);
            this.addresses = data;
            
          });
      }
    },
    template: `
      <div class="container">
        <h1>Lieferdaten</h1>
        <v-sheet class="mx-auto">
          <v-form>
            <v-select
              v-if="addresses.length > 0"
              v-model="selected_address"
              :items="addresses"
              label="Wählen Sie eine Adresse aus"
            >
            </v-select>
            <a href="/account/address/new"> 
              <div class="btn btn-primary"  >Adressen verwalten</div>
            </a>
          </v-form>
        </v-sheet>
  
        <router-link class="btn btn-secondary mr-5 " to="/">Weiter einkaufen</router-link>
        <span class="btn btn-primary" @click="submitAddress">Bestellen</span>
        </div>
        `,
  };
  