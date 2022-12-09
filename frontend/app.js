const koa = require("koa");
const serve = require("koa-static");
const cors = require("cors");

// Create a new Koa app with Access-Control-Allow-Origin: *
const app = new koa();
app.use(serve("./dist"));

app.use((req, res, next) => {
    app.use(cors());
});

app.listen(3000);