jQuery(document).ready(function($){
	//open popup
	$('.popup-trigger').on('click', function(event){
		event.preventDefault();
		$('.popup').addClass('is-visible');
	});
	
	//close popup
	$('.popup').on('click', function(event){
		if( $(event.target).is('.popup-close') || $(event.target).is('.popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.popup').removeClass('is-visible');
	    }
    });

    $('.popup-win-trigger').on('click', function(event){
		event.preventDefault();
		$('.popup-win').addClass('is-visible');
	});

	$('.popup-trigger-err').on('click', function(event){
		event.preventDefault();
		$('.popup-err').addClass('is-visible');
	});
	
	//close popup
	$('.popup-err').on('click', function(event){
		if( $(event.target).is('.popup-close') || $(event.target).is('.popup-err') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.popup-err').removeClass('is-visible');
	    }
    });
});


