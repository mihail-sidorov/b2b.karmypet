$(document).ready(function(){

    var user = detect.parse(navigator.userAgent);
    var deviceType = user.device.type;
  
    if (!(deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {

        var scrollPos = 0;

        var scrollWidth = 1;

        var slidWidth;

        var event = null;

        var touchOn = true;

        var oldWay;

        var newWay;

        $('.how-to-sell .item').addClass('phone');

        init();

        $(window).resize(function(){

            init();
        });

        $('.how-to-sell .items-wrapper').on('touchstart', function(e){
    
            event = e;
        });
    
        $('.how-to-sell .items-wrapper').on('touchmove', function(e){
        
            if (event && touchOn) {
    
                var deltaMove = e.touches[0].pageX - event.touches[0].pageX;
    
                var deltaMoveConst = 50;
    
                if (deltaMove < 0) {
    
                    if (Math.abs(deltaMove) > deltaMoveConst) {
    
                        touchOn = false;

                        newWay = 'next';

                        if (oldWay && scrollPos !== 0 && scrollPos !== scrollWidth && oldWay !== newWay) {

                            slidWidth = $('.how-to-sell .item').outerWidth(true) - $('.how-to-sell .item').outerWidth() + document.documentElement.clientWidth;
                        }
                        else {

                            slidWidth = $('.how-to-sell .item').outerWidth(true);
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

                            slidWidth = $('.how-to-sell .item').outerWidth(true) - $('.how-to-sell .item').outerWidth() + document.documentElement.clientWidth;
                        }
                        else {

                            slidWidth = $('.how-to-sell .item').outerWidth(true);
                        }

                        oldWay = newWay;
                        
                        movePrev();
                    }
                }
            }
        });
    
        $('.how-to-sell .items-wrapper').on('touchend', function(e){
        
            event = null;
    
            touchOn = true;
        });

        function movePrev(){
        
            scrollPos -= slidWidth;

            if (scrollPos < 0) {

                scrollPos = 0;
            }

            $('.how-to-sell .items-wrapper').stop().animate(

                {
                    
                    scrollLeft: scrollPos
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

            if (scrollPos > scrollWidth) {

                scrollPos = scrollWidth;
            }

            $('.how-to-sell .items-wrapper').stop().animate(

                {
                    
                    scrollLeft: scrollPos
                },
    
                {
    
                    duration: 1000,
    
                    easing: 'easeOutQuint',
    
                    queue: false,
                }
            );
        }

        function init() {

            oldWay = 'next';

            $('.how-to-sell .items-wrapper').stop();

            if (document.documentElement.clientWidth <= 560) {

                $('.how-to-sell .item').css({width: document.documentElement.clientWidth - parseInt($('.how-to-sell .item').css('marginRight')) * 2 + 'px'});
            }
            else {

                $('.how-to-sell .item').css({width: '500px'});
            }
        
            slidWidth = $('.how-to-sell .item').outerWidth(true);
        
            var scrollWidthNew = $('.how-to-sell .items-wrapper')[0].scrollWidth - $('.how-to-sell .items-wrapper')[0].clientWidth;

            scrollPos = (scrollPos / scrollWidth) * scrollWidthNew;

            scrollPos = Math.round(scrollPos / slidWidth) * slidWidth;

            if (scrollPos < 0) {

                scrollPos = 0;
            }

            if (scrollPos > scrollWidthNew) {

                scrollPos = scrollWidthNew;
            }

            scrollWidth = scrollWidthNew;

            $('.how-to-sell .items-wrapper').scrollLeft(scrollPos);
        }
    }
});