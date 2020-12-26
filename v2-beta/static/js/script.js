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
// Main
// Document Element
var body = document.getElementById('body');
var foot = document.getElementById('foot');
var nav = document.getElementById('nav');
var nav_move;
// View 
var HomepageView = /** @class */ (function () {
    function HomepageView(url) {
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
        this.url = url;
    }
    HomepageView.fillContent = function (element) {
        var container = document.createElement('div');
        var head = document.createElement('h1');
        var div = document.createElement('div');
        var IMG = element.IMG ? "<img src=\"" + element.IMG + "\" />'" : ' ';
        //Set content
        head.innerHTML = "<a href=\"" + element.url + "\">" + element.Title + "</a>";
        div.innerHTML = "<div class=\"image\">\n                            " + IMG + "\n                         </div>\n                         <p>" + element.SYNOPSIS + "</p>\n                         <a href=\"" + element.url + "\">Readmore</a>";
        container.appendChild(head);
        container.appendChild(div);
        container.className = 'box box-1';
        //Inject to body
        body.appendChild(container);
    };
    // Footer Placing : Responsive
    HomepageView.prototype.placeFooter = function () {
        var heigh_left = window.innerHeight - (body.offsetTop + body.offsetHeight + foot.offsetHeight);
        if (heigh_left > 0) {
            body.style.height = body.offsetHeight + heigh_left - 10 + "px";
        }
        else {
            body.style.height = "unset";
        }
    };
    // Moving nav when scroll
    HomepageView.prototype.navMove = function () {
        if (window.scrollY > nav.offsetTop) {
            nav_move.style.display = "block";
        }
        else {
            nav_move.style.display = "none";
        }
    };
    HomepageView.prototype.loader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var temp;
            return __generator(this, function (_a) {
                temp = new Array();
                document.querySelectorAll('img').forEach(function (element) {
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
    // Auto when start page
    HomepageView.prototype.start = function () {
        var _this = this;
        // Set Content
        this.data = this.GetData(this.url);
        this.data.then(function (e) {
            e.forEach(function (element) {
                // Inject to Body
                HomepageView.fillContent(element);
            });
        }).then(function (e) {
            // set loader
            _this.loader().then(function (e) {
                // Place footer
                _this.placeFooter();
                // Set moving Navbar
                var clone = nav.cloneNode(true);
                clone.id = "nav-move";
                document.getElementById('navigator').appendChild(clone);
                nav_move = document.getElementById('nav-move');
                // Placement
                _this.navMove();
                document.getElementById('loader').style.display = 'none';
            });
        });
    };
    return HomepageView;
}());
// Init view and start
var View = new HomepageView("https://hyuto.github.io/notebooks/API.json");
View.start();
window.addEventListener('resize', function () {
    View.placeFooter();
});
window.addEventListener('scroll', function () {
    View.navMove();
});
