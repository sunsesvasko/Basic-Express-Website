const nodemailer = require('nodemailer');

exports.getOverview = (req, res) => {

    res.status(200).render('index', {
        title: 'Home'
    });
};

exports.getAbout = (req, res) => {

    res.status(200).render('about', {
        title: 'About'
    });
};

exports.getContact = (req, res) => {

    res.status(200).render('contact', {
        title: 'Contact'
    });
};

exports.sendMail = (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vbblajevbusiness@gmail.com',
            pass: process.env.PASS
        }
    });

    let mailOptions = {
        from: 'Vasko Blajev <vbblajevbusiness@gmail.com>',
        to: 'vbblajev@gmail.com',
        subject: 'Website Submission',
        text: `You have a submission with the following details... Name: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.message}`,
        html: `<p>You have a submission with the following details... Name: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.message}<p><ul><li>Name: ${req.body.name}</li><li>Email: ${req.body.email}</li><li>Message: ${req.body.message}</li></ul>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log(`Message Sent: ${info.response}`);
            res.redirect('/');
        }
    })
}

exports.getLoginForm = (req, res) => {

    res.status(200).render('login', {
        title: 'Login Page'
    });
};

exports.getRegisterForm = (req, res) => {

    res.status(200).render('register', {
        title: 'Signup Page'
    });
};
