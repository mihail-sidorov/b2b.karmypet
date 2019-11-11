$(document).ready(function(){

    var user = detect.parse(navigator.userAgent);
    var deviceType = user.device.type;

    if (deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    
        var loaderWidth = 0;

        var currentSlide = 0;

        var canProgress = true;

        var timer = setInterval(function(){

            if (canProgress) {

                loaderWidth += 1;

                $('.reviews .owl-dot.active span').css('width', loaderWidth + '%');

                if (loaderWidth === 100) {

                    currentSlide++;

                    if (currentSlide > 2) {

                        currentSlide = 0;
                    }

                    $('.reviews .owl-dot').eq(currentSlide).trigger('click');
                }
            }
        }, 50);

        $('.slide-items').on('click', '.owl-dot', function(){

            var self = this;

            var index = 0;

            loaderWidth = 0;

            $('.reviews .owl-dot.active span').css('width', loaderWidth + '%');

            $('.reviews .owl-dot').each(function(){

                if (self === this) {

                    currentSlide = index;
                }

                index++;
            });
        });

        $('.slide-items').mouseenter(function(){

            canProgress = false;
        });

        $('.slide-items').mouseleave(function(){

            canProgress = true;
        });
    }
    else {

        $('.reviews .owl-dots').addClass('mobile');
    }
});