$(document).ready(function(){

    $('.slide-items').on('mousedown', '.read-more', function(e){

        if (e.which == 1) {

            var index = $(this).parents('.slide-item').attr('index');
    
            $(this).parents('.slide-items').find('.slide-item[index="' + index + '"]').find('.slide-item-desc').each(function(){
        
                $(this).children('.slide-item-desc-more').slideToggle();
                
                $(this).toggleClass('closed');
            });
        }
    });

    $(window).resize(function(){

        if (document.documentElement.clientWidth > 960) {
        
            $('.slide-item-desc').addClass('always-opened');
        }
        else {

            $('.slide-item-desc').removeClass('always-opened');
        }
    });
});