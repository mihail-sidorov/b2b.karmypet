
$(document).ready(function(){

    correctTopBlock();

    $(window).resize(function(){

        correctTopBlock();
    });

    function correctTopBlock(){

        $('.top-block').css('maxWidth', Math.floor((document.documentElement.clientWidth + 1400) / 2)) + 'px';
    }
});