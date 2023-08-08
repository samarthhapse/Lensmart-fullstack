const express=require('express');
const app=express();
const port=8000; 
const path = require('path');
const bodyparser = require('body-parser');
// making file for mongoose
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Lensmart");
}
// setting structure of database
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
});
const FeedbackSchema = new mongoose.Schema({
    query: String,
});

// locking the structure or schema
const Contact = mongoose.model("Contact", ContactSchema);
const Feedback = mongoose.model("Feedback", FeedbackSchema);

// EXPRESS SPECIFIC STUFF //
app.use('/pintya',express.static('static'));  // for serving static file in app.js
app.use(express.urlencoded()); // to transefer all data of our website to express

// PUG SPECIFIC STUFF //
app.set('view engine','pug') //set the templete engine 
app.set('views',path.join(__dirname,'views')); //set the views directory

// ENDPOINTS //
app.get("/",(req,res)=>{
    const param={};
    res.status(200).render('home.pug',param);
});


app.get("/contact",(req,res)=>{
    const param={};
    res.status(200).render('contact.pug',param);
});
app.post("/contact",(req,res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("Saved to db")
    })
    .catch(()=>{
        res.status(404).send("Not found");
    })
});


app.get("/feedback",(req,res)=>{
    const param={};
    res.status(200).render('feedback.pug',param);
});
app.post("/feedback",(req,res)=>{
    var mydata=new Feedback(req.body);
    mydata.save().then(()=>{
        res.send("Saved to feedback db")
    })
    .catch(()=>{
        res.status(404).send("Not found");
    })
});


app.get("/about",(req,res)=>{
    const param={};
    res.status(200).render('about.pug',param);
});
app.get("/shopping",(req,res)=>{
    const param={};
    res.status(200).render('shopping.pug',param);
});

// START THE SERVER
app.listen(port,()=>{
    console.log(`App successfully started on ${port}`)
})