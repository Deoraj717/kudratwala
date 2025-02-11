import nodemailer from "nodemailer";

const sendEmail = async(user,order)=>{
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"2022pgcsca055@nitjsr.ac.in",
                pass:process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from : "2022pgcsca055@nitjsr.ac.in",
            to : "2022pgcsca055@nitjsr.ac.in",
            subject : "Order confirmed",
            text : `Order confirmed for user ${JSON.stringify(user)} and order ${JSON.stringify(order)}`
        }

        await transporter.sendMail(mailOptions);
        console.log("Email sent");
    }catch(err){
        console.log(err);
    }
}
export default sendEmail;