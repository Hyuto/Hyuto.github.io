import { View } from "./view.js";

class HomeView extends View{
    fillContent(element) : void{
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

    start(): void{
        const data = this.GetData("https://hyuto.github.io/notebooks/API.json");
        data.then((e) => {
            e.forEach((element) => {
                this.fillContent(element);
            })
        }).then((e) => {
            this._ContentPlacement('img');
        });
    }
}

// Main
// Document Element
const body:HTMLElement = document.getElementById('body');
const foot:HTMLElement = document.getElementById('foot');
const nav:HTMLElement = document.getElementById('nav');
let nav_move:any;

// Init view and start
const Home: HomeView = new HomeView(body, foot, nav, nav_move);
Home.start();

window.addEventListener('resize', () : void => {
    Home.placeFooter();
})

window.addEventListener('scroll', () : void => {
    Home.navMove();
});