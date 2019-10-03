const express = require('express');
const usersRoutes = require('./users/userRouter')
const postRoutes = require('./posts/postRouter')
const server = express();


//routes

server.use('/api/users', usersRoutes)
server.use('/api/posts', postRoutes)





//middleware
server.use(express.json())

//custom middleware

function logger(req, res, next) {

};


server.listen(3000, () => { "listening on port 3000" })
module.exports = server;


// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`)
// });
