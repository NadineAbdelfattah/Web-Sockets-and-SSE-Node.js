const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const subscribers={}

app.get('/subscribe', (req, res) => {
    const ID = Math.ceil(Math.random() * 100000000);
    console.log(ID, 'subscribe');
    subscribers[ID] = res;
    res.writeHead(200,{
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
    });
    req.on('close', () => {
        delete subscribers[ID];
    });
});

app.post('/messages', (req, res, next) => {
   console.log(req.body);
   Object.entries(subscribers).forEach(([ID, s]) =>{
    s.write(`data: ${JSON.stringify(req.body)}\n\n`);
   });
   res.status(204).end();
});

// SHORT PULLING LOGIC:

// const messages = [];

// app.post('/messages',(req,res,next)=>{
//     console.log(req.body);
//     messages.push(req.body);
//     res.status(204).end();
// })

// app.get('/messages',(req,res)=>{
//     res.json(messages);
// })


app.listen(3000, ()=>{
    console.log('app running on port 3000'); 
});