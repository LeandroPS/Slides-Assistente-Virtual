function next(){
	curr = $("section.show");
	indx = curr.index();
	curr.removeClass("show");
	nxt = indx+1;
	
	$("section:nth-child("+nxt+")").addClass("show");
	
	return indx;
}

$(function(){
	$("body").keypress(function(e){
		if(e.which == 13){
			next();	
		}
	});
});