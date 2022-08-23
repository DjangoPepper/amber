const btn_dep = document.querySelector('#btndep');
const valeur_de_dep = document.querySelector('#id_origin');
const btn_des = document.querySelector('#btndes');
const valeur_de_des = document.querySelector('#id_final');

var fileToUploadSelected = false;
var fileUpLoaded = false;
var Selected_Dep = false;
var Selected_Des = false;
var value_Dep = "0";
var value_Des = "0";

var value_cu = 0;
var value_nb = 0;
var valeur_de_ran = 0;
var ran_txtValue = 0;
var jsonData;		//jsonData is in main
var table = document.getElementById("display_excel_data");//table is in main
var jsDlenght = 0;
var filename = "";
var Display_reload = false;
var filter_display = 0;

//Medthod to search anything
function filter() {
	var input_search, filter_search, input_display, filter_display, table, tr, td, i, poi_txtValue, txtValue, rangvalue;

	input_search = document.getElementById("myinput_search");
	filter_search = input_search.value.toUpperCase();
	input_display = document.getElementById("myinput_display");
	filter_display = input_display.value.toUpperCase();
	table = document.getElementById("display_excel_data");
	tr = table.getElementsByTagName("tr");
	document.getElementById("id_nb").innerHTML = (value_nb);
	document.getElementById("id_cu").innerHTML = (value_cu);

	value_nb = -1;
	value_cu = 0;
	poi_txtValue = 0;
	ran_txtValue = 0;
	/*
		if (Selected_Dep == true){
			input_display = document.getElementById("myinput_display");
		} else {
			input_display = (valeur_de_dep.selectedIndex - 1)
		}
	*/
	if (Display_reload == true) {
		Display_reload = false;
		//input_display = (valeur_de_dep.selectedIndex - 1);
		input_display = filter_display;
	} else {
		input_display = document.getElementById("myinput_display");
	}


	for (i = 0; i < tr.length; i++) {
		let shouldDisplay = true;
		td_ran = tr[i].getElementsByTagName("td")[0];
		td_ref = tr[i].getElementsByTagName("td")[1];
		td_poi = tr[i].getElementsByTagName("td")[2];
		td_pos = tr[i].getElementsByTagName("td")[3];

		if (td_pos) {
			txtValue = td_pos.textContent || td_pos.innerText;
			if (txtValue.toUpperCase().indexOf(filter_display) < 0) {
				shouldDisplay = false;
			}
		}

		if (td_ref) {
			txtValue = td_ref.textContent || td_ref.innerText;
			if (txtValue.toUpperCase().indexOf(filter_search) < 0) {
				shouldDisplay = false;
			}
		}

		if (td_poi) {
			poi_txtValue = td_poi.textContent || td_poi.innerText;
		}

		if (td_ran) {
			ran_txtValue = td_ran.textContent || td_ran.innerText;
			if (value_nb > 0) {
				valeur_de_ran = 1 * ran_txtValue;
			}
		}

		if (shouldDisplay) {
			tr[i].style.display = "";
			value_nb++;
			if (value_nb > 0) {
				value_cu = value_cu + (1 * poi_txtValue);
				value_cu = Math.round(value_cu*100)/100;
			}
		}
		else {
			tr[i].style.display = "none";
		}
	}
}

//Here are theworking functions
btn_des.onclick = (event) => {
	event.preventDefault();
	valide_Dep();
	valide_Des();
};

function valide_Dep(x) {
	//upload();
	if (fileToUploadSelected == true && fileUpLoaded == true) {
		Selected_Dep = true;
		//alert(valeur_de_dep.selectedIndex - 1);
		document.getElementById("choix_Dep").innerHTML = (valeur_de_dep.selectedIndex - 1);
		document.getElementById("myinput_display").innerHTML = (valeur_de_dep.selectedIndex - 1);
	}
}

Array.from(document.getElementsByClassName("class-Dep")).forEach(function (j) {
	j.addEventListener("click", valide_Dep);
});

function valide_Des(x) {
	if (fileToUploadSelected == true) {
		Selected_Des = true
		document.getElementById("choix_Des").innerHTML = (valeur_de_des.selectedIndex - 1);
	}
}

Array.from(document.getElementsByClassName("class-Des")).forEach(function (i) {
	i.addEventListener("click", valide_Des);
});

function sortTable(n) {
	const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
	const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
		v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
	)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
	// do the work...
	document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
		const table = th.closest('table');
		Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
			.sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
			.forEach(tr => table.appendChild(tr));
	})));
}

// Method to upload a valid excel file
function upload_Excel() {
	var files = document.getElementById('file_upload_Excel').files;
	if (files.length == 0) {
		fileToUploadSelected = false;
		fileUpLoaded = false;
		alert("Please choose any file...");
		return;
	}
	filename = files[0].name;
	var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
	if (extension == '.XLS' || extension == '.XLSX') {
		//Here calling another method to read excel file into json
		excelFileToJSON(files[0]);
		fileToUploadSelected = true;
		fileUpLoaded = true;
	} else {
		alert("Please select a valid excel file.");
		fileToUploadSelected = false;
		fileUpLoaded = false;
	}
}

// Method to import a valid json file
function upload_Json() {
	var files = document.getElementById('file_upload_Json').files;
	if (files.length == 0) {
		fileToimportSelected = false;
		fileimported = false;
		alert("Please choose any json file...");
		return;
	}
	var filename = files[0].name;
	var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
	if (extension == '.json' || extension == '.JSON') {
		//Here calling another method to read excel file into json
		excelFileToJSON(files[0]);
		fileToimportSelected = true;
		fileimported = true;
	} else {
		alert("Please select a valid json file.");
		fileToimportSelected = false;
		fileimported = false;
	}
}

//Method to read exel file and convert it into JSON
function excelFileToJSON(file) {
	try {
		var reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = function (e) {

			var data = e.target.result;
			var workbook = XLSX.read(data, {
				type: 'binary'
			});
			var result = {};
			var firstSheetName = workbook.SheetNames[0];
			//reading only first sheet data
			jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
			//displaying the json result into HTML table
			displayJsonToHtmlTable(jsonData);
		}
	} catch (e) {
		console.error(e);
	}
}

//Method to display the data in HTML Table
function displayJsonToHtmlTable(jsonData) {
	//var table = document.getElementById("display_excel_data");
	if (jsonData.length > 0) {
		var htmlData = '<tr><th onclick="sortTable(0)">Rang</th><th onclick="sortTable(1)">Référence</th><th>Poids</th><th onclick="sortTable(2)">Position</th></tr>';
		//jsDlenght = jsonData.length + 1;
		// for (var i = 0; i < jsonData.length; i++) {
		for (var i = 0; i < jsonData.length; i++) {
			var row = jsonData[i];
			htmlData += '<tr><td>' + row["Rang"] + '</td>'
				+ '<td><button class="click_reference" onclick="showNewDestination(' + (i + 0) + ')">' + row["Référence"] + '</button></td>'
				+ '<td>' + row["Poids"] + '</td><td>' + row["Position"] + '</td></tr>';
		}
		//add an empty last line
		htmlData += '<tr>	 <td>' +(jsonData.length+1)+ '</td>' +""+
							'<td>' +""+ '</td>' +""+
							'<td>' +""+ '</td>' +""+
							'<td>' +""+ '</td>' +""+
					'</td></tr>';
		table.innerHTML = htmlData;
		// console.log(htmlData)
	} else {
		table.innerHTML = 'There is no data in Excel';
	}
}

//Method pour deplacer une reference
function showNewDestination(rangNewDest) {
	//rangNewDest = rangNewDest+1;
	jsonData[rangNewDest].Position = (valeur_de_des.selectedIndex - 1);
	confirm("For rang : " + (rangNewDest + 1) +	//le rang commence à 1 pas à 0
		" coils n° : " + jsonData[rangNewDest].Référence +
		", New dest : " + jsonData[rangNewDest].Position
	);
	displayJsonToHtmlTable(jsonData);
	Display_reload = true;
	filter();
}

function formatDate(d)
{
    //get the month
    var month = d.getMonth();
    //get the day
    //convert day to string
    var day = d.getDate().toString();
    //get the year
    var year = d.getFullYear();

    //pull the last two digits of the year
    year = year.toString().substr(-2);

    //increment month by 1 since it is 0 indexed
    //converts month to a string
    month = (month + 1).toString();

    //if month is 1-9 pad right with a 0 for two digits
    if (month.length === 1)
    {
        month = "0" + month;
    }

    //if day is between 1-9 pad right with a 0 for two digits
    if (day.length === 1)
    {
        day = "0" + day;
    }

    //return the string "MMddyy"
    return year + month + day;
}

function export2xls() {

			// date file's name to export
			var d = new Date();
			// var jsonfileNameToeXport = formatDate(d)+"_"+ id_name_du_navire.value + ".xlsx";

			var createXLSLFormatObj = [];
			/* XLS Head Columns */
			var xlsHeader = ["Rang", "Référence", "Poids", "Position"];

			createXLSLFormatObj.push(xlsHeader);
			$.each(jsonData, function (index, value) {
				var innerRowData = [];
				$("tbody").append('<tr><td>' + value.Rang + '</td><td>' + value.Référence + '</td><td>' + value.Poids + '</td><td>' + value.Position +'</td></tr>');
				$.each(value, function (ind, val) {
					innerRowData.push(val);
				});
				createXLSLFormatObj.push(innerRowData);
			});


			/* File Name */
			// var filename = id_name_du_navire.value + ".xls";
			var filename = formatDate(d)+"_"+ id_name_du_navire.value + ".xlsx";
			//filename = aujourdhui();

			/* Sheet Name */
			var ws_name = "FirstSheet";

			if (typeof console !== 'undefined'){
				console.log(new Date());
				var wb = XLSX.utils.book_new();
				var	ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
			}
			/* Add worksheet to workbook */
			XLSX.utils.book_append_sheet(wb, ws, ws_name);

			/* Write workbook and Download */
			if (typeof console !== 'undefined') {
				console.log(new Date());
				XLSX.writeFile(wb, filename);
			}

			if (typeof console !== 'undefined') {
				console.log(new Date());
			}
		// });
}

//Method to export current Json file into a named file
function export2json() {
	const a = document.createElement("a");
	a.href = URL.createObjectURL(
		new Blob([JSON.stringify(jsonData, null, 2)], {
			type: "application/json"
		})
	);

	var d = new Date();
	var jsonfileNameToeXport = formatDate(d)+"_"+ id_name_du_navire.value + ".json";
	// jsonfileNameToeXport = id_name_du_navire.value + ".json";
	a.setAttribute("download", jsonfileNameToeXport);
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function submitform() {
	document.myform.submit();
}