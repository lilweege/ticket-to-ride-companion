console.log("client running")

let socket = io()

send.addEventListener('click', e => {
	socket.emit('update', {
		col: 1,
		row: 1,
		val: "test"
	})
})