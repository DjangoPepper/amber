
			function validePosition(x) {
				//upload();
				posSelected = true;
				//if ( fileSelected == true) {
				valpos = x.target.value;
				confirm(valpos);
				document.getElementById("choixPosition").innerHTML = valpos;
				//}
				//sumColumnDestination();
			}

			Array.from(document.getElementsByClassName("position")).forEach(function(j){
				j.addEventListener("click", validePosition);
			});

			function valideDestination(x) {
				//upload();
				desSelected = true;
				//if ( fileSelected == true) {
				valdes = x.target.value;
				confirm(valdes);
				document.getElementById("choixDestination").innerHTML = valdes;
				//}
				//sumColumnPosition();
			}

			Array.from(document.getElementsByClassName("destination")).forEach(function(i){
				i.addEventListener("click", valideDestination);
			});
