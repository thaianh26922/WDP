import * as querystring from 'qs';
import crypto from 'crypto';
import moment from 'moment';
import config from '../Config/Config.js';
import CompanyDAO from '../DAO/CompanyDAO.js';
import { User } from '../Model/User.js';

let companyId = null;
let status = null;
let userId = '';
function createPaymentURL(req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;
    let vnpUrl = config.vnp_Url;
    let returnUrl = config.vnp_ReturnUrl;
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = 'VNBANK';
    companyId = req.body.companyId;
    status = req.body.status;
    config.vnp_ReturnScreen = config.vnp_ReturnUrl;
    console.log(req.body);
    let locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = 500000 * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    userId = req.body.data.userId
    vnp_Params = sortObject(vnp_Params);
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    console.log(vnpUrl);
    res.json(vnpUrl)
};

const updateIsVipById = async (_id) => {
    try {
        // Tìm người dùng theo _id
        const user = await User.findById(_id).exec();
        console.log(user);
        if (!user) {
            return res.status(404).json({
                result: 'FAIL',
                message: `FAIL - Không có người dùng với _id ${_id}`
            });
        } else {
            // Cập nhật thuộc tính isVip thành true
            const newUser = await User.findByIdAndUpdate(_id, { isVip: true }, { new: true }).exec();
        }
    } catch (error) {
       
    }
}

function  vnPayReturn(req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = sortObject(vnp_Params);
    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        updateIsVipById(userId)
        res.redirect("http://localhost:3000/");

   
};



function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

export default {createPaymentURL, vnPayReturn};