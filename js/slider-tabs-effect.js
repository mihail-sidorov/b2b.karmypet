$(window).on('load', function(){

    init();

    $compareTable.find('.compare_table').on('click', '.this_project_tabs_head > li', function(){

        init();
    });

    $(window).resize(function(){

        init();
    });

    function init(){

        var array = $compareTable.find('.compare_table .this_project_tabs_head > li');

        var activeElement = $compareTable.find('.compare_table .this_project_tabs_head > li.active')[0];

        var position = parseInt($compareTable.find('.compare_table .this_project_tabs_head').css('paddingLeft'));

        for(var i = 0; i < array.length; i++ ){

            if (activeElement !== array[i]) {

                position += $(array[i]).outerWidth(true);
            }
            else {

                break;
            }
        }

        $compareTable.find('.compare_table .active-indicator-wrapper .active-indicator').stop().animate(

            {
                
                marginLeft: position,

                maxWidth: $(activeElement).outerWidth()
            },

            {

                duration: 200,

                easing: 'easeOutQuint',

                queue: false,
            }
        );
    }
});