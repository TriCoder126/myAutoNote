function slideIn(e, durration){
	var anim = setInterval(function(){
		clearInterval(anim);
		$('.centeredBelow').addClass('centered');
		$('.centeredBelow').removeClass('centeredBelow');
	}, 10);
}

function slideOut(e, durration){
	var anim = setInterval(function(){
		clearInterval(anim);
		$('.centered').addClass('centeredBelow');
		$('.centered').removeClass('centered');
		
	}, 10);
}

function imageAnimation() {
    //var frames = document.getElementById("backgrounds").children;
    var images = ["anim2/background0088.png", "anim2/background0087.png","anim2/background0086.png","anim2/background0085.png","anim2/background0084.png","anim2/background0083.png","anim2/background0082.png","anim2/background0081.png"];
    //var frameCount = frames.length;
    var i = 0;
    var imgAnim = setInterval(function () { 
    	if(i == images.length-1){
    		document.getElementById("openBackground").src = "backgrounds/background3.png";
        	clearInterval(imgAnim);
        }else{
        	document.getElementById("openBackground").src = images[i];
        	i++;
	        //frames[i % frameCount].style.opacity = 0;
	        //frames[++i % frameCount].style.opacity = 1;
	    }

    }, 25);
}

var loading = false;
function startLoad(duration){//non-positive time mean undetermined loading time (requiors finishLoad() to terminate)
	loading = true;
	$('#loadingIcon').animate({ marginRight: '20px' , opacity: 0.99 }, 100);
	if(duration > 0){
		var i = 0;
		var timer = setInterval(function(){
			i+=duration/100;
			if(i >= 100){
				clearInterval(timer);
				$('#loadingIcon').animate({ marginRight: '-50px' , opacity: 0 }, 100);
				laoding = false;
			}
			$('#loadingIcon').animateRotate(350, 350);
		}, 325);
	}else{
		var timer = setInterval(function(){
			if(!loading)
				clearInterval(timer);
			$('#loadingIcon').animateRotate(350, 350);
		}, 350);
	}
	
}
function finishLoad(){
	$('#loadingIcon').animate({ marginRight: '-50px' , opacity: 0 }, 100);
	loading = false;
}

$.fn.animateRotate = function(angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };

    $({deg: 0}).animate({deg: angle}, args);
  });
};

