jQuery(document).ready(function ($) {
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 0,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1650: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      }
    },
  });

  // counter
  $('.counter').counterUp({
    delay: 10,
    time: 1600,
  });

  // goto top
  $('.goto-top').on('click', function () {
    $('body, html').animate({
      scrollTop: 0
    }, 1000);
    return false
  });

  // header
  // var options = {
  //   offset: 100,
  //   offsetSide: 'top',
  //   classes: {
  //     clone: 'header--clone',
  //     stick: 'header--stick',
  //     unstick: 'header--unstick'
  //   }
  // };
  // var header = new Headhesive('#header', options);
  // $('#header.header--clone').attr('id', 'header2');

  // quick btn
  $('.quick-btn').on('click', function () {
    $(this).parent('.quick').toggleClass('pull');
  });

  // hiraku
  $(".offcanvas-right").hiraku({
    btn: ".offcanvas-btn-right",
    fixedHeader: "#header",
    direction: "right"
  });

  // offcasvs
  var langMenu = '<div class="right-lang">' + $('.lang').html() + '</div>';
  var mainMenu = '<div class="right-title"></div><div class="right-menu">' + $('.main-menu').html() + '</div>';
  $('.offcanvas-right').append(langMenu).append(mainMenu);

  

  $('.head > .main-menu > ul> li').each(function () {    
    if($(this).children('a').siblings('ul').length>0){
      $(this).children('a').append('<div class="triangle-icon"></div>');
    }
    if(!$(this).hasClass('item-disable')){
      $(this).hover(function () {   
        $(this).children('ul').stop().slideDown();
      }, function () {
        $(this).children('ul').stop().slideUp();
      });
    }else{
      return;
    }
  });
  
  $('.mega>ul').css("display","flex");
  $('.mega>ul').hide();

  $('.item-disable').on('click',function(e){
    e.preventDefault();
  });
  if($('form[data-toggle="validator"]').length>0){
    $.fn.validator.Constructor.FOCUS_OFFSET=$('#header2').outerHeight()+24;
  } 
  $(".right-menu ul").simplemenu({
    usingbtn:true,
    directorylink:false,

  });

 

  $(".main-nav .mega-menu ul.dropdown-menu").wrap('<ul class="nav-mega dropdown-menu" role="menu"><li><div class="wrapper"><div class="wrap">');
  $(".main-nav ul.nav-mega ul").removeClass('dropdown-menu').removeAttr("role");

  $(".header-search .dropdown-menu").wrap('<div class="nav-mega dropdown-menu" role="menu"><div class="wrapper"><div class="wrap">');
  $(".header-search .nav-mega .dropdown-menu").removeClass('dropdown-menu').removeAttr("role");
  
  function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
  }
  if (!isTouchDevice()) {
    $('.main-nav [data-toggle="dropdown"], .header-search [data-toggle="dropdown"], .language-dropdown [data-toggle="dropdown"]').bootstrapDropdownHover({});
  }
  /*
  swal({ 
	title: '感謝您的申請', 
	text: '<div class="sending-wrap"><div class="la-ball-fall sending"><div></div><div></div><div></div></div></div>確認信件傳送中,請稍等系統將自動跳轉....',
  html:true,
  customClass:'sendingalert'
	type: 'success',
	showConfirmButton: false
  });
  */
});