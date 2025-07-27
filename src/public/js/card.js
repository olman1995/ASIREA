window.Card = class {
    constructor(id){
        this.Body = document.getElementById(id);
        this.ModalItem = document.getElementById("infoModal");
        this.Modal = new bootstrap.Modal(this.ModalItem);

        this.ModalP = document.getElementById("infoModalP");
        this.ModalImage = document.getElementById("infoModalImg");
        this.ModalTitle = document.getElementById("infoModalTitle");

        this.ModalClose = document.getElementById("infoModalClose");

    }

    Build(){

        let scope = this;

        scope.Body.innerHTML = "";

        scope.Body.classList = [];

        scope.Body.classList.add("ccards");
        
        scope.SizeUpdateEvent();
        scope.Event();

        scope.ModalClose.onclick = scope.ClickCardShowLess();
    }

    SizeUpdateEvent(){
        let scope = this;
        let width = window.outerWidth < window.innerWidth? window.outerWidth: window.innerWidth;
        let height = 500;
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
        let cardTextP = document.createElement("p");

        cardTextP.innerHTML =  data.text.length >= 75 ?  data.text.slice(0,75)+' ...' : data.text;
        
        cardText.appendChild(cardTextP);

        let cardTextBT = document.createElement("a"); 
        
        cardTextBT.innerHTML = "Mostras mas";

        cardTextBT.setAttribute("data-info",JSON.stringify(data));

        cardTextBT.classList.add("btn");
        cardTextBT.classList.add("btn-primary");
        cardTextBT.classList.add("active");
        cardTextBT.classList.add("ccarda");

        cardTextBT.onclick = scope.ClickCardShowMore();
        cardText.appendChild(cardTextBT);

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
            ccarda.classList.add("btn");
            ccarda.classList.add("btn-primary");
            ccarda.classList.add("active");
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

    ClickCardShowLess(){
        let scope = this;
        return ()=>{
            $(scope.ModalItem).modal('hide');
        }
    }
    ClickCardShowMore(){
        let scope = this;
        return (e) =>{
            let target = e.target;

            let data =JSON.parse (target.getAttribute("data-info"));
            console.log(data);
            scope.ModalTitle.innerHTML = data.title;
            scope.ModalImage.setAttribute("src", data.img);
            scope.ModalImage.classList.add("ccardimg");
            scope.ModalP.innerHTML =  data.text;
                        $(scope.ModalItem).modal('show');

        
        };

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