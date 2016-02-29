/*function next(){
	curr = $("section.show");
	indx = curr.index();
	curr.removeClass("show");
	nxt = indx+1;
	
	$("section:eq("+nxt+")").addClass("show");
	
	return indx;
}



function next(){
	var curr = $("section.show").index();
	if($('section').size()>curr){
		$('section').hide().removeClass("show");
		curr++;
		$('section:eq('+curr+')').show().addClass("show");
	}
	$("body").css("background", cores[curr]);
}

*/
/*
function next(){
	curr = $("section.show");
	indx = curr.index();
	curr.removeClass("show");
	nxt = indx+1;
	
	$("section:nth-child("+nxt+")").addClass("show");
	
	return indx;
}
*/

/*

data-add-class
data-out-class
data-too
data-end
data-keep-class

data-trigger
data-execute

*/

function next(){
	var current = $("*.next:not('.current, [data-out-already='true']')").first();
	
	function moveOut(element){
		//element.removeClass(element.attr("data-add-class")!=undefined && element.attr("data-keep-class")!=undefined? element.attr("data-add-class"): "current");
		//se possui data-keep-classes mantem todas as classes e só adiciona a classe out
		//senão remove todas as classes do add-class e a classe current
		//adiciona a classe out
		//põe true no data-out-already
		if(element.attr("data-out-aready")==undefined){
			element.removeClass(element.attr("data-keep-class")!=undefined?"": element.attr("data-add-class")+" current").addClass("out").attr("data-out-already", "true");
			return true;
		}else{
			return false;
		}
	}

	function moveBack(element){
		//ainda n mostrado: possui classe next, não possui classe current e data-out-already=undefined
		//atualmente mostrado: possui classe next possui classe current e data-out-already = undefined
		//já fora: possui classe next, e data-out-already = "true"
		
		if(element.attr("data-out-aready")==undefined && element.hasClass("current")){
			
		}else if(true){
			
		}else{
			
		}
	}
	
	function moveOn(element){
		if(element.attr("data-add-class")!= undefined){
			element.addClass(element.attr("data-add-class"));
		}
		
		if(element.attr("data-too")!= undefined){
			moveOn($(element.attr("data-too")));
		}
		
		if(element.attr("data-end")!=undefined){
			
			
			$("*.next.current:not([data-out-already='true'])").each(function(index){
				if($(this).attr("data-out-class")!=undefined){
					$(this).addClass($(this).attr("data-out-class"));
				}
				if($(this).attr("data-keep-class")==undefined){
					$(this).removeClass($(this).attr("data-add-class")!=undefined? $(this).attr("data-add-class")+" current": "current");
				}
				
				$(this).attr("data-too")!=undefined? moveOut($($(this).attr("data-too"))): false;
				$(this).attr("data-out-already","true");
				
			});
		}
		
		if(element.attr("data-execute")!=undefined){
			window[element.attr("data-execute")]();
		}
		element.addClass("current");
	}
	
	moveOn(current);
}

var cores = ["#8e44ad", "#e67e22", "#2ecc71", "#e74c3c", "#3498db", "#1dd2af"];
var i = 1;

function changeColor(){
	$("body").css("background", cores[i]);
	i++;
}

$(function(){
	$("body").keypress(function(e){
		next();
		if(e.which == 13){
			next();	
		}
	});
});