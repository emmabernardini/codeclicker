const nodemailer = require("nodemailer");

const mailer = {
  sendNewPassword(mail, newpassword) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codeclickergame@gmail.com",
        pass: "yixljagxsvfagyuu",
      },
    });

    const mailOptions = {
      from: "codeclickergame@gmail.com",
      to: mail,
      subject: "CodeClicker - Réinitialisation du mot de passe",
      text: `Bonjour, 

Vous venez de réinitialiser votre mot de passe.

Vous trouverez ci-dessous vos identifiants : 

Votre adresse email : ${mail}
Votre nouveau mot de passe: ${newpassword}

Nous vous recommandons de changer ce mot de passe dans la section profil afin de ne pas l'oublier.
       
Rendez-vous sur CodeClicker pour de nouvelles aventures!
       
Cordialement
L'équipe de CodeClicker`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

module.exports = mailer;
