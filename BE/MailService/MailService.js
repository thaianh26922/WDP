import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: "anhpthe161502@fpt.edu.vn",
        pass: "lncu wezr xpah qzdu",
    },
})

// async..await is not allowed in global scope, must use a wrapper
async function mail(user, subject, code) {
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"BestCV" <anhpthe161502@fpt.edu.vn>', // sender address
            to: user.email, // list of receivers
            subject: subject, // Subject line

            html: `Xin chào <b>${user.username}</b><br><span>Vui lòng truy cập đường dẫn để thay đổi mật khẩu: <a href='localhost:3000/quen-mat-khau/${code}' target='_blank'><b>localhost:3000/quen-mat-khau/${code}</b></a></span>`, // html body
        });
        return true;
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
        return false;
    }
}
export { mail }