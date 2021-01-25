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
import { View } from './view.js';
var HomeView = /** @class */ (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeView.prototype.start = function () {
    };
    return HomeView;
}(View));
var body = document.getElementById('body');
var foot = document.getElementById('foot');
var nav = document.getElementById('nav');
var nav_move;
var Home = new HomeView(body, foot, nav, nav_move);
Home.start();
