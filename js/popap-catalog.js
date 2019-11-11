var modalDialogOpen = false;

var canShowModal = false;

$(window).on('load', function(){

    var innerWidth = window.innerWidth;

    var startPoint;

    var endPoint;

    var scrollTopTimer;

    var itemsHeightArrCat;

    var itemsHeightArrDog;

    var countImgs;

    var countLoadImgs = 0;

    var modalDialogMargin;

    var itemMargin;

    var modalDialogTimer;

    var user = detect.parse(navigator.userAgent);
    var deviceType = user.device.type;

    $('.modal-catalog').after($('.modal-catalog').clone().addClass('modal-catalog-clone').removeAttr('id'));

    $('.modal-catalog-close').click(function(){

        $(this).parent().modal('hide');
    });

    $('#modal-catalog').on('show.bs.modal', function(){

        modalDialogOpen = true;

        if (deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            $('.questions-footer-wrapper').css('left', '-20px');
        }
    });

    $('#modal-catalog').on('shown.bs.modal', function(){

        var scrollWidth = window.innerWidth - this.clientWidth;

        $('.modal-catalog-close').css('right', scrollWidth + 15 + 'px');
    });

    $('#modal-catalog').on('hidden.bs.modal', function(){

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

    $('.slider-wrapper').on('mousedown', function(e){

        startPoint = e.clientX;
    });

    $('.slider-wrapper').on('mouseup', function(e){

        endPoint = e.clientX;
    });

    countImgs = $('.modal-catalog-clone .modal-body .item img').length;

    $('.modal-catalog-clone .modal-body .item img').on('load', function(){

        countLoadImgs++;

        if (countLoadImgs === countImgs) {

            init();
        }
    });

    $(window).resize(function(){

        newInnerWidth = window.innerWidth;

        if (newInnerWidth !== innerWidth) {

            if (countLoadImgs === countImgs) {

                init();
            }
        }

        innerWidth = newInnerWidth;
    });

    function init(){

        if (!modalDialogOpen) {

            clearInterval(modalDialogTimer);

            canShowModal = false;

            $('.modal-catalog-clone').on('shown.bs.modal.correct', function(){

                modalDialogMargin = parseInt($(this).find('.modal-dialog').css('marginTop'));

                itemMargin = parseInt($(this).find('.modal-body .item').css('marginBottom'));

                itemsHeightArrCat = [];

                itemsHeightArrDog = [];

                $(this).find('.modal-body .item.cat').each(function(){

                    itemsHeightArrCat.push($(this).outerHeight(true));
                });

                $(this).find('.modal-body .item.dog').each(function(){

                    itemsHeightArrDog.push($(this).outerHeight(true));
                });

                $(this).modal('hide');

                $(this).off('shown.correct');
            });

            $('.modal-catalog-clone').on('show.bs.modal.correct', function(){

                var scrollWidth = window.innerWidth - document.documentElement.clientWidth;

                $('.questions-footer-wrapper').css('left', -scrollWidth + 'px');

                $(this).off('show.correct');
            });

            $('.modal-catalog-clone').on('hidden.bs.modal.correct', function(){

                $('.questions-footer-wrapper').css('left', '0');

                canShowModal = true;

                $(this).off('hidden.correct');
            });

            $('.modal-catalog-clone').modal('show');
        }
        else {

            clearInterval(modalDialogTimer);

            modalDialogTimer = setInterval(function(){

                init();
            }, 10);
        }
    }

    $('.slider .item').click(function(e){

        e.preventDefault();

        if (Math.abs(startPoint - endPoint) < 5 && canShowModal) {

            var self = this;

            var index = 0;

            var scrollTop = 0;

            $('.slider .item.' + $compareTable.find('.compare_table .this_project_tabs_head > li.active').attr('type')).each(function(){

                if ($compareTable.find('.compare_table .this_project_tabs_head > li.active').attr('type') === 'cat') {

                    scrollTop += itemsHeightArrCat[index];
                }
                else {

                    scrollTop += itemsHeightArrDog[index];
                }

                if (self === this) {

                    return false;
                }

                index++;
            });

            if ($compareTable.find('.compare_table .this_project_tabs_head > li.active').attr('type') === 'cat') {

                scrollTop -= itemsHeightArrCat[index];
            }
            else {

                scrollTop -= itemsHeightArrDog[index];
            }

            scrollTop += modalDialogMargin - itemMargin;

            scrollTopTimer = setInterval(function(){

                $('#modal-catalog').scrollTop(scrollTop);
            }, 10);

            $('#modal-catalog').on('shown.bs.modal.clearInterval', function(){

                clearInterval(scrollTopTimer);

                $(this).off('shown.clearInterval');
            });

            $('#modal-catalog').modal('show');
        }
    });
});