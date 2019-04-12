const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const formidable = require('express-formidable');

const app = express();
const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const User = require('./models/user');
const ArticleSchema = new mongoose.Schema({})
const Articles = mongoose.model('articles', ArticleSchema, 'articles');
const TestSchema = new mongoose.Schema({})
const Tests = mongoose.model('tests', TestSchema, 'tests');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

app.get('/api/auth',auth(User),(req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
});

app.post('/api/register',(req,res)=>{
    const user = new User(req.body);
    console.log(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true
        })
    })
});

app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,message:'Auth failed, email not found'});
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('w_auth',user.token).status(200).json({
                    user_name : user.name,
                    loginSuccess: true
                })
            })
        })
    })
});


app.get('/api/logout',auth(User),(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
});

app.post('/api/articles',(req,res)=>{
    let c = req.body.keywords[0];
    let str = '';
    if (c >= '0' && c <= '9') {
        str = req.body.keywords;
        Articles.
        find().
        where('PMID').equals(str).
        exec((err,articles)=>{
            if(err) return res.status(400).send(err);
            res.send(articles);
            x = articles[0].toObject()
            console.log(x.Title)
        })
    } else {
       
    }
});

app.post('/api/userartlist', (req,res)=>{
    Tests.
    find().
    exec((err,articles)=>{
    if(err) return res.status(400).send(err);
    res.send(articles);
    })
})

app.post('/api/userrec', (req,res)=>{
    User.
    find().
    exec((err,articles)=>{
    if(err) return res.status(400).send(err);
    res.send(articles);
    })
})


app.post('/api/rec',(req,res)=>{
    let str = req.body.pmid;
    Articles.
    find().
    where('PMID').equals(str).
    exec((err,articles)=>{
    if(err) return res.status(400).send(err);
    res.send(articles);
    })
});

const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Server Running at ${port}`)
})