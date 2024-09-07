// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { excludeSSGForPaths } from './prerenderRules.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute('dist/static/.vite/ssr-manifest.json'), 'utf-8')
)
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const routePaths = []

const mapRoutes = async (path) => {
  const files = fs.readdirSync(toAbsolute(path))
  for (const file of files) {
    if (excludeSSGForPaths.includes(`${path}/${file}`)) {
      continue
    }
    if (file.includes('.vue')) {
      routePaths.push(`${path.replace('src/views', '')}/${file.replace('index.vue', '')}`)
    } else if (file.includes('[')) {
      const { generateStaticParams } = await import(
        `${__dirname}/${path}/${file}/generateStaticParams.js`
      )
      if (!generateStaticParams) {
        continue
      }
      const responses = await generateStaticParams()
      for (const response of responses) {
        fs.mkdirSync(`${__dirname}/${path}/${response}`, { recursive: true })
        const page = fs.readFileSync(`${__dirname}/${path}/${file}/index.vue`, 'utf-8')

        fs.writeFileSync(`${__dirname}/${path}/${response}/index.vue`, page)
        await mapRoutes(`${path}/${response}`)
        fs.rmSync(`${path}/${response}`, { recursive: true })
      }
    } else {
      await mapRoutes(`${path}/${file}`)
    }
  }
}

;(async () => {
  await mapRoutes('src/views')
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
