class View{
    body: HTMLElement;
    foot: HTMLElement;
    nav: HTMLElement;
    nav_move: any;

    constructor(body: HTMLElement, foot: HTMLElement, nav: HTMLElement, nav_move){
        this.body = body;
        this.foot = foot;
        this.nav = nav;
        this.nav_move = nav_move;
    }

    GetData = async (url:string) : Promise<any> => {
        return await fetch(url).then((res) => {
            return res.json();
        });
    }

    // Footer Placing : Responsive
    placeFooter() : void{
        const heigh_left : number = window.innerHeight - (this.body.offsetTop + 
            this.body.offsetHeight + this.foot.offsetHeight);
        if(heigh_left > 0){
            this.body.style.minHeight = `${this.body.offsetHeight + heigh_left - 10}px`;
        }else{
            this.body.style.height = `unset`
        }
    }

    // Moving nav when scroll
    navMove() : void{
        if(window.scrollY > this.nav.offsetTop){
            this.nav_move.style.display = "block";
        }else{
            this.nav_move.style.display = "none";
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

    _ContentPlacement(watch: string = 'img'): void{
        this.loader(watch).then((e) => {
            // Place footer
            this.placeFooter();
            // Set Nav
            this.navMove();
        })
        .then((e) => {
            document.getElementById('loader').style.display = 'none';
            document.querySelector('html').style.overflow = 'visible';
        });
    }
}

function CloneElement(element: HTMLElement, id:string ,to:string): HTMLElement{
    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = id;
    clone.querySelector(".hamburger").id = "hamburger-moving";
    clone.querySelector(".content").id = "content-moving";
    document.getElementById(to).appendChild(clone);
    return document.getElementById(id);
}

export { View, CloneElement }