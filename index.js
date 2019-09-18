  
const Koa = require('koa');
const logger = require('koa-logger');
const sslify = require('koa-sslify').default;//http强制HTTPS
const https = require('https');//node内置https server
const fs = require('fs');
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

app.use(logger())
app.use(sslify())
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

var options = {
    key: fs.readFileSync('./2_www.xuehaiwuya.club.pem'),  //私钥文件路径
    cert: fs.readFileSync('./2_www.xuehaiwuya.club.crt')  //证书文件路径
};

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());
// 在端口8081监听:
https.createServer(options, app.callback()).listen(8081, () => {
    console.log(`server running success at 8081`)
});

