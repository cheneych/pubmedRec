// const { User } = require('./../models/user');


function auth(User) {
    return function(req, res, next) {
        let token = req.cookies.w_auth;
        User.findByToken(token,(err,user)=>{
            if(err) throw err;
            if(!user) return res.json({
                isAuth: false,
                error: true
            });

            req.token = token;
            req.user = user;
            next();
        })
    }
}
// let auth = (User, req,res,next) => {
//     console.log(req);
//     let token = req.cookies.w_auth;
//     User.findByToken(token,(err,user)=>{
//         if(err) throw err;
//         if(!user) return res.json({
//             isAuth: false,
//             error: true
//         });

//         req.token = token;
//         req.user = user;
//         next();
//     })
// }


module.exports = { auth }