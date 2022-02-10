import express from 'express'
import events from 'events'

const app = express()
const port = 3000
app.use(express.json())
const event = new events.EventEmitter()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/client/:id', async function (req, res) {
  const params = req.params.id
  event.on(`hook${params}`, (data) => {
    res.json(data)
  })
})
app.post('/webhook/:id', async function (req, res) {
  const params = req.params.id
  const data = req.body
  event.emit(`hook${params}`, data)

  res.status(200).end()
})
