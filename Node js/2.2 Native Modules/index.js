const fs=require("fs");

// fs.writeFile("mine.txt","Hellow world",(err)=>{
//     if(err) throw err;
//     console.log("The file is saved");
// });

fs.readFile("./mine.txt","utf8",(err,data)=>{
    if(err) throw err;
    console.log(data);
});