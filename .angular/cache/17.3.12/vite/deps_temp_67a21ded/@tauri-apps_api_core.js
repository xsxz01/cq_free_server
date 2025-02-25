import {
  __async
} from "./chunk-WDMUDEB6.js";

// node_modules/.pnpm/@tauri-apps+api@2.2.0/node_modules/@tauri-apps/api/external/tslib/tslib.es6.js
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}

// node_modules/.pnpm/@tauri-apps+api@2.2.0/node_modules/@tauri-apps/api/core.js
var _Channel_onmessage;
var _Channel_nextMessageId;
var _Channel_pendingMessages;
var _Resource_rid;
var SERIALIZE_TO_IPC_FN = "__TAURI_TO_IPC_KEY__";
function transformCallback(callback, once = false) {
  return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
var Channel = class {
  constructor() {
    this.__TAURI_CHANNEL_MARKER__ = true;
    _Channel_onmessage.set(
      this,
      () => {
      }
      // the id is used as a mechanism to preserve message order
    );
    _Channel_nextMessageId.set(this, 0);
    _Channel_pendingMessages.set(this, []);
    this.id = transformCallback(({ message, id }) => {
      if (id == __classPrivateFieldGet(this, _Channel_nextMessageId, "f")) {
        __classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, message);
        __classPrivateFieldSet(this, _Channel_nextMessageId, __classPrivateFieldGet(this, _Channel_nextMessageId, "f") + 1, "f");
        while (__classPrivateFieldGet(this, _Channel_nextMessageId, "f") in __classPrivateFieldGet(this, _Channel_pendingMessages, "f")) {
          const message2 = __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[__classPrivateFieldGet(this, _Channel_nextMessageId, "f")];
          __classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, message2);
          delete __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[__classPrivateFieldGet(this, _Channel_nextMessageId, "f")];
          __classPrivateFieldSet(this, _Channel_nextMessageId, __classPrivateFieldGet(this, _Channel_nextMessageId, "f") + 1, "f");
        }
      } else {
        __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[id] = message;
      }
    });
  }
  set onmessage(handler) {
    __classPrivateFieldSet(this, _Channel_onmessage, handler, "f");
  }
  get onmessage() {
    return __classPrivateFieldGet(this, _Channel_onmessage, "f");
  }
  [(_Channel_onmessage = /* @__PURE__ */ new WeakMap(), _Channel_nextMessageId = /* @__PURE__ */ new WeakMap(), _Channel_pendingMessages = /* @__PURE__ */ new WeakMap(), SERIALIZE_TO_IPC_FN)]() {
    return `__CHANNEL__:${this.id}`;
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
};
var PluginListener = class {
  constructor(plugin, event, channelId) {
    this.plugin = plugin;
    this.event = event;
    this.channelId = channelId;
  }
  unregister() {
    return __async(this, null, function* () {
      return invoke(`plugin:${this.plugin}|remove_listener`, {
        event: this.event,
        channelId: this.channelId
      });
    });
  }
};
function addPluginListener(plugin, event, cb) {
  return __async(this, null, function* () {
    const handler = new Channel();
    handler.onmessage = cb;
    return invoke(`plugin:${plugin}|registerListener`, { event, handler }).then(() => new PluginListener(plugin, event, handler.id));
  });
}
function checkPermissions(plugin) {
  return __async(this, null, function* () {
    return invoke(`plugin:${plugin}|check_permissions`);
  });
}
function requestPermissions(plugin) {
  return __async(this, null, function* () {
    return invoke(`plugin:${plugin}|request_permissions`);
  });
}
function invoke(_0) {
  return __async(this, arguments, function* (cmd, args = {}, options) {
    return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
  });
}
function convertFileSrc(filePath, protocol = "asset") {
  return window.__TAURI_INTERNALS__.convertFileSrc(filePath, protocol);
}
var Resource = class {
  get rid() {
    return __classPrivateFieldGet(this, _Resource_rid, "f");
  }
  constructor(rid) {
    _Resource_rid.set(this, void 0);
    __classPrivateFieldSet(this, _Resource_rid, rid, "f");
  }
  /**
   * Destroys and cleans up this resource from memory.
   * **You should not call any method on this object anymore and should drop any reference to it.**
   */
  close() {
    return __async(this, null, function* () {
      return invoke("plugin:resources|close", {
        rid: this.rid
      });
    });
  }
};
_Resource_rid = /* @__PURE__ */ new WeakMap();
function isTauri() {
  return "isTauri" in window && !!window.isTauri;
}
export {
  Channel,
  PluginListener,
  Resource,
  SERIALIZE_TO_IPC_FN,
  addPluginListener,
  checkPermissions,
  convertFileSrc,
  invoke,
  isTauri,
  requestPermissions,
  transformCallback
};
//# sourceMappingURL=@tauri-apps_api_core.js.map
