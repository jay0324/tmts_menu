

	$('.cate-nav-dropdown').perfectScrollbar();

	$('.quickmenu-search').on('click', function () {
		$('.quickmenu-search-toggletarget').css({
			'display': 'flex'
		});
		setTimeout(function () {
			$('.quickmenu-search-toggletarget').addClass('open');
		});
	});

	$('.quickmenu-search-toggletarget_mask,.quickmenu-search-toggletarget_main_close').on('click', function () {
		$('.quickmenu-search-toggletarget').hide().removeClass('open');
	});

	$(".cate-nav-lists").simplemenu({
		directorylink: false,
		autoopen: true
	});

	/*To Do: 增加控制的jQuery 用原本的程式下去改寫**/
	$(".cate-nav-toggle").each(function () {
		$(this).on('click', function () {
			$(this).toggleClass('cate-nav-toggle-active');
			if ($(this).hasClass('cate-nav-toggle-active')) {
				$('body').addClass('cate-nav-active');
			} else {
				$('body').removeClass('cate-nav-active');
			}

			var $body = window.opera ? document.compatMode == "CSS1Compat" ? $("html") : $("body") : $("html,body"),
				offset = 30,
				this_offsetTop = $(this).offset().top - $('#header2').outerHeight();

			$body.animate({
					scrollTop: this_offsetTop - offset
				},
				600,
				"swing",
				function () {
					scrollLock = false;
				}
			);
		});
	});

	$(document).on("click", function (e) {
		if ($(e.target).parents(".cate-nav-toggle").length == 0 && !$(e.target).hasClass("cate-nav-toggle") && $(e.target).parents(".cate-nav-dropdown").length == 0 && !$(e.target).hasClass("cate-nav-dropdown")) {
			if ($('.cate-nav-toggle-active').length > 0) {
				e.preventDefault();
				$('.cate-nav-toggle-active').removeClass('cate-nav-toggle-active');
				$('body').removeClass('cate-nav-active');
			}
		}
	});

	if ($('.cate-nav-toggle').length > 0) {
		$(window).on('load resize', function () {
			if ($('.cate-nav-toggle-active').length > 0) {
				var $body = window.opera ? document.compatMode == "CSS1Compat" ? $("html") : $("body") : $("html,body"),
					offset = 30,
					this_offsetTop = $('.cate-nav-toggle-active').offset().top;

				$body.stop().animate({
						scrollTop: this_offsetTop - offset
					},
					600,
					"swing",
					function () {
						scrollLock = false;
					}
				);
			}
		});
	}
	/*To Do: 增加控制的jQuery 用原本的程式下去改寫End**/

	var lastScrollTop = 0;
	$(window).scroll(function (event) {

		var st = $(this).scrollTop();
		var totalh = document.body.clientHeight - document.documentElement.clientHeight;
		if (st === 0) {
			$('.quickmenu-top').addClass('noactive').slideUp(200);
		} else {
			$('.quickmenu-top').removeClass('noactive').slideDown(600);
		}
		if (st > lastScrollTop) {
			if (st === totalh) {
				$('.quickmenu-wrap').addClass('active').addClass('active-b');
			} else {
				$('.quickmenu-wrap').removeClass('active').removeClass('active-b');

			}
		} else {
			if (st === 0) {
				$('.quickmenu-wrap').removeClass('active');
			} else {
				$('.quickmenu-wrap').addClass('active');
			}

		}
		lastScrollTop = st;

	});
	$('.quickmenu-top>a').on('click', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});
	/*
	$('.alert_collapse .btn-primary').on('click',function(e){
		e.preventDefault();
		$(this).parents('.alert_collapse').toggleClass('alert_view-part');

		var thisPagebody = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
			offsetTop= $(this).parents('.alert_collapse').offset().top - $('#header2').outerHeight() - 20;

		setTimeout(function(){
			thisPagebody.stop().animate(
				{
					scrollTop: offsetTop
				},
				500,
				"swing"
			);
		},200);

	});*/
	$(document).ready(function () {
		
	});

	$('.alert_collapse').each(function(){
		var thisAlert=$(this),
			alertHeight=thisAlert.outerHeight(),
			alertLimit=$(this).data('maxheight') != undefined ? $(this).data('maxheight') : 300;

		if(alertHeight>alertLimit){
			thisAlert.addClass('alert_view-part');
			thisAlert.css({'max-height': alertLimit});
		}

		$(this).find('.btn-primary').on('click',function(e){
			e.preventDefault();
			thisAlert.toggleClass('open');

			if(thisAlert.hasClass('open')){
				thisAlert.css({'max-height': 'none'});
				console.log('open');
				
			}else{
				console.log(alertLimit);			
				thisAlert.css({'max-height': alertLimit});
				console.log('close');
			}				

			var thisPagebody = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
				offsetTop= $(this).parents('.alert_collapse').offset().top - $('#header2').outerHeight() - 20;

			setTimeout(function(){
				thisPagebody.stop().animate(
					{
						scrollTop: offsetTop
					},
					500,
					"swing"
				);
			},100);

		});

	});

	/*to do: 增加控制選項 */
	$( ".checkdate" ).datepicker({
		dateFormat: 'yy/mm/dd'
	});

	$( ".checkdate_format" ).datepicker({
        dateFormat: 'yy-mm-dd'
    });

	$('.time-picker').timepicker({
		'timeFormat': 'H:i',
		'step': 15,
		'scrollDefault': '12:00'
	});