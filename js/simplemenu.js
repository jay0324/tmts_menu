/***************
MIT License

Copyright (c) 2019 謝秉錡

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*************/

"use strict";
$.fn.simplemenu = function(options) {
  // This is the easiest way to have default options.
  var settings = $.extend(
    {
      usingbtn: true,
      directorylink: true,
      autoopen:true,
      disableclass:'disablethis',
      custombtnname: "openmenu",
      currentcss:'active',
      customicon:'<div class="simplemenu-normal-icon"><span></span><span></span></div>'
    },
    options
  );

  var custombtnname = settings.custombtnname,
      directorylink = settings.directorylink,
      usingbtn = settings.usingbtn,
      currentcss = settings.currentcss,
      autoopen= settings.autoopen,
      customicon= settings.customicon,
      disableclassname= settings.disableclass;

  
  this.find("a").each(function() {
    //build icon
    if ($(this).siblings("ul").length > 0) {
      $(this)
        .append('<div class="' + custombtnname + '">'+customicon+'</div>')
        .parent()
        .addClass("has-submenu");
    }

    //setting event
    $(this)
      .find("." + custombtnname)
      .on("click", function(event) {
        event.preventDefault(); //取消預設事件
        event.stopPropagation(); //終止事件傳導
        
        var _this_parent_li=$(this).parent('a').parent('li');
      
        if(!_this_parent_li.hasClass(disableclassname)){
          if(_this_parent_li.hasClass(currentcss)){
            //如果已經展開 轉回關閉 連同子選單一起
            _this_parent_li.removeClass(currentcss).children('ul').slideUp().find('.'+currentcss).removeClass(currentcss).children('ul').slideUp();
          }else{
            //如果還沒展開 展開這一層
            _this_parent_li.addClass(currentcss).children('ul').slideDown();
            //關閉其他階層的選單
            _this_parent_li.siblings().removeClass(currentcss).children('ul').slideUp().find('.'+currentcss).removeClass(currentcss).children('ul').slideUp();
          }  
        }else{
          return false;
        }
      });

      // 增加disable 選項
      $(this).on('click',function(event){
        if($(this).parent('li').hasClass(disableclassname)){
          event.preventDefault(); //取消預設事件
          return false;
        }
      });

  });

  if (!usingbtn) {
    this.find(".has-submenu").addClass("nobtn");
  }
  if (!directorylink) {
    this.find(".has-submenu").addClass("nodirectorylink");
  }
  
  //載入時預設展開currentcss下的ul
  if(autoopen){
    this.find('.'+currentcss).children('ul').slideDown();
  }

  // return this;
};