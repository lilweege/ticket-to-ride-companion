const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const { GoogleSpreadsheet } = require('google-spreadsheet')

class SimpleSheetInterface {
	constructor(id, secret) {
		this.id = id
		this.secret = require(secret)
	}
	
	async init(rows, cols) {
		let doc = new GoogleSpreadsheet(this.id)
		await doc.useServiceAccountAuth(this.secret)
		await doc.loadInfo()
		this.sheet = doc.sheetsByIndex[0]
		await this.sheet.loadCells(`A1:${alpha[rows-1]}${cols}`)
	}
	
	getCellValue(row, col) {
		if (!this.sheet) return null
		return this.sheet.getCell(row, col).value
	}
	
	setCellValue(row, col, val) {
		const cell = this.sheet.getCell(row, col)
		cell.value = val
		cell.save()
	}
}

module.exports = { SimpleSheetInterface }