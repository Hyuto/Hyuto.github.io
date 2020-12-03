// Main
// Document Element
var body = document.getElementById('body');
var foot = document.getElementById('foot');
var nav = document.getElementById('nav');
var nav_move;
// View 
var View = /** @class */ (function () {
    function View() {
    }
    // Footer Placing : Responsive
    View.prototype.placeFooter = function () {
        if (body.offsetTop + body.offsetHeight + foot.offsetHeight > window.innerHeight) {
            foot.style.bottom = "unset";
        }
        else {
            foot.style.bottom = "0";
        }
    };
    // Moving nav when scroll
    View.prototype.navMove = function () {
        if (window.scrollY > nav.offsetTop) {
            nav_move.style.display = "block";
        }
        else {
            nav_move.style.display = "none";
        }
    };
    // Auto when start page
    View.prototype.start = function () {
        this.placeFooter();
        // Set moving Navbar
        var clone = nav.cloneNode(true);
        clone.id = "nav-move";
        document.getElementById('navigator').appendChild(clone);
        nav_move = document.getElementById('nav-move');
        this.navMove();
    };
    return View;
}());
// Init view and start
var view = new View();
view.start();
// Listener
window.addEventListener('resize', function () {
    view.placeFooter();
});
window.addEventListener('scroll', function () {
    view.navMove();
});
