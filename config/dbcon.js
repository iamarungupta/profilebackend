
let mongoose = require('mongoose');

const url=process.env.url; // REPLACE WITH YOUR DB SERVER
mongoose.set('strictQuery', false);
class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect('mongodb+srv://garun2161:Arun123@cluster1.sle0yvq.mongodb.net/?retryWrites=true&w=majority')
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

//module.exports = new Database();
const con=new Database();

