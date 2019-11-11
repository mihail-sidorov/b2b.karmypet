$(window).on('load', function(){

    var $footerBlockScroll = $('.questions-footer-for-scroll');

    var $footerBlockWrapper = $('.questions-footer-wrapper');

    var footerHeight;

    $footerBlockWrapper.css('display', 'block');

    init();

    $(window).resize(function(){

        init();
    });

    function init(){

        $footerBlockWrapper.css({height: 'auto', overflow: 'visible'});

        footerHeight = Math.floor($footerBlockWrapper.outerHeight());

        if (footerHeight > document.documentElement.clientHeight) {

            footerHeight = document.documentElement.clientHeight;

            $footerBlockWrapper.css('overflow', 'auto');
        }

        $footerBlockScroll.css('height', footerHeight + 'px');

        $footerBlockWrapper.css('height', footerHeight + 'px');
    }
});