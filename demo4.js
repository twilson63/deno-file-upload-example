// functional version
import { R, crocks, sha256, jwtCreate } from './deps.js'

const { tryCatch, Result, resultToAsync, Async } = crocks
const { of } = Result
const { assoc } = R

const html = `<!doctype html>
<html>
  <head><title>Hello</title></head>
  <body><h1>Hello World</h1></body>
</html>`

const createFile = tryCatch(ctx => ({
  file: new File([ctx.html], `${sha256(ctx.html, 'utf-8', 'hex')}.html`),
  ...ctx
}))

const createFormData = tryCatch(ctx => {
  const data = new FormData()
  data.append('file', ctx.file)
  return ({data, ...ctx})
})

const jwt = (payload, secret) => Async.fromPromise(jwtCreate)(
  {alg: 'HS256', typ: 'JWT'}, payload, secret
)

const asyncFetch = Async.fromPromise(fetch)

const result = of({})
  .map(assoc('html', html))
  .chain(createFile)
  .chain(createFormData)


resultToAsync(result)
  .chain(
    ctx => jwt({sub: 'foo'}, 'SECRET')
      .map(token => ({token, ...ctx}))
  )
  .chain(
    ctx => asyncFetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: { authorization: `Bearer ${ctx.token}`},
      body: ctx.data
    })
  )
  .chain(
    res => Async.fromPromise(res.json.bind(res))()
  )
  .fork(console.log, console.log)



