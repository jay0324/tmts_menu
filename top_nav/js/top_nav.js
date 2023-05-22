$(function(){

    setBodyPadding();

    $("#header3 .dropdown-toggle").on('click', function(){
        if(!$(this).parent().hasClass('open')){
            $('body').addClass('disable-scroll');
        }else{
            $('body').removeClass('disable-scroll');
        }
    });

    $(window).on('scroll resize', function(){
        if ($('body,html').scrollTop() > 0){
            $('body').addClass('scroll-down');
        }else{
            $('body').removeClass('scroll-down');
        }
    });

    $(window).on('resize', function(){
        setBodyPadding();
    });

    function setBodyPadding(){
        $('body').css({
            'padding-top': $('#header3').height()+'px'
        });
    }
});