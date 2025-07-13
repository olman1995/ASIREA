window.Card = class {
    constructor(id){
        this.Body = document.getElementById(id);

    }

    Build(){

        let scope = this;

        scope.Body.innerHTML = "";

        scope.Body.classList = [];

        scope.Body.classList.add("ccards");

        scope.SizeUpdateEvent();
        scope.Event();
    }

    SizeUpdateEvent(){
        let scope = this;
        let width = window.outerWidth < window.innerWidth? window.outerWidth: window.innerWidth;
        let height = 425;
        let style = "width:"+width+"px; height:"+height+"px;";
        scope.Body.setAttribute("style",style);
    }

    Add(data,isBoton,textBoton,isTargetBlank){
        let scope = this;
        let card = document.createElement("div");
        card.classList.add("ccard");

        let cardHead = document.createElement("div");
        let cardBody = document.createElement("div");
        let cardFoot = document.createElement("div");

        cardHead.innerHTML = data.title;

        

        let cardImg = document.createElement("img");
        let cardText = document.createElement("div");

        cardImg.setAttribute("src",data.img);
        cardText.innerHTML = data.text;

        cardImg.classList.add("ccardimg");
        cardText.classList.add("ccardtext");
        
        cardHead.classList.add("ccardhead");
        
        cardBody.classList.add("ccardbody");
        cardFoot.classList.add("ccardfoot");

        cardBody.appendChild(cardImg);
        cardBody.appendChild(cardText);
        
        if(isBoton){
            let ccarda = document.createElement("a");
            ccarda.innerHTML = textBoton;
            ccarda.setAttribute("href",data.link);
            if(isTargetBlank){
                ccarda.setAttribute("target","_blank");
            }
            ccarda.classList.add("ccarda");
            cardFoot.appendChild(ccarda);
        }


        cardBody.onmouseover = scope.MouseOverEvent();
        cardBody.onmouseout = scope.MouseOutEvent();
        card.appendChild(cardHead);
        card.appendChild(cardBody);
        card.appendChild(cardFoot);

        scope.Body.appendChild(card);
    }

    MouseOverEvent(){
        let scope = this;
        return (e)=>{
            let t = e.currentTarget;
            let d = t.querySelector(".ccardtext");
            d.classList.add("animationin");
            d.classList.remove("animationout");
        }
    }

    MouseOutEvent(){
        let scope = this;
        return (e)=>{
            let t = e.currentTarget;
            let d = t.querySelector(".ccardtext");
            d.classList.add("animationout");
            d.classList.remove("animationin");
        }
    }

    Event(){
        let scope = this;
        if(window.visualViewport){
            window.visualViewport.addEventListener("resize",()=>{
                scope.SizeUpdateEvent();
            });
        }else{
            window.addEventListener("resize",()=>{
                scope.SizeUpdateEvent();
            });
        }

    }

}