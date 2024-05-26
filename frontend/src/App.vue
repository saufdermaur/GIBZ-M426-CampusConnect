<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>Campus Connect</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        permanent
      >
        <v-list nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            :to="{ name: 'Home' }"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-api"
            title="API Test"
            :to="{ name: 'API Test' }"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-calendar"
            title="Calendar"
            :to="{ name: 'Calendar' }"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-information"
            title="About"
            :to="{ name: 'About' }"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh">
        <div>
          <router-view></router-view>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
