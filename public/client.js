let socket = io()
console.log("connected to socket", socket)

const loadingText = "Loading..."
const loadingTrain = "..."

window.addEventListener('DOMContentLoaded', e => {
	let buttons = form.getElementsByClassName('sBtn')
	let spans = form.getElementsByClassName('sSpn')
	console.log(spans)
	
	for (let btn of buttons) {
		btn.addEventListener("click", e => {
			e.preventDefault()
			
			let column = parseInt(btn.parentElement.id)
			
			let diff
			if (btn.innerText[0] === '+')
				diff = 1
			else if (btn.innerText[0] === '-')
				diff = -1
			
			if (!column || !diff)
				return
			
			socket.emit("addCell", {
				row: color.selectedIndex,
				col: column,
				diff: diff
			})
			score.innerText = loadingText
			trains.innerText = loadingText
			document.getElementById(column).querySelectorAll('span')[0].innerText = loadingTrain
		})
	}
	
	color.addEventListener("change", e => {

		let hexValue = color.options[color.selectedIndex].value
		color.style.backgroundColor = hexValue
		for (let btn of buttons) {
			if (btn.style.display !== "inline")
				btn.style.display = "inline"
			btn.style.backgroundColor = hexValue
		}
		
		for (let span of spans) {
			if (span.style.display !== "inline")
				span.style.display = "inline"
			
			span.innerText = loadingTrain
		}
		score.innerText = loadingText
		trains.innerText = loadingText
		
		
		for (let c = 0; c <= 8; ++c)
			socket.emit("getCell", {
				row: color.selectedIndex,
				col: c
			})
	})
	
	socket.on("addCellResponse", data => {
		socket.emit("getCell", {
			row: color.selectedIndex,
			col: 7
		})
		socket.emit("getCell", {
			row: color.selectedIndex,
			col: data.request.col
		})
	})
	
	socket.on("getCellResponse", data => {
		// console.log(data.request.col, data)
		let val = data.response.result ? data.response.result : 0
		
		if (data.request.col === 7) {
			score.innerText = val
		}
		else {
			document.getElementById(data.request.col).querySelectorAll('span')[0].innerText = val
			let total = 0
			for (let span of spans) {
				let v = parseInt(span.innerText)
				if (!isNaN(v))
					total += v
			}
			trains.innerText = total
		}
	})
});
