// $('.pull-right a.btn-default').text('清空篩選');

$(document).on('ready pjax:end', function(event) {
  	$("form,input,textarea").each(function(){       
	    if($(this).attr('name')!='password') {
	        $(this).attr('autocomplete','new-password');
	    } else {
	    	$(this).attr('autocomplete','none');
	    }
	});

	var delay_close = function(s){
	    return new Promise(function(resolve,reject){
	     setTimeout(resolve,s); 
	    });
	};
	  
	delay_close(400).then(function(){
	    if($('.modal-backdrop').length>0){ $('.modal-backdrop').removeClass('in');}
	    return delay_close(400);
	}).then(function(){
	    if($('.modal-backdrop').length>0){ $('.modal-backdrop').remove();}
	});
})