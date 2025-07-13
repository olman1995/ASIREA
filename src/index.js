const { google } = require('googleapis');
const express = require('express');
const fs = require('fs');
const nodemailer = require("nodemailer");



const path = require('path');
const Mail = require('nodemailer/lib/mailer');
const app = express();
const port = 3000;

var CLIENT_ID = '';
var CLIENT_SECRET = '';
var REDIRECT_URI = '';
var MAIL = '';
var REFRESH_TOKEN = '';
var oAuth2Client = null;

function ReadConfiguration() {
    fs.readFile("configuration.ini", 'utf-8', (error, data) => {
        if (error) {
            throw error;
        } else {
            const lines = data.split('\r\n');
            CLIENT_ID = lines[1].split('=')[1];
            CLIENT_SECRET = lines[2].split('=')[1];
            REDIRECT_URI = lines[3].split('=')[1];
            MAIL = lines[4].split('=')[1];
            REFRESH_TOKEN = lines[5].split('=')[1];
            const oAuth2Client = new google.auth.OAuth2(
                CLIENT_ID,
                CLIENT_SECRET,
                REDIRECT_URI
            );
            oAuth2Client.setCredentials({
                refresh_token: REFRESH_TOKEN,
            });
        }
    });

}
ReadConfiguration();

async function SendMail(subject, bodyText) {
    try {
        console.log("H1");
        const trasnporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: MAIL,
                    type: "OAuth2",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    //accessToken: token ?? undefined,
                },
                tls: { rejectUnauthorized: false },
            }
        );
        console.log(MAIL);
        const body = {
            from: MAIL,
            to: MAIL,
            subject: subject,
            text: "Datos de contacto.",
            html: bodyText,
        };
        console.log("H2");

        const mail = await trasnporter.sendMail(body);
        console.log("H3");

    } catch (e) {
        console.log(e);
    }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/mail', (req, res) => {
    (async () => {
        await SendMail("olmancp95@gmail.com", "hola mundo");
    })();
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/sendmail', (req, res) => {
    const data = req.body;
    let message = "Nombre:"+ data.name +"<br>"+
     "Email:"+ data.mail+"<br>"+
     "Telefono:"+ data.phone+"<br>"+
     "Mensage:"+ data.message+"<br>";
            (async () => {
                if(data.type === "contact"){
                    await SendMail("Nueva informacion de contacto.", message);

                }else{
                    await SendMail("Nueva informacion de donacion.", message);
                }
            })();
    res.status(200).json({
        message: 'OK',
        data: data
    });
});

app.listen(port, () => {
    console.log(`Servidor web escuchando en http://localhost:${port}`);
    console.log('Abre esta URL en tu navegador para ver la aplicación.');
});

