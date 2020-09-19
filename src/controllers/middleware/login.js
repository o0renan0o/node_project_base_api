const
    mongooseFind = require('../database/robot/crud_user/find'),
    mongooseUpdate = require('../database/robot/crud_user/update'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    if (req.body.email && req.body.password){

        let isTrue = false;
        let document = {};
        try {
            document = await mongooseFind(req.body.email, 'admins', '');
            if (document){
                isTrue = await bcrypt.compare(req.body.password, document.password);
            }
        }catch (e) {
            res.status(200).json({'case': "Login Failed", "error": e})
        }
        if (isTrue) {
            req.token = await jwt.sign({
                data: req.body.email
            }, process.env.APP_SECRET, {expiresIn: '15m'});
            document.access_token = req.token;
            mongooseUpdate({'document': document}, 'admins');
            res.cookie('toolToken', req.token);
            res.status(200).json({'case': "Proceed"})
        } else {
            res.status(200).json({'case': "Login Failed"})
        }
    }else{
        res.status(200).json({'case': "Login Failed", "error": ""})
    }
};