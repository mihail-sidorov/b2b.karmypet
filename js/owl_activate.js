
$('.reviews .slide-items').owlCarousel({
    loop:true, //Зацикливаем слайдер
    margin:20, //Отступ от элемента справа в 50px
    nav:false, //Отключение навигации
    dots:true,
    mouseDrag:false,
    autoplay:false, //Автозапуск слайдера
    smartSpeed:200, //Время движения слайда
    autoplayTimeout:2000, //Время смены слайда
    responsive:{ //Адаптивность. Кол-во выводимых элементов при определенной ширине.
        0:{
            items:1
        }
    }
});

$(document).ready(function(){

    correctReviewsDotsPadding();

    $(window).resize(function(){

        correctReviewsDotsPadding();
    });

    function correctReviewsDotsPadding(){

        $('.reviews .slide-items .owl-dots').css('paddingLeft', Math.round(parseInt($('.reviews .slide-items .owl-dots').css('width')) * 0.3) + 'px');
    }
});