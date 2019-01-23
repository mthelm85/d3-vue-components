<template lang="html">
  <svg :width="width" :height="height" transform="transformSVG">
    <g>
      <g stroke="#000">
        <rect
          class="node"
          v-for="n in data.nodes"
          :x="n.x0"
          :y="n.y0"
          :key="n.name"
          :height="n.y1- n.y0"
          :width="n.x1 - n.x0"
          :fill="color(n.name.replace(/ .*/, ''))">
        </rect>
      </g>
      <g fill="none" stroke-opacity="0.5">
        <path
          v-for="l in data.links"
          :d="sankeyLink(l)"
          :key="l.target.name + l.source.name"
          :stroke="`url(#${l.index})`"
          :stroke-width="Math.max(1, l.width)"
          class="sankey-link">
          <title>
            <text>{{ valueFormatted(l) }}</text>
          </title>
        </path>
        <linearGradient
          v-for="l in data.links"
          :id="l.index"
          :key="l.source.name + l.target.name">
          <stop offset="0%" :stop-color="color(l.source.name.replace(/ .*/, ''))"></stop>
          <stop offset="100%" :stop-color="color(l.target.name.replace(/ .*/, ''))"></stop>
        </linearGradient>
      </g>
      <g>
        <text
          v-for="n in data.nodes"
          :style="nodeTextClass(n)"
          :x="n.x0 < width / 2 ? n.x1 + 6 : n.x0 - 6"
          :key="`${n.name}asd`"
          :y="(n.y1 + n.y0) / 2"
          :text-anchor="n.x0 < width / 2 ? 'start' : 'end'"
          :transform="textTransform(n.index)">
          {{ n.name }}
        </text>
      </g>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
import * as Sankey from 'd3-sankey'
export default {
  computed: {
    color () {
      return d3.scaleOrdinal(d3.schemeCategory10)
    },
    sankey () {
      return Sankey.sankey()
        .nodeWidth(25)
        .nodePadding(10)
        .size([this.width - 20, this.height - 20])
    },
    sankeyLink () {
      return Sankey.sankeyLinkHorizontal()
    }
  },

  methods: {
    nodeTextClass (n) {
      switch (n.depth) {
        case 0: return this.depth0Style
        case 1: return this.depth1Style
        case 2: return this.depth2Style
        case 3: return this.depth3Style
        default: return this.depth1Style
      }
    },
    rectHeight (y1, y0) {
      return Math.abs(y1 - y0)
    },
    rectWidth (x1, x0) {
      return Math.abs(x1 - x0)
    },
    textTransform (n) {
      return n === 0 ? `translate(${this.labelTranslateX}, ${this.labelTranslateY})` : `translate(-${this.labelTranslateX}, ${this.labelTranslateY})`
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
    this.sankey(this.data)
  },

  props: [
    'data',
    'height',
    'width',
    'depth0Style',
    'depth1Style',
    'depth2Style',
    'depth3Style',
    'transformSVG',
    'labelTranslateX',
    'labelTranslateY',
    'numberFormat'
  ]
}
</script>

<style lang="css">
.sankey-link {
  stroke-opacity: 0.4
}

.sankey-link:hover {
  stroke-opacity: 0.8
}
</style>
