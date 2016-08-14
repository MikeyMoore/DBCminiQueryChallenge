/*!
 * minQuery
 */

var SweetSelector = {
	select: function(id){
		if(id[0] == '#'){
			id = id.substr(1)
		}
		id = document.getElementById(id)
		return id
	}
}