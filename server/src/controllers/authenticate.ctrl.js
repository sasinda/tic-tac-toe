import UserService from '../services/user.svc'
const jwt=require('jsonwebtoken')

var secret=process.env.SECRET ? process.env.SECRET: "Sh0PK33PS3CR3T";

class AuthController {
    constructor(){
        this.tempUserAuth=this.tempUserAuth.bind(this);
        // this.filterAuth=this.filterAuth.bind(this);
        this.us=new UserService();
    }

    filterAuth(req, res, next) {
        let secretKey = req.app.get('secret');
        let token = req.headers['x-access-token'] || req.body.token;
        console.info("res" + res);
        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Invalid token'
                    });
                } else {
                    req.decoded = decoded;
                    req.userId=decoded['id']
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token'
            });
        }
    }

    filterAuthIO(packet,next){
        let token = packet.token;
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    next(new Error('Invalid token'));
                } else {
                    packet.decoded = decoded;
                    packet.userId=decoded['id']
                    next();
                }
            });
        } else {
            next(new Error('No token'));
        }
    }


    tempUserAuth(req, res, next){

            try{
                var userName =req.body['userName'];
                if(userName==null||userName==""){
                    throw "user name empty"
                }

                var user=this.us.createTempUser(userName);
                var token = jwt.sign(user, req.app.get('secret'), {
                    expiresIn: 1440 // expires in 24 hours
                });

                res.send({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    data:user
                });

            }catch (e) {
                res.status(400).send({
                    success: false,
                    message: 'Malformed request. userName field should exist.'
                })
            }


    }



}
export default AuthController;