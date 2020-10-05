const pug = require('pug')
const { mkdirSync, writeFileSync } = require('fs')
const { dirname, resolve } = require('path')

const config = require('../pug.config')
const site = require('../generated/site-data.json')
const episodes = require('../generated/episodes.json')
const team = require('../content/team.json')

const renderPage = (template, out, data = {}) => {
  const file = resolve(__dirname, '..', `src/${template}.pug`)
  const options = Object.assign({}, config, { site }, data)
  const rendered = pug.renderFile(file, options)
  const dest = out === 'index' ? 'index.html' : `${out}/index.html`
  const dst = resolve(__dirname, '..', 'dist', dest)
  const dir = dirname(dst)

  mkdirSync(dir, { recursive: true })
  writeFileSync(dst, rendered)
}

renderPage('index', 'index', { navCurrent: 'index' })
renderPage('team', 'team', { navCurrent: 'team', team })
renderPage('podcast', 'podcast', { navCurrent: 'podcast', episodes: [...episodes] })

renderPage('category', 'podcast/news', { navCurrent: 'podcast', categoryName: 'News', episodes: episodes.filter(e => e.category === 'news') })
renderPage('category', 'podcast/interviews', { navCurrent: 'podcast', categoryName: 'Interviews', episodes: episodes.filter(e => e.category === 'interview') })
renderPage('category', 'podcast/lesestunde', { navCurrent: 'podcast', categoryName: 'Lesestunde', episodes: episodes.filter(e => e.category === 'lesestunde') })
renderPage('category', 'podcast/der-weg', { navCurrent: 'podcast', categoryName: 'Der Weg', episodes: episodes.filter(e => e.category === 'der-weg') })