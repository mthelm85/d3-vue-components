import CirclePack from './components/CirclePack.vue'
import Sankey from './components/Sankey.vue'
import Calendar from './components/Calendar.vue'

export default {
  install: (Vue, options) => {
    Vue.component('CirclePack', CirclePack)
    Vue.component('Sankey', Sankey)
    Vue.component('Calendar', Calendar)
  }
}
