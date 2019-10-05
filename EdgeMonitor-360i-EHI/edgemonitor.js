/*jshint esversion: 6 */

$(document).on('ready', function() {
    addButtons();
});

var slide, slideTotal, slideCurrent, right, left;

function slideInitial() {
    slide.addClass('proactivede');
    setTimeout(function() {
        slideRight();
    }, 1000);
}

function slideRight() {
    var preactiveSlide, proactiveSlide;
    if (slideCurrent < slideTotal) {
        slideCurrent++;
    } else {
        slideCurrent = 0;
    }

    if (slideCurrent > 0) {
        preactiveSlide = slide.eq(slideCurrent - 1);
    } else {
        preactiveSlide = slide.eq(slideTotal);
    }
    var activeSlide = slide.eq(slideCurrent);
    if (slideCurrent < slideTotal) {
        proactiveSlide = slide.eq(slideCurrent + 1);
    } else {
        proactiveSlide = slide.eq(0);
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
    var proactiveSlide, activeSlide, preactiveSlide;
    if (slideCurrent > 0) {
        slideCurrent--;
    } else {
        slideCurrent = slideTotal;
    }

    if (slideCurrent < slideTotal) {
        proactiveSlide = slide.eq(slideCurrent + 1);
    } else {
        proactiveSlide = slide.eq(0);
    }
    activeSlide = slide.eq(slideCurrent);
    if (slideCurrent > 0) {
        preactiveSlide = slide.eq(slideCurrent - 1);
    } else {
        preactiveSlide = slide.eq(slideTotal);
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

var slider_template = '<div class="slider-single"><a class="slider-single-download" href="javascript:void(0);">Download <i class="fa fa-download"></i></a></div>';

function loadScreenshot(data) {
    var json = JSON.parse(data);
    var screenshots = json.screenshots;
    var slider_images = "";

    $('.slider-content').empty();

    for (var i = 0; i < screenshots.length; i++) {
        slider_images += '<div class="slider-single" id="slider' + (i) + '"><a class="slider-single-likes" href="javascript:void(0);"></a></div>';
    }

    $('.slider-content').append(slider_images);

    slide = $('.slider-single');
    slideTotal = slide.length - 1;
    slideCurrent = -1;

    for (var j = 0; j < screenshots.length; j++) { //for loop parses individual screenshots from json object, appends img tags, download with screenshot href, date created
        var imgSrc = screenshots[j].screenshot_image; //sets paresed images to a variable for reuse

        console.log(imgSrc); //checking the obj

        image = $('<img id="image' + j + '" class="slider-single-image" alt="" />'); //parses screenshot image from JSON object and sets to variable
        image.attr('src', imgSrc); //adds screenshot image to src attr of <img> tag
        $('#slider' + (j)).append(image); //appends <img> tag to page 

        zoomImage = $('<a class="slider-single-title" target="_blank">Zoom In <i class="fa fa-plus-square"></i></a>');
        zoomImage.attr('href', imgSrc);
        $('#slider' + (j)).append(zoomImage);

        download = $('<a class="slider-single-download" href="" download="">Download <i class="fa fa-download"></i></a>'); //parses image URL from JSON object and sets to variable
        download.attr('href', imgSrc);
        download.attr('download', imgSrc); //adds link to screenshot to href attr of <a> tag as a "zoom" feature
        $('#slider' + (j)).append(download); //appends <a> tag to page and adds href attr with each screenshot URL parsed from JSON to allow user to view zoomed-in version of image	

        var created = screenshots[j].created; //parses date from JSON object and sets to variable
        date = $('<div class="slider-single-likes">' + created + '</div>'); //adds date to download div tag
        $('#slider' + (j)).append(date); //appends date from object to the page next to each image in slider
    }
    left = $('.slider-left');
    right = $('.slider-right');

    left.off('click');
    right.off('click');

    left.on('click', function() {
        slideLeft();
    });
    right.on('click', function() {
        slideRight();
    });
    slideInitial();
}

var urlIds = []; //empty array for later use in function
function addButtons() { //adds buttons to page
    var buttons = [
        // '<button id="thrifty_ebates" class="buttons">Thrifty Ebates</button>', //button tags in array with unique ids, CSS class and names
        '<button id="one" class="buttons">Website 1</button>',
        '<button id="two" class="buttons">Website 2</button>',
        '<button id="three" class="buttons">Website 3</button>'
        // '<button id="four" class="buttons">Hertz RetailMeNot</button>',
        // '<button id="five" class="buttons space2">Hertz Groupon</button>',
        // '<button id="six" class="buttons">Avis Ebates</button>',
        // '<button id="avis_rmn" class="buttons">Avis RetailMeNot</button>',
        // '<button id="avis_groupon" class="buttons">Avis Groupon</button>'
    ];
    for (var i = 0; i < buttons.length; i++) { //iterates through all <button> tags in buttons array
        console.log(buttons[i]);
        $('.buttons-container').append(buttons[i]); //appends each button in array to page
    }

    urlIds = [ //key value pair array includes url id's for unique id of each API call
        { id: 'one', url: '58168bb7-5c60-4fb8-9785-4a426d473359' },
        { id: 'two', url: '58168bf2-ae4c-42d1-bb34-4e7b6d473359' },
        { id: 'three', url: '58168c0a-a130-4798-af6b-469a6d473359' }
        // { url: '32502397-40f9-459a-80fe-e6bdf2cfcecc', id: 'thrifty_rmn' },
        // { url: 'c90abc30-98f5-4256-acb5-27a33042b8fe', id: 'thrifty_groupon' },
        // { url: 'f59ee633-c958-4ae1-85af-1ec8776b054b', id: 'hertz_ebates' },
        // { url: 'd7a369e7-deda-46a3-86e2-ed5e68beac48', id: 'hertz_rmn' },
        // { url: 'ddad77fe-193f-4580-8707-17b2814c560a', id: 'hertz_groupon' },
        // { url: '3b835c61-9e1c-4c62-921a-9eda81d30a35', id: 'avis_ebates' },
        // { url: '8177e9de-c509-40c7-9c3e-7c848b5ac6ab', id: 'avis_rmn' },
        // { url: '43abc608-31fd-4461-92fd-401e677d1534', id: 'avis_groupon' }
    ];

    for (var j = 0; j < urlIds.length; j++) { //loop to append data-api-urlid to buttons
        $('#' + urlIds[j].id).attr('data-api-urlid', urlIds[j].url); //calls url value from each key value pair in array and appends to each button as attr
    }

    $('.buttons-container button').on('click', function(e) { getJsonText($(this).attr('data-api-urlid')); }); //Apply button listener to all buttons in the button container
}

function getJsonText(api_Url_Ids) { //makes API call, param feeds unique IDs to be appeneded to each button on click and call that unique API
    var proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy allows for CORS requests
    var base = 'https://app.stillio.com/api/screenshots?'; //base Stillio URL
    var apiKey = 'api_token=nTCEr2dNe9xTZUpiNKQ8HcwXqLgEa2211rPxwNhdqAjX99jb9FUUBnfDid3N&url_id='; //api token

    let url = proxy + base + apiKey + api_Url_Ids; //build URL
    console.log(api_Url_Ids); //checking to make sure data-api-urlid is being passed properly
    let options = { //options for API call
        method: 'get',
        headers: { //headers for API call
            'Access-Control-Allow-Origin': '*',
        }
    };

    fetch(url, options) //fetch method calls API
        .then(handleResponse)
        .then(data => {
            loadScreenshot(data);
            console.log(data);
        })
        .catch(error => console.log(error));

    //handles possible responses from API
    function handleResponse(response) {
        let contentType = response.headers.get('content-type');
        if (contentType.includes('application/json')) {
            return handleJSONResponse(response);
        } else if (contentType.includes('text/html')) {
            return handleTextResponse(response);
        } else {
            // Other response types as necessary. I haven't found a need for them yet though.
            throw new Error(`Sorry, content-type ${contentType} not supported`)
        }
    }

    function handleJSONResponse(response) {
        return response.json()
            .then(json => {
                if (response.ok) {
                    return json;
                } else {
                    return Promise.reject(Object.assign({}, json, {
                        status: response.status,
                        statusText: response.statusText
                    }));
                }
            });
    }

    function handleTextResponse(response) {
        return response.text()
            .then(text => {
                if (response.ok) {
                    return text;
                } else {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText,
                        err: text
                    });
                }
            });
    }
}