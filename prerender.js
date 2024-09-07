// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute('dist/static/.vite/ssr-manifest.json'), 'utf-8')
)
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// determine routes to pre-render from src/views
// const routesToPrerender = fs.readdirSync(toAbsolute('src/views')).map((file) => {
//   const name = file
//     .replace(/\.vue$/, '')
//     .replace('View', '')
//     .toLowerCase()
//   return name === 'home' ? `/` : `/${name}`
// })

const routePaths = []

const mapRoutes = (path) => {
  fs.readdirSync(toAbsolute(path)).map((file) => {
    // console.log({ file })
    if (file.includes('.vue')) {
      // console.log('dosao do komponente', file)
      // console.log(`${path.replace('src/views', '')}/${file.replace('.vue', '')}`)
      routePaths.push(`${path.replace('src/views', '')}/${file.replace('index.vue', '')}`)
    } else {
      // console.log('nije pronasao page componentu')
      mapRoutes(`${path}/${file}`)
    }
  })
}

mapRoutes('src/views')
// console.log(routePaths)
;(async () => {
  // pre-render each route...
  for (const url of routePaths) {
    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    // console.log(html)

    fs.mkdirSync(`dist/static${url}`, { recursive: true })
    const filePath = `dist/static${url}index.html`
    console.log(filePath)

    // const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    // console.log('pre-rendered:', filePath)
  }

  // done, delete .vite directory including ssr manifest
  fs.rmSync(toAbsolute('dist/static/.vite'), { recursive: true })
})()
