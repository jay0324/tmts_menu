$(document).on('click', '.reset-balance' , function () {
	swal({
        title: "確定重新計算尾款？",
        text: "僅不計算報名狀態為\"正式參展商\"的報名資料",
        type: "warning",
        confirmButtonText: "確定", 
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false
    },
    function(isConfirm){
        if (isConfirm){
            $.ajax({
		        url: LA.reset_balance_url,   //存取Json的網址             
		        type: "GET",
		        cache: false,
		        dataType: 'json',
		        async: false,
		        success: function (result) {
		            // console.log(result);
		            if(result.status == 200) {
                        swal({
                            title: "計算成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonText: "確定",
                            html: true
                        },
                        function (isConfirm) {
                            location.reload();
                        });
                    } else {
                        swal({
                            title: "錯誤",
                            text: result.error_msg,
                            type: "error",
                            showCancelButton: false,
                            confirmButtonText: "確定"
                        });
                        return false;
                    }
		        },

		        error: function (xhr, ajaxOptions, thrownError) {
		            alert(xhr.status);
		            alert(thrownError);
		        }
		    });
        }
    });
});

$(document).on('click', '.print-balance', function() {
	swal({
        title: "確定列印尾款繳費單？",
        text: "僅產生所有報名狀態為\"待繳交尾款\"的繳費資料",
        type: "warning",
        confirmButtonText: "確定", 
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false
    },
    function(isConfirm){
        if (isConfirm){
          window.open('/admin/exhibit_apply/print/balance');
          swal.close();
        }
    });
});
