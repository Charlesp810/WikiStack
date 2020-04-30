const express = require('express')
const morgan = require('morgan')
const layout = require('./views/layout')
const models = require('./models/index')
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const { db } = require('./models');
const app = express()

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}))

app.use('/wiki', wikiRouter)

app.get('/', (req, res) => {
    res.redirect('/wiki')
})

app.get('/', (req, res) => {
    res.send(layout(''))
})


const PORT = 1337

const init = async () => {
    await models.User.sync()
    await models.Page.sync()
    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
    })
}

init()
