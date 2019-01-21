import CirclePack from './components/CirclePack.vue'
import Sankey from './components/Sankey.vue'

export default {
  install: (Vue, options) => {
    Vue.component('CirclePack', CirclePack)
    Vue.component('Sankey', Sankey)
  }
}
