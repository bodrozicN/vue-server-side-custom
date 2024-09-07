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

const routePaths = []

const mapRoutes = (path) => {
  fs.readdirSync(toAbsolute(path)).map((file) => {
    if (file.includes('.vue')) {
      routePaths.push(`${path.replace('src/views', '')}/${file.replace('index.vue', '')}`)
    } else {
      mapRoutes(`${path}/${file}`)
    }
  })
}

mapRoutes('src/views')
;(async () => {
  for (const url of routePaths) {
    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    fs.mkdirSync(`dist/static${url}`, { recursive: true })
    const filePath = `dist/static${url}index.html`
    console.log(filePath)

    fs.writeFileSync(toAbsolute(filePath), html)
  }

  fs.rmSync(toAbsolute('dist/static/.vite'), { recursive: true })
})()
