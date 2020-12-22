let socket = io()
console.log("connected with id" + socket.id)

const colorsArr = ["#FFFFFF", "#FF7575", "#57BCD9", "#4BFE78", "#FFF06A", "#808080"]
const loadingTxt = "Loading..."

window.addEventListener('DOMContentLoaded', e => {
	let buttons = form.querySelectorAll("button")
	
	for (let btn of buttons) {
		btn.addEventListener("click", e => {
			e.preventDefault()
			
			let [sign, column] = btn.id.split("")

			let diff
			if (sign === '-')
				diff = -1
			else if (sign === '+')
				diff = 1

			if (!diff || !column)
				return
			
			socket.emit("addCell", {
				row: color.selectedIndex,
				col: column,
				diff: diff
			})
			score.innerText = loadingTxt
		})
	}
	
	color.addEventListener("change", e => {
		socket.emit("getScore", color.selectedIndex)
		score.innerText = loadingTxt
		
		color.style.backgroundColor = colorsArr[color.selectedIndex]
		for (let btn of buttons) {
			if (btn.style.display !== "inline")
				btn.style.display = "inline"
			btn.style.backgroundColor = colorsArr[color.selectedIndex]
		}
	})
	
	socket.on("addCellResponse", () => {
		socket.emit("getScore", color.selectedIndex)
	})
	
	socket.on("getScoreResponse", res => {
		score.innerText = res
	})
});
