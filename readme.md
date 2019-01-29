# d3-vue-components

d3-vue-components is a Vue.js plugin that will allow you to easily add d3-based visualizations to your Vue.js app.

This is a project that I'm slowly working on as I have time, so this package is very incomplete. Right now it only supports the following visualizations:

- [Sankey](#sankey-diagram)
- [Circle Pack](#circle-pack-diagram)
- [Calendar (Waffle)](#calendar)

Feel free to submit pull requests to help out!

## Installation

`npm i d3-vue-components`

## Usage

In your main.js file:

```javascript
import d3VueComponents from 'd3-vue-components'

Vue.use(d3VueComponents)
```

Your app now has access to all of the components included in the plugin.

#### Sankey Diagram

This diagram expects you to feed it a JSON object in the following format:

```javascript
{
  "nodes": [
    { "name": "Node1" },
    { "name": "Node2" },
    { "name": "Node3" }],
  "links": [
    {
      "source": 0, // Flows from Node1
      "target": 1, // to Node2
      "value": 12500 // in this amount
    },
    {
      "source": 0, // Flows from Node1
      "target": 2, // to Node3
      "value": 98526 // in this amount
    }
  ]
}
```

Below you can see how you might implement the diagram for this JSON object:

```javascript
<template lang="html">
  <Sankey
    :data="data"
    numberFormat="currency" // options are: currency, float, or integer.
    height="1200"
    width="1200"
    depth0Style="font: 18px sans-serif" // set the style for top-tier node labels
    depth1Style="font: 14px sans-serif" // set the style for tier 1 node labels
    depth2Style="font: 10px sans-serif" // set the style for tier 2 node labels
    depth3Style="font: 6px sans-serif" // set the style for tier 3 node labels
    transformSVG="translate(0, 0)" // you can use any SVG transformation (e.g. rotate(45), scale(2))
    labelTranslateX="2" // this allows you to reposition your labels, if necessary
    labelTranslateY="5" // this allows you to reposition your labels, if necessary>
  </Sankey>
</template>

<script>
  export default {
    data () {
      return {
        data: require('@/assets/somedata.json')
      }
    }
  }
</script>
```

#### Circle Pack Diagram

This diagram expects you to feed it a JSON object in the following format:

```javascript
{
  "name": "Grandpappy",
  "children": [
    {
      "name": "Child1",
      "children": [
        {
          "name": "Grandchild1",
          "value": 65418
        },
        {
        "name": "Grandchild2",
        "value": 98735
        }
      ]
    },
    {
      "name": "Child2",
      "children": [
        {
          "name": "Grandchild3",
          "value": 32598
        },
        {
        "name": "Grandchild4",
        "value": 19876
        }
      ]
    }
  ]
}
```

Below you can see how you might implement the diagram for this JSON object:

```javascript
<template lang="html">
  <CirclePack
    :data="data"
    numberFormat="currency" // options are: currency, float, or integer.
    height="900"
    width="900"
    padding="3"
    title="My Circle Pack Diagram"
    style="font: 22px sans-serif" // this is the style for the title
    transformSVG="translate(0, 0)" // you can use any SVG transformation (e.g. rotate(45), scale(2))
    transformCircles="translate(0, -10)"
    transformTitle="translate(0, 20)">
  </CirclePack>
</template>

<script>
  export default {
    data () {
      return {
        data: require('@/assets/somedata.json')
      }
    }
  }
</script>
```

#### Calendar

This fixed-size diagram expects you to feed it a JSON object in the following format:

```javascript
[
  { "date": "2019-01-01", "value": 17 },
  { "date": "2019-01-02", "value": 9 },
  { "date": "2019-01-03", "value": 34 },
  { "date": "2019-01-04", "value": 22 },
  // ...and so on
]
```

Below you can see how you might implement the diagram for this JSON object:

```javascript
<template lang="html">
  <Calendar
    :data="data"
    numberFormat="currency" // options are: currency, float, or integer.>
  </Calendar>
</template>

<script>
  export default {
    data () {
      return {
        data: require('@/assets/somedata.json')
      }
    }
  }
</script>
```

## Contributing
This project currently only includes a few visualizations. Feel free to submit pull requests to add new visualizations that make use of the vast d3.js library.

## License
[MIT](https://choosealicense.com/licenses/mit/)
