<template>
    <div class="center">
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
        <v-btn @click="simpanProduct" color="#1d5d9b"
            dark>Simpan</v-btn
        > 
    </div>
</template>
<script>
export default {
  middleware: ['authentication'],
    data() {
        return {
            form: {
                nama: '',
                stok: '',
                harga: '',
            },
        }
    },
    methods : {
        simpanProduct(){
            this.$store.dispatch('product/postProduct', this.form)
            .then((res) => {
                this.$router.push('/');
            })
            .catch((err) => {
                console.log({ err })
            })
        }
    }
}
</script>
<style scoped>
#fontFamily {
    font-family: 'Lato', sans-serif;
}

.center {
    border-radius: 10px;
    border: 2px solid;
    margin: auto;
    width: 50%;
    padding: 10px;
}
</style>
