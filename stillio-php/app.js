$(document).on('ready', function() {
	//Get Stillio Data
	getJsonText();
});

var slide,slideTotal,slideCurrent,right,left;

function slideInitial() {
  slide.addClass('proactivede');
  setTimeout(function() {
	slideRight();
  }, 1000);
}

function slideRight() {
  if (slideCurrent < slideTotal) {
	slideCurrent++;
  } else {
	slideCurrent = 0;
  }

  if (slideCurrent > 0) {
	var preactiveSlide = slide.eq(slideCurrent - 1);
  } else {
	var preactiveSlide = slide.eq(slideTotal);
  }
  var activeSlide = slide.eq(slideCurrent);
  if (slideCurrent < slideTotal) {
	var proactiveSlide = slide.eq(slideCurrent + 1);
  } else {
	var proactiveSlide = slide.eq(0);

  }

  slide.each(function() {
	var thisSlide = $(this);
	if (thisSlide.hasClass('preactivede')) {
	  thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
	}
	if (thisSlide.hasClass('preactive')) {
	  thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
	}
  });
  preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
  activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
  proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
}

function slideLeft() {
  if (slideCurrent > 0) {
	slideCurrent--;
  } else {
	slideCurrent = slideTotal;
  }

  if (slideCurrent < slideTotal) {
	var proactiveSlide = slide.eq(slideCurrent + 1);
  } else {
	var proactiveSlide = slide.eq(0);
  }
  var activeSlide = slide.eq(slideCurrent);
  if (slideCurrent > 0) {
	var preactiveSlide = slide.eq(slideCurrent - 1);
  } else {
	var preactiveSlide = slide.eq(slideTotal);
  }
  slide.each(function() {
	var thisSlide = $(this);
	if (thisSlide.hasClass('proactivede')) {
	  thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
	}
	if (thisSlide.hasClass('proactive')) {
	  thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
	}
  });
  preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
  activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
  proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
}

var slider_template = '<div class="slider-single"><a class="slider-single-download" href="javascript:void(0);">Download <i class="fa fa-download"></i></a><h1 class="slider-single-title"></h1><a class="slider-single-likes" href="javascript:void(0);"></a></div>';


function loadScreenshot(data) {
console.log(data);
	//var json = JSON.parse(data);
	var json = data;
	var screenshots = json.screenshots;
	var slider_images="";
	
	for(var i = 0; i < screenshots.length; i++){
	  slider_images+='<div class="slider-single" id="slider'+(i+1)+'"><a class="slider-single-download" href="javascript:void(0);">Download <i class="fa fa-download"></i></a><h1 class="slider-single-title"></h1><a class="slider-single-likes" href="javascript:void(0);"></a></div>';
	}
	
	$('.slider-content').append(slider_images);
	
	slide = $('.slider-single');
	slideTotal = slide.length - 1;
	slideCurrent = -1;
	
	for(var i= 0; i < screenshots.length; i++) {
	  var imgSrc = screenshots[i].screenshot_image;
	  image = $('<img id="image'+(i+1)+'" class="slider-single-image" />');
	  image.attr('src', imgSrc);
	  $('#slider'+(i+1)).append(image);
	}
	
    left = $('.slider-left');
    right = $('.slider-right');
	
    left.on('click', function() {
      slideLeft();
    });
    right.on('click', function() {
      slideRight();
    });
	
	slideInitial();
}

function getJsonText() {
	let myHeaders = new Headers({
		"Content-Type" : "text/html"
	});
	
	let url = 'getUrl.php?api_token=qi4P5981S1I0JAB3VWJp5KNKviEopedx8Z4HWINjv7LbdNaTbqX5PzE6RSJM&url_id=3c809f22-13f6-49db-bfd8-63d3df847bb9';
	let options = {
		method: 'get',
		mode: 'cors'
	}
	fetch(url,options)
	  .then(handleResponse)
	  .then(data => { loadScreenshot(data); })
	  .catch(error => console.log(error))

	function handleResponse(response) {
	  let contentType = response.headers.get('content-type')
	  if(contentType == null) {
		throw new Error(`Sorry, content-type is null`)
	  }
	  if (contentType.includes('application/json')) {
		return handleJSONResponse(response)
	  } else if (contentType.includes('text/html')) {
		return handleTextResponse(response)
	  } else {
		// Other response types as necessary. I haven't found a need for them yet though.
		throw new Error(`Sorry, content-type ${contentType} not supported`)
	  }
	}
	function handleJSONResponse (response) {
	  return response.json()
		.then(json => {
		  if (response.ok) {
			return json
		  } else {
			return Promise.reject(Object.assign({}, json, {
			  status: response.status,
			  statusText: response.statusText
			}))
		  }
		})
	}
	function handleTextResponse (response) {
	  return response.text()
		.then(text => {
		  if (response.ok) {
			return text
		  } else {
			return Promise.reject({
			  status: response.status,
			  statusText: response.statusText,
			  err: text
			})
		  }
		})
	}
}