<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideDrawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-list>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="fonts">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>
    <v-app-bar dark color="#1d5d9b" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="sideDrawer = !sideDrawer" />

      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn text icon class="v-btn--active" v-on="on">
            <v-icon color="blue " large>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- 
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      sideDrawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
        },
      ],

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Laptop Stock',
    }
  },
}
</script>
<style scoped>
.fonts {
  font-family: 'Lato', sans-serif;
}

.fonts_byra {
  font-family: 'Lato', sans-serif;
  font-size: 22px;
}
</style>
