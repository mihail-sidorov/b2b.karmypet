$(document).ready(function(){

    var minusWidth;

    init();

    $(window).resize(function(){

        init();
    });

    function init(){

        minusWidth = 0;

        $compareTable.find('.compare_table .table-wrapper table .trafic td:nth-child(2) div span, .compare_table .table-wrapper table .trafic td:nth-child(2) div label').each(function(){

            minusWidth += $(this).outerWidth();
        });
    
        minusWidth = $compareTable.find('.compare_table .table-wrapper table .trafic td:nth-child(2) div').outerWidth() - minusWidth;
    
        $compareTable.find('.table-background').css('width', parseInt($compareTable.find('.table-background').parent().css('width')) - minusWidth + 'px');
    
        $compareTable.find('.table-background').css('height', parseInt($compareTable.find('.compare_table table').css('height')) + 250 + 'px');
    }
});