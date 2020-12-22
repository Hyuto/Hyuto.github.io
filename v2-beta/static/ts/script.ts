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

    public static fillContent(content:string, url:string) : void{
        const container:HTMLElement = document.createElement('div');
        const head:HTMLElement = document.createElement('h1');
        const div:HTMLElement = document.createElement('div');
        //Set content
        head.innerHTML = `<a href="${url}">${content}</a>`;
        div.innerHTML = `<img src="https://raw.githubusercontent.com/Hyuto/notebooks/master/Machine-Translation-EN-JP-Seq2seq-TF/WC_English.png" />
                         <p>Mau ngetest</p>
                         <a href="${url}">Readmore ..</a>`;
        container.appendChild(head);
        container.appendChild(div);
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

    async loader(){
        const temp : Array<Promise<any>> = new Array();
        document.querySelectorAll('img').forEach((element) => {
            temp.push(new Promise(resolve => {
                element.onload = () => {
                    resolve('resolved');
                }
            }))
        })
        return Promise.all(temp);
    }

    // Auto when start page
    start() : void{
        // Set Content
        this.data = this.GetData(this.url);
        this.data.then((e) => {
            e.forEach(element => {
                // Inject to Body
                HomepageView.fillContent(element.name, element.url);
            });
        }).then((e) => {
            // set loader
            this.loader().then((e) => {
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
const Homepageview : HomepageView = new HomepageView("https://hyuto.github.io/notebooks/API/API.json");
Homepageview.start();

window.addEventListener('resize', () : void => {
    Homepageview.placeFooter();
})

window.addEventListener('scroll', () : void => {
    Homepageview.navMove();
});