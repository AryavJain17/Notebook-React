const connectToMongo = require('./db');

async function startApp() {
    try {
        await connectToMongo();
        // Now that you're connected to the database, you can start your application logic here
    } catch (error) {
        console.error("Error starting the application:", error);
    }
}

startApp();
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000



app.use(cors())
app.use(express.json())
//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})