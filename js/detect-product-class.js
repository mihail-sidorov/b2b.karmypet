var params = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );

var $compareTable;

switch(params['utm_content']) {

    case 'konkurent-cheap':

        $compareTable = $('.compare_table-wrapper.economy');

        break;

    case 'konkurent-analog':

        $compareTable = $('.compare_table-wrapper.premium');

        break;

    case 'konkurent-rich':

        $compareTable = $('.compare_table-wrapper.super-premium');

        break;
    
    default:

        $compareTable = $('.compare_table-wrapper.economy');

        break;
}

$compareTable.css('display', 'block');