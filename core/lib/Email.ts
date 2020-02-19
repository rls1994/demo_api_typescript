import nodeMailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
module.exports = async (data:{To:string, Subject: string, Body: string}) => {

    let transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        to: data.To,
        from: process.env.EMAIL_SENDER,
        subject: data.Subject,
        html: data.Body
    };
   let resp = await transporter.sendMail(mailOptions);
    if(resp){
        return "Mail sent successfully!!!"
    }else{
        return "Something went wrong, Please try again!!!";
    }
}