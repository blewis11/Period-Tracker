import { Express } from 'express'

import { server } from './server/server'

const PORT = 8080
const HOST = '0.0.0.0'

const app: Express = server()

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
