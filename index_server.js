const { request, response } = require("express");
const express = require("express");
var nodemailer = require('nodemailer');

//LOG 
var fs = require('fs');
var util = require('util');


// mailer transport
var mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nchadaly@gmail.com',
        pass: 'nelsonchad123'
    }
});

// Options
var mailOptions = {
    from: 'nchadaly@gmail.com',
    to: 'nchadaly@soquelasports.com',
    subject: 'Enviando email usando Node.js',
    text: 'Email a ser enviado pelo Node.js!'
};



/*mailer.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});*/

/**
 * method to create log (console.log)
 */

function startLogger() {
    var logFile = fs.createWriteStream('log.log', { flags: 'a' });
    // Or 'w' to truncate the file every time the process starts.
    var logStdout = process.stdout;

    console.log = function () {
        logFile.write(util.format.apply(null, arguments) + '\n');
        logStdout.write(util.format.apply(null, arguments) + '\n');
    }
    console.error = console.log;

}

/**
 * Send the amail
 */
function sendEmail() {
    var datetime = new Date(); //Date

    //send email 
    mailer.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(datetime.toDateString(), ': enviando Email:', info.response, ' as ', datetime.toTimeString().slice(0, 8));

        }
    });

    startLogger(); //start the logger function
}
setInterval(sendEmail, 10 * 1000); //execute ever 10 sec

// start a express server 
const app = express();
app.get('/', (request, response) => {
    console.log("Servidor iniciado!")
    return response.send('node running!');
})

app.listen(3333);