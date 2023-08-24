const express= require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send({'Hello':"Everyone"});
});

const PORT=process.env.PORT ||1817;
app.listen(PORT) 