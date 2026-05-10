import http from 'node:http'
import path from 'node:path'
import 'dotenv/config'

import express from 'express'
import {Server} from 'socket.io'

import { publisher, subscriber } from './redis-connection.js'

async function main() {

    const app = express()
    

    const server = http.createServer(app)
    const io = new Server(server, {cors: {origin: "*"}})
    const PORT = process.env.PORT ?? 8000

    app.use(express.static(path.resolve('./public')))
    await subscriber.subscribe('internal-server:checkbox:change')
    
    subscriber.on('message', (channel, data) =>{
        if (channel==='internal-server:checkbox:change'){
            const {index, checked} = JSON.parse(data);
            state.checkboxes[index] = checked;
            io.emit('server:checkbox:change', {index, checked});
        }
    })
    const CHECKBOX_COUNT = 10000
    const state = {
        checkboxes: new Array(CHECKBOX_COUNT).fill(false)
    }

    //Socket Handlers
    io.on('connection', (socket) =>{
        console.log("Socket Connected", {id: socket.id});
        socket.on('client:checkbox:change',async (data)=>{
            console.log("Socket ",socket.id," client:checkbox:change", data )
            await publisher.publish('internal-server:checkbox:change', 
                JSON.stringify(data)
            )
        })
    })


    //Express handlers
    app.get('/health', (req,res) =>{
        return res.json({message: "This route is healthy"})
    })

    app.get('/checkboxes', (req,res) => {
        return res.json({checkboxes: state.checkboxes})
    })

    server.listen(PORT, () =>{
        console.log(`The server is listenting on http://localhost:${PORT}`)
    });
}

main()