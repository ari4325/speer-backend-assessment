const uri = `mongodb+srv://arishmitg:${process.env.PASSWORD}@cluster0.pa17a.mongodb.net/speer?retryWrites=true&w=majority`;

const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database Connection Established"))
      .catch((err) => {
        console.log("Error connecting to Database: " + err);
      });
};
  
module.exports = connectDB;