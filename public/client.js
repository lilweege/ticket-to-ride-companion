console.log("client running")

let socket = io()

const colors = ["#FFFFFF", "#FF7575", "#57BCD9", "#4BFE78", "#FFF06A", "#808080"]

window.addEventListener('DOMContentLoaded', e => {
	let buttons = form.querySelectorAll("button")
	let player
	
	for (let btn of buttons) {
		btn.addEventListener("click", e => {
			e.preventDefault()
			
			let r = parseInt(color.value),
				c = parseInt(btn.id)
			if (!r || !c)
				return
			
			score.innerText = "Loading..."
			socket.emit("addCell", {
				row: r,
				col: c,
				diff: 1
			})
		})
	}
	
	color.addEventListener("change", e => {
		player = parseInt(color.value)
		for (let btn of buttons) {
			if (btn.style.display !== "inline") {
				btn.style.display = "inline"
			}
			btn.style.backgroundColor = colors[player]
		}
		color.style.backgroundColor = colors[player]
		score.innerText = "Loading..."
		
		socket.emit("getScore", player)
	})
	
	socket.on("addCellResponse", () => {
		socket.emit("getScore", player)
	})
	
	socket.on("getScoreResponse", res => {
		score.innerText = res
	})
});
