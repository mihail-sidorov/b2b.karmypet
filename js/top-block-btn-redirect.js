$(document).ready(function(){

    $('.top-block-wrapper .top-block-btn').click(function(e){

        if (e.target === this || !$(e.target).hasClass('get-call-fixed')) {

            $('html, body').stop().animate(

                {
                    
                    scrollTop: $('.start-work-wrapper').offset().top
                },
    
                {
    
                    duration: 1000,
    
                    easing: 'easeOutQuint',
    
                    queue: false,
                }
            );
        }
    });

    $('.top-block-wrapper .what-yet').click(function(){
    
        $('html, body').stop().animate(

            {
                
                scrollTop: $compareTable.find('.compare_table').offset().top + 1
            },

            {

                duration: 1000,

                easing: 'easeOutQuint',

                queue: false,
            }
        );
    });
});