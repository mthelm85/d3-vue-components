<template lang="html">
  <svg :width="width" :height="height" :transform="transformSVG">
    <text
      x="50%"
      :transform="transformTitle"
      text-anchor="middle"
      style="style">
      {{ title }}
    </text>
    <g opacity="0.85" :transform="transformCircles">
      <circle
        v-for="d in descendants"
        :fill="color(d.data.name.replace(/ .*/, ''))"
        :cx="d.x"
        :cy="d.y"
        :r="d.r"
        stroke="black">
        <title>
          <text>{{ d.data.name }}: {{ valueFormatted(d) }}</text>
        </title>
      </circle>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
      descendants: null,
      root: null
    }
  },

  computed: {
    color () {
      return d3.scaleOrdinal(d3.schemeCategory10)
    },
    pack () {
      return d3.pack()
        .size([this.width, this.height])
        .padding(this.padding)
    }
  },

  methods: {
    valueFormatted (d) {
      switch (this.numberFormat) {
        case 'currency': return '$' + d.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        case 'float': return d.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        case 'integer': return Math.round(d.value).toLocaleString()
        default: return d.value
      }
    }
  },

  mounted () {
    this.root = d3.hierarchy(this.data)
      .sum(d => d.value)
    this.descendants = this.root.descendants()
    this.pack(this.root)
  },

  props: [
    'data',
    'height',
    'padding',
    'width',
    'style',
    'title',
    'transformSVG',
    'transformCircles',
    'transformTitle',
    'numberFormat'
  ]

}
</script>

<style lang="css">
</style>
