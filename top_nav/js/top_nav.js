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
        setBodyPadding();
        if ($('body,html').scrollTop() > 100){
            $('body').addClass('scroll-down');
        }else{
            $('body').removeClass('scroll-down');
        }
    });

    function setBodyPadding(){
        $('body').css({
            'padding-top': $('#header3').height()+'px'
        });
    }
});