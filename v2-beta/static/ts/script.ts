// Main
// Document Element
const body:any = document.getElementById('body');
const foot:any = document.getElementById('foot');
const nav:any = document.getElementById('nav');
let nav_move:any;

// View 
class View{

    // Footer Placing : Responsive
    placeFooter() : void{
        if(body.offsetTop + body.offsetHeight + foot.offsetHeight > window.innerHeight){
            foot.style.bottom = "unset";
        }else{
            foot.style.bottom = "0";
        }
    }

    // Moving nav when scroll
    navMove() : void{
        if(window.scrollY > nav.offsetTop){
            nav_move.style.display = "block";
        }else{
            nav_move.style.display = "none";
        }
    }

    // Auto when start page
    start() : void{
        this.placeFooter();
        
        // Set moving Navbar
        const clone = nav.cloneNode(true);
        clone.id = "nav-move";
        document.getElementById('navigator').appendChild(clone);
        nav_move = document.getElementById('nav-move');

        this.navMove();
    }
}

// Init view and start
const view : View = new View();
view.start();

// Listener
window.addEventListener('resize', () : void => {
    view.placeFooter();
})

window.addEventListener('scroll', () : void => {
    view.navMove();
});