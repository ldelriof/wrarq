$(window).bind('hashchange', function() {
	var sec_hash = window.location.hash.toString().substring(1);
  if(sec_hash) {
  	$(".black-bar").fadeOut()
		$("."+sec_hash).fadeIn()
  }
});


$(function() {
	$(".info").on('click', function() {
		window.location.hash = 'description'
	})

	$(".slider, .close").on('click', function() {
		$(".black-bar").fadeOut()
		window.location.hash = ''
	})

	var sec_hash = window.location.hash.toString().substring(1);
  if(sec_hash) {
		$("."+sec_hash).fadeIn()
  }



 	var window_focus = true;
	var sliders = [];
	$(".slider").each(function() {

		var sliderObj = sliders[$(this).index()]

		sliderObj= new silderClass( $(this).children(".slide"), $(this).find(".dots .dot"), $(this).find(".chevrons div") );


		if(!$(this).hasClass('no-interval')) {
			sliderObj.intervalo = setInterval(function () { 
				sliderObj.fade(true, sliderObj.imgGal);
				console.log(window_focus)
			}, 5000);
		}

		sliderObj.imgGal.click(function() {
			sliderObj.fade(true,sliderObj.imgGal);
			clearInterval(sliderObj.intervalo);
		});
		sliderObj.dot.click(function() {
			sliderObj.fadeAuto($(this).index(), sliderObj.imgGal);
			clearInterval(sliderObj.intervalo);
		});
		sliderObj.flechas.click(function() {
			if($(this).is(".right")) {
				sliderObj.fade(true,sliderObj.imgGal);
				clearInterval(sliderObj.intervalo);
			} else {
				sliderObj.fade(false,sliderObj.imgGal);
				clearInterval(sliderObj.intervalo);
			}
		});
		
		$(window).focus(function() {
		    window_focus = true;
		}).blur(function() {
		    window_focus = false;
				clearInterval(sliderObj.intervalo);
		});

	})

  
});


  
var silderClass = function(imgGal, dot, flechas) {
	this.imgGal = imgGal;
	this.dot = dot;
	this.flechas = flechas;
	this.imgGal.eq(0).fadeIn(600);
	this.dot.eq(0).addClass("act");
	this.iInt = 1;
	this.fade = function(next,img) {
		if (img.length > 1 ) { 
			if (next) {cond1 = this.iInt; cond2 = img.length; } else {cond1 = 1; cond2 = this.iInt; };
			if (cond1 < cond2) {
				img.fadeOut(600);
				if (next) {this.iInt++; } else { this.iInt-- }
				img.eq(this.iInt - 1).fadeIn(600);
			} else {
				img.fadeOut(600);
				if (next) {this.iInt = 1 } else { this.iInt =  img.length };
				img.eq(this.iInt-1).fadeIn(600);
			}
		}
		this.iIntAct = this.iInt - 1;
		this.dot.removeClass("act");
		this.dot.eq(this.iIntAct).addClass("act");
	}
	this.fadeAuto = function(iInti,img) {
		if(this.iIntAct != iInti) {
			img.fadeOut(600);
			img.eq(iInti).fadeIn(600);
			this.iIntAct = iInti;
			this.iInt = iInti+1;
			this.dot.removeClass("act");
			this.dot.eq(iInti).addClass("act");
		}
	};
}