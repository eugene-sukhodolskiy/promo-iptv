var lay, purchasing;

$(document).ready(function(){
    
    lay = new LayJS();
    
    lay.setCallback('header', function(){
        $('.sandwitch').click(function(){
            $('.mobile-menu').addClass('mob-menu-active');
        });
    });
    
    lay.setCallback('mob-menu', function(){
        $('.mobile-menu-close').click(function(){
            $('.mobile-menu').removeClass('mob-menu-active');
        });
    });
    
    lay.setCallback('home', function(){
        $('.slick-carousel').slick({
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            arrow: false,
            prevArrow: '.prev-slide',
            nextArrow: '.next-slide'
        });
    });
    
    lay.setCallback('channels', function(){
        $('.channels-carousel').slick({
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false
        });
    });
    
    lay.setCallback('bundle', function(){
        $('#bundle button.bundle-buy').mouseover(function(){
            $(this).parent().addClass('bundle-card-hover');
        });

        $('#bundle button.bundle-buy').mouseout(function(){
            $(this).parent().removeClass('bundle-card-hover');
        });
    });
    
    lay.setCallback('purchasing', function(){
        
        purchasing = new Tabs({
            defaultTabId: 'reg'
        });

        purchasing.addBeforeSwitch('bundle', function(){
            $('.bundle-carousel').slick({
                slidesToShow: 4,
                slidesToScroll: 1
            });
            cannelsPacksSlickFlag = true;
        });
        
        purchasing.addBeforeSwitch('packs', function(){
            $('.channels-box-example').each(function(index){
                $(this).slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false,
                    autoplay: false,
                    arrows: true,
                    nextArrow: '.channels-box-details:eq('+index+')'
                });
            });
        });

        purchasing.generalBeforeSwitch = function(tabId){
            if(tabId != 'bundle' && cannelsPacksSlickFlag){
                cannelsPacksSlickFlag = false;
                $('.bundle-carousel').slick('unslick');
            }
        }

        purchasing.run();
        
        $('.channels-packs').mCustomScrollbar({
            'axis': 'y',
            'theme': 'dark',
            'setHeight': 98
        });
        
        

        $('[data-act="channels-box-add"]').click(function(){
            $(this).parent().addClass('channels-box-active');
        });

        $('[data-act="channels-box-rem"]').click(function(){
            $(this).parent().removeClass('channels-box-active');
        });
        
        $('#reg [name="full-name"]').focus();

    });
    
    lay.ending = function(){
        
        var nav = $('.header-navigation ul').html();
        $('.mob-menu-nav ul').html(nav);
        
        $('body').liLanding({
            topMargin:0, //89
            show: function(a,section){  
                var pages = {
                    'home': 'movies',
                    'movies': 'channels',
                    'channels': 'series',
                    'series': 'news',
                    'news': 'home'
                }
                var pageName = $(section).attr('id');
                if(typeof pageName == 'undefined'){
                    pageName = 'home';
                }
                if(pageName == 'news'){
                    $('.next-page-down').addClass('next-page-top');
                }else{
                    $('.next-page-down').removeClass('next-page-top');
                }
                $('.next-page-down').attr('href', '#'+pages[pageName]);
                $('.vertical-indicator-item a').removeClass('vi-active');
                $(a).addClass('vi-active');
            },
            speedFactor: .3
        });
        
        new TypeNumber('.channels-number-inp input');

        $('[name="payment-card"]').click(function(){
            $('.payment-cards-item-active').removeClass('payment-cards-item-active');
            $(this).parent().addClass('payment-cards-item-active');
        });
        
        $('.login-form').click(function(){
            $('.login-popup').css('display', 'block');
            $('.bound-popup-back').css('display','block');
            $('.login-popup [name="login"]').focus();
            return false;
        });
        
        $('.bound-popup-back').click(function(){
            $('.bound-popup').css('display', 'none');
            $('.bound-popup-back').css('display', 'none');
        });
        
        $('.mob-login-form').html($('.login-popup').html());
        
        $('.mob-login-form input.form-field').focus(function(){
            $('.mob-menu-nav').css({
                'overflow': 'hidden',
                'height': '10px'
            });
        });
        
        $('.mob-login-form input.form-field').blur(function(){
            $('.mob-menu-nav').removeAttr('style');
        });
        
        $('.forgot-password').click(function(){
            openPopup('forgot-pass');
            $('#forgot-pass [name="email"]').focus();
            return false;
        });

        $('.popup-back').click(function(){
            closePopups(300);
        });
        
        $('#forgot-pass form').submit(function(){
            if(!$('#forgot-pass .btn').hasClass('btn-orange')){
                return false;
            }
        });
        
        $('.btn.register').click(function(){
            purchasing.switch('bundle');
            $('.tab-switcher').removeClass('tab-switcher-active');
            $('[data-tab-id="bundle"]').addClass('tab-switcher-active');
        });
        
        $('.bundle-card .bundle-buy').click(function(){
            purchasing.switch('packs');
            $('.tab-switcher').removeClass('tab-switcher-active');
            $('[data-tab-id="packs"]').addClass('tab-switcher-active');
        });
        
        $('.payment .btn.to-payment').click(function(){
            purchasing.switch('purchasing');
            $('.tab-switcher').removeClass('tab-switcher-active');
            $('[data-tab-id="purchasing"]').addClass('tab-switcher-active');
        });
        
        setTimeout(function(){fadeOutnojquery(hellopreloader);},500);
        
        $('.brand-logo').click(function(){
            document.location = './';
        });
        
        new IfInpNoEmpty([
            '.login-popup [name="login"]',
            '.login-popup [name="password"]'
        ], function(){
            $('.login-popup .btn-login').addClass('btn-orange').removeClass('btn-grey');
        }, function(){
            $('.login-popup .btn-login').addClass('btn-grey').removeClass('btn-orange');
        });
        
        new IfInpNoEmpty([
            '.mob-login-form [name="login"]',
            '.mob-login-form [name="password"]'
        ], function(){
            $('.mob-login-form .btn-login').addClass('btn-orange').removeClass('btn-grey');
        }, function(){
            $('.mob-login-form .btn-login').addClass('btn-grey').removeClass('btn-orange');
        });
        
        new IfInpNoEmpty([
            '#forgot-pass .form-field'
        ], function(){
            $('#forgot-pass .btn').addClass('btn-orange').removeClass('btn-grey');
        }, function(){
            $('#forgot-pass .btn').addClass('btn-grey').removeClass('btn-orange');
        });
        
        new IfInpNoEmpty([
            '#reg [name="full-name"]',
            '#reg [name="phone"]',
            '#reg [name="email"]',
            '#reg [name="pass"]',
            '#reg .captcha #answer',
            '#reg #iagree'
        ], function(){
            $('#reg .btn').addClass('btn-orange').removeClass('btn-grey');
        }, function(){
            $('#reg .btn').addClass('btn-grey').removeClass('btn-orange');
        });
        
        new IfInpNoEmpty([], function(){
            $('.to-payment').addClass('btn-orange').removeClass('btn-grey');
        }, function(){
            $('.to-payment').addClass('btn-grey').removeClass('btn-orange');
        }).radioBtn('payment-card');
        
        $('.lang-panel').click(function(){
            $('.lang-popup').css('display', 'block');
            $('.bound-popup-back').css('display','block');
            return false;
        });
        
        initlang();
        
        var pathname = document.location.pathname.split('/');
        pathname = pathname[pathname.length - 1];
        console.log(pathname);
        $('a[href$="' + pathname + '"]').addClass('active');
        
        
    }
    
    lay.run();
    
    pageAutoMinHeight();
    setInterval(function(){
        pageAutoMinHeight();
    }, 300);
    
    $(document).scroll(function(){
        var curScroll = window.pageYOffset;
        
        if(curScroll > 10){
            $('.trial-label').addClass('tl-small');
//            $('.header-background').addClass('hb-shadow');
        }else{
            $('.trial-label').removeClass('tl-small');
//            $('.header-background').removeClass('hb-shadow');
        }
        
        var realheight = document.body.offsetHeight - window.innerHeight;
        if(realheight - curScroll < 250){
            $('.next-page-down').addClass('np-fixed-pos');
        }else{
            $('.next-page-down').removeClass('np-fixed-pos');
        }
    });
    
});

var cannelsPacksSlickFlag = false;

var pageAutoMinHeight = function(){
    var h = window.innerHeight + 'px';
    $('.page').css('min-height', h);
    $('.carousel-item').css('height', h);
    $('.slick-carousel').css('height', h);
}

var openPopup = function(popupId){
    $('.popup-back').addClass('popup-back-active');
    $('#'+popupId).addClass('popup-active');
}

var closePopups = function(time){
    $('.popup').removeClass('popup-active');
    setTimeout(function(){
        $('.popup-back').removeClass('popup-back-active');
    }, time);
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var initlang = function(){
    $('[data-lang]').click(function(){
        setCookie('lang', $(this).attr('data-lang'));
        document.location = document.location;
    });

    var lang = new String(document.location.hash).split('lang=')[1];

    if(typeof lang == 'undefined' || lang == ''){
        lang = getCookie('lang');
    }else{
        setCookie('lang', lang);
        document.location.hash = "";
    }

    if(typeof lang == 'undefined'){
        lang = $('[data-lang-default="default"]').attr('data-lang');
    }

    $('[data-lang="'+lang+'"]').addClass('active');
    $('.lang-name').html($('[data-lang="'+lang+'"]').html());
    if(lang == 'heb'){
        Inverse();
    }
}



