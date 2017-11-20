/*

Werk de TableSort klasse af (je mag de prototype based manier gebruiken of de nieuwe class-syntaxis of beiden):

    bij het opstarten staan de wijzen de pijltjes in de kolommen naar boven;
    als de gebruiker op een kolomkop klikt:
        worden de rijen geordend in de volgorde die door het pijltje wordt aangegeven
        verandert het pijltje van richting

    de commit: "TableSort Opdracht Final".
*/

	var upArrow = '\u2191';
	var downArrow = '\u2193';
class TableSort {

	
	
	
    constructor(id) {
        // When calling an object constructor or any of its methods,
        // this’ refers to the instance of the object
        // much like any class-based language
        this.tableElement = document.getElementById(id);
        if (this.tableElement && this.tableElement.nodeName == "TABLE") {
            this.prepare();
        }
    }
    prepare() {
        // add arrow up
        // default is ascending order
        var headings = this.tableElement.tHead.rows[0].cells;
        // headings is een htmlcollection
        for (let i = 0; i < headings.length; i++) {
			headings[i].innerHTML = headings[i].innerHTML + '<span>&nbsp;&nbsp;' + upArrow + '</span>';
            headings[i].className = 'asc';
        }
		
		
		
        this.tableElement.addEventListener("click", function (that) {
            return function (event) {
				that.eventHandler(event);
                return false;
            }
        }(this), false); 
    }
    sortColumn(headerCell) {
        // Get cell data for column that is to be sorted from HTML table
        let rows = this.tableElement.rows;
        let alpha = [],
            numeric = [];
        let alphaIndex = 0,
            numericIndex = 0;
        let cellIndex = headerCell.cellIndex;
        for (var i = 1; rows[i]; i++) {
            let cell = rows[i].cells[cellIndex];
            let content = cell.textContent ? cell.textContent : cell.innerText;
            let numericValue = content.replace(/(\$|\,|\s)/g, "");
            if (parseFloat(numericValue) == numericValue) {
                numeric[numericIndex++] = {
                    value: Number(numericValue),
                    row: rows[i]
                }
            }
            else {
                alpha[alphaIndex++] = {
                    value: content,
                    row: rows[i]
                }
            }
        }
        // Sort according to direction (ascending or descending)
        let orderdedColumns = [];
		if (headerCell.className == "asc" ){
			numeric.sort(function (a, b) {
				return a.value - b.value;
			});
		
			alpha.sort(function (a, b) {
				let aName = a.value.toLowerCase();
				let bName = b.value.toLowerCase();
				if (aName < bName) {
					return -1
				}
				else if (aName > bName) {
					return 1;
				}
				else {
					return 0;
				}
			});
		}else {
			numeric.sort(function (b, a) {
				return a.value - b.value;
			});
		
			alpha.sort(function (b, a) {
				let aName = a.value.toLowerCase();
				let bName = b.value.toLowerCase();
				if (aName < bName) {
					return -1
				}
				else if (aName > bName) {
					return 1;
				}
				else {
					return 0;
				}
			});
		}
        // Reorder HTML table based on new order of data found in the col array
        orderdedColumns = numeric.concat(alpha);
        let tBody = this.tableElement.tBodies[0];
        for (let i = 0; orderdedColumns[i]; i++) {
            tBody.appendChild(orderdedColumns[i].row);
        }
    }
    eventHandler(event) {

        if (event.target.tagName === 'TH') {
			
                if (event.target.className == "asc") {
                    event.target.className = 'desc';
					event.target.innerHTML =  event.target.innerHTML.replace(upArrow, downArrow);
                }
                else {
                    event.target.className = 'asc';
					event.target.innerHTML =  event.target.innerHTML.replace(downArrow,upArrow);
                };
		
            this.sortColumn(event.target);
        }
    }

}


window.onload = function () {
    var jommeke = new TableSort("jommeke");
    var fruit = new TableSort("fruit");

    



}