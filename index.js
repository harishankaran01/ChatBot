const express= require('express');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.json());
require("./routes/dialogFlowroutes")(app);


const PORT=process.env.PORT ||1817;
app.listen(PORT)  