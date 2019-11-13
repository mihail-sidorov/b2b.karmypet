$(document).ready(function(){

  var user = detect.parse(navigator.userAgent);
  var deviceType = user.device.type;

  if (deviceType === 'Desktop' && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    $('.how-to-sell .items-wrapper .items .item:nth-child(even)').each(function(){

      $(this).after('<div class="item full-width"></div>');
    });

    $('.how-to-sell .items-wrapper .items').addClass('desktop');

    // var scrollWidth;

    // var scrollHeight = 1;

    // var scrollTop = 0;

    // var otstup;

    // init();

    // $(window).scroll(function(){

    //   scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //   var deltaScroll = $('.how-to-sell')[0].getBoundingClientRect().top;

    //   if (deltaScroll <= 0) {

    //     deltaScroll = Math.abs(deltaScroll);

    //     if (deltaScroll <= scrollWidth) {

    //       $('.how-to-sell-fixed').css({position: 'fixed', top: otstup, bottom: 'auto', left: '0', right: 'auto', width: '100%'});

    //       $('.items-wrapper').scrollLeft(deltaScroll);
    //     }
    //     else {

    //       $('.items-wrapper').scrollLeft(scrollWidth);

    //       $('.how-to-sell-fixed').css({position: 'absolute', top: 'auto', bottom: otstup, left: '0', right: 'auto', width: '100%'});
    //     }
    //   }
    //   else {

    //     $('.items-wrapper').scrollLeft(0);

    //     $('.how-to-sell-fixed').css({position: 'relative', top: parseInt(otstup) - parseInt($('.how-to-sell').css('paddingTop')) + 'px', bottom: 'auto', left: '0', right: 'auto', width: 'auto'});
    //   }
    // });

    // $(window).resize(function(){

    //   init();
    // });

    // function init() {

    //   var margin = Math.floor((document.documentElement.clientWidth - 1100) / 2);

    //   if (margin < 100) {

    //     margin = 100;
    //   }

    //   $('.how-to-sell .item').eq(0).css('margin-left', margin + 'px');

    //   $('.how-to-sell .item').eq($('.how-to-sell .item').length - 1).css('margin-right', margin + 'px');

    //   otstup =  Math.floor((document.documentElement.clientHeight - parseInt($('.how-to-sell-fixed').css('height'))) / 2) + 'px';

    //   scrollWidth = $('.items-wrapper')[0].scrollWidth - $('.items-wrapper')[0].clientWidth;

    //   $('.how-to-sell').css('height', document.documentElement.clientHeight + scrollWidth + 'px');

    //   var scrollHeightNew = Math.max(
    //     document.body.scrollHeight, document.documentElement.scrollHeight,
    //     document.body.offsetHeight, document.documentElement.offsetHeight,
    //     document.body.clientHeight, document.documentElement.clientHeight
    //   ) - document.documentElement.clientHeight;

    //   scrollTop = (scrollTop / scrollHeight) * scrollHeightNew;

    //   scrollHeight = scrollHeightNew;

    //   window.scrollTo(0, scrollTop);
    // }
  }
});