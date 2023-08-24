const express= require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send({'Hello':"hari"});
});

const PORT=process.env.PORT ||1817;
app.listen(PORT) 