import express, { json } from "express";
import pg from "pg";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import {sendVerificationEmail} from './mail.js'
import "dotenv/config"
import bcrypt from 'bcryptjs'

const __dirname = dirname(fileURLToPath(import.meta.url));


//.env Variables
const secret = process.env.SECRET
const accessExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN
const refreshExpiredIn = process.env.REFRESH_TOKEN_EXPIRES_IN


const port = process.env.PORT || 8080;

// Equivalent to mongoose connection
// Pool is nothing but group of connections
// If you pick one connection out of the pool and release it
// the pooler will keep that connection open for sometime to other clients to reuse

const pool = new pg.Pool({
  host: "localhost",
  port: 5433,
  user: "postgres",
  password: "postgres",
  database: "sql_class_2_db",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

const app = new express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Making Token 
const generateToken = async() => {
  const rawToken = crypto.randomBytes(32).toString('hex')
  const hashToken = crypto.createHash('sha256').update(rawToken).digest('hex')

  return {rawToken, hashToken}
}


//Register Candidate
app.post('/register', async (req, res, next) => {
  const {name, email, password} = req.body;

  const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  
  if(existing.rows.length>0){
    return res.status(404).json({error: "User already exits"})
  }

//get Token
  const {rawToken, hashToken} = await generateToken()

  const hashPassword = await bcrypt.hash(password, 8)
  const reqUser = {
    name, email
  }

try {
  await sendVerificationEmail(email, rawToken)
} catch (error) {
  console.log(error)
}

  const addUser = await pool
  .query("INSERT INTO users(name, email, password, verification_token) VALUES ($1, $2, $3, $4)", [name, email,hashPassword, hashToken])

return res.status(201).json({
  message: "User Created",
  reqUser
})

})

//Verify User
app.get('/verify', async (req, res)=>{
  const {token} = req.query
const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  //Search for that token
  const result = await pool.query(
        "UPDATE users SET is_verified = true, verification_token = $1 WHERE verification_token = $2",
        ['verified',hashedToken]
    );

    if (result.rowCount === 0) return res.send("Invalid Token");
    res.send("Account Verified! You can now log in.");
})

//Authenticate Candidate

//Login Candidate

app.post('/login', async(req,res) => {
  const {email, password} = req.body

  const findUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

  if(findUser.rows.length===0) return res.send("Invalid Email or Password")
const user = findUser.rows[0]
const matchPass = await comparePassword(password, user)
  if(!matchPass) return res.send("Invalid Email or Password")

  if(!user.is_verified) return res.send("Please verify your email before login");

const accessToken = await generateAccessToken({name: user.name, email: user.email})
const refreshToken = await generateRefreshToken({email: user.email})

const hashedrefreshToken = crypto
  .createHash("sha256")
  .update(refreshToken)
  .digest("hex");

await pool.query("UPDATE users SET refresh_token = $1 WHERE email = $2", [hashedrefreshToken, email])


res.send({
  user: {
    name: user.name,
  email: user.email
},
  accessToken,
refreshToken
})

})

const comparePassword = async (password, user) =>{
  return bcrypt.compare(password, user.password)
}

//Generate Access Token
const generateAccessToken = async (payload) =>{
  return jwt.sign(payload, secret, {expiresIn: accessExpiresIn})
}

//Generate Refresh Token
const generateRefreshToken = async (payload) =>{
  return jwt.sign(payload, secret, {expiresIn:refreshExpiredIn})
}



















//Endpoints
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//get all seats
app.get("/seats", async (req, res) => {
  const result = await pool.query("select * from seats"); // equivalent to Seats.find() in mongoose
  res.send(result.rows);
});

//book a seat give the seatId and your name

app.put("/:id/:name", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.params.name;
    // payment integration should be here
    // verify payment
    const conn = await pool.connect(); // pick a connection from the pool
    //begin transaction
    // KEEP THE TRANSACTION AS SMALL AS POSSIBLE
    await conn.query("BEGIN");
    //getting the row to make sure it is not booked
    /// $1 is a variable which we are passing in the array as the second parameter of query function,
    // Why do we use $1? -> this is to avoid SQL INJECTION
    // (If you do ${id} directly in the query string,
    // then it can be manipulated by the user to execute malicious SQL code)
    const sql = "SELECT * FROM seats where id = $1 and isbooked = 0 FOR UPDATE";
    const result = await conn.query(sql, [id]);

    //if no rows found then the operation should fail can't book
    // This shows we Do not have the current seat available for booking
    if (result.rowCount === 0) {
      res.send({ error: "Seat already booked" });
      return;
    }
    //if we get the row, we are safe to update
    const sqlU = "update seats set isbooked = 1, name = $2 where id = $1";
    const updateResult = await conn.query(sqlU, [id, name]); // Again to avoid SQL INJECTION we are using $1 and $2 as placeholders

    //end transaction by committing
    await conn.query("COMMIT");
    conn.release(); // release the connection back to the pool (so we do not keep the connection open unnecessarily)
    res.send(updateResult);
  } catch (ex) {
    console.log(ex);
    res.send(500);
  }
});

app.listen(port, () => console.log("Server starting on port: " + port));
