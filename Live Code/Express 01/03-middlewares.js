const express = require('express');

function block_1_httpMethods() {
    return new Promise((resolve) => {
        const app = express()
        app.use(express.json({limit: '50kb'})) //Study about this
        // agar frontend se space toh woh %20 se denote hota hain. jisse remove karna padega
        app.use(express.urlencoded({extended: true, limit: '50kb'})) //Aise handle karte
        //extended ., agar url mein nested object wagera kuch hain toh
        app.use(express.static(rootCertificates, {dotfiles: 'ignore', maxAge})) // Study about this

        //request logger middleware
        app.use((req,res, next, error) => { //iss handler mein 4 honge

            //add to database
            //console log everything
            //write in some file
            const logEntry = `${req.method} : ${req.url}`
            localStorage.push(logEntry)
            console.log(`[LOG] -- ${logEntry}`)
            next() //usually sabse last mein likhte hain
        })


        //Another Middleware
        app.use((req,res,next) => {
            //I can add my own properties and method in my own
            req.startTime = Date.now()
            
            //Event Listners
            res.on('finish', () => { //finish is one of the events
                const duration = Date.now() - req.startTime
                console.log(`[Time taken by request] : ${duration}`)
            })
        })

        //auth middleware
        function authMe(req,res,next){
            const token = req.headers['X-auth-token']

            if(!token){
                return res.status(401).json({"error": "No token, please login"})
            }

            if(token !== "secret-pass"){
                return res.status(403).json({error: "Invalid Token"})
            }

            //token -> extract data from token -> userId email
            //later we can call data from database by querying the DB

            //create user in the user
            req.user = {id: 1, name: "Hitesh", role: "admin"}
            //later that user enters to /menu
            next()
        }

        //Agar woh role user ka nhi hoga toh error dega
        function getRole(req,res,next){
            return (req,res,next) => {
                if(!req.user || req.user.role !== role){
                    return res.status(403).json({error: `Role ${role} required`})
                }
            }
        }


        //rateLimitter midleware

        function rateLimit(maxReq){
            let count = 0
            return (req,res,next) => {
                count++
                if(count > maxReq){
                    return res.status(429).json({error: "Too mnay request, please try after some time."})
                }
            }
            next()
        }



        app.get('/profile', authMe, getRole('admin'), () => {}) //profile to hit karoge, toh kuch middle se checking hogi. later hum ek callback use karenge.


        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`

            
            //WE will write here frontend
            try {
                //Hitting /menu endpoint
                const listRoute = await fetch(`${base}/routes`)
                const routeList = await listRoute.json()
                
                //POST request
                const createResponse = await fetch(`${base}/routes`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        body: {
                            name: "Rajdhani",
                            direction: "All India"
                        }
                    }
                })
               
            } catch (error) {
                console.log(error)
            }

            server.close(() => {
                console.log("Block 1 Served")
                resolve()
            })
        })
    })
}

function block_1_httpMethods() {
    return new Promise((resolve) => {
        const app = express()
        app.use(express.json())

       app.get('/file/*filename', (req,res) => {
        const file = req.params.filePath //Yeh array hota hain
        res.json({name: "file", type: "Wildcard"})
       })

       app
            .route('/schedule')
            .get(() => {})
            .post(() => {})
            .put(() => {})
            .pathc(() => {})
            .delete(() => {})

            
        //Sabse pehle yeh neeche wala code chalega
        //only if /api endpoint is hit.
        app.use('/api', () => {}) //pre-fetch map


        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`

            //WE will write here frontend

            try {
              
               
            } catch (error) {
                console.log(error)
            }

            server.close(() => {
                console.log("Block 1 Served")
                resolve()
            })
        })
    })
}

async function main() {
    await block_1_httpMethods()
    
     
    process.exit()// Program execute karna band kar dega. By default: 0 hoti hain success ke liye.
} 
main()