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

let roomsPlay = []
let correctStud = []
let falseStud = []
let gameRoom;
const users = {}
const rooms = {}

io.on('connection', socket => {
     
   socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 14) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = rooms[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

    socket.on('gameSetting', addRoom => {
        roomsPlay.push(addRoom)
        gameRoom = addRoom
        io.emit('next-page', gameRoom)
    })

    socket.on('joinRoom', ({room, name, type}) => {
        const newPlayer = {
            id: socket.id,
            user: name,
            room,
            point: 0,
            type,
        }

        if (!gameRoom) return io.emit(`invalidId`)

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
                socket.emit('go-waiting', newPlayer.room)
            } else {
                io.emit('alert-samePlayer')
            }
        } else {
            io.emit('alert-full')
        }
    })

    socket.on('goPlay', () => {
        let roomId = gameRoom.room
        socket.broadcast.emit('goPlay', roomId)
    })

    socket.on('playGame', () => {
        let dataRoom = {
            quests: gameRoom.questions,
            initPlayers: gameRoom.players
        }
        io.emit('playGame', dataRoom)
    })

    socket.on('nextQuestion', () => {
        correctStud = []
        falseStud = []
        io.emit('nextQuestion')
    })

    let newPlayers;

    socket.on('checkAnswer', ({answerStat, name, point}) => {
        let players = gameRoom.players
        let user = players.filter(player => player.user === name)
        if (answerStat) {
            if (user.length > 0) {
                user[0].point = user[0].point + point
            } 
            correctStud.push(name)
        } else {
            falseStud.push(name)
        }
        io.emit('studentResult', {
            correctStud,
            falseStud,
            players,
        })
    })

    socket.on('timer', () => {
        let timer = gameRoom.time
        let setTimer = setInterval(() => {
            if (timer > -1) {
                io.emit('timerStart', timer)
            }    
            timer--
        }, 1000)

        if (timer === 0) {
           clearInterval(setTimer)
           io.emit('disableAnswer')
        }
    })

    socket.on('goToResult', () => {
        const idRoom = gameRoom.room
        correctStud = []
        falseStud = []
        io.emit('goToResult', idRoom)
    })
})