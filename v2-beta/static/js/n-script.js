var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { View, CloneElement } from "./view.js";
var NotebookView = /** @class */ (function (_super) {
    __extends(NotebookView, _super);
    function NotebookView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotebookView.prototype.fillContent = function (element) {
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
    NotebookView.prototype.start = function () {
        var _this = this;
        var data = this.GetData("https://hyuto.github.io/notebooks/API.json");
        data.then(function (e) {
            e.forEach(function (element) {
                _this.fillContent(element);
            });
        }).then(function (e) {
            _this._ContentPlacement('img');
        });
    };
    return NotebookView;
}(View));
// Main
// Document Element
var body = document.getElementById('body');
var foot = document.getElementById('foot');
var nav = document.getElementById('nav');
// Set moving Navbar
var nav_move = CloneElement(nav, "nav-move", "navigator");
// Init view and start
var Notebook = new NotebookView(body, foot, nav, nav_move);
Notebook.start();
window.addEventListener('resize', function () {
    Notebook.placeFooter();
});
window.addEventListener('scroll', function () {
    Notebook.navMove();
});
/* Listener for hamburger
const hamburger:NodeListOf<Element> = document.querySelectorAll('.hamburger');
hamburger.forEach((e) => {
    e.addEventListener('click', () => {
        const content:HTMLElement = document.querySelector('.content');
        content.style.display == 'none' ? content.style.display = 'flex' : content.style.display = 'none';
    })
}) */
