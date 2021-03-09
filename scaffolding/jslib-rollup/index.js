const fs = require('fs');
const path = require('path');

const devModules = [
    "@babel/core",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-classes",
    "@babel/plugin-transform-runtime",
    "@babel/preset-env",
    "@rollup/plugin-babel",
    "@rollup/plugin-commonjs",
    "@rollup/plugin-json",
    "@rollup/plugin-node-resolve",
    "jsdoc",
    "rollup",
    "rollup-plugin-node-builtins",
    "rollup-plugin-node-polyfills",
    "rollup-plugin-terser"
];

const files = {
    "rollup/rollup.js": ".rollup/rollup.js"
}

module.exports = function (_baseUrl) {
    const defaultExeOpt = {cwd:__dirname, stdio:['inherit', 'inherit', 'inherit']};

    const packageFile = path.resolve(__dirname, 'package.json');
    fs.existsSync(packageFile) || $scaff.exec('npm init', defaultExeOpt);
    
    let ret = $scaff.exec(`npm i -D ${devModules.join(" ")}`, defaultExeOpt);
    $scaff.assert(!(ret instanceof Error), "Cannot install modules for developing");
    
    $scaff.logTitle("info", "Config package");
    $scaff.configJSON(packageFile, json => {
        json || (json = {});
        json.bundleConfigs = (json.bundleConfigs || {});
        json.scripts = (json.scripts || {});
        json.scripts["rollup-release"] = "node .\\.rollup\\rollup.js --compress true";
        json.scripts["rollup-debug"] = "node .\\.rollup\\rollup.js";
        return json;
    });

    $scaff.logTitle("info", "Download files");
    $scaff.downloadFiles(files, _baseUrl, __dirname);

    $scaff.logTitle("Config");
    $scaff.log("comment", "config launch options...");
    $scaff.configJSON(path.resolve(__dirname, ".vscode/launch.json"), json => {
        json || (json = {});
        json.configurations || (json.configurations = []);
        for (let item of json.configurations) {
            if (item && item.name === "Rollup and Debug") {
                json = undefined;
                break;
            }
        }
        json && json.configurations.push({
            "type": "node",
            "request": "launch",
            "name": "Rollup and Debug",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\.rollup\\rollup.js",
            "args": [ ],
            "cwd": "${workspaceFolder}"
        });
        return json;
    });
}
