const app = require('./server')
const errorController = require('./middleware/errorController')


app.use(errorController)
app.listen(5000,()=>{
    console.log("app is listening on 500");
})