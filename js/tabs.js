

$(window).on('load', function(){

    $('.this_project_tabs').on('click', '.this_project_tabs_head > li', function(){

        var self = this;

        var num = 0;

        $(self).parent().children().each(function(){

            if (self === this) {

                $(this).addClass('active');

                $('.this_project_tabs').find('.this_project_tabs_item').css('display', 'none');

                $($('.this_project_tabs').find('.this_project_tabs_item')[num]).css('display', 'block');
            }
            else {

                $(this).removeClass('active');
            }

            num++;
        });
    });
});