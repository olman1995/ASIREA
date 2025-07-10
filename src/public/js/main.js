window.Main = class{

    constructor(actualPageName){
        this.ActualPageName = actualPageName;
    }
    Build(){
        let scope = this;

        scope.BuildHamburgerMenu();
        scope.HamburgerMenu();

        if( scope.actualPageName == "home"){

        }else if(scope.actualPageName == "contact"){

        }else if(scope.actualPageName == "donate"){

        }else if(scope.actualPageName == "services"){

        }else if(scope.actualPageName == "trajectory"){

        }else if(scope.actualPageName == "whoAreWe"){

        }


    }

    BuildHamburgerMenu(){
        let scope = this;
       scope.HamburgerMenuButton = document.getElementById("hamburgerMenuButton");
        scope.HamburgerMenuDiv = document.getElementById("hamburgerMenu");
    }

    BuildHome(){
        let scope = this;
        scoep.DivNews = document.getElementById("divNews");
        scope.Carousel();
        scope.Size();
        scope.SetSize();
    }
    
    BuildContact(){

    }
    
    BuildDonate(){

    }
    
    BuildServices(){

    }
    
    BuildTrajectory(){

    }
    
    BuildWhoAreWe(){

    }
    

    HamburgerMenu(){
        let scope = this;
        scope.HamburgerMenuButton.onclick = ()=>{
            window.scrollTo(0, 0);
            if(scope.HamburgerMenuDiv.hasAttribute("active")){
                scope.HamburgerMenuDiv.removeAttribute("active");
            }else{
                scope.HamburgerMenuDiv.setAttribute("active","active");
            }

        }

    }

    SetSize(){
        let scope = this;
        let style = "width:"+window.innerWidth+";";
        this.DivNews.setAttribute("style",style)

    }
    Size(){
        let scope = this;
        window.onresize = ()=>{
            scope.SetSize();
        }
    }
    Carousel(){
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
}

