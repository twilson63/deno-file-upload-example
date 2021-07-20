
const f = await Deno.readFile('./roads.jpeg')
//console.log('img', f)

const file = new File(f, 'roads.jpeg')

const data = new FormData()
data.append('file', file)

const res = await fetch('http://localhost:3000/upload', {
  method: 'POST',
  body: data
})
const txt = await res.text()

console.log(txt)
