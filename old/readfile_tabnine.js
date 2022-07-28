const Excel = require('exceljs');
var workbook = new Excel.Workbook();

workbook.xlsx.readFile('../sample.xlsx').then(() => {
	var sheet = workbook.getWorksheet("ExampleSheet");
	console.log(sheet.actualRowCount)
	for (var i = 1; i <= sheet.actualRowCount; i++) {
		for (var j = 1; j <= sheet.actualColumnCount; j++) {
			data = sheet.getRow(i).getCell(j).toString();
			process.stdout.write(data+" ");
			// console.log(data)
		}
		console.log()
	}
});