/*!
 * minQuery
 */

var SweetSelector = {
	select: function(item){
		if(item[0] == '#'){
			idItem = item.substr(1)
			foundItem = document.getElementById(idItem)
			return foundItem
		} else if(item[0] == '.'){
			classItem = item.substr(1)
			foundItem = document.getElementsByClassName(classItem)
			return foundItem
		} else {
			foundItem = document.getElementsByTagName(item)
			return foundItem
		}
	}
};

var DOM = {
	hide: function(item){
		if(item[0] == '#'){
			SweetSelector.select(item).style.visibility='hidden'
		} else {
			var selectedArray = SweetSelector.select(item);
			for (i=0; i<selectedArray.length; i++){
				selectedArray[i].style.visibility='hidden'
			};
		};
	},
	show: function(item){
		if(item[0] == '#'){
			SweetSelector.select(item).style.visibility='visible'
		} else {
			var selectedArray = SweetSelector.select(item);
			for (i=0; i<selectedArray.length; i++){
				selectedArray[i].style.visibility='visible'
			};
		};
	}
}