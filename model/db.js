const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://mayanksharma040404:1234567890@cluster0.liyj6tq.mongodb.net/?retryWrites=true&w=majority',(err)=>{
    if(!err){ console.log('Mongo db connected successfully');}
    else console.log('error occured',err);    

})