window.Main = class{

    constructor(){
        this.DivNews = document.getElementById("divNews");
    }
    Build(){
        let scope = this;
        console.log("Hola mundo");
        scope.Carousel();
        scope.Size();
        scope.SetSize();
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

document.addEventListener('DOMContentLoaded', function() {
    let main = new window.Main();
    main.Build();
});