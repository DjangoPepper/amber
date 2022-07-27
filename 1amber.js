
const Excel = require('exceljs');
//Create a Workbook
var workbook = new Excel.Workbook();
workbook.creator = 'Fred';
workbook.lastModifiedBy = 'LiO';
workbook.created = new Date(2022, 7, 25);
workbook.modified = new Date();
workbook.lastPrinted = new Date(2022, 7, 26);

//await workbook.xlsx.readFile(filename);