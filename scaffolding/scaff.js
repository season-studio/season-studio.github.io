#!/usr/bin/env node

'use strict';

//#region toolkit

const readline = require('readline');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');
const https = require("https");
const http = require("http");

const LogFormat = {
    infoTitle: "\x1b[46;30m",
    info: "\x1b[36m",
    warnTitle: "\x1b[43;30m",
    warn: "\x1b[33m",
    errorTitle: "\x1b[41;37m\x1b[1m",
    error: "\x1b[31m",
    commentTitle: "\x1b[42;30m",
    comment: "\x1b[32m",
    none: "\x1b[0m"
};

global.$scaff = {
    log(_type) {
        const args = [...arguments];
        args[0] = LogFormat[_type] || `${_type}:`;
        args.push(LogFormat.none);
        console.log.apply(console, args);
    },

    logEx(_type) {
        const args = [...arguments];
        args[0] = LogFormat[_type + "Title"] || `${_type}:`;
        args.splice(2, 0, `${LogFormat.none}${LogFormat[_type] || ""}`);
        args.push(LogFormat.none);
        console.log.apply(console, args);
    },

    logTitle(_type) {
        const args = [...arguments];
        args[0] = LogFormat[_type + "Title"] || `${_type}:`;
        args.push(LogFormat.none);
        console.log.apply(console, args);
    },

    assert(_cond, _error, _show) {
        if (!_cond) {
            _show && $scaff.logEx("error", "ERROR", String(_error));
            throw _error;
        } else {
            return _cond;
        }
    },

    request(_url, _opt, _data) {
        if (!_url) throw "invalid URL";
        _opt || (_opt = {});
        const fn = String(_url).startsWith("https://") ? https.request : http.request;
        return fn && new Promise((resolve, reject) => {
            const req = fn(_url, _opt, res => {
                let data = new Uint8Array();
                res.on('data', chunk => {
                    data = Buffer.concat([data, Buffer.from(chunk)]);
                }).on('end', () => {
                    resolve({
                        ok: (res.statusCode >= 200) && (res.statusCode < 400),
                        headers: res.headers,
                        statusCode: res.statusCode,
                        statusMessage: res.statusMessage,
                        data
                    });
                });
            });
            req.on("error", (err) => {
                reject(err);
            });
            _data && req.write(_data);
            req.end();
        });
    },

    choice(_list, _caption) {
        return (_list instanceof Array) && new Promise(resolve => {
            try {
                const rl = readline.createInterface(process.stdin, process.stdout);
                $scaff.logTitle("info", _caption || "Choose One");
                _list.forEach((item, index) => {
                    $scaff.log("info", `(${index}) ${String(item)}`);
                });
                rl.setPrompt("");
                rl.prompt();
                process.stdout.write(`${LogFormat.comment} (press up and down key for selecting) ${LogFormat.none}`);
                let selectIndex = undefined;
                function showSelectedItem() {
                    readline.cursorTo(process.stdout, 0);
                    readline.clearLine(process.stdout, 0);
                    process.stdout.write(`${LogFormat.comment} > ${String(_list[selectIndex])} ${LogFormat.none}`);
                }
                process.stdin.on("keypress", (c, k) => {
                    const key = k.name;
                    if (key === "up") {
                        selectIndex = (selectIndex === undefined) ? 0: 
                            ((selectIndex <= 0) ? _list.length - 1: selectIndex - 1);
                        showSelectedItem();
                    } else if (key === "down") {
                        selectIndex = (selectIndex === undefined) ? 0: 
                            ((selectIndex >= _list.length - 1) ? 0: selectIndex + 1);
                        showSelectedItem();
                    } else if (key === "esc") {
                        resolve(undefined);
                        rl.close();
                    } else if (key === "return" && selectIndex !== undefined) {
                        resolve(_list[selectIndex]);
                        rl.close();
                    }
                });
            } catch (err) {
                $scaff.logEx("error", "EXCEPTION", err);
                resolve(false);
            }
        });
    },

    exec() {
        try {
            const output = cp.execSync.apply(cp, [...arguments]);
            return {
                status: 0,
                output
            };
        } catch (err) {
            (err.status === undefined) && (err.status = -1);
            return err;
        }
    },

    async downloadFiles(_files, _baseUrl, _baseDir, _silent) {
        for (let file in _files) {
            _silent || $scaff.log("comment", `downloading ${_files[file] || file} ...`);
            let url = new URL(file, _baseUrl);
            let resp = await $scaff.request(url);
            $scaff.assert(resp.ok, `Cannot fetch file "${url}"`);
            let filePath = path.resolve(_baseDir, _files[file] || file);
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, resp.data);
        }
    },

    configJSON(_filePath, _configFn) {
        let ret = fs.existsSync(_filePath) ? fs.readFileSync(_filePath) : "";
        try {
            ret = JSON.parse(String(ret).replace(/\/\/[^\n]*\n/ig, "\n").replace(/\/\*[\s\S]*\*\//ig, ""));
        } catch {
            ret = undefined;
        }
        ret = _configFn(ret);
        if (ret) {
            fs.mkdirSync(path.dirname(_filePath), { recursive: true });
            fs.writeFileSync(_filePath, JSON.stringify(ret, null, 2));
        }
    }
}
//#endregion

const DEFAULT_HOST = "https://season-studio.github.io/scaffolding/"

async function main() {
    try {
        $scaff.logEx("info", "LOADING", "support list...");
        let resp = await $scaff.request(new URL("list.json", DEFAULT_HOST));
        if (!resp.ok) throw `Bad response with code(${resp.statusCode})`;
        const list = JSON.parse(resp.data.toString()).map(function (item) {
            item.toString = function () {
                return item.name;
            };
            return item;
        });
        const selected = await $scaff.choice(list);
        if (selected) {
            $scaff.logEx("info", "LOADING", String(selected));
            const url = new URL(selected.url, DEFAULT_HOST);
            resp = await $scaff.request(url);
            if (!resp.ok) throw `Bad response with code(${resp.statusCode})`;
            const filePath = path.resolve(__dirname, `.${path.basename(selected.url)}`);
            fs.writeFileSync(filePath, resp.data);
            const selectedFunc = require(filePath);
            if (typeof selectedFunc !== "function") throw "the scaffolding plugin must export a function";
            $scaff.logEx("info", "STARTING", String(selected));
            selectedFunc(path.dirname(String(url)) + "/");
            fs.rmSync(filePath);
            $scaff.logTitle("Done");
        }
    } catch(err) {
        $scaff.logEx("error", "EXCEPTION", err);
    }
}

main();
