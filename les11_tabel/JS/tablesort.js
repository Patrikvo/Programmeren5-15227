
// Constants

// codes for both arrows.
const UP_ARROW = '\u2191';
const DOWN_ARROW = '\u2193';
const ASCENDING = "asc";
const DECENDING = "desc";


class TableSort {
	
    constructor(id) {
        // id should refere to the id of a table.
		
        this.tableElement = document.getElementById(id);
        if (this.tableElement && this.tableElement.nodeName == "TABLE") {
            this.prepare();
        }
    }

    prepare() {
		// Add arrows to headers and add evenListener.

        // default is ascending order
        var headings = this.tableElement.tHead.rows[0].cells;
        // headings is een htmlcollection
        for (let i = 0; i < headings.length; i++) {
			headings[i].innerHTML = headings[i].innerHTML + '<span>&nbsp;&nbsp;' + UP_ARROW + '</span>';
            headings[i].className = ASCENDING; 
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
		alpha.alphaSort = this.alphaSort;	
		numeric.numericSort = this.numericSort;
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
		if (headerCell.className == ASCENDING ) { 
			numeric.sort(function (a, b) { return numeric.numericSort(a,b, false); });
            alpha.sort(function (a, b) { return alpha.alphaSort(a, b, false); });
		}else {
			numeric.sort(function (a, b) { return numeric.numericSort(a,b, true); });
            alpha.sort(function (a, b) { return alpha.alphaSort(a, b, true); });
        }

        // Reorder HTML table based on new order of data found in the col array
        orderdedColumns = numeric.concat(alpha);
        let tBody = this.tableElement.tBodies[0];
        for (let i = 0; orderdedColumns[i]; i++) {
            tBody.appendChild(orderdedColumns[i].row);
        }
    }

	// return the relative order of the two input strings. If invert is 'true', then the order is inverted.
    alphaSort(a, b, invert) {
        let aName = a.value.toLowerCase();
        let bName = b.value.toLowerCase();

        var result;
        if (aName < bName) {
            result = -1;
        }
        else if (aName > bName) {
            result = 1;
        }
        else {
            result = 0;
        }
        if (invert == true) {
            result = -result;
        }
        return result;
    }

	// return the relative order of the two input numeric values. If invert is 'true', then the order is inverted.
	numericSort(a, b, invert) {
		if (invert){
			return b.value - a.value;
		}
		else{
			return a.value - b.value;
		}
	}




    eventHandler(event) {
		// switch up/down arrow and re-sort table.

        if (event.target.tagName === 'TH') {
			
                if (event.target.className == ASCENDING)  {  
                    event.target.className = DECENDING; 
					event.target.innerHTML =  event.target.innerHTML.replace(UP_ARROW, DOWN_ARROW);
                }
                else {
                    event.target.className = ASCENDING; 
					event.target.innerHTML =  event.target.innerHTML.replace(DOWN_ARROW,UP_ARROW);
                };
		
            this.sortColumn(event.target);
        }
    }

}


window.onload = function () {
    var jommeke = new TableSort("jommeke");
    var fruit = new TableSort("fruit");
}