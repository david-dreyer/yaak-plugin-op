"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/debug.js"(exports2, module2) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/constants.js"(exports2, module2) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/re.js"(exports2, module2) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var safeSrc = exports2.safeSrc = [];
    var t = exports2.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/parse-options.js"(exports2, module2) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/identifiers.js"(exports2, module2) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/classes/semver.js"(exports2, module2) {
    "use strict";
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version2, options) {
        options = parseOptions(options);
        if (version2 instanceof _SemVer) {
          if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
            return version2;
          } else {
            version2 = version2.version;
          }
        } else if (typeof version2 !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
        }
        if (version2.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version2, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version2.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version2}`);
        }
        this.raw = version2;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/parse.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = (version2, options, throwErrors = false) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      try {
        return new SemVer(version2, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module2.exports = parse;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/coerce.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce = (version2, options) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      if (typeof version2 === "number") {
        version2 = String(version2);
      }
      if (typeof version2 !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version2.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version2)) && (!match || match.index + match[0].length !== version2.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module2.exports = coerce;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/internal/lrucache.js"(exports2, module2) {
    "use strict";
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module2.exports = LRUCache;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/compare.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/eq.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/neq.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/gt.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module2.exports = gt;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/gte.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/lt.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/lte.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/cmp.js"(exports2, module2) {
    "use strict";
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/classes/comparator.js"(exports2, module2) {
    "use strict";
    var ANY = Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version2) {
        debug("Comparator.test", version2, this.options.loose);
        if (this.semver === ANY || version2 === ANY) {
          return true;
        }
        if (typeof version2 === "string") {
          try {
            version2 = new SemVer(version2, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version2, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/classes/range.js"(exports2, module2) {
    "use strict";
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache2.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache2.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version2) {
        if (!version2) {
          return false;
        }
        if (typeof version2 === "string") {
          try {
            version2 = new SemVer(version2, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version2, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range;
    var LRU = require_lrucache();
    var cache2 = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version2, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version2)) {
          return false;
        }
      }
      if (version2.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/.pnpm/semver@7.7.2/node_modules/semver/functions/satisfies.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var satisfies = (version2, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version2);
    };
    module2.exports = satisfies;
  }
});

// node_modules/.pnpm/lookpath@1.2.3/node_modules/lookpath/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/lookpath@1.2.3/node_modules/lookpath/lib/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports2 && exports2.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.lookpath = void 0;
    var fs2 = __importStar(require("fs"));
    var path2 = __importStar(require("path"));
    var isWindows = /^win/i.test(process.platform);
    var isFilepath = function(cmd) {
      return cmd.includes(path2.sep) ? path2.resolve(cmd) : void 0;
    };
    var access = function(fpath) {
      return new Promise(function(resolve) {
        return fs2.access(fpath, fs2.constants.X_OK, function(err) {
          return resolve(err ? void 0 : fpath);
        });
      });
    };
    var isExecutable = function(abspath, opt) {
      if (opt === void 0) {
        opt = {};
      }
      return __awaiter(void 0, void 0, void 0, function() {
        var envvars, exts, bins;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              envvars = opt.env || process.env;
              exts = (envvars.PATHEXT || "").split(path2.delimiter).concat("");
              return [4, Promise.all(exts.map(function(ext) {
                return access(abspath + ext);
              }))];
            case 1:
              bins = _a.sent();
              return [2, bins.find(function(bin) {
                return !!bin;
              })];
          }
        });
      });
    };
    var getDirsToWalkThrough = function(opt) {
      var envvars = opt.env || process.env;
      var envname = isWindows ? "Path" : "PATH";
      return (envvars[envname] || "").split(path2.delimiter).concat(opt.include || []).filter(function(p) {
        return !(opt.exclude || []).includes(p);
      });
    };
    function lookpath(command, opt) {
      if (opt === void 0) {
        opt = {};
      }
      return __awaiter(this, void 0, void 0, function() {
        var directpath, dirs, bins;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              directpath = isFilepath(command);
              if (directpath)
                return [2, isExecutable(directpath, opt)];
              dirs = getDirsToWalkThrough(opt);
              return [4, Promise.all(dirs.map(function(dir) {
                return isExecutable(path2.join(dir, command), opt);
              }))];
            case 1:
              bins = _a.sent();
              return [2, bins.find(function(bin) {
                return !!bin;
              })];
          }
        });
      });
    }
    exports2.lookpath = lookpath;
  }
});

// node_modules/.pnpm/@1password+op-js@0.1.13/node_modules/@1password/op-js/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/@1password+op-js@0.1.13/node_modules/@1password/op-js/package.json"(exports2, module2) {
    module2.exports = {
      name: "@1password/op-js",
      version: "0.1.13",
      description: "A typed JS wrapper for the 1Password CLI",
      main: "./dist/index.js",
      types: "./dist/src/index.d.ts",
      files: [
        "dist/"
      ],
      repository: {
        type: "git",
        url: "https://github.com/1Password/op-js"
      },
      license: "MIT",
      scripts: {
        build: "license-checker-rseidelsohn --direct --files licenses && yarn compile --minify && tsc -p tsconfig.release.json --emitDeclarationOnly",
        compile: "esbuild src/index.ts src/cli.ts --platform=node --format=cjs --outdir=dist",
        eslint: "eslint -c .eslintrc.json 'src/*.ts'",
        prepare: "husky install",
        prettier: "prettier --check 'src/*.ts'",
        "test:unit": "jest --testMatch '<rootDir>/src/*.test.ts'",
        "test:integration": "jest --testMatch '<rootDir>/tests/*.test.ts' --setupFilesAfterEnv '<rootDir>/jest.setup.ts' --runInBand",
        typecheck: "tsc -p tsconfig.release.json --noEmit",
        watch: "yarn compile --watch"
      },
      prettier: "@1password/prettier-config",
      "lint-staged": {
        "src/*.ts": [
          "prettier --write",
          "eslint -c .eslintrc.json --fix"
        ]
      },
      devDependencies: {
        "@1password/eslint-config": "^4.3.0",
        "@1password/prettier-config": "^1.1.3",
        "@types/jest": "^29.5.12",
        "@types/node": "^20.12.12",
        "@types/semver": "^7.5.8",
        "@typescript-eslint/eslint-plugin": "^7.9.0",
        esbuild: "^0.21.2",
        eslint: "^8.57.0",
        husky: "^9.0.11",
        jest: "^29.7.0",
        "jest-environment-jsdom": "^29.6.2",
        joi: "^17.13.1",
        "license-checker-rseidelsohn": "^4.3.0",
        "lint-staged": "^15.2.2",
        prettier: "^3.2.5",
        "prettier-plugin-organize-imports": "^3.2.4",
        "ts-jest": "^29.1.2",
        typescript: "5.4.5"
      },
      dependencies: {
        lookpath: "^1.2.2",
        semver: "^7.6.2"
      }
    };
  }
});

// node_modules/.pnpm/@1password+op-js@0.1.13/node_modules/@1password/op-js/dist/cli.js
var require_cli = __commonJS({
  "node_modules/.pnpm/@1password+op-js@0.1.13/node_modules/@1password/op-js/dist/cli.js"(exports2, module2) {
    var P = Object.create;
    var c = Object.defineProperty;
    var k = Object.getOwnPropertyDescriptor;
    var D = Object.getOwnPropertyNames;
    var L = Object.getPrototypeOf;
    var B = Object.prototype.hasOwnProperty;
    var G = (t, e) => {
      for (var r in e) c(t, r, { get: e[r], enumerable: true });
    };
    var x = (t, e, r, n) => {
      if (e && typeof e == "object" || typeof e == "function") for (let i of D(e)) !B.call(t, i) && i !== r && c(t, i, { get: () => e[i], enumerable: !(n = k(e, i)) || n.enumerable });
      return t;
    };
    var E = (t, e, r) => (r = t != null ? P(L(t)) : {}, x(e || !t || !t.__esModule ? c(r, "default", { value: t, enumerable: true }) : r, t));
    var J = (t) => x(c({}, "__esModule", { value: true }), t);
    var z = {};
    G(z, { CLI: () => f, CLIError: () => g, ExecutionError: () => p, ValidationError: () => m, camelToHyphen: () => C, cli: () => V, createFieldAssignment: () => N, createFlags: () => v, defaultClientInfo: () => S, parseFlagValue: () => O, sanitizeInput: () => a, semverToInt: () => F });
    module2.exports = J(z);
    var T = require("child_process");
    var w = require_lib();
    var u = E(require_coerce());
    var d = E(require_satisfies());
    var A = require_package();
    var m = class extends Error {
      constructor(r, n, i) {
        let o;
        switch (r) {
          case "not-found": {
            o = "Could not find `op` executable";
            break;
          }
          case "version": {
            o = `CLI version ${i} does not satisfy required version ${n}`;
            break;
          }
        }
        super(o);
        this.type = r;
        this.requiredVersion = n;
        this.currentVersion = i;
        this.name = "ValidationError";
      }
    };
    var p = class extends Error {
      constructor(r, n) {
        super(r);
        this.status = n;
        this.name = "ExecutionError";
      }
    };
    var g = class _g extends p {
      constructor(r, n) {
        const i = r.match(_g.errorRegex);
        let o, s;
        i ? (o = i[2], s = new Date(i[1])) : o = "Unknown error";
        super(o, n);
        this.originalMessage = r;
        this.name = "CLIError", this.timestamp = s;
      }
      static errorRegex = /\[ERROR] (\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) (.+)/;
      timestamp;
    };
    var F = (t) => t.split(".").map((e) => e.padStart(2, "0")).join("");
    var C = (t) => t.replaceAll(/([A-Za-z])(?=[A-Z])/g, "$1-").toLowerCase();
    var I = ['"', "$", "'", "\\", "`"];
    var M = /* @__PURE__ */ new Set([...I, "."]);
    var a = (t) => {
      let e = "", r = false;
      for (let n = 0; n < t.length; n++) t[n] === "\\" ? (r = M.has(t[n + 1]), r || (e += "\\")) : !r && I.includes(t[n]) && (e += "\\", r = false), e += t[n];
      return e;
    };
    var U = (t, e) => t.length === e.length && t.every((r, n) => r === e[n]);
    var O = (t) => {
      if (typeof t == "string") return `=${a(t)}`;
      if (Array.isArray(t)) return `=${t.join(",")}`;
      if (typeof t == "object") {
        let e = "";
        if ("label" in t && (e += (t.label || []).map((r) => `label=${r}`).join(",")), "type" in t && (e += (t.type || []).map((r) => `type=${r}`).join(",")), e.length > 0) return `=${a(e)}`;
      }
      return "";
    };
    var v = (t) => Object.entries(t).filter(([e, r]) => !!r).map(([e, r]) => `--${C(a(e))}${O(r)}`);
    var N = ([t, e, r]) => `${a(t)}[${a(e)}]=${a(r)}`;
    var S = { name: "1Password for JavaScript", id: "JS", build: F(A.version) };
    var f = class _f {
      static recommendedVersion = ">=2.4.0";
      clientInfo = S;
      globalFlags = {};
      connect;
      serviceAccountToken;
      setClientInfo(e) {
        this.clientInfo = e;
      }
      getVersion() {
        return this.execute([], { flags: { version: true }, json: false });
      }
      async validate(e = _f.recommendedVersion) {
        if (!!!await (0, w.lookpath)("op")) throw new m("not-found");
        const n = this.getVersion(), i = (0, u.default)(n);
        if (!(0, d.default)(i, e)) throw new m("version", e, n);
      }
      createParts(e, r, n, i) {
        const o = e.map((s) => a(s));
        for (const s of r) if (typeof s == "string") o.push(a(s));
        else if (Array.isArray(s)) o.push(N(s));
        else throw new TypeError("Invalid argument");
        if (i && (n = { ...n, format: "json" }), U(e, ["inject"])) {
          const s = (0, u.default)(V.getVersion());
          if ((0, d.default)(s, ">=2.6.2")) {
            if (process.platform === "win32") throw new p("Inject is not supported on Windows for version >=2.6.2 of the CLI", 1);
            n = { ...n, inFile: "/dev/stdin" };
          }
        }
        return [...o, ...v({ ...this.globalFlags, ...n })];
      }
      execute(e, { args: r = [], flags: n = {}, stdin: i, json: o = true } = {}) {
        let s;
        const $ = this.createParts(e, r, n, o);
        i && (s = Buffer.from(typeof i == "string" ? i : JSON.stringify(i)));
        const { status: h, error: b, stdout: R, stderr: _ } = (0, T.spawnSync)("op", $, { stdio: s ? "pipe" : ["ignore", "pipe", "pipe"], input: s, env: { ...process.env, ...this.connect && { OP_CONNECT_HOST: this.connect.host, OP_CONNECT_TOKEN: this.connect.token }, ...this.serviceAccountToken && { OP_SERVICE_ACCOUNT_TOKEN: this.serviceAccountToken }, OP_INTEGRATION_NAME: this.clientInfo.name, OP_INTEGRATION_ID: this.clientInfo.id, OP_INTEGRATION_BUILDNUMBER: this.clientInfo.build } });
        if (b) throw new p(b.message, h);
        const y = _.toString();
        if (y.length > 0) throw new g(y, h);
        const l = R.toString().trim();
        if (l.length !== 0) {
          if (!o) return l;
          try {
            return JSON.parse(l);
          } catch (j) {
            throw console.log(l), j;
          }
        }
      }
    };
    var V = new f();
  }
});

// node_modules/.pnpm/@1password+op-js@0.1.13/node_modules/@1password/op-js/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@1password+op-js@0.1.13/node_modules/@1password/op-js/dist/index.js"(exports2, module2) {
    var v = Object.create;
    var o = Object.defineProperty;
    var x = Object.getOwnPropertyDescriptor;
    var C = Object.getOwnPropertyNames;
    var f = Object.getPrototypeOf;
    var F = Object.prototype.hasOwnProperty;
    var A = (e, t) => {
      for (var r in t) o(e, r, { get: t[r], enumerable: true });
    };
    var u = (e, t, r, a) => {
      if (t && typeof t == "object" || typeof t == "function") for (let i of C(t)) !F.call(e, i) && i !== r && o(e, i, { get: () => t[i], enumerable: !(a = x(t, i)) || a.enumerable });
      return e;
    };
    var c = (e, t, r) => (r = e != null ? v(f(e)) : {}, u(t || !e || !e.__esModule ? o(r, "default", { value: e, enumerable: true }) : r, e));
    var R = (e) => u(o({}, "__esModule", { value: true }), e);
    var M = {};
    A(M, { CLIError: () => n.CLIError, ExecutionError: () => n.ExecutionError, ValidationError: () => n.ValidationError, ValidationErrorType: () => n.ValidationErrorType, account: () => V, connect: () => P, document: () => U, eventsApi: () => h, group: () => w, inject: () => b, item: () => G, read: () => D, semverToInt: () => n.semverToInt, setClientInfo: () => S, setConnect: () => y, setGlobalFlags: () => T, setServiceAccount: () => _, user: () => L, validateCli: () => I, vault: () => j, version: () => N, whoami: () => O });
    module2.exports = R(M);
    var d = c(require_coerce());
    var m = c(require_satisfies());
    var s = require_cli();
    var n = require_cli();
    var S = (e) => s.cli.setClientInfo(e);
    var T = (e) => {
      s.cli.globalFlags = e;
    };
    var y = (e, t) => {
      s.cli.connect = { host: e, token: t };
    };
    var _ = (e) => {
      s.cli.serviceAccountToken = e;
    };
    var I = async (e) => await s.cli.validate(e);
    var N = () => s.cli.getVersion();
    var b = { data: (e, t = {}) => s.cli.execute(["inject"], { flags: t, json: false, stdin: e }), toFile: (e, t, r = {}) => s.cli.execute(["inject"], { flags: { outFile: t, ...r }, json: false, stdin: e }) };
    var D = { parse: (e, t = {}) => s.cli.execute(["read"], { args: [e], flags: t, json: false }), toFile: (e, t, r = {}) => s.cli.execute(["read"], { args: [e], flags: { outFile: t, ...r }, json: false }) };
    var V = { forget: (e, t = {}) => s.cli.execute(["account", "forget"], { args: [e], flags: t, json: false }), get: (e = {}) => s.cli.execute(["account", "get"], { flags: e }), list: (e = {}) => s.cli.execute(["account", "list"], { flags: e }) };
    var O = () => {
      try {
        return s.cli.execute(["whoami"]);
      } catch (e) {
        if (e instanceof s.CLIError && e.message.includes("signed in")) return null;
        throw e;
      }
    };
    var U = { create: (e, t = {}, r = false) => s.cli.execute(["document", "create"], { args: [r ? e : ""], flags: t, stdin: r ? void 0 : e }), delete: (e, t = {}) => s.cli.execute(["document", "delete"], { args: [e], flags: t }), edit: (e, t, r = {}, a = false) => s.cli.execute(["document", "edit"], { args: [e, a ? t : ""], flags: r, stdin: a ? void 0 : t }), get: (e, t = {}) => s.cli.execute(["document", "get"], { args: [e], flags: t, json: false }), toFile: (e, t, r = {}) => s.cli.execute(["document", "get"], { args: [e], flags: { output: t, ...r }, json: false }), list: (e = {}) => s.cli.execute(["document", "list"], { flags: e }) };
    var h = { create: (e, t = {}) => s.cli.execute(["events-api", "create"], { args: [e], flags: t, json: false }) };
    var P = { group: { grant: (e, t = {}) => s.cli.execute(["connect", "group", "grant"], { flags: { group: e, ...t }, json: false }), revoke: (e, t = {}) => s.cli.execute(["connect", "group", "revoke"], { flags: { group: e, ...t }, json: false }) }, server: { create: (e, t = {}) => s.cli.execute(["connect", "server", "create"], { args: [e], flags: t, json: false }), delete: (e, t = {}) => s.cli.execute(["connect", "server", "delete"], { args: [e], flags: t }), edit: (e, t, r = {}) => s.cli.execute(["connect", "server", "edit"], { args: [e], flags: { name: t, ...r }, json: false }), get: (e, t = {}) => s.cli.execute(["connect", "server", "get"], { args: [e], flags: t }), list: (e = {}) => s.cli.execute(["connect", "server", "list"], { flags: e }) }, token: { create: (e, t, r = {}) => s.cli.execute(["connect", "token", "create"], { args: [e], flags: { server: t, ...r }, json: false }), delete: (e, t = {}) => s.cli.execute(["connect", "token", "delete"], { args: [e], flags: t, json: false }), edit: (e, t, r = {}) => s.cli.execute(["connect", "token", "edit"], { args: [e], flags: { name: t, ...r }, json: false }), list: (e = {}) => s.cli.execute(["connect", "token", "list"], { flags: e }) }, vault: { grant: (e, t, r = {}) => s.cli.execute(["connect", "vault", "grant"], { flags: { server: e, vault: t, ...r }, json: false }), revoke: (e, t, r = {}) => s.cli.execute(["connect", "vault", "revoke"], { flags: { server: e, vault: t, ...r }, json: false }) } };
    var G = { create: (e, t = {}) => {
      const r = { flags: t }, a = (0, d.default)(s.cli.getVersion());
      return (0, m.default)(a, ">=2.6.2") ? r.args = e : r.stdin = { fields: e.map(([i, p, E, g]) => {
        const l = { label: i, type: p, value: E };
        return g && Object.assign(l, { purpose: g }), l;
      }) }, s.cli.execute(["item", "create"], r);
    }, delete: (e, t = {}) => s.cli.execute(["item", "delete"], { args: [e], flags: t, json: false }), edit: (e, t, r = {}) => s.cli.execute(["item", "edit"], { args: [e, ...t], flags: r }), get: (e, t = {}) => s.cli.execute(["item", "get"], { args: [e], flags: t }), otp: (e, t = {}) => s.cli.execute(["item", "get"], { args: [e], flags: { otp: true, ...t }, json: false }), shareLink: (e, t = {}) => s.cli.execute(["item", "get"], { args: [e], flags: { shareLink: true, ...t }, json: false }), list: (e = {}) => s.cli.execute(["item", "list"], { flags: e }), share: (e, t = {}) => s.cli.execute(["item", "share"], { args: [e], flags: t, json: false }), template: { get: (e, t = {}) => s.cli.execute(["item", "template", "get"], { args: [e], flags: t }), list: (e = {}) => s.cli.execute(["item", "template", "list"], { flags: e }) } };
    var j = { create: (e, t = {}) => s.cli.execute(["vault", "create"], { args: [e], flags: t }), delete: (e, t = {}) => s.cli.execute(["vault", "delete"], { args: [e], flags: t, json: false }), edit: (e, t = {}) => s.cli.execute(["vault", "edit"], { args: [e], flags: t, json: false }), get: (e, t = {}) => s.cli.execute(["vault", "get"], { args: [e], flags: t }), list: (e = {}) => s.cli.execute(["vault", "list"], { flags: e }), group: { grant: (e = {}) => s.cli.execute(["vault", "group", "grant"], { flags: { noInput: true, ...e } }), revoke: (e = {}) => s.cli.execute(["vault", "group", "revoke"], { flags: { noInput: true, ...e } }), list: (e, t = {}) => s.cli.execute(["vault", "group", "list"], { args: [e], flags: t }) }, user: { grant: (e = {}) => s.cli.execute(["vault", "user", "grant"], { flags: { noInput: true, ...e } }), revoke: (e = {}) => s.cli.execute(["vault", "user", "revoke"], { flags: { noInput: true, ...e } }), list: (e, t = {}) => s.cli.execute(["vault", "user", "list"], { args: [e], flags: t }) } };
    var L = { confirm: (e, t = {}) => s.cli.execute(["user", "confirm"], { args: [e], flags: t, json: false }), confirmAll: (e = {}) => s.cli.execute(["user", "confirm"], { flags: { all: true, ...e }, json: false }), delete: (e, t = {}) => s.cli.execute(["user", "delete"], { args: [e], flags: t, json: false }), edit: (e, t = {}) => s.cli.execute(["user", "edit"], { args: [e], flags: t, json: false }), get: (e, t = {}) => s.cli.execute(["user", "get"], { args: [e], flags: t }), me: (e = {}) => s.cli.execute(["user", "get"], { flags: { me: true, ...e } }), fingerprint: (e, t = {}) => s.cli.execute(["user", "get"], { args: [e], flags: { fingerprint: true, ...t }, json: false }), publicKey: (e, t = {}) => s.cli.execute(["user", "get"], { args: [e], flags: { publicKey: true, ...t }, json: false }), list: (e = {}) => s.cli.execute(["user", "list"], { flags: e }), provision: (e, t, r) => s.cli.execute(["user", "provision"], { flags: { email: e, name: t, ...r } }), reactivate: (e, t = {}) => s.cli.execute(["user", "reactivate"], { args: [e], flags: t, json: false }), suspend: (e, t = {}) => s.cli.execute(["user", "suspend"], { args: [e], flags: t, json: false }) };
    var w = { create: (e, t = {}) => s.cli.execute(["group", "create"], { args: [e], flags: t }), delete: (e, t = {}) => s.cli.execute(["group", "delete"], { args: [e], flags: t, json: false }), edit: (e, t = {}) => s.cli.execute(["group", "edit"], { args: [e], flags: t, json: false }), get: (e, t = {}) => s.cli.execute(["group", "get"], { args: [e], flags: t }), list: (e = {}) => s.cli.execute(["group", "list"], { flags: e }), user: { grant: (e = {}) => s.cli.execute(["group", "user", "grant"], { flags: e, json: false }), list: (e, t = {}) => s.cli.execute(["group", "user", "list"], { args: [e], flags: t }), revoke: (e = {}) => s.cli.execute(["group", "user", "revoke"], { flags: e, json: false }) } };
  }
});

// node_modules/.pnpm/clone@2.1.2/node_modules/clone/clone.js
var require_clone = __commonJS({
  "node_modules/.pnpm/clone@2.1.2/node_modules/clone/clone.js"(exports2, module2) {
    var clone = function() {
      "use strict";
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = function() {
        };
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = function() {
        };
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = function() {
        };
      }
      function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === "object") {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != "undefined";
        if (typeof circular == "undefined")
          circular = true;
        if (typeof depth == "undefined")
          depth = Infinity;
        function _clone(parent2, depth2) {
          if (parent2 === null)
            return null;
          if (depth2 === 0)
            return parent2;
          var child;
          var proto;
          if (typeof parent2 != "object") {
            return parent2;
          }
          if (_instanceof(parent2, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent2, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent2, nativePromise)) {
            child = new nativePromise(function(resolve, reject) {
              parent2.then(function(value) {
                resolve(_clone(value, depth2 - 1));
              }, function(err) {
                reject(_clone(err, depth2 - 1));
              });
            });
          } else if (clone2.__isArray(parent2)) {
            child = [];
          } else if (clone2.__isRegExp(parent2)) {
            child = new RegExp(parent2.source, __getRegExpFlags(parent2));
            if (parent2.lastIndex) child.lastIndex = parent2.lastIndex;
          } else if (clone2.__isDate(parent2)) {
            child = new Date(parent2.getTime());
          } else if (useBuffer && Buffer.isBuffer(parent2)) {
            if (Buffer.allocUnsafe) {
              child = Buffer.allocUnsafe(parent2.length);
            } else {
              child = new Buffer(parent2.length);
            }
            parent2.copy(child);
            return child;
          } else if (_instanceof(parent2, Error)) {
            child = Object.create(parent2);
          } else {
            if (typeof prototype == "undefined") {
              proto = Object.getPrototypeOf(parent2);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }
          if (circular) {
            var index = allParents.indexOf(parent2);
            if (index != -1) {
              return allChildren[index];
            }
            allParents.push(parent2);
            allChildren.push(child);
          }
          if (_instanceof(parent2, nativeMap)) {
            parent2.forEach(function(value, key) {
              var keyChild = _clone(key, depth2 - 1);
              var valueChild = _clone(value, depth2 - 1);
              child.set(keyChild, valueChild);
            });
          }
          if (_instanceof(parent2, nativeSet)) {
            parent2.forEach(function(value) {
              var entryChild = _clone(value, depth2 - 1);
              child.add(entryChild);
            });
          }
          for (var i in parent2) {
            var attrs;
            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }
            if (attrs && attrs.set == null) {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent2);
            for (var i = 0; i < symbols.length; i++) {
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }
              child[symbol] = _clone(parent2[symbol], depth2 - 1);
              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }
          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent2);
            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
              if (descriptor && descriptor.enumerable) {
                continue;
              }
              child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }
          return child;
        }
        return _clone(parent, depth);
      }
      clone2.clonePrototype = function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = function() {
        };
        c.prototype = parent;
        return new c();
      };
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      clone2.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      clone2.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      clone2.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      clone2.__isRegExp = __isRegExp;
      function __getRegExpFlags(re) {
        var flags = "";
        if (re.global) flags += "g";
        if (re.ignoreCase) flags += "i";
        if (re.multiline) flags += "m";
        return flags;
      }
      clone2.__getRegExpFlags = __getRegExpFlags;
      return clone2;
    }();
    if (typeof module2 === "object" && module2.exports) {
      module2.exports = clone;
    }
  }
});

// node_modules/.pnpm/node-cache@5.1.2/node_modules/node-cache/lib/node_cache.js
var require_node_cache = __commonJS({
  "node_modules/.pnpm/node-cache@5.1.2/node_modules/node-cache/lib/node_cache.js"(exports2, module2) {
    (function() {
      var EventEmitter, NodeCache2, clone, splice = [].splice, boundMethodCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new Error("Bound instance method accessed before binding");
        }
      }, indexOf = [].indexOf;
      clone = require_clone();
      EventEmitter = require("events").EventEmitter;
      module2.exports = NodeCache2 = function() {
        class NodeCache3 extends EventEmitter {
          constructor(options = {}) {
            super();
            this.get = this.get.bind(this);
            this.mget = this.mget.bind(this);
            this.set = this.set.bind(this);
            this.mset = this.mset.bind(this);
            this.del = this.del.bind(this);
            this.take = this.take.bind(this);
            this.ttl = this.ttl.bind(this);
            this.getTtl = this.getTtl.bind(this);
            this.keys = this.keys.bind(this);
            this.has = this.has.bind(this);
            this.getStats = this.getStats.bind(this);
            this.flushAll = this.flushAll.bind(this);
            this.flushStats = this.flushStats.bind(this);
            this.close = this.close.bind(this);
            this._checkData = this._checkData.bind(this);
            this._check = this._check.bind(this);
            this._isInvalidKey = this._isInvalidKey.bind(this);
            this._wrap = this._wrap.bind(this);
            this._getValLength = this._getValLength.bind(this);
            this._error = this._error.bind(this);
            this._initErrors = this._initErrors.bind(this);
            this.options = options;
            this._initErrors();
            this.data = {};
            this.options = Object.assign({
              // convert all elements to string
              forceString: false,
              // used standard size for calculating value size
              objectValueSize: 80,
              promiseValueSize: 80,
              arrayValueSize: 40,
              // standard time to live in seconds. 0 = infinity;
              stdTTL: 0,
              // time in seconds to check all data and delete expired keys
              checkperiod: 600,
              // en/disable cloning of variables. If `true` you'll get a copy of the cached variable. If `false` you'll save and get just the reference
              useClones: true,
              // whether values should be deleted automatically at expiration
              deleteOnExpire: true,
              // enable legacy callbacks
              enableLegacyCallbacks: false,
              // max amount of keys that are being stored
              maxKeys: -1
            }, this.options);
            if (this.options.enableLegacyCallbacks) {
              console.warn("WARNING! node-cache legacy callback support will drop in v6.x");
              ["get", "mget", "set", "del", "ttl", "getTtl", "keys", "has"].forEach((methodKey) => {
                var oldMethod;
                oldMethod = this[methodKey];
                this[methodKey] = function(...args) {
                  var cb, err, ref, res;
                  ref = args, [...args] = ref, [cb] = splice.call(args, -1);
                  if (typeof cb === "function") {
                    try {
                      res = oldMethod(...args);
                      cb(null, res);
                    } catch (error1) {
                      err = error1;
                      cb(err);
                    }
                  } else {
                    return oldMethod(...args, cb);
                  }
                };
              });
            }
            this.stats = {
              hits: 0,
              misses: 0,
              keys: 0,
              ksize: 0,
              vsize: 0
            };
            this.validKeyTypes = ["string", "number"];
            this._checkData();
            return;
          }
          get(key) {
            var _ret, err;
            boundMethodCheck(this, NodeCache3);
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            if (this.data[key] != null && this._check(key, this.data[key])) {
              this.stats.hits++;
              _ret = this._unwrap(this.data[key]);
              return _ret;
            } else {
              this.stats.misses++;
              return void 0;
            }
          }
          mget(keys) {
            var _err, err, i, key, len, oRet;
            boundMethodCheck(this, NodeCache3);
            if (!Array.isArray(keys)) {
              _err = this._error("EKEYSTYPE");
              throw _err;
            }
            oRet = {};
            for (i = 0, len = keys.length; i < len; i++) {
              key = keys[i];
              if ((err = this._isInvalidKey(key)) != null) {
                throw err;
              }
              if (this.data[key] != null && this._check(key, this.data[key])) {
                this.stats.hits++;
                oRet[key] = this._unwrap(this.data[key]);
              } else {
                this.stats.misses++;
              }
            }
            return oRet;
          }
          set(key, value, ttl) {
            var _err, err, existent;
            boundMethodCheck(this, NodeCache3);
            if (this.options.maxKeys > -1 && this.stats.keys >= this.options.maxKeys) {
              _err = this._error("ECACHEFULL");
              throw _err;
            }
            if (this.options.forceString && false === "string") {
              value = JSON.stringify(value);
            }
            if (ttl == null) {
              ttl = this.options.stdTTL;
            }
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            existent = false;
            if (this.data[key]) {
              existent = true;
              this.stats.vsize -= this._getValLength(this._unwrap(this.data[key], false));
            }
            this.data[key] = this._wrap(value, ttl);
            this.stats.vsize += this._getValLength(value);
            if (!existent) {
              this.stats.ksize += this._getKeyLength(key);
              this.stats.keys++;
            }
            this.emit("set", key, value);
            return true;
          }
          mset(keyValueSet) {
            var _err, err, i, j, key, keyValuePair, len, len1, ttl, val;
            boundMethodCheck(this, NodeCache3);
            if (this.options.maxKeys > -1 && this.stats.keys + keyValueSet.length >= this.options.maxKeys) {
              _err = this._error("ECACHEFULL");
              throw _err;
            }
            for (i = 0, len = keyValueSet.length; i < len; i++) {
              keyValuePair = keyValueSet[i];
              ({ key, val, ttl } = keyValuePair);
              if (ttl && typeof ttl !== "number") {
                _err = this._error("ETTLTYPE");
                throw _err;
              }
              if ((err = this._isInvalidKey(key)) != null) {
                throw err;
              }
            }
            for (j = 0, len1 = keyValueSet.length; j < len1; j++) {
              keyValuePair = keyValueSet[j];
              ({ key, val, ttl } = keyValuePair);
              this.set(key, val, ttl);
            }
            return true;
          }
          del(keys) {
            var delCount, err, i, key, len, oldVal;
            boundMethodCheck(this, NodeCache3);
            if (!Array.isArray(keys)) {
              keys = [keys];
            }
            delCount = 0;
            for (i = 0, len = keys.length; i < len; i++) {
              key = keys[i];
              if ((err = this._isInvalidKey(key)) != null) {
                throw err;
              }
              if (this.data[key] != null) {
                this.stats.vsize -= this._getValLength(this._unwrap(this.data[key], false));
                this.stats.ksize -= this._getKeyLength(key);
                this.stats.keys--;
                delCount++;
                oldVal = this.data[key];
                delete this.data[key];
                this.emit("del", key, oldVal.v);
              }
            }
            return delCount;
          }
          take(key) {
            var _ret;
            boundMethodCheck(this, NodeCache3);
            _ret = this.get(key);
            if (_ret != null) {
              this.del(key);
            }
            return _ret;
          }
          ttl(key, ttl) {
            var err;
            boundMethodCheck(this, NodeCache3);
            ttl || (ttl = this.options.stdTTL);
            if (!key) {
              return false;
            }
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            if (this.data[key] != null && this._check(key, this.data[key])) {
              if (ttl >= 0) {
                this.data[key] = this._wrap(this.data[key].v, ttl, false);
              } else {
                this.del(key);
              }
              return true;
            } else {
              return false;
            }
          }
          getTtl(key) {
            var _ttl, err;
            boundMethodCheck(this, NodeCache3);
            if (!key) {
              return void 0;
            }
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            if (this.data[key] != null && this._check(key, this.data[key])) {
              _ttl = this.data[key].t;
              return _ttl;
            } else {
              return void 0;
            }
          }
          keys() {
            var _keys;
            boundMethodCheck(this, NodeCache3);
            _keys = Object.keys(this.data);
            return _keys;
          }
          has(key) {
            var _exists;
            boundMethodCheck(this, NodeCache3);
            _exists = this.data[key] != null && this._check(key, this.data[key]);
            return _exists;
          }
          getStats() {
            boundMethodCheck(this, NodeCache3);
            return this.stats;
          }
          flushAll(_startPeriod = true) {
            boundMethodCheck(this, NodeCache3);
            this.data = {};
            this.stats = {
              hits: 0,
              misses: 0,
              keys: 0,
              ksize: 0,
              vsize: 0
            };
            this._killCheckPeriod();
            this._checkData(_startPeriod);
            this.emit("flush");
          }
          flushStats() {
            boundMethodCheck(this, NodeCache3);
            this.stats = {
              hits: 0,
              misses: 0,
              keys: 0,
              ksize: 0,
              vsize: 0
            };
            this.emit("flush_stats");
          }
          close() {
            boundMethodCheck(this, NodeCache3);
            this._killCheckPeriod();
          }
          _checkData(startPeriod = true) {
            var key, ref, value;
            boundMethodCheck(this, NodeCache3);
            ref = this.data;
            for (key in ref) {
              value = ref[key];
              this._check(key, value);
            }
            if (startPeriod && this.options.checkperiod > 0) {
              this.checkTimeout = setTimeout(this._checkData, this.options.checkperiod * 1e3, startPeriod);
              if (this.checkTimeout != null && this.checkTimeout.unref != null) {
                this.checkTimeout.unref();
              }
            }
          }
          // ## _killCheckPeriod
          // stop the checkdata period. Only needed to abort the script in testing mode.
          _killCheckPeriod() {
            if (this.checkTimeout != null) {
              return clearTimeout(this.checkTimeout);
            }
          }
          _check(key, data) {
            var _retval;
            boundMethodCheck(this, NodeCache3);
            _retval = true;
            if (data.t !== 0 && data.t < Date.now()) {
              if (this.options.deleteOnExpire) {
                _retval = false;
                this.del(key);
              }
              this.emit("expired", key, this._unwrap(data));
            }
            return _retval;
          }
          _isInvalidKey(key) {
            var ref;
            boundMethodCheck(this, NodeCache3);
            if (ref = typeof key, indexOf.call(this.validKeyTypes, ref) < 0) {
              return this._error("EKEYTYPE", {
                type: typeof key
              });
            }
          }
          _wrap(value, ttl, asClone = true) {
            var livetime, now, oReturn, ttlMultiplicator;
            boundMethodCheck(this, NodeCache3);
            if (!this.options.useClones) {
              asClone = false;
            }
            now = Date.now();
            livetime = 0;
            ttlMultiplicator = 1e3;
            if (ttl === 0) {
              livetime = 0;
            } else if (ttl) {
              livetime = now + ttl * ttlMultiplicator;
            } else {
              if (this.options.stdTTL === 0) {
                livetime = this.options.stdTTL;
              } else {
                livetime = now + this.options.stdTTL * ttlMultiplicator;
              }
            }
            return oReturn = {
              t: livetime,
              v: asClone ? clone(value) : value
            };
          }
          // ## _unwrap
          // internal method to extract get the value out of the wrapped value
          _unwrap(value, asClone = true) {
            if (!this.options.useClones) {
              asClone = false;
            }
            if (value.v != null) {
              if (asClone) {
                return clone(value.v);
              } else {
                return value.v;
              }
            }
            return null;
          }
          // ## _getKeyLength
          // internal method the calculate the key length
          _getKeyLength(key) {
            return key.toString().length;
          }
          _getValLength(value) {
            boundMethodCheck(this, NodeCache3);
            if (typeof value === "string") {
              return value.length;
            } else if (this.options.forceString) {
              return JSON.stringify(value).length;
            } else if (Array.isArray(value)) {
              return this.options.arrayValueSize * value.length;
            } else if (typeof value === "number") {
              return 8;
            } else if (typeof (value != null ? value.then : void 0) === "function") {
              return this.options.promiseValueSize;
            } else if (typeof Buffer !== "undefined" && Buffer !== null ? Buffer.isBuffer(value) : void 0) {
              return value.length;
            } else if (value != null && typeof value === "object") {
              return this.options.objectValueSize * Object.keys(value).length;
            } else if (typeof value === "boolean") {
              return 8;
            } else {
              return 0;
            }
          }
          _error(type, data = {}) {
            var error;
            boundMethodCheck(this, NodeCache3);
            error = new Error();
            error.name = type;
            error.errorcode = type;
            error.message = this.ERRORS[type] != null ? this.ERRORS[type](data) : "-";
            error.data = data;
            return error;
          }
          _initErrors() {
            var _errMsg, _errT, ref;
            boundMethodCheck(this, NodeCache3);
            this.ERRORS = {};
            ref = this._ERRORS;
            for (_errT in ref) {
              _errMsg = ref[_errT];
              this.ERRORS[_errT] = this.createErrorMessage(_errMsg);
            }
          }
          createErrorMessage(errMsg) {
            return function(args) {
              return errMsg.replace("__key", args.type);
            };
          }
        }
        ;
        NodeCache3.prototype._ERRORS = {
          "ENOTFOUND": "Key `__key` not found",
          "ECACHEFULL": "Cache max keys amount exceeded",
          "EKEYTYPE": "The key argument has to be of type `string` or `number`. Found: `__key`",
          "EKEYSTYPE": "The keys argument has to be an array.",
          "ETTLTYPE": "The ttl argument has to be a number."
        };
        return NodeCache3;
      }.call(this);
    }).call(exports2);
  }
});

// node_modules/.pnpm/node-cache@5.1.2/node_modules/node-cache/index.js
var require_node_cache2 = __commonJS({
  "node_modules/.pnpm/node-cache@5.1.2/node_modules/node-cache/index.js"(exports2, module2) {
    (function() {
      var exports3;
      exports3 = module2.exports = require_node_cache();
      exports3.version = "5.1.2";
    }).call(exports2);
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  plugin: () => plugin
});
module.exports = __toCommonJS(src_exports);
var import_op_js = __toESM(require_dist());

// src/cache.ts
var import_node_cache = __toESM(require_node_cache2());
var cache = new import_node_cache.default({ stdTTL: 60 * 60 });
function writeEntry(ref, value) {
  return cache.set(ref, value);
}
function getEntry(ref) {
  return cache.get(ref);
}
function opCliInstalled() {
  return cache.get("opCliInstalled");
}
function writeOpCliInstalled(installed) {
  return cache.set("opCliInstalled", installed);
}
function setStdTTL(ttl) {
  cache.options.stdTTL = ttl;
}

// src/index.ts
var import_node_fs = __toESM(require("node:fs"));
var import_path = __toESM(require("path"));
var config;
var plugin = {
  templateFunctions: [{
    name: "1Password",
    args: [
      { label: "Reference", placeholder: "op://vault-name/item-name/[section-name/]field-name", type: "text", name: "path" },
      { label: "Account", placeholder: "value from config", optional: true, type: "text", name: "account" }
    ],
    async onRender(_ctx, args) {
      if (!args.values.path) return "noPath";
      if (!config) {
        try {
          await loadConfig();
        } catch (err) {
          return err.toString();
        }
      }
      try {
        return await fetchEntry(args.values.path, args.values.account);
      } catch (err) {
        return err.toString();
      }
    }
  }]
};
async function loadConfig() {
  const configJson = await import_node_fs.default.promises.readFile(import_path.default.resolve(__dirname, "config.json"), "utf-8");
  config = JSON.parse(configJson);
  if (config?.flags) {
    (0, import_op_js.setGlobalFlags)(config.flags);
  }
  if (typeof config?.cacheTTL === "number") {
    setStdTTL(config.cacheTTL);
  }
  await checkCli(config?.cliPath);
}
async function checkCli(cliPath) {
  if (opCliInstalled() !== true) {
    try {
      if (cliPath && !import_node_fs.default.existsSync(cliPath)) {
        throw new Error(`The file at path ${cliPath} does not exist.`);
      }
      let pathToAdd = cliPath;
      if (cliPath) {
        const stats = import_node_fs.default.statSync(cliPath);
        if (stats.isFile()) {
          pathToAdd = import_path.default.dirname(cliPath);
        }
      }
      process.env.PATH = pathToAdd ? `${pathToAdd}:${process.env.PATH}` : process.env.PATH;
      await (0, import_op_js.validateCli)();
      writeOpCliInstalled(true);
    } catch (e) {
      const error = new Error(
        `There was an issue with the 1Password CLI. If you have the op CLI installed using e.g. Homebrew, please set the '__op_plugin.cliPath' environment variable to the directory containing the 'op' binary. (e.g. /opt/homebrew/bin/op). Error details: ${e.message}`
      );
      error.stack = e.stack;
      throw error;
    }
  }
}
async function fetchEntry(ref, account2) {
  const existing = getEntry(ref);
  if (existing) {
    return existing;
  }
  const args = {
    account: account2 ?? config.defaultAccount
  };
  ref = ref.replace(/^"|"$/g, "");
  const entry = import_op_js.read.parse(ref, args);
  writeEntry(ref, entry);
  return entry;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  plugin
});
