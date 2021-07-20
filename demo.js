const file = new File(['hello world'], 'hello.txt')
const data = new FormData()
data.append('file', file)

const res = await fetch('http://localhost:3000/upload', {
  method: 'POST',
  body: data
})
const txt = await res.text()

console.log(txt)
