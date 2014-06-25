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
  	$('#skills').click(function() {
		$("html, body").animate({ 
			scrollTop:$("#skills-content").offset().top-100
		},"slow");
	});
	$('#projs').click(function() {
		$("html, body").animate({ 
			scrollTop:$("#projs-content").offset().top-100
		},"slow");
	});
	$('#exps').click(function() {
		$("html, body").animate({ 
			scrollTop:$("#exps-content").offset().top-100
		},"slow");
	});
	$('#about').click(function() {
		$("html, body").animate({
			scrollTop:$("#about-content").offset().top-100
		},"slow");
	});
	$(".fa").hover(function(){
		$(this).addClass("fa-spin").delay(1000).removeClass("fa-spin");
	});
});