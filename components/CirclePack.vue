<template lang="html">
  <svg :width="width" :height="height" :transform="transformSVG">
    <text
      x="50%"
      :transform="transformTitle"
      text-anchor="middle"
      class="circle-label">
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
          <text>{{ d.data.name }}: ${{ d.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</text>
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
    'title',
    'transformSVG',
    'transformCircles',
    'transformTitle'
  ]

}
</script>

<style lang="css">
.circle-label {
  font: 22px sans-serif;
}
</style>
