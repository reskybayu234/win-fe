<template>
  <v-row class="frame-content">
    <!-- DIALOG DELETE -->
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title style="background-color: #1d5d9b; color : white">
          <span class="text-h5">Hapus Product</span>
        </v-card-title>
        <v-card-text class="mt-7">
          Apakah kamu yakin menghapus produk ini ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItem"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- END DIALOG DELETE -->
    <!-- DIALOG EDIT -->
    <v-dialog v-model="dialogEdit" persistent max-width="400px">
      <v-card>
        <v-form>
            <v-container >
                <v-row>
                    <v-col
                        cols="12"
                    >
                    <v-text-field
                        v-model="form.nama"
                        label="Nama Laptop"
                        required
                    ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                    >
                    <v-text-field
                        type="number"
                        v-model="form.harga"
                        label="Harga"
                        required
                    ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                    >
                    <v-text-field
                        type="number"
                        v-model="form.stok"
                        label="Stok"
                        required
                    ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        
        <v-spacer></v-spacer>
        <v-btn @click="savedProduct" color="#1d5d9b"
            dark>Simpan</v-btn
        >
        <v-btn @click="dialogEdit = !dialogEdit" color="#1d5d9b"
            dark>Close</v-btn
        >
      </v-card> 
    </v-dialog>
    <!-- END DIALOG EDIT -->
    <!-- ============================== -->
    <v-card class="mx-auto mt-5" style="width: 100%; height: 100%">
      <v-toolbar color="#1d5d9b" dark>
        <v-toolbar-title>Data Produk List</v-toolbar-title>
      </v-toolbar>
      <v-col cols="10" offset="1">
        <v-data-table
          :headers="headers"
          :items="dataTable"
          :item-per-page="10"
          :footer-props="{
            'items-per-page-options': [5, 10, 20, 40],
          }"
          class="elevation-1 my-4"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title id="fontFamily">Produk List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-btn
                id="fontFamily"
                color="#1d5d9b"
                to="/product/create"
                dark
                class="mb-2"
              >
                Tambah Produk
              </v-btn>
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  <v-icon small> mdi-menu </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn
                    class="mr-2"
                    dark
                    color="#42A5F5"
                    @click="editItem(item)"
                  >
                    <v-icon small> mdi-pencil </v-icon>
                  </v-btn>

                  <v-btn
                    class="mr-2"
                    dark
                    color="#FF1744"
                    @click="openDialog(item)"
                  >
                    <v-icon small> mdi-delete </v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-col>
    </v-card>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  middleware: ['authentication'],
  name: 'IndexPage',
  data() {
    return {
      search: '',
      form : {
        nama : '',
        harga : '',
        stok : ""
      },
      idProduct : '',
      dialog: false,
      dialogEdit : false,
      dataSelected: '',
      options: {},
      headers: [
        {
          text: 'Nama Laptop',
          align: 'start',
          value: 'nama',
          filterable: true,
        },
        {
          text: 'Stok',
          value: 'stok',
        },
        {
          text: 'harga',
          value: 'harga',
        },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dataTable: [{ name: '', address: '', phone: '', status: '' }],
    }
  },
  mounted() {
    this.getProducts().then((res) => {
        this.dataTable = res.data
    })
  },
  computed: {},
  methods: {
    ...mapActions({
      getProducts: 'product/fetchProduct',
    }),
    openDialog(item) {
      this.dataSelected = item
      this.dialog = true
    },
    deleteItem(data) {
      this.deleteProduct(this.dataSelected._id)
        .then((res) => {
          this.dialog = false
          this.dataSelected = ''
          this.fetchDataProduct()
        })
        .catch((err) => {
          console.log({ err })
          this.dialog = false
        })
    },
    fetchDataProduct() {
      this.$axios
        .$get(
          `http://localhost:8000/product`
        )
        .then((res) => {
          this.dataTable = res.data
        })
        .catch((err) => {
          console.log({ err })
        })
    },
    editItem(data) {
      //  this.$router.push(`/product/${data._id}`);
      this.idProduct = data._id;
      this.dialogEdit = true;
      this.$axios.$get(`http://localhost:8000/product/${data._id}`).then((response) => {
                let item = response.data
                this.form = item;
            }).catch((e) => {
                console.log(e)
            })
    },
    savedProduct(){
      console.log('this.idProduct', this.idProduct);
      this.$axios.$put(`http://localhost:8000/product/${this.idProduct}`, this.form).then((response) => {
          let item = response.data
          console.log('otem', item);
          this.dialogEdit = false;
      }).catch((e) => {
          console.log(e)
      })
    },
    ...mapActions({
      getOrders: 'orders/fetchOrder',
      deleteProduct: 'product/deleteProduct',
    }),
  },
}
</script>
<style scoped>
#fontFamily {
  font-family: 'Lato', sans-serif;
}
</style>
