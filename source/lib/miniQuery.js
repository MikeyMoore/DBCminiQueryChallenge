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
}