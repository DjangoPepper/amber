var total = 0;
var course = 0;
var nrOfLessons = 0;
var vat = 0;

course = Number(document.getElementById("course").value)
nrOfLessons = Number(document.getElementById("nrOfLessons").value)

total =(course * nrOfLessons)
vat = total * 0.15
total = total+ vat;
document.getElementById('total').innerHTML = total;