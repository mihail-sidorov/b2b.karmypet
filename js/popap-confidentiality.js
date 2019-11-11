$(document).ready(function(){

    var user = detect.parse(navigator.userAgent);
    var deviceType = user.device.type;

    $('#confidentiality').on('show.bs.modal', function(){

        modalDialogOpen = true;

        if (deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            $('.questions-footer-wrapper').css('left', '-20px');
        }
    });

    $('#confidentiality').on('shown.bs.modal', function(){

        var scrollWidth = window.innerWidth - this.clientWidth;

        $('.confidentiality-close').css('right', scrollWidth + 15 + 'px');
    });

    $('#confidentiality').on('hidden.bs.modal', function(){

        var show = false;

        var self = this;

        $('.modal').each(function(){

            if (self !== this) {

                if ($(this).hasClass('show')) {

                    show = true;

                    return false;
                }
            }
        });

        if (!show) {

            modalDialogOpen = false;

            if (deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                $('.questions-footer-wrapper').css('left', '0');
            }
        }
        else {

            $('body').addClass('modal-open');
        }
    });

    $('.get-discount-form-captcha-label a, .questions-form-captcha-label a, .order-call-form-captcha-label a').click(function(e){

        e.preventDefault();

        if (canShowModal) {
        
            $('#confidentiality').modal('show');
        }
    });

    $('.confidentiality-close').click(function(){

        $(this).parent().modal('hide');
    });
});