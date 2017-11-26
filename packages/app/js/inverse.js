var Inverse = function(){
    
    this.inverseNav = function(contain){
        var li = $(contain + ' ul li');
        var arrli = [];
        for(var i=li.length - 1;i>=0;i--){
            arrli.push($(li[i]).html());
        }
        var html = '<li>' + arrli.join('</li><li>') + '</li>';
        $(contain + ' ul').html(html);
    }
    
    this.inverseNav('.header-navigation');
//    this.inverseNav('.mob-menu-nav');
    
    $('link:last-of-type').after('<link rel="stylesheet" href="packages/app/css/inverse.css">');
    
    $('[data-read="ltr"]').each(function(i){
        if(typeof $(this).attr('id') != 'undefined'){
            var cl = '#' + $(this).attr('id');
        }else if(typeof $(this).attr('class') != 'undefined'){
            var cl = '.' + new String($(this).attr('class')).split(' ').join('.');
        }
        var disp = $(this).css('display');
        $(this).css('display','none');
        $(cl + '[data-read="rtl"]').css('display', disp);
    });
    
}