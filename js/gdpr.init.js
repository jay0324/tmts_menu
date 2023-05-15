tarteaucitron.init({
    "hashtag": "#tarteaucitron",
    "highPrivacy": false,
    "orientation": "bottom",
    "adblocker": false,
    "showAlertSmall": true,
    "cookieslist": false,
    "removeCredit": true,
    "afterLoad": function() {
        let state = true;
        let k = false;
        for (const [key, value] of Object.entries(tarteaucitron.state)) {
            state = state && value;
            k = true;
        }

        let allState = k ? state : false;
        // let cookie = tarteaucitron.cookie.read();
        // let respond = cookie.indexOf('gdpr_respond');

        if (allState) {
            $("#tarteaucitronAllDenied").show();
        } else {
            $("#tarteaucitronAllagree").show();
            document.getElementById("tarteaucitronAlertBig").style.display='block';
        }
        $("#tarteaucitronAllDenied, #tarteaucitronAllagree").click(function() {
            $(this).hide();
            $("#tarteaucitronAllDenied, #tarteaucitronAllagree").not(this).show();
            if ($(this).is("#tarteaucitronAllDenied")) {
                document.getElementById("tarteaucitronAlertBig").style.display='block';
            }
        });
    }
});

tarteaucitron.user.bypass = true;
//tarteaucitron.userInterface.respondAll(true);

//document.addEventListener("DOMContentLoaded", function() {
/*
setTimeout(function() {
        var cookie = tarteaucitron.cookie.read();
    if (cookie.indexOf('gdpr_responded=true') < 0) {
        tarteaucitron.userInterface.openAlert();
    }
}, 2000);
*/
//});
