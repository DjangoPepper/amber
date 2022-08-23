function openNavLeft() {
	document.getElementById("mySidenavLeft").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNavLeft() {
	document.getElementById("mySidenavLeft").style.width = "0";
	document.getElementById("main").style.marginLeft = "0";
	document.body.style.backgroundColor = "white";
}

function openNavRight() {
	document.getElementById("mySidenavRight").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNavRight() {
	document.getElementById("mySidenavRight").style.width = "0";
	document.getElementById("main").style.marginLeft = "0";
	document.body.style.backgroundColor = "white";
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		document.getElementsByClassName("TopNavi").style.top = "0";
	} else {
		document.getElementsByClassName("TopNavi").style.top = "-50px";
	}
	prevScrollpos = currentScrollPos;
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		document.getElementById("topinav").style.top = "0";
	} else {
		document.getElementById("topinav").style.top = "-50px";
	}
	prevScrollpos = currentScrollPos;
}

function submitform() {
	document.myform.submit();
}
/* When the user clicks on the button,toggle between hiding and showing the dropdown content */
/* function myDropFunction_Excel() {
	document.getElementById("myDropdown_Excel").classList.toggle("show");
} */
function myDropFunction_Excel() {
	document.getElementById('file_upload_Excel').click();
}

// function myDropFunction_Name() {
// 	document.getElementById("myDropdown_Json").classList.toggle("show");
// }
function myDropFunction_Json() {
	document.getElementById('file_upload_Json').click();
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}
