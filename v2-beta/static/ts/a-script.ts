import { View } from './view.js';

class HomeView extends View{
    start(){
        this._ContentPlacement();
    }
}

const body:HTMLElement = document.getElementById('body');
const foot:HTMLElement = document.getElementById('foot');
const nav:HTMLElement = document.getElementById('nav');
let nav_move:any;

const Home: HomeView = new HomeView(body, foot, nav, nav_move);
Home.start();