const fs=require("fs");

fs.writeFile("message.txt","Hellow world",(err)=>{
    if(err) throw err;
    console.log("The file is saved");
});