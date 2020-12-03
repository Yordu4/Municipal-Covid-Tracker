const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const table = require('./create_table')
,compression = require('compression')
,admin = require('./routes/admin')
,index = require('./routes/index')
,express = require('express')
,helmet = require('helmet')
,mysql = require('mysql')
,app = express();

//database configuration
const options={  
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'a09287811206',
  database : 'brgy'
};
let connection = mysql.createConnection(options);
let sessionStore = new MySQLStore({}, connection);
connection.connect((err)=>{
  if (!err){
    console.log("Database Connected");
  }
  else{
    console.log("Database Connection Failed : "+JSON.stringify(err,undefined,2));
  }
});
global.db = connection;


// all environments
// app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//       "img-src": ["'self'", "https:"],
//       "script-src-attr": ["'self'","'unsafe-inline'"]
//     }
//   })
// );
app.use(compression()); //Compress all routes
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  key: 'Barangay_Covid_Map',
  secret: 'brgy_covid_map',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'strict',
    // secure: process.env.NODE_ENV === 'production',
    originalMaxAge: 1000*60*60*24*200 //200 days
  }
}));

// sql = `SELECT date_updated FROM covid_updates;`;
// db.query(sql, (err,resul)=> {
//    sql = `INSERT INTO patient_list_history_date
//       VALUES (null,'${resul[0].date_updated}');`;
//       console.log(resul[0].date_updated);
//    db.query(sql, (err,result)=> {
      
//    });
// });

app.use('/',index);
app.use('/admin',admin);

const port=process.env.PORT||3000;  
app.listen(port,()=>console.log(`Listening on port ${port}`));