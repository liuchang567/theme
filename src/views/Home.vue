<template>
  <div class="home" :class="theme">
    <div class="settting">
       <div  class="theme-item" @click="changeTheme(item)" v-for="(item, key) in themes" :key="key">
        <i :class="['icon-'+ item, item===theme? 'active' : '']"></i>
        {{item}}
        </div>
    </div>
    <div><a class="btn">按钮</a></div>
  </div>
</template>

<script>
const ThemeColor = 'Theme_Color'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      themes: ['theme1', 'theme2', 'theme3'],
      theme: localStorage.getItem(ThemeColor) || 'theme1'
    }
  },
  methods: {
    changeTheme (item) {
      this.theme = item
      localStorage.setItem(ThemeColor, item)
    }
  }
}
</script>
