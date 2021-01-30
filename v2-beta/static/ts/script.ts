import { View, CloneElement } from './view.js';

class HomeView extends View{
    start(){
        this._ContentPlacement();
    }
}

const body:HTMLElement = document.getElementById('body');
const foot:HTMLElement = document.getElementById('foot');
const nav:HTMLElement = document.getElementById('nav');
const nav_move:HTMLElement = CloneElement(nav, "nav-move", "navigator");

const Home: HomeView = new HomeView(body, foot, nav, nav_move);
Home.start();