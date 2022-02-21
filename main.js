import * as d3 from 'd3'
import 'd3-transition'

import 'modern-normalize/modern-normalize.css'
import './style.scss'
import data from './data.json'

const container = d3.select('#container')


const fadeIn = (s, d) => s.style('opacity', 0)
    .transition().delay(d ?? (() => Math.random() * 1000))
    .duration(1000).style('opacity', null)

container
    .append('div').classed('banner-container', true)
    .append('h1').classed('banner', true)
    .html('Surna<span class="m">m</span>all')
    .call(fadeIn, 0)

container.selectAll('div:not(.banner-container)').data(data).join(
    (enter) => {
        const itemContainer = enter.append('div').classed('item-container', true)
        itemContainer.on('click', (event) => {
            event.currentTarget.classList.toggle('clicked')
        })

        itemContainer.append('div').classed('index', true).text((_, i) => (i + 1).toString())

        const item = itemContainer.append('div').classed('item', true).call(fadeIn)
        item.append('p').classed('pinyin', true).text(d => d.pinyin)
        item.append('h1').classed('name', true).text(d => d.name)
    },
)

d3.select('.banner-container').on('click', () => {
    d3.selectAll('.clicked').classed('clicked', false)
})
