export const state = () => ({
    orders: [],
    products : [],
    carts: [],
  })
  
  export const getters = {
    getCart(state) {
      return state.carts
    },
    itemTotal: () => (harga, qty) => {
      return harga * qty
    },
    grandTotal: (state, getters) => {
      let temp
      return state.carts.map((el) => {
        return {
          totalHargaItem: el.qty * el.harga,
          ...el,
        }
      })
    },
    subTotal: (state, getters) => {
      return state.carts.reduce((total, item) => {
        return total + item.qty * item.harga
      }, 0)
    },
  }
  
  export const mutations = {
    ADD_PRODUCT(state, payload) {
      state.products.push(payload)
    },
  
    UPDATE_ORDER(state, payload) {
      console.log('UPDATE', payload)
      // let order = state.orders.find(u => u.id === payload.data.id)
      // for (let [key, value] of Object.entries(payload)) {
      //   if (packing[key] && packing[key] !== value) {
      //     packing[key] = value;
      //   }
      // }
    },

    GET_PRODUCT(state, payload){
        state.products = payload;
    },
  
    ADD_CART(state, payload) {
      // const temp = {
      //   jenis: payload.jenis,
      //   harga: payload.harga,
      //   qty: payload.qty,
      //   size: payload.size,
      //   warna: payload.warna,
      // }
  
      // let tempFound = []
      // const found = state.carts.filter((el) => {
      //   if (
      //     temp['jenis'] == el['jenis'] &&
      //     temp['harga'] == el['harga'] &&
      //     temp['size'] == el['size'] &&
      //     temp['warna'] == el['warna']
      //   ) {
      //     tempFound.push(el)
      //   }
      // })
  
      // if (tempFound.length == 0) {
      state.carts.push(payload)
      // }
    },

  }
  
  export const actions = {
    fetchProduct({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$get('http://localhost:8000/product')
          .then((res) => {
            console.log("get product", res.data);
            commit('GET_PRODUCT', res.data)
            resolve(res)
          })
          .catch((err) => {
            reject({ err })
          })
      })
    },
  
    postProduct({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$axios
          .post('http://localhost:8000/product', data)
          .then((res) => {
            commit('ADD_PRODUCT', res.data)
            resolve(res)
          })
          .catch((err) => {
            reject({ err })
          })
      })
    },
  
    deleteProduct({ commit }, id) {
      return new Promise((resolve, reject) => {
        this.$axios
          .delete('http://localhost:8000/product/' + id)
          .then((res) => {
            commit('DELETE_PRODUCT', res.data)
            resolve()
          })
          .catch((err) => {
            reject({ err })
          })
      })
    },
    decreament({ commit }, id) {
      console.log('ID', id)
      commit('DECREAMENT', id)
    },
  
    increament({ commit }, id) {
      commit('INCREAMENT', id)
    },
  
    addToCart({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        let count = 0
        for (const key in payload) {
          if (payload[key] === '' || payload['harga'] === 0) {
            count += 1
          }
        }
        if (count < 1) {
          const temp = {
            jenis: payload.jenis,
            harga: payload.harga,
            qty: payload.qty,
            size: payload.size,
            warna: payload.warna,
          }
  
          let tempFound = []
          const found = state.carts.filter((el) => {
            if (
              temp['jenis'] == el['jenis'] &&
              temp['harga'] == el['harga'] &&
              temp['size'] == el['size'] &&
              temp['warna'] == el['warna']
            ) {
              tempFound.push(el)
            }
          })
          if (tempFound.length == 0) {
            resolve()
            commit('ADD_CART', payload)
          } else {
            reject('Item sudah ada di dalam cart')
          }
        } else {
          reject('masih ada kolom yang kosong !')
        }
      })
    },
  
    remove({ commit }, id) {
      commit('REMOVE', id)
    },
  }
  