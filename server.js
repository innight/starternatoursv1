const mongoose = require('mongoose');
const dotenv = require('dotenv');

//unhandledRejection SYNC function
process.on('uncaughtException', err => {
  console.log('uncaughtException, shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection sucess');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//unhandledRejection ASYNC function
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('unhandledRejection');
  server.close(() => {
    process.exit(1);
  });
});
