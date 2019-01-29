<template lang="html">
  <svg :width="width" :height="height * years.length">
    <g
    v-for="(d, i) in years"
    :transform="`translate(40, ${height * i + cellSize * 1.5})`">
      <text
        x="-5"
        y="-5"
        font-weight="bold"
        text-anchor="end">
        {{ d.key }}
      </text>
      <g text-anchor="end">
        <text
          v-for="d in range"
          x="-5"
          :y="(countDay(d) + 0.5) * cellSize"
          dy="0.31em">
          {{ formatDay(d) }}
        </text>
      </g>
      <g v-for="v in d.values">
        <rect
          :width="cellSize - 1"
          :height="cellSize - 1"
          :x="rectX(v.date)"
          :y="countDay(v.date) * cellSize + 0.5"
          :fill="color(v.value)">
          <title>
            <text>{{ v.date }}: {{ valueFormatted(v) }}</text>
          </title>
        </rect>
      </g>
      <g
        v-for="m in months(d)">
        <path
          fill="none"
          stroke="#fff"
          stroke-width="3"
          :d="pathMonth(m)">
        </path>
        <text
          :x="monthText(m)"
          y="-5">
          {{ formatMonth(m) }}
        </text>
      </g>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
import moment from 'moment'

export default {
  data () {
    return {
      cellSize: 17,
      width: 964,
      yearsD3: null,
      years: null
    }
  },

  computed: {
    color () {
      return d3.scaleSequential(d3.interpolatePiYG).domain([40, -20])
    },
    formatMonth () {
      return d3.timeFormat('%b')
    },
    height () {
      return this.cellSize * 7
    },
    timeWeek () {
      return d3.timeMonday
    },
    timeYear () {
      return d3.timeYear
    },
    range () {
      return d3.range(2, 7).map(i => new Date(1995, 0, i))
    }
  },

  methods: {
    countDay (d) {
      return (moment(d).day() + 6) % 7
    },
    formatDay (d) {
      return 'SMTWTFS'[d.getDay()]
    },
    monthText (d) {
      return this.timeWeek.count(d3.timeYear(d), this.timeWeek.ceil(d)) * this.cellSize + 2
    },
    months (d) {
      return d3.timeMonths(d3.timeMonth(moment(d.values[0].date)), moment(d.values[d.values.length - 1].date))
    },
    pathMonth (t) {
      const n = 5
      const d = Math.max(0, Math.min(n, this.countDay(t)))
      const w = this.timeWeek.count(d3.timeYear(t), t)
      return `${d === 0 ? `M${w * this.cellSize},0`
      : d === n ? `M${(w + 1) * this.cellSize},0`
      : `M${(w + 1) * this.cellSize},0V${d * this.cellSize}H${w * this.cellSize}`}V${n * this.cellSize}`
    },
    rectX (d) {
      return this.timeWeek.count(d3.timeYear(moment(d)), moment(d)) * this.cellSize + 0.5
    },
    valueFormatted (d) {
      switch (this.numberFormat) {
        case 'currency': return '$' + d.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        case 'float': return d.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        case 'integer': return Math.round(d.value).toLocaleString()
        default: return d.value
      }
    }
  },

  created () {
    this.yearsD3 = d3.nest()
      .key(d => moment(d.date, 'YYYY-MM-DD').format('YYYY'))

    this.years = this.yearsD3.entries(this.data).reverse()
  },

  props: [
    'data',
    'numberFormat'
  ]
}
</script>

<style scoped lang="css">
text {
  font: 10px sans-serif;
}
</style>
