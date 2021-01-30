var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var View = /** @class */ (function () {
    function View(body, foot, nav, nav_move) {
        var _this = this;
        this.GetData = function (url) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url).then(function (res) {
                            return res.json();
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.body = body;
        this.foot = foot;
        this.nav = nav;
        this.nav_move = nav_move;
    }
    // Footer Placing : Responsive
    View.prototype.placeFooter = function () {
        var heigh_left = window.innerHeight - (this.body.offsetTop +
            this.body.offsetHeight + this.foot.offsetHeight);
        if (heigh_left > 0) {
            this.body.style.minHeight = this.body.offsetHeight + heigh_left - 10 + "px";
        }
        else {
            this.body.style.height = "unset";
        }
    };
    // Moving nav when scroll
    View.prototype.navMove = function () {
        if (window.scrollY > this.nav.offsetTop) {
            this.nav_move.style.display = "block";
        }
        else {
            this.nav_move.style.display = "none";
        }
    };
    View.prototype.loader = function (winO) {
        return __awaiter(this, void 0, void 0, function () {
            var temp;
            return __generator(this, function (_a) {
                temp = new Array();
                document.querySelectorAll(winO).forEach(function (element) {
                    temp.push(new Promise(function (resolve) {
                        element.onload = function () {
                            resolve('resolved');
                        };
                    }));
                });
                return [2 /*return*/, Promise.all(temp)];
            });
        });
    };
    View.prototype._ContentPlacement = function (watch) {
        var _this = this;
        if (watch === void 0) { watch = 'img'; }
        this.loader(watch).then(function (e) {
            // Place footer
            _this.placeFooter();
            // Set Nav
            _this.navMove();
        })
            .then(function (e) {
            document.getElementById('loader').style.display = 'none';
            document.querySelector('html').style.overflow = 'visible';
        });
    };
    return View;
}());
function CloneElement(element, id, to) {
    var clone = element.cloneNode(true);
    clone.id = id;
    document.getElementById(to).appendChild(clone);
    return document.getElementById(id);
}
export { View, CloneElement };
