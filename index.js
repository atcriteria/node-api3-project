// require your server and start it

const server = require('./api/server');

const PORT = 4250;

server.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`)
})