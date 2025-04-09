const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './public' // Provide a path for static files
});
const port = process.env.PORT || 3001;

// Create public directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
}); 