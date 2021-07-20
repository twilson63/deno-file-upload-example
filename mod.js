import { opine } from './deps.js'
import upload from './upload.js'
import { readAll } from "https://deno.land/std@0.102.0/io/util.ts";
import { Buffer } from "https://deno.land/std@0.102.0/io/buffer.ts"

const app = opine()

const TMP_DIR = '/tmp/hyper'

app.post('/upload', upload('file'), async function (req, res) {
  console.log('token', req.headers.get('authorization'))
  console.log('file', req.file.filename)
  //const decoder = new TextDecoder()
  //console.log(decoder.decode(req.file.content))

  res.send({ok: true})
})

app.get('/', function(req, res) {
  res.send('Hello')
})



app.listen(3000, () => console.log('listening on 3000'))