import { server } from './server'

const PORT = 8080
const HOST = '0.0.0.0'

const app = server()

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)