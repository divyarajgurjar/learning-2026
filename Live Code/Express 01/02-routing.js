const express = require('express');

function block_1_httpMethods() {
    return new Promise((resolve) => {
        const app = express()
        app.use(express.json())

        const routes = {
            1: {
                id: 1,
                name: 'Bandra',
                direction: 'North'
            },
            2: {
                id: 2,
                name: 'Kanpur',
                direction: 'Central'
            }
        }

        let nextID = 3;



        app.get('/routes', (rej,res) => {
            res.json(Object.values(routes))

        })

        //Single route by ID
        app.get('/route:id', (req,res) => {
            const route = routes[req.param.id]
            if(!route) res.status(404).json({error: "Page doesn't exist"})
            res.json(route)
        })

        app.post('/route', (req,res) => {
            //no validation 
            const newRoute = {id: nextID++, ...req.body}
            routes[newRoute.id] = newRoute
            res.send(201).json(newRoute)
        })

        app.put('/route/:id', ()=> {
            const id = req.param.id
            if(!id) return res.status(404).json({error: "Page doesn't exist"})
            routes[id] = {id: Number(id), ...req.body}
        })

        app.patch('/route/:id', (req,res) => {
            const id = req.params.id
            if(!id) return res.status(404).json({error: "Page doesn't exist"})
            routes[id] = {id: Number(id), ...routes[id], ...req.body}
            res.json("Done")
        })

        app.delete('/route/:id', (req,res) => {
            const id = req.params.id
            if(!id) return res.status(404).json({error: "Page doesn't exist"})
            delete routes[id] 
            res.status(204).json("Done")
        })

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