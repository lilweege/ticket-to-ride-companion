const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const { GoogleSpreadsheet } = require('google-spreadsheet')

class SimpleSheetInterface {
	constructor(id, secret) {
		this.id = id
		this.secret = process.env.HEROKU ? {
			client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			private_key: process.env.GOOGLE_PRIVATE_KEY,
		} : require(secret)
	}
	
	async initSheet(rows, cols, page = 0) {
		let doc = new GoogleSpreadsheet(this.id)
		await doc.useServiceAccountAuth(this.secret)
		await doc.loadInfo()
		this.sheet = doc.sheetsByIndex[page]
		
		await this.sheet.loadCells(`A1:${alpha[cols - 1]}${rows}`)
	}
	
	async updateCell(row, col) {
		let a1 = `${alpha[col]}${row + 1}`
		await this.sheet.loadCells(`${a1}:${a1}`)
	}
	
	async addCellValue(row, col, diff) {
		await this.updateCell(row, col)
		const cell = this.sheet.getCell(row, col)
		cell.value += diff
		await cell.save()
	}
	
	async getCellValue(row, col) {
		await this.updateCell(row, col)
		return this.sheet.getCell(row, col).value
	}
	
	async setCellValue(row, col, val) {
		const cell = this.sheet.getCell(row, col)
		cell.value = val
		await cell.save()
	}
}

module.exports = { SimpleSheetInterface }