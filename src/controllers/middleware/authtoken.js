const
    //express = require("express"),
    //admins = require('../database/models/administradores'),
    //router = express.Router(),
    mongooseFind = require('../database/robot/crud_user/find'),
    //mongoose = require("mongoose"),
    //cookies = require('cookie-parser'),
    jwt = require('jsonwebtoken');

//ENV
require('dotenv').config();

module.exports = AuthMiddleware = async (req,res,next) => {
    let token = await getCookieToken(req);
    await jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
        if (err) {
            res.status(302).redirect('/');
        } else {
            let user = await mongooseFind(decoded.data, 'admins', '');
            req['userName'] = user.firstName;
            req.token = await jwt.sign({
                data: decoded.data
            }, process.env.APP_SECRET, { expiresIn: '15m' });
            res.cookie('toolToken', req.token);
            next()
        }
    });
};

function getCookieToken(request) {
    let rc = request.headers.cookie;
    let token = 'No Token';
    rc && rc.split(';').forEach(function (cookie) {
        if (cookie.match(` toolToken=`)) {
            token = cookie.replace(" toolToken=", "");
        }else if (cookie.match(`toolToken=`)){
            token = cookie.replace("toolToken=", "");
        }
    });
    return token;
}