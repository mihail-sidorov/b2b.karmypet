$(document).ready(function(){

    var user = detect.parse(navigator.userAgent);
    var deviceType = user.device.type;

    $('#order-call').on('show.bs.modal', function(){

        modalDialogOpen = true;

        if (deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            $('.questions-footer-wrapper').css('left', '-20px');
        }

        $('.container-fluid, .questions-footer-wrapper').addClass('blur');
    });

    $('#order-call').on('hide.bs.modal', function(){

        $('.container-fluid, .questions-footer-wrapper').removeClass('blur');
    });

    $('#order-call').on('hidden.bs.modal', function(){

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

    $('.get-call-fixed, .get-call-fixed-mobile').click(function(){

        if (canShowModal) {

            $('#order-call').modal('show');
        }
    });

    $('.order-call-close').click(function(){

        $(this).parent().modal('hide');
    });
});