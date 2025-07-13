window.Main = class{

    constructor(){
        this.TestCard = new window.Card("testCard"); 
        this.TestCard2 = new window.Card("testCard2"); 
    }

    Build(){

        let scope = this;
        scope.TestCard.Build();
        scope.TestCard2.Build();
        let data = {
            "title":"Test",
            "img":"/image/img.jpg",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "link": "./asd",
        }
        for(let i= 0 ; i < 15 ; i++){
            scope.TestCard.Add(data);
            scope.TestCard2.Add(data);
        }
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    let main = new window.Main();
    main.Build();
});