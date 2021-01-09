// Main
// Document Element
const body:HTMLElement = document.getElementById('body');
const foot:HTMLElement = document.getElementById('foot');
const nav:HTMLElement = document.getElementById('nav');
let nav_move:any;

// View 
class HomepageView{
    url:string;
    data:Promise<any>;

    constructor(url:string){
        this.url = url;
    }

    GetData = async (url:string) : Promise<any> => {
        return await fetch(url).then((res) => {
            return res.json();
        });
    }

    public static fillContent(element) : void{
        const container:HTMLElement = document.createElement('div');
        const head:HTMLElement = document.createElement('h1');
        const div:HTMLElement = document.createElement('div');

        const IMG : string = element.IMG ? `<img src="${element.IMG}" />'` : ' ';
        //Set content
        head.innerHTML = `<a href="${element.url}">${element.Title}</a>`;
        div.innerHTML = `<div class="image">
                            ${IMG}
                         </div>
                         <p>${element.SYNOPSIS}</p>
                         <a href="${element.url}">Readmore</a>`;
        container.appendChild(head);
        container.appendChild(div);
        container.className = 'box box-1';
        //Inject to body
        body.appendChild(container);
    }

    // Footer Placing : Responsive
    placeFooter() : void{
        const heigh_left : number = window.innerHeight - (body.offsetTop + body.offsetHeight + foot.offsetHeight);
        if(heigh_left > 0){
            body.style.height = `${body.offsetHeight + heigh_left - 10}px`;
        }else{
            body.style.height = `unset`
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

    async loader(winO: any){
        const temp : Array<Promise<any>> = new Array();
        document.querySelectorAll(winO).forEach((element) => {
            temp.push(new Promise(resolve => {
                element.onload = () => {
                    resolve('resolved');
                }
            }))
        })
        return Promise.all(temp);
    }

    // Auto when start page
    start(watch: string = 'img') : void{
        // Set Content
        this.data = this.GetData(this.url);
        this.data.then((e) => {
            e.forEach(element => {
                // Inject to Body
                HomepageView.fillContent(element);
            });
        }).then((e) => {
            // set loader
            this.loader(watch).then((e) => {
                // Place footer
                this.placeFooter();

                // Set moving Navbar
                const clone = nav.cloneNode(true) as HTMLElement;
                clone.id = "nav-move";
                document.getElementById('navigator').appendChild(clone);
                nav_move = document.getElementById('nav-move');
                // Placement
                this.navMove();

                document.getElementById('loader').style.display = 'none';
            });
        })
    }
}

// Init view and start
const View : HomepageView = new HomepageView("https://hyuto.github.io/notebooks/API.json");
View.start();

window.addEventListener('resize', () : void => {
    View.placeFooter();
})

window.addEventListener('scroll', () : void => {
    View.navMove();
});