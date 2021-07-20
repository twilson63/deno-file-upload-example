import { sha256, jwtCreate } from './deps.js'

const html = `<!doctype html>
<html>
  <head><title>Hello</title></head>
  <body><h1>Hello World</h1></body>
</html>`
const n = sha256(html, 'utf-8', 'hex')

const file = new File([html], `${n}.html`)
const data = new FormData()
data.append('file', file)

const token = await jwtCreate({alg: 'HS256', typ: 'JWT'}, {sub: 'hello', aud: 'foo'}, 'SECRET')

const res = await fetch('http://localhost:3000/upload', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`},
  body: data
})

const txt = await res.text()

console.log(txt)
