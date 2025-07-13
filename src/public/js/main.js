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
            scope.BuildContact();
        } else if (scope.ActualPageName == "donate") {
            scope.BuildDonate();
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
                scope.CardNews.Add(data[i], false, "", false);
            }
        });


        scope.Carousel();
        //scope.Size();
        //scope.SetSize();
    }

    BuildContact() {
        let scope = this;
        scope.BTSendContact = document.getElementById("btSendContact");
        scope.BTSendContact.onclick = () => {
            let name = document.getElementById("name").value;
            let phone = document.getElementById("phone").value;
            let mail = document.getElementById("mail").value;
            let message = document.getElementById("message").value;

            if (name !== "" && phone !== "" && message !== "") {
                let data = {
                    "name": name,
                    "mail": mail,
                    "phone": phone,
                    "message":message,
                    "type":"contact"
                };
                scope.SendMail("/api/sendmail", data).then((data) => {
                    console.log(data);
                    var dialog = new Messi('El correo se envio correctamente.Espere a que una persona se comunique con usted.', { title: 'Correo enviado.' });
                }, () => {
                    var dialog = new Messi(
                        'El correo no se logro enviar.',
                        {
                            title: 'Fallo al enviar el correo.',
                            titleClass: 'anim error'
                        }
                    );
                })
            } else {
                var dialog = new Messi(
                    'Debe llenar los datos.',
                    {
                        title: 'Error.',
                        titleClass: 'anim error'
                    }
                );
            }


        };

    }

    BuildDonate() {
        let scope = this;
        scope.BTSendDonate = document.getElementById("btSendDonate");
        scope.BTSendDonate.onclick = () => {
            let name = document.getElementById("name").value;
            let phone = document.getElementById("phone").value;
            let mail = document.getElementById("mail").value;
            let message = document.getElementById("message").value;

            if (name !== "" && phone !== "" && message !== "") {
                let data = {
                    "name": name,
                    "mail": mail,
                    "phone": phone,
                    "message":message,
                    "type":"donate"
                };
                scope.SendMail("/api/sendmail", data).then((data) => {
                    console.log(data);
                    var dialog = new Messi('El correo se envio correctamente.Espere a que una persona se comunique con usted.', { title: 'Correo enviado.' });
                }, () => {
                    var dialog = new Messi(
                        'El correo no se logro enviar.',
                        {
                            title: 'Fallo al enviar el correo.',
                            titleClass: 'anim error'
                        }
                    );
                })
            } else {
                var dialog = new Messi(
                    'Debe llenar los datos.',
                    {
                        title: 'Error.',
                        titleClass: 'anim error'
                    }
                );
            }


        };
    }

    BuildServices() {
        let scope = this;

        scope.CardActivities = new window.Card("divActivities");
        scope.CardActivities.Build();


        scope.ReadFile("/json/activities.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardActivities.Add(data[i], true, "Contactar", false);
            }
        });
        //scope.Size();
        //scope.SetSize();

    }

    BuildTrajectory() {
        let scope = this;

        scope.CardTesis = new window.Card("divTesis");
        scope.CardTesis.Build();


        scope.ReadFile("/json/thesis.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardTesis.Add(data[i], true, "Ver documento", true);
            }
        });

        scope.CardColaborations = new window.Card("divColaborations");
        scope.CardColaborations.Build();
        scope.ReadFile("/json/colaborations.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardColaborations.Add(data[i], false, "", false);
            }
        });

        scope.CardProjects = new window.Card("divProjects");
        scope.CardProjects.Build();
        scope.ReadFile("/json/projects.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardProjects.Add(data[i], true, "Conocer más", true);
            }
        });

        scope.CardTechniques = new window.Card("divTechniques");
        scope.CardTechniques.Build();
        scope.ReadFile("/json/techniques.json").then((data) => {
            for (let i = 0; i < data.length; i++) {
                scope.CardTechniques.Add(data[i], true, "Ver documento", true);
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


    SendMail(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (datosRespuesta) {
                    resolve(datosRespuesta);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Rechaza la promesa con un objeto de error más descriptivo
                    reject({
                        jqXHR: jqXHR,
                        textStatus: textStatus,
                        errorThrown: errorThrown,
                        message: `Error al enviar datos: ${textStatus} - ${errorThrown || jqXHR.responseText}`
                    });
                }
            });
        });
    }

    Carousel() {
        let scope = this;
        const myCarouselElement = document.querySelector('#carouselExampleIndicators');
        const carousel = new bootstrap.Carousel(myCarouselElement, {
            interval: 5000,
            pause: false
        });

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