import http from 'node:http'
import path from 'node:path'


import express from 'express'
import { Server } from 'socket.io'


import { kafkaClient } from './kafka-client.js'

async function main()
{
    const PORT = process.env.PORT ?? 8001
    const app = express()
    app.use(express.static(path.resolve('./public')))
    const server = http.createServer(app)
    const io = new Server();

    const kafkaProducer = kafkaClient.producer()
    await kafkaProducer.connect()

    const kafkaConsumer = kafkaClient.consumer({groupId: `socker-server-${PORT}`})
    await kafkaConsumer.connect()
    await kafkaConsumer.subscribe({topics: ['location-updates'], fromBeginning: true})

    kafkaConsumer.run({
        eachMessage: async ({topic, partition, message}) =>{
            const data = JSON.parse(message.value.toString())
            console.log("KafkaConsumer Data Received", data)
            io.emit('server:location:update', {id: socket.id, latitude, longitude})
            await heartbeat();
        }
    })

    io.attach(server)

    io.on('connection', (socket) =>{
        console.log(`Socket: ${socket.id}: Connected Successfully...`)

        socket.on('client:location:update', (locationData) =>{
            const {latitude, longitude} = locationData;
            console.log(`Your latitude is ${latitude} & longitude is ${longitude}`)

            kafkaProducer.send({topic: 'location-updates', 
                messages: [{key: socket.id, value: JSON.stringify({id: socket.id, latitude, longitude})}]
            })
        })
    })

    app.get('/health', (req,res) =>{
        return res.json({health: true})
    })

    server.listen(PORT, () =>{
        console.log(`Server running on http://localhost:${PORT}`)
    })    
}

main()