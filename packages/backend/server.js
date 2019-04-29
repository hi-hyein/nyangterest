const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const PORT = 8080;

router = require("koa-router")();
const app = new Koa();
const api = require("./api/cats-info04.json");
router.get("/", function(ctx, next) {
	ctx.body = "Hello";
});

app.use(router.routes()).use(router.allowedMethods());
app.use(cors());
app.use("/", api);
// app.use(koa.json());

// app.get("/", function(req, res, next) {
// 	res.json({ msg: "This is CORS-enabled for all origins!" });
// });

app.listen(PORT, function() {
	console.log("CORS-enabled web server listening !");
});

module.exports = app;
