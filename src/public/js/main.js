window.Main = class {

    constructor(actualPageName) {
        this.ActualPageName = actualPageName;
    }
    Build() {
        let scope = this;

        scope.BuildHamburgerMenu();
        scope.HamburgerMenu();

        if (scope.ActualPageName == "home") {
            scope.BuildHome();
        } else if (scope.ActualPageName == "contact") {

        } else if (scope.ActualPageName == "donate") {

        } else if (scope.ActualPageName == "services") {
            scope.BuildServices();
        } else if (scope.ActualPageName == "trajectory") {
            scope.BuildTrajectory();
        } else if (scope.ActualPageName == "whoAreWe") {

        }


    }

    BuildHamburgerMenu() {
        let scope = this;
        scope.HamburgerMenuButton = document.getElementById("hamburgerMenuButton");
        scope.HamburgerMenuDiv = document.getElementById("hamburgerMenu");
    }

    BuildHome() {
        let scope = this;
        scope.DivMain = document.getElementById("divNews");

        //scope.ReadFile("./json/news.json").then(()=>{},()=>{});

        scope.CardNews = new window.Card("divNews");
        scope.CardNews.Build();


        scope.ReadFile("/json/news.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardNews.Add(data[i]);
            }
        });


        scope.Carousel();
        //scope.Size();
        //scope.SetSize();
    }

    BuildContact() {

    }

    BuildDonate() {

    }

    BuildServices() {
        let scope = this;
        scope.DivMain = document.getElementById("divActivities");
        //scope.Size();
        //scope.SetSize();

    }

    BuildTrajectory() {
        let scope = this;

        scope.CardTesis = new window.Card("divTesis");
        scope.CardTesis.Build();


        scope.ReadFile("/json/thesis.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardTesis.Add(data[i]);
            }
        });

        scope.CardColaborations = new window.Card("divColaborations");
        scope.CardColaborations.Build();
        scope.ReadFile("/json/colaborations.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardColaborations.Add(data[i]);
            }
        });

        scope.CardProjects = new window.Card("divProjects");
        scope.CardProjects.Build();
        scope.ReadFile("/json/projects.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardProjects.Add(data[i]);
            }
        });

        scope.CardTechniques = new window.Card("divTechniques");
        scope.CardTechniques.Build();
        scope.ReadFile("/json/techniques.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardTechniques.Add(data[i]);
            }
        });

    }

    BuildWhoAreWe() {

    }


    HamburgerMenu() {
        let scope = this;
        scope.HamburgerMenuButton.onclick = () => {
            window.scrollTo(0, 0);
            if (scope.HamburgerMenuDiv.hasAttribute("active")) {
                scope.HamburgerMenuDiv.removeAttribute("active");
            } else {
                scope.HamburgerMenuDiv.setAttribute("active", "active");
            }

        }

    }

    SetSize() {
        let scope = this;
        let size = window.outerWidth - 20;
        let style = "width:" + size + "px;";
        scope.DivMain.setAttribute("style", style);
        let cards = scope.DivMain.querySelectorAll(".ccard");

        let subSize = 375;
        if (window.outerWidth > 750) {
            subSize = Math.round(window.outerWidth / 4) - 10;
        }
        let subStyle = "width:" + subSize + "px !important; ";

        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            card.setAttribute("style", subStyle);
        }
    }
    Size() {
        let scope = this;
        window.onresize = () => {
            scope.SetSize();
        }
    }
    Carousel() {
        let scope = this;
        const myCarouselElement = document.querySelector('#carouselExampleIndicators');
        const carousel = new bootstrap.Carousel(myCarouselElement, {
            interval: 5000,
            pause: false
        });

        // const playPauseButton = document.getElementById('carouselPlayPause');
        // let isPaused = false; // Estado inicial: no pausado (el carrusel se mueve)

        // playPauseButton.addEventListener('click', function() {
        // if (isPaused) {
        //     carousel.cycle(); // Reinicia el ciclo automático
        //     playPauseButton.textContent = 'Pausar';
        // } else {
        //     carousel.pause(); // Pausa el ciclo automático
        //     playPauseButton.textContent = 'Reproducir';
        // }
        // isPaused = !isPaused; // Invierte el estado
        // });
    }

    async ReadFile(url) {

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error al cargar el JSON: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            return data;

        } catch (error) {
            return null;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let main = new window.Main(window.ActualPageName);
    main.Build();
});