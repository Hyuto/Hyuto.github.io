// Main
// Document Element
const body:any = document.getElementById('body');
const foot:any = document.getElementById('foot');
const nav:any = document.getElementById('nav');
let nav_move:any;

// View 
class View{
    url:string;
    data:any;

    constructor(url:string){
        this.url = url;
    }

    GetData = async (url:string) => {
        const data = await fetch(url).then((res) => {
            return res.json();
        });
        return data;
    }

    public static fillContent(content:string, url:string) : void{
        const container:any = document.createElement('div');
        const head:any = document.createElement('h1');
        const text:any = document.createElement('p');
        //Set content
        head.innerText = content;
        text.innerHTML = `link : <a href="${url}">${content}</a>`
        container.appendChild(head);
        container.appendChild(text);
        container.className = 'box box-1';
        //Inject to body
        body.appendChild(container);
    }

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
        // Set Content
        this.data = this.GetData(this.url);
        this.data.then((e) => {
            e.forEach(element => {
                // Inject to Body
                View.fillContent(element.name, element.url);
            });
        }).then(() => {
            // Place footer
            this.placeFooter();
        
            // Set moving Navbar
            const clone = nav.cloneNode(true);
            clone.id = "nav-move";
            document.getElementById('navigator').appendChild(clone);
            nav_move = document.getElementById('nav-move');
            // Placement
            this.navMove();
        });
    }
}

// Init view and start
const view : View = new View("https://hyuto.github.io/notebooks/API/API.json");
view.start();

// Listener
window.addEventListener('resize', () : void => {
    view.placeFooter();
})

window.addEventListener('scroll', () : void => {
    view.navMove();
});