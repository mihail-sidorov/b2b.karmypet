
$(window).on('load', function(){

    var user = detect.parse(navigator.userAgent);
    var deviceType = user.device.type;

    var scrollPos = 0;

    var scrollWidth = 1;

    var slidWidth;

    var event = null;

    var touchOn = true;

    var startPoint;

    var startScroll;

    var canMove = false;

    var inertiaTimer;

    var inertiaTime;

    var progressPos;

    var progressWidth;

    var oldWay;

    var newWay;
    
    initSlider();

    $(window).resize(function(){

        initSlider();
    });

    $('.slider-wrapper').on('touchstart', function(e){
    
        event = e;
    });

    $('.slider-wrapper').on('touchmove', function(e){
    
        if (event && touchOn) {

            var deltaMove = e.touches[0].pageX - event.touches[0].pageX;

            var deltaMoveConst = 50;

            if (deltaMove < 0) {

                if (Math.abs(deltaMove) > deltaMoveConst) {

                    touchOn = false;

                    newWay = 'next';

                    if (oldWay && scrollPos !== 0 && scrollPos !== scrollWidth && oldWay !== newWay) {

                        slidWidth = parseInt($('.slider-wrapper .slider .item').css('marginRight')) + document.documentElement.clientWidth;
                    }
                    else {

                        slidWidth = parseInt($('.slider-wrapper .slider .item').css('width')) + parseInt($('.slider-wrapper .slider .item').css('marginRight'));
                    }

                    oldWay = newWay;

                    moveNext();
                }
            }
            else {

                if (Math.abs(deltaMove) > deltaMoveConst) {
                
                    touchOn = false;

                    newWay = 'prev';

                    if (oldWay && scrollPos !== 0 && scrollPos !== scrollWidth && oldWay !== newWay) {

                        slidWidth = parseInt($('.slider-wrapper .slider .item').css('marginRight')) + document.documentElement.clientWidth;
                    }
                    else {

                        slidWidth = parseInt($('.slider-wrapper .slider .item').css('width')) + parseInt($('.slider-wrapper .slider .item').css('marginRight'));
                    }

                    oldWay = newWay;
                    
                    movePrev();
                }
            }
        }
    });

    $('.slider-wrapper').on('touchend', function(e){
    
        event = null;

        touchOn = true;
    });

    if (deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        $('.slider-nav .next').click(function(){

            moveNext();
        });
    
        $('.slider-nav .prev').click(function(){
    
            movePrev();
        });

        $('.slider-wrapper').on('mousedown', function(e){
    
            e.preventDefault();

            $(this).find('.item').removeClass('yes-hover');
    
            $('.slider-wrapper').stop();
    
            canMove = true;
    
            startPoint = e.clientX;
    
            startScroll = $('.slider-wrapper').scrollLeft();

            inertiaTime = 0;

            inertiaTimer = setInterval(function(){

                inertiaTime += 10;
            }, 10);
        });
    
        $('.slider-wrapper').on('mouseup', function(e){
    
            e.preventDefault();
    
            canMove = false;

            inertia(e);
        });
    
        $('.slider-wrapper').on('mouseleave', function(e){

            if (canMove) {

                inertia(e);

                canMove = false;
            }
        });
    
        $('.slider-wrapper').on('mousemove', function(e){

            e.preventDefault();
    
            if (canMove) {
    
                var deltaMove = e.clientX - startPoint;
    
                scrollPos = startScroll - deltaMove;
    
                if (scrollPos < 0) {
    
                    scrollPos = 0;
                }
    
                if (scrollPos > scrollWidth) {
    
                    scrollPos = scrollWidth;
                }
    
                $('.slider-wrapper').scrollLeft(scrollPos);

                progressPos = (scrollPos * progressWidth) / scrollWidth;

                $('.slider-progress-bar-indicator').css('left', progressPos + 'px');
            }
        });
    }
    else {

        $('.slider-nav').css('display', 'none');
    }

    function initSlider(){

        oldWay = 'next';

        $('.slider-wrapper').stop();

        $('.slider-progress-bar-indicator').stop();

        $('.slider-wrapper .item').addClass('yes-hover');

        if (document.documentElement.clientWidth <= 414) {

            $('.slider-wrapper .item').css({width: document.documentElement.clientWidth - parseInt($('.slider-wrapper .item').css('marginRight')) * 2 + 'px'});
        }
        if (document.documentElement.clientWidth > 414) {

            $('.slider-wrapper .item').css({width: '355px'});
        }
        if ((deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && (document.documentElement.clientWidth > 414)) {
        
            $('.slider-container').addClass('desctop');
        }
        if ((deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && (document.documentElement.clientWidth <= 414)) {
        
            $('.slider-container').removeClass('desctop');
        }

        slidWidth = parseInt($('.slider-wrapper .slider .item').css('width')) + parseInt($('.slider-wrapper .slider .item').css('marginRight'));
        
        var scrollWidthNew = $('.slider-wrapper')[0].scrollWidth - $('.slider-wrapper')[0].clientWidth;

        scrollPos = (scrollPos / scrollWidth) * scrollWidthNew;

        scrollPos = Math.round(scrollPos / slidWidth) * slidWidth;

        scrollWidth = scrollWidthNew;

        setButtonState(scrollWidth);

        $('.slider-wrapper').scrollLeft(scrollPos);

        progressWidth = $('.slider-progress-bar')[0].clientWidth - $('.slider-progress-bar-indicator')[0].clientWidth;

        progressPos = (scrollPos * progressWidth) / scrollWidth;

        $('.slider-progress-bar-indicator').css('left', progressPos + 'px');
    }

    function movePrev(){

        scrollPos -= slidWidth;

        setButtonState(scrollWidth);

        progressPos = (scrollPos * progressWidth) / scrollWidth;
    
        $('.slider-wrapper').stop().animate(

            {
                
                scrollLeft: scrollPos
            },

            {

                duration: 1000,

                easing: 'easeOutQuint',

                queue: false,

                complete: function(){

                    $(this).find('.item').addClass('yes-hover');
                },
            }
        );

        $('.slider-progress-bar-indicator').stop().animate(

            {
                
                left: progressPos
            },

            {

                duration: 1000,

                easing: 'easeOutQuint',

                queue: false,
            }
        );
    }

    function moveNext(){

        scrollPos += slidWidth;

        setButtonState(scrollWidth);

        progressPos = (scrollPos * progressWidth) / scrollWidth;
    
        $('.slider-wrapper').stop().animate(

            {
                
                scrollLeft: scrollPos
            },

            {

                duration: 1000,

                easing: 'easeOutQuint',

                queue: false,

                complete: function(){

                    $(this).find('.item').addClass('yes-hover');
                },
            }
        );

        $('.slider-progress-bar-indicator').stop().animate(

            {
                
                left: progressPos
            },

            {

                duration: 1000,

                easing: 'easeOutQuint',

                queue: false,
            }
        );
    }

    function inertia(e){

        clearInterval(inertiaTimer);

        scrollPos = Math.floor((startPoint - e.clientX) / inertiaTime * 300 + scrollPos);

        setButtonState(scrollWidth);

        progressPos = (scrollPos * progressWidth) / scrollWidth;

        $('.slider-wrapper').stop().animate(

            {
                
                scrollLeft: scrollPos
            },

            {

                duration: 2000,

                easing: 'easeOutQuint',

                queue: false,

                complete: function(){

                    $(this).find('.item').addClass('yes-hover');
                },
            }
        );

        $('.slider-progress-bar-indicator').stop().animate(

            {
                
                left: progressPos
            },

            {

                duration: 1000,

                easing: 'easeOutQuint',

                queue: false,
            }
        );
    }

    function setButtonState(scrollWidth){

        if (scrollPos <= 0) {

            scrollPos = 0;

            $('.slider-nav .prev').addClass('blocked');
        }
        else {

            $('.slider-nav .prev').removeClass('blocked');
        }

        if (scrollPos >= scrollWidth) {

            scrollPos = scrollWidth;

            $('.slider-nav .next').addClass('blocked');
        }
        else {

            $('.slider-nav .next').removeClass('blocked');
        }
    }



    $compareTable.find('.this_project_tabs').on('click', '.this_project_tabs_head>li', function(){

        $('.slider-wrapper').stop();

        $('.slider-progress-bar-indicator').stop();

        $('.slider-wrapper .item').addClass('yes-hover');
    
        $('.slider .item').css('display', 'none');

        $('.slider  .item.' + $(this).attr('type')).css('display', 'flex');

        $('#modal-catalog .modal-body .item').css('display', 'none');

        $('#modal-catalog .modal-body .item.' + $(this).attr('type')).css('display', 'flex');

        scrollWidth = $('.slider-wrapper')[0].scrollWidth - $('.slider-wrapper')[0].clientWidth;

        $('.slider-wrapper').scrollLeft(0);

        scrollPos = 0;

        progressPos = 0;

        $('.slider-progress-bar-indicator').css('left', progressPos + 'px');

        $('.slider-nav .prev').addClass('blocked');

        $('.slider-nav .next').removeClass('blocked');
    });
});