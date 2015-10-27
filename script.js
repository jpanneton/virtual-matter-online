function generateRandomBoxShadow(animated) {
    var content = document.getElementById("content");
    content.className = animated ? "animated-box-shadow" : "fixed-box-shadow";
    
    var randomColor = '#' + Math.random().toString(16).slice(2, 8);

    if(animated) {
        $("#content").css('box-shadow', 'none');
        setTimeout(function() {
            $("#content").css('box-shadow', '10px 10px 0px ' + randomColor);
        }, 400);
    }
    else {
        $("#content").css('box-shadow', '10px 10px 0px ' + randomColor);
    }
}

function updateHeight(section, currentHeight) {
    if(currentHeight === undefined) {
        // Last section height
        currentHeight = $(section).height();
        $(section).css('height', 'auto');
    }
    
    // Transition to new section height
    var autoHeight = $(section).height();
    $(section).height(currentHeight).stop().animate( {
        height: autoHeight
    }, 'fast');
}

function scrollToTop()  
{  
    $("html, body").animate( {  
            scrollTop: 0  
        }, 'fast');  
} 

$(document).ready(function() {
    
    // Animated box shadow
    generateRandomBoxShadow(true);

    // Home page setup
    $("#content div").hide();
    $("#home").show();
    updateHeight("#content");
    
    // Mobile devices menu trigger
    $("#menu-trigger").click(function() {
        $("#nav-menu-items").slideToggle(500, function() {
            $("#nav-menu-items").toggleClass('nav-expanded').css('display', '');
        });
    });
    
    // Navigation menu events
    $("#nav-menu-items a").click(function() {
        
        // Select menu item
        $("#nav-menu-items a").removeClass('selected');
        $(this).addClass('selected');
        
        // Last page height
        var currentHeight = $("#content").height();
        $('#content').css('height', 'auto');
        
        // Display according page
        var page = $(this).attr('href');
        $("#content div").filter(function(){ return ! $(this).is(":hidden"); })
                         .stop().fadeOut('fast', function() {
            // New page content fade-in
            $(page).stop().fadeIn('slow');
            
            // Animated page content wrapping (animated page height)
            updateHeight("#content", currentHeight);
        });
        
        // Restore default position
        scrollToTop();
        
        // Fixed box shadow
        generateRandomBoxShadow(false);
    });
});

$(window).load(function() {
    $(window).resize();
});

$(window).resize(function() {
    updateHeight("#content");
});