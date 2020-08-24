const express = require('express');
const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const socketio = require('socket.io');
const TemplateSchema = require('./schemas/TemplateSchema');
const QuestionSchema = require('./schemas/QuestionSchema');
const UserSchema = require('./schemas/UserSchema');
const cors = require(`cors`);

const typeDefs = `
type Query
type Mutation
`;

const schema = makeExecutableSchema({
    typeDefs: [
        typeDefs,
        TemplateSchema.typeDefs,
        QuestionSchema.typeDefs,
        UserSchema.typeDefs,
    ],
    resolvers: [
        TemplateSchema.resolvers,
        QuestionSchema.resolvers,
        UserSchema.resolvers,
    ]
})

const server = new ApolloServer({ schema })

const app = express();
app.use(cors())

server.applyMiddleware({
    app,
    cors: false,
    path: '/'   
})

const http = app.listen({port: 4000}, () => {
    console.log(`🚀 Server ready at http://localhost:4000`)
})

const io = socketio(http)

let rooms = []
let gameRoom;
let idGame;
let correctStud = []
let falseStud = []

io.on('connection', socket => {
    socket.on('idGame', id => {
        console.log(id, `ini idnya masuk`)
        idGame = id
    })
    
    socket.on('gameSetting', addRoom => {
        rooms.push(addRoom)
        gameRoom = addRoom
        io.emit('next-page', gameRoom)
    })

    socket.on('joinRoom', ({room, name}) => {
        const newPlayer = {
            id: socket.id,
            user: name,
            room,
            point: 0
        }
        if (gameRoom.players.length < 5) {
            let flag = false
            gameRoom.players.forEach(player => {
                if (player.user === newPlayer.user) {
                    flag = true
                }
            })
    
            if (flag === false) {
                gameRoom.players.push(newPlayer)
                io.emit('roomGame', gameRoom)
                // console.log(gameRoom, `ini yg update`)
                io.emit('go-waiting')
            } else {
                io.emit('alert-samePlayer')
            }
        } else {
            io.emit('alert-full')
        }

        // let index = rooms.findIndex(i => i.room === room)

        // socket.join(room, () => {
        //     console.log(socket.rooms, `ini rooms socket`)
        //     let flag = false
        //     rooms[index].players.forEach(player => {
        //         if (player === player.user) {
        //             flag = true
        //         }
        //     });

        //     if (flag === false) {
        //         rooms[index].players.push(player.user)
        //     } 
        //     console.log(rooms[index], `ini yg dipanggil`)
        //     io.emit('room', rooms[index])
        // })
    })

    socket.on('goPlay', () => {
        socket.broadcast.emit('goPlay')
    })

    socket.on('playGame', () => {
        let questions = gameRoom.questions
        io.emit('playGame', questions)
    })

    socket.on('nextQuestion', () => {
        correctStud = []
        falseStud = []
        io.emit('nextQuestion')
    })

    socket.on('checkAnswer', ({answerStat, name, point}) => {
        let players = gameRoom.players
        let user = players.filter(player => player.user === name)
        if (answerStat) {
            if (user.length > 0) {
                // console.log(user[0].point, `ini point user`)
                user[0].point = user[0].point + point
            } 
            correctStud.push(name)
        } else {
            
            falseStud.push(name)
        }
        io.emit('studentResult', {
            correctStud,
            falseStud,
            players
        })
    })

    socket.on('timer', () => {
        let timer = gameRoom.time
        // console.log(timer, `ini time`)
        let setTimer = setInterval(() => {
            if (timer > -1) {
                io.emit('timerStart', timer)
            }    
            timer--
        }, 1000)

        if (timer === 0) {
           clearInterval(setTimer)
        }
    })

    socket.on('goToResult', () => {
        const finalResults = gameRoom.players
        // console.log(`ini di broadcast`)
        io.emit('goToResult', finalResults)
    })
})