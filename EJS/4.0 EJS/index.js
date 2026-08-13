import express from "express";
 
const app=express();
const port=3000;

app.get("/",(req,res)=>{
    const today=new Date();
    const day=today.getDay();

    // console.log(day);

    let type="a weekday";
    let adv="padhle bhai";

    if(day===0 || day===6){
        type="weekend";
        adv="aaj bhi padh bhai";
    }
    res.render("index.ejs",{
        dayType:type,
        advice:adv
    });
});

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});

