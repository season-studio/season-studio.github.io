(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var __STAMP__ = "461017264446495257";
  var __VERSION__ = "1.0.0";

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _isNativeReflectConstruct$1() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct$1()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var WorkerEvent = /*#__PURE__*/function (_CustomEvent) {
    _inherits(WorkerEvent, _CustomEvent);

    var _super = _createSuper(WorkerEvent);

    function WorkerEvent(_self, _msg) {
      var _this;

      _classCallCheck(this, WorkerEvent);

      _this = _super.call(this, _msg.data.msg, {
        detail: _msg.data.param
      });
      Object.defineProperties(_assertThisInitialized(_this), {
        ports: {
          value: _msg.ports,
          writable: false
        },
        oriMsg: {
          value: _msg,
          writable: false
        },
        worker: {
          value: _self,
          writable: false
        },
        msgType: {
          value: _msg.data.msg,
          writable: false
        },
        timeStamp: {
          value: Date.now(),
          writable: false
        }
      });
      return _this;
    }

    _createClass(WorkerEvent, [{
      key: "broadcasrAck",
      value: function broadcasrAck(_msg) {
        var data = {
          msg: this.msgType,
          timeStamp: this.timeStamp,
          ret: _msg
        };
        this.worker.clients.matchAll().then(function (clients) {
          clients.forEach(function (client) {
            client.postMessage(data);
          });
        });
      }
    }, {
      key: "ack",
      value: function ack(_msg) {
        if (this.ports[0]) {
          this.ports[0].postMessage({
            msg: this.msgType,
            timeStamp: this.timeStamp,
            ret: _msg
          });
        } else {
          this.broadcasrAck(_msg);
        }
      }
    }]);

    return WorkerEvent;
  }( /*#__PURE__*/_wrapNativeSuper(CustomEvent));

  var appName = "SeasonStudioKit";
  var cacheName = "".concat(appName, "-1.00.3");
  self.importScripts("./jslib/runtime.js");
  var _self = self,
      regeneratorRuntime = _self.regeneratorRuntime;
  self.addEventListener('install', function (e) {
    console.log("#[Worker] installing...");
    e.waitUntil(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return caches.open(cacheName);

            case 2:
              //cache.addAll([]);
              self.skipWaiting();
              console.log("#[Worker] installed");

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))());
  });
  self.addEventListener('activate', function (event) {
    console.log("#[Worker] activate");
    event.waitUntil(caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.filter(function (itemName) {
        return itemName.startsWith(appName) && itemName !== cacheName;
      }).map(function (itemName) {
        return caches["delete"](itemName);
      })).then(function () {
        return self.clients.claim();
      });
    }));
  });
  self.addEventListener("fetch", function (event) {
    event.respondWith(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var resp, reqUrl, realReq, cache;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return caches.match(event.request);

            case 3:
              resp = _context2.sent;
              reqUrl = String(event.request.url);
              realReq = reqUrl.indexOf("/.pwa.vir") < 0;

              if (resp) {
                _context2.next = 11;
                break;
              }

              if (!(reqUrl.indexOf("/.pwa.vir/") >= 0)) {
                _context2.next = 11;
                break;
              }

              _context2.next = 10;
              return caches.match(reqUrl.replace("/.pwa.vir/", "/.pwa.vir.keep/"));

            case 10:
              resp = _context2.sent;

            case 11:
              if (!(!resp && realReq)) {
                _context2.next = 15;
                break;
              }

              _context2.next = 14;
              return fetch(event.request);

            case 14:
              resp = _context2.sent;

            case 15:
              if (resp instanceof Response) {
                _context2.next = 19;
                break;
              }

              throw new Error("".concat(_typeof(resp), ", ").concat(realReq));

            case 19:
              if (!resp.ok) {
                _context2.next = 24;
                break;
              }

              _context2.next = 22;
              return caches.open(cacheName);

            case 22:
              cache = _context2.sent;
              cache && reqUrl.indexOf("/pwa/pkgs/") < 0 && cache.add(event.request);

            case 24:
              return _context2.abrupt("return", resp);

            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2["catch"](0);
              console.error("#[Worker] Fail in fetch: ", event.request.url, _context2.t0);
              return _context2.abrupt("return", new Response(new Blob([""]), {
                "status": 404
              }));

            case 31:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 27]]);
    }))());
  });
  self.addEventListener("message", function (event) {
    self.dispatchEvent(new WorkerEvent(self, event));
  });
  self.addEventListener("map-virtual-response", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event) {
      var cache, mapTree, origin, path, item;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return caches.open(cacheName);

            case 2:
              cache = _context3.sent;

              if (!cache) {
                _context3.next = 21;
                break;
              }

              mapTree = event.detail;
              origin = location.origin;
              origin.endsWith("/") || (origin += "/");

              if (!mapTree) {
                _context3.next = 18;
                break;
              }

              _context3.t0 = regeneratorRuntime.keys(mapTree);

            case 9:
              if ((_context3.t1 = _context3.t0()).done) {
                _context3.next = 18;
                break;
              }

              path = _context3.t1.value;
              item = mapTree[path];
              path = path.startsWith(":") ? "".concat(origin, ".pwa.vir.keep/").concat(path.substr(1)) : "".concat(origin, ".pwa.vir/").concat(path);
              item instanceof Blob || (item = new Blob([item]));
              _context3.next = 16;
              return cache.put(path, new Response(item, Object.assign({
                status: 200,
                headers: Object.assign({
                  "Content-Length": item.size
                }, item.respHeaders)
              }, item.respStatus)));

            case 16:
              _context3.next = 9;
              break;

            case 18:
              event.ack(0);
              _context3.next = 22;
              break;

            case 21:
              event.ack(-1);

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
  self.addEventListener("clear-virtual-response", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(event) {
      var cache, isKeepAlive;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return caches.open(cacheName);

            case 2:
              cache = _context4.sent;

              if (!cache) {
                _context4.next = 14;
                break;
              }

              isKeepAlive = event.detail.keepAlive;
              _context4.t0 = Promise;
              _context4.next = 8;
              return cache.keys();

            case 8:
              _context4.t1 = _context4.sent.map(function (item) {
                return String(item.url).indexOf(isKeepAlive ? ".pwa.vir.keep/" : ".pwa.vir/") >= 0 ? cache["delete"](item) : undefined;
              });
              _context4.next = 11;
              return _context4.t0.all.call(_context4.t0, _context4.t1);

            case 11:
              event.ack(0);
              _context4.next = 15;
              break;

            case 14:
              event.ack(-1);

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }());
  self.addEventListener("reload-application", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(event) {
      var cache;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return caches.open(cacheName);

            case 2:
              cache = _context5.sent;

              if (!cache) {
                _context5.next = 13;
                break;
              }

              _context5.t0 = Promise;
              _context5.next = 7;
              return cache.keys();

            case 7:
              _context5.t1 = _context5.sent.map(function (item) {
                return cache["delete"](item);
              });
              _context5.next = 10;
              return _context5.t0.all.call(_context5.t0, _context5.t1);

            case 10:
              event.ack(0);
              _context5.next = 14;
              break;

            case 13:
              event.ack(-1);

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x3) {
      return _ref5.apply(this, arguments);
    };
  }());

}));
//# sourceMappingURL=sw.js.map
