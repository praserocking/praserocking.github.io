$(document).ready(function(){
	$("#header").sticky({
		topSpacing:0
	});
	$("#hey").sticky({
		topSpacing:68
	});
	$("#vert-menu").sticky({
		topSpacing:200
	});
  	$('#b').click(function() {
		$("html, body").animate({ scrollTop:$("#bl").offset().top-100},"slow");
	});
});