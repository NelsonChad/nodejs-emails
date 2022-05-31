/**
 * DESC: create a app that send email ever 10 min and save a log file
 * By: Nelon Oraibo Chadaly
 */

var nodemailer = require('nodemailer'); //email lib
var fs = require('fs'); //file system lib
var util = require('util'); //util lib

// mailer transport
var mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nchadaly@gmail.com',
        pass: 'password'
    }
});

// Options
var mailOptions = {
    from: 'nchadaly@gmail.com',
    to: 'destine email',
    //to: 'nchadaly@soquelasports.com',
    subject: 'E-mail usando Node.js',
    text: 'Saudações, Este email foi enviado pelo Node.js!'
};

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
            console.log(datetime.toDateString(),': Erro:',error);
        } else {
            console.log(datetime.toDateString(),': Email enviado - status:', info.response, ' Hora: ', datetime.toTimeString().slice(0, 8));
        }
    });
    startLogger(); //start the logger function
}
setInterval(sendEmail, 600000); //execute ever 10 min (10 * 60 * 1000 = 600000)