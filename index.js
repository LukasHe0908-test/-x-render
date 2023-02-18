// coreConfigHandler.min.js
"use strict"; class CoreConfigHandler { generateClientConfigFileByLink(t, e) { t = (new parseLinks).parseLinks(t)[0], e = this.generateClientConfig({ InboundSocksPort: e.socksPort, InboundHttpPort: e.httpPort, InboundApiPort: e.apiPort, InboundSocksAddress: e.socksAdress || "127.0.0.1", InboundHttpAddress: e.httpAddress || "127.0.0.1", InboundApiAddress: e.apiAddress || "127.0.0.1", udpEnabled: !0, sniffingEnabled: !1, muxEnabled: !1, OutboundProtocol: t.protocol, OutboundUUID: t.uuid, OutboundRemoteHost: t.remoteHost, OutboundRemotePort: t.remotePort, OutboundStreamType: t.streamType, OutboundEncryption: t.encryption, OutboundAlterId: t.alterId, OutboundStreamSecurity: t.streamSecurity, OutboundPath: t.path, OutboundHost: t.host }); return JSON.stringify(e, null, "") } generateServerConfigFileByLink(t, e) { t = (new parseLinks).parseLinks(t)[0], e = this.generateServerConfig({ InboundPort: e.port, InboundAddress: e.adress || "127.0.0.1", sniffingEnabled: !1, InboundProtocol: t.protocol, InboundUUID: t.uuid, InboundStreamType: t.streamType, InboundEncryption: t.encryption, InboundAlterId: t.alterId, InboundStreamSecurity: t.streamSecurity, InboundPath: t.path }); return JSON.stringify(e, null, "") } generateClientConfig(t) { var e = { policy: new Object, log: new Object, inbounds: new Object, outbounds: new Object, stats: new Object, api: new Object, routing: new Object }; return e.policy = { system: { statsOutboundUplink: !0, statsOutboundDownlink: !0 } }, e.log = { access: "", error: "", loglevel: "warning" }, e.api = { tag: "api", services: ["StatsService"] }, e.inbounds = [{ tag: "socks", port: t.InboundSocksPort, listen: "127.0.0.1", protocol: "socks", sniffing: { enabled: t.sniffingEnabled, destOverride: ["http", "tls"] }, settings: { auth: "noauth", udp: t.udpEnabled, allowTransparent: !1 } }, { tag: "http", port: t.InboundHttpPort, listen: "127.0.0.1", protocol: "http", sniffing: { enabled: t.sniffingEnabled, destOverride: ["http", "tls"] }, settings: { auth: "noauth", udp: t.udpEnabled, allowTransparent: !1 } }, { tag: "api", port: t.InboundApiPort, listen: "127.0.0.1", protocol: "dokodemo-door", settings: { udp: !1, address: "127.0.0.1", allowTransparent: !1 } }], e.outbounds = [{ tag: "proxy", protocol: t.OutboundProtocol, settings: { vnext: [{ address: t.OutboundRemoteHost, port: t.OutboundRemotePort, users: [{ id: t.OutboundUUID, alterId: t.OutboundAlterId, email: "t@t.tt", security: t.OutboundEncryption, encryption: "none" }] }] }, streamSettings: { network: t.OutboundStreamType, security: t.OutboundStreamSecurity, tlsSettings: { allowInsecure: !1, serverName: t.OutboundHost }, wsSettings: { path: t.OutboundPath, headers: { Host: t.OutboundHost } } }, mux: { enabled: t.muxEnabled, concurrency: -1 } }, { tag: "direct", protocol: "freedom", settings: {} }, { tag: "block", protocol: "blackhole", settings: { response: { type: "http" } } }], e.routing = { domainStrategy: "IPIfNonMatch", domainMatcher: "mph", rules: [{ type: "field", inboundTag: ["api"], outboundTag: "api", enabled: !0 }, { type: "field", outboundTag: "direct", domain: ["geosite:cn"], enabled: !0 }, { type: "field", inboundTag: [], outboundTag: "direct", ip: ["geoip:private", "geoip:cn"], enabled: !0 }, { type: "field", port: "0-65535", outboundTag: "proxy", enabled: !0 }] }, e } generateServerConfig(t) { var e = { policy: new Object, log: new Object, inbounds: new Object, outbounds: new Object, stats: new Object, api: new Object, routing: new Object, dns: new Object }; return e.log = { access: "", error: "", loglevel: "warning" }, e.api = { tag: "api", services: [] }, e.inbounds = [{ port: t.InboundPort, listen: t.InboundAddress, protocol: t.InboundProtocol, settings: { clients: [{ id: t.InboundUUID, level: 0, email: "t@t.tt" }], decryption: "none" }, streamSettings: { network: t.InboundStreamType, security: t.InboundStreamSecurity, wsSettings: { path: t.InboundPath } }, sniffing: { enabled: t.sniffingEnabled, destOverride: ["http", "tls", "quic"], metadataOnly: !1 } }], e.dns = { servers: ["https+local://8.8.8.8/dns-query"] }, e.outbounds = [{ protocol: "freedom", settings: {} }, { protocol: "blackhole", settings: {}, tag: "blocked" }], e.routing = { rules: [{ inboundTag: ["api"], outboundTag: "api", type: "field" }, { outboundTag: "blocked", protocol: ["bittorrent"], type: "field" }] }, e } }

let err404 = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><style>*{margin:0;padding:0;font-family:sans-serif}body,html{width:100%;height:100%;overflow:auto;color:#000;background-color:#fff;box-sizing:border-box}.container{margin-left:auto;margin-right:auto;--padding:18px;padding-left:var(--padding);padding-right:var(--padding);width:calc(100% - var(--padding) * 2);margin-top:80px;border-radius:8px;transition:all ease .2s,background-color 0s,color 0s}@media (min-width:980px){.container{max-width:978px}}@media (min-width:1200px){.container{max-width:1128px}}@media (max-height:500px){.container{margin-top:18px}}#backHome{display:inline-flex;align-items:center;color:#fff;background-color:#333;border-radius:16px;margin:16px 0 0;padding:16px 32px;transition:all ease .2s,background-color 0s,color 0s;user-select:none}#backHome:hover{transition:all ease .2s;background-color:#2a2a2a}#backHome:active{transition:all ease .2s;background-color:#2a2a2a;transform:scale(.95)}#backHome svg{fill:#fff}.col-2{color:#222}.headline-1{font-size:3em;font-weight:600;margin-bottom:24px}.headline-5{font-size:1em;font-weight:600;margin-bottom:0}</style></head><body><div class="container"><div><h1 class="headline-1 col-2">Page not found</h1><h5 class="headline-5 col-2">Sorry, we can't find the page you are looking for in this download server.</h5></div><div id="backHome">Back Home</div></div></body><script>document.querySelector('#backHome').addEventListener('click', () => { location.pathname = "/" });</script></html>`;

const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");
const http = require('node:http');
const https = require('node:https');
const stream = require('node:stream');
const httpProxyMiddleware = require("http-proxy-middleware");
var app = express();
var config = {
  core_path: process.env.X_CORE_PATH || './core',
  port: process.env.X_PORT || 3000,
  uuid: process.env.X_UUID || guid(),
  path: process.env.X_PATH || "/api",
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

app.get("/", (req, res) => {
  res.status(404);
  res.send(err404);
});
app.get("/generate_204", (req, res) => {
  res.status(204);
  res.send("");
});
//手动启动web
// app.get("/start", (req, res) => {
//   res.setHeader("Content-Type", "text/plain; charset=utf-8");
//   start_web((log) => {
//     listen_port();
//     res.send(log);
//   });
// });

var wsProxy = httpProxyMiddleware.createProxyMiddleware({
  target: "http://127.0.0.1:8080/",
  changeOrigin: true,
  ws: true,
  logLevel: 'silent', // 禁用所有日志输出
});
app.use(config.path, wsProxy);


// 初始化，下载核心
function download_web(callback) {
  let url = "";
  let stream = fs.createWriteStream(path.resolve(config.core_path));
  https.get(url, res => {
    if (res.statusCode == 200) {
      res.on('data', data => {
        stream.write(data);
      });
      res.on('end', () => {
        stream.close();
        callback(null);
      });
    } else {
      callback("下载文件失败");
    }
  }).on('error', err => {
    callback("下载文件失败");
    fs.rmSync(path.resolve(config.core_path));
  });
}

// 启动核心
async function start_web(callback) {
  // 生成配置文件
  let config_obj = new CoreConfigHandler().generateServerConfig({
    InboundPort: 8080,
    InboundAddress: '127.0.0.1',
    sniffingEnabled: false,
    InboundProtocol: atob('dmxlc3M='),
    InboundUUID: config.uuid,
    InboundStreamType: 'ws',
    InboundEncryption: 'auto',
    InboundAlterId: 0,
    InboundStreamSecurity: 'none',
    InboundPath: config.path,
  });
  config_obj = JSON.stringify(config_obj, null, '');

  await (_ => {
    return new Promise(async resolve => {
      let args = ['+x', path.resolve(config.core_path)];
      let process = cp.spawn('chmod', args);
      process.on('close', () => {
        console.log('[初始化] web文件chmod完成');
        resolve();
      });
    });
  })();
  let corep = cp.spawn(path.resolve(config.core_path), ['-c', 'stdin:']);
  let stdInStream = new stream.Readable();
  stdInStream.push(config_obj);
  stdInStream.push(null);
  stdInStream.pipe(corep.stdin);
  corep.stdout.on('data', data => {
    // console.log(data.toString().replace(/\n/g, ''));
    if (/[0-9/]* [0-9:]* \[Warning\] core: .* started/.test(data)) {
      console.log(`
----------
[Config]
path: ${config.path}
uuid: ${config.uuid}
----------
      `);
      callback("[初始化] core启动成功");
    }
  });
  corep.on('error', err => {
    callback("[初始化] core启动错误：" + err);
  });
}

// 监听端口
function listen_port() {
  let serverProxy = http.createServer(app);
  serverProxy.listen(config.port, () => {
    console.log(`[软件] Listening on port ${config.port}`);
  });
  serverProxy.on('upgrade', wsProxy.upgrade);
}

if (!fs.existsSync(path.resolve(config.core_path))) {
  download_web((err) => {
    if (err) {
      console.log("\n[初始化] web文件下载失败");
    } else {
      console.log("\n[初始化] web文件下载成功");
      start_web((log) => {
        console.log(log);
        listen_port();
      });
    }
  });
} else {
  console.log("\n[初始化] web文件已存在");
  start_web((log) => {
    console.log(log);
    listen_port();
  });
}


function keepalive() {
  // 保持唤醒
  https.get("https://" + process.env.RENDER_EXTERNAL_HOSTNAME + "/generate_204", res => {
    if (res.statusCode == 204) {
    } else {
      console.log("请求错误: " + res.statusCode)
    }
  }).on('error', err => {
    console.log("请求错误: " + err)
  });
}
setInterval(keepalive, 30 * 1000);
