const  { google }  =  require ( 'googleapis' ) ;
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

async function ReadConfiguration() {
    await fs.readFileSync("configuration.ini",'utf-8',(error,data)=>{
        if(error){
            throw error;
        }else{
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
                refresh_token:REFRESH_TOKEN,
            });
        }
    });
}

async function SendMail(correo,body) {
    await ReadConfiguration();
    try{
        console.log("H1");

        //const {token} = await oAuth2Client.getAccessToken();
        const trasnporter = nodemailer.createTransport(
            {
                service:'gmail',
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
        const body = {
            from : MAIL,
            to:MAIL,
            text:'Hola mundo',
        };
        console.log("H2");

        const mail = await trasnporter.sendMail(body);
        console.log("H3");

        console.log(mail);
    }catch(e){
        console.log(e);
    }
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/mail', (req, res) => {
    (async () =>{
        await SendMail("olmancp95@gmail.com","hola mundo");
    })();
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor web escuchando en http://localhost:${port}`);
    console.log('Abre esta URL en tu navegador para ver la aplicación.');
});

