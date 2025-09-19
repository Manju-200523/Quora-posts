const express=require("express");
const app = express();
const port =8080;
const path =require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views" ,path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username :"manju",
        content : " I LVE coding"
    },
    {
        id:uuidv4(),
        username:"prema",
        content : " Discipline"
    },
    {
        id:uuidv4(),
        username:"nithesh",
        content:" Success"
    },
]
app.get("/", (req,res)=>{
    res.send("serving working well")
})

app.get("/posts" ,(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs",{})
})

app.post("/posts",(req,res)=>{
    let { username, content }= req.body;
    let id = uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts");
})


app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p )=> p.id === id);
    if(!post) return res.send("post not found")
    res.render("show.ejs",{post})
    
    
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let foundPost = posts.find((p)=> p.id === id);
    let {username, content} = req.body; 
    if(foundPost){
        foundPost.username = username;
        foundPost.content = content;
        res.redirect("/posts")
    }           
    else{
        res.send("post not found")
    }   
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> p.id === id);
    if(!post) res.send("post not found")
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> p.id !== id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("listening to port :8080");
})
