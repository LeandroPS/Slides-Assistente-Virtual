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

var cores = ["#8e44ad", "#e67e22", "#2ecc71", "#e74c3c", "#3498db", "#F44336", "#E91E63", "#3F51B5", "#00BCD4", "#607D8B"];
//var i = 0;
var i = 8;

function changeColor(){
	$("body").css("background", cores[i]);
	i++;
}

function dismiss(){
	$("button.mic, div.speech").addClass("dismiss");
	$("button.cancel").addClass("show");
}

function spotify(musica){
	/*
	<div class="spotify">
				<span class="spotify-title"><i class="fa fa-spotify"></i> Spotify</span>
				<span class="artist">The Beatles</span>
				<span class="track">Hey Jude</span>
				<div class="album-cover"></div>
				<div class="controles">
					<button class="back">
						<i class="fa fa-step-backward fa-2x"></i>
					</button>
					<button class="play-pause">
						<i class="fa fa-play fa-2x"></i></button>
					<button class="forward">
						<i class="fa fa-step-forward fa-2x"></i>
					</button>
				</div>
			</div>
	*/
	$("div.album-cover").css("background-image","url("+musica["imagem"]+")");
	$("span.artist").text(musica["artista"]);
	$("span.track").text(musica["track"]);
	$("div.spotify").addClass("show");
	$("audio").attr("src", musica["preview"]).trigger("play");
}

$(function(){
	changeColor();
	$("body").keypress(function(e){
		next();
		if(e.which == 13){
			next();	
		}
	});
	
	if (annyang) {
	  // Let's define a command.	
		annyang.setLanguage("pt-BR");
		
		annyang.addCallback("result", function(said){
			console.log(said);
			$("span.placeholder").text(said[0]);
		});
		
		annyang.getSpeechRecognizer();
		
		var commands = {
			'olá todo mundo': 
				function() { 
					alert('olá brasil!'); 
				},
			'cancele': function() { 
					$("button.cancel").trigger("click"); 
				},
			'cancelar': function() { 
					$("button.cancel").trigger("click"); 
				},
			
			'(quero) ouvir *tag': function(artista){
				var musica = [];
				$.get("https://api.spotify.com/v1/search",{q: artista, type:"artist"}, function(data){
					//data = JSON.parse(data);
					console.log(data);
					console.log(data.artists.items[0].id);
					
					musica["artista"] = data.artists.items[0].name;
					$.get("https://api.spotify.com/v1/artists/"+data.artists.items[0].id+"/top-tracks",{country:"BR"}, function(tracks){
						console.log(tracks);
						musica["track"] = tracks.tracks[0].name;
						musica["imagem"] = tracks.tracks[0].album.images[0].url;
						musica["preview"] = tracks.tracks[0].preview_url;
						
						console.log(musica);
						dismiss();
						setTimeout(function(){
							spotify(musica);
						}, 1000);
					});
					
				});
				
			}
		};

		// Add our commands to annyang
		annyang.addCommands(commands);
	}
	
	$("button.mic").click(function(){
		annyang.start();
	});
	
	$("button.play-pause").click(function(){
		var player = document.getElementById('player');
		if(player.paused){
			player.play();
		}else{
			player.pause();
		}
	});
	
	$("audio").on("play", function(){
		$("button.play-pause i").removeClass("fa-play").addClass("fa-pause");
	});
	
	$("audio").on("pause", function(){
		$("button.play-pause i").removeClass("fa-pause").addClass("fa-play");
	});
	
	$("button.cancel").click(function(){
		span = jQuery("<span></span>").addClass("placeholder").text("Clique no botão abaixo e diga algo legal");
		$("div.speech").html(span);
		$("button.mic, div.speech").delay(1500).removeClass("dismiss");
		$("button.cancel, div.spotify").removeClass("show");
		$("audio").trigger("pause");
	});
});