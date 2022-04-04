class View {
  body: HTMLElement;
  foot: HTMLElement;
  nav: HTMLElement;
  nav_move: any;

  constructor(body: HTMLElement, foot: HTMLElement, nav: HTMLElement, nav_move) {
    this.body = body;
    this.foot = foot;
    this.nav = nav;
    this.nav_move = nav_move;
  }

  // Get data from API
  GetData = async (url: string): Promise<any> => {
    return await fetch(url).then((res) => {
      return res.json();
    });
  };

  // Footer Placing : Responsive
  placeFooter(): void {
    const heigh_left: number =
      window.innerHeight - (this.body.offsetTop + this.body.offsetHeight + this.foot.offsetHeight);
    if (heigh_left > 0) {
      this.body.style.minHeight = `${this.body.offsetHeight + heigh_left - 10}px`;
    } else {
      this.body.style.height = `unset`;
    }
  }

  // Moving nav when scroll
  navMove(): void {
    const content: HTMLElement = this.nav.querySelector(".content");
    const content_1: HTMLElement = this.nav_move.querySelector(".content");

    if (window.scrollY > this.nav.offsetTop) {
      this.nav_move.style.display = "block";
      if (content.style.display == "flex" && window.innerWidth <= 600) {
        content.style.display = "none";
        content_1.style.display = "flex";
      }
    } else {
      this.nav_move.style.display = "none";
      if (content_1.style.display == "flex" && window.innerWidth <= 600) {
        content_1.style.display = "none";
        content.style.display = "flex";
      }
    }
  }

  // Async for loader to wait
  async loader(winO: any) {
    const temp: Array<Promise<any>> = new Array();
    document.querySelectorAll(winO).forEach((element) => {
      temp.push(
        new Promise((resolve) => {
          element.onload = () => {
            resolve("resolved");
          };
        })
      );
    });
    return Promise.all(temp);
  }

  // Hamburger Clicked Listener
  HamburgerListener(element: HTMLElement): void {
    const hamburger: HTMLElement = element.querySelector(".hamburger");
    hamburger.addEventListener("click", (): void => {
      const content: HTMLElement = element.querySelector(".content");
      content.style.display == "none" || content.style.display == ""
        ? (content.style.display = "flex")
        : (content.style.display = "none");
    });
  }

  // Avoiding nav error when window resized
  _NavResize(): void {
    const content: NodeListOf<HTMLElement> = document.querySelectorAll(".content");
    content.forEach((element: HTMLElement) => {
      if (window.innerWidth > 600 && element.style.display == "none")
        element.style.display = "flex";
      if (window.innerWidth <= 600 && element.style.display == "flex")
        element.style.display = "none";
    });
  }

  // Main Content Placement
  _ContentPlacement(watch: string = "img"): void {
    this.loader(watch)
      .then((e) => {
        // Place footer
        this.placeFooter();
        // Set Nav
        this.navMove();
      })
      .then((e) => {
        // Hamburger Listener
        this.HamburgerListener(this.nav);
        this.HamburgerListener(this.nav_move);
        // Close loader
        document.getElementById("loader").style.display = "none";
        document.querySelector("html").style.overflow = "visible";
      });
  }
}

function CloneElement(element: HTMLElement, id: string, to: string): HTMLElement {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.id = id;
  document.getElementById(to).appendChild(clone);
  return document.getElementById(id);
}

export { View, CloneElement };
