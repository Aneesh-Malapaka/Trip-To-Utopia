const express = require('express');
const app = express();
const chalk = require('chalk');
const mongoose = require('mongoose');
const cors = require('cors');

const { userRouter } = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');


const PORT = process.env.PORT || 3002;;


app.use(cors())
app.use(express.json());
app.use(userRouter)
// app.use(dataRouter)
app.use(orderRouter)

const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose.connect(
  CONNECTION_URL,

    { autoIndex: true },
    (err) => {
        console.log('Sucessfully connected to MongoDB')
        console.log(err, "No Errors Present")
        if (err) throw new Error(err);
    })


app.listen(PORT, function() {
    console.log(chalk.blueBright("Node Server Established at PORT :"), PORT);
})

app.get('/', (req, res) => {
    res.send('Server is Working');
})
