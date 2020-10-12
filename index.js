console.log("server running")
let location = '/public'
let express = require('express')
let app = express()
let serv = require('http').createServer(app)
app.get('/', (req, res) => {
	res.sendFile(__dirname + location + '/index.html')
})
app.use(location, express.static(__dirname + location))
let port = process.env.PORT || 4000
serv.listen(port)

let { SimpleSheetInterface } = require('./spreadsheet.js')
let socket = require('socket.io')
let io = socket(serv)
let SOCKET_LIST = {}
let gameSheet = new SimpleSheetInterface('1DQG_nWMH_SwkxSNzz9g6H1cESAcXUhj3ZSmjJfhhrIs', './client_secret.json')

;(async () => {
	await gameSheet.initSheet(6, 11)
	io.sockets.on("connection", socket => {
		console.log(`User ${socket.id} connected`)
		SOCKET_LIST[socket.id] = socket

		socket.on("getScore", async player => {
			socket.emit("getScoreResponse", await gameSheet.getCellValue(player, 7))
		})
		
		socket.on("addCell", async data => {
			await gameSheet.addCellValue(data.row, data.col, data.diff)
			socket.emit("addCellResponse")
		})
		
		socket.on("disconnect", () => {
			console.log(`User ${socket.id} disconnected`)
			delete SOCKET_LIST[socket.id]
		})
	})
})()
