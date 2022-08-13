//2beebeer_script
//import { writeFile, writeFileSync } from 'fs';

const btn_dep = document.querySelector('#btndep');
const valeur_de_dep = document.querySelector('#depart');
const btn_des = document.querySelector('#btndes');
const valeur_de_des = document.querySelector('#destination');

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
//funtion advancedbuttonvalue
// var message = 'ça va ?';
// document.write('<input type="text" value="' + message + '" />');

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
function upload() {
	var files = document.getElementById('file_upload').files;
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

//Method to read excel file and convert it into JSON
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
			//reading on ly first sheet data
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
		htmlData += '<tr>	 <td>' + (jsonData.length + 1) + '</td>' + "" +
			'<td>' + "" + '</td>' + "" +
			'<td>' + "" + '</td>' + "" +
			'<td>' + "" + '</td>' + "" +
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

function savexlsfile() {
	if (fileUpLoaded == true) {
		// var saved_filename = filename;
		//alert (saved_filename);
		// import { writeFile, writeFileSync } from 'fs';
		writeFile("saved_json", "Hey there!", function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});
		// Or
		//writeFileSync('/tmp/test-sync', 'Hey there!');
	}
}
function export2json() {
	// const data = {
	// 	a: '111',
	// 	b: '222',
	// 	c: '333'
	// };
	//jsonData
	const a = document.createElement("a");
	a.href = URL.createObjectURL(
		new Blob([JSON.stringify(jsonData, null, 2)], {
			type: "application/json"
		})
	);
	a.setAttribute("download", "RANdata.json");
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}