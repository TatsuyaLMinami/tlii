// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
// 创建一个Koa对象表示web app本身:
const app = new Koa();
const koa = require("koa-router")(),
    path = require("path"),
    user = require("./server/routes/user.js"),
    baseData= require("./server/routes/baseData.js"),
    resource = require("./server/routes/resource.js"),
    json = require("koa-json"),
    logger = require("koa-logger"),
    bodyparser = require("koa-bodyparser"),
    serve = require("koa-static"),
    jsonwebtoken = require("jsonwebtoken");
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"]
    })
);
app.use(json());
app.use(logger());
app.use(async (ctx, next) => {
    let start = new Date();
    let ms = new Date() - start;
    console.log("%s %s - %s", this.method, this.url, ms);
    await next(); // 调用下一个middleware
});
app.on("error", function (err, ctx) {
    console.log("server error", err);
});
koa.use('/user', user.routes()); // 挂载到koa-router上。
koa.use("/baseData",baseData.routes());
koa.use("/resource",resource.routes());
app.use(koa.routes()); // 将路由规则挂载到Koa上。
app.use(serve(path.resolve("dist"))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录
app.listen(8889, () => {
    console.log("Koa is listening in 8889");
});
module.exports = app;
