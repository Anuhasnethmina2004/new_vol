//popups

//-----------------------
$(".button-popup").magnificPopup({
    showCloseBtn: true,
    closeOnBgClick: false,
    mainClass: "mfp-with-zoom",
    zoom: {
        enabled: true,
        duration: 300 // don't foget to change the duration also in CSS
    },
    items: {
        src: "#fogotPassword"
    },
    type: "inline"
});

//-----------------------
// $(".otp-popup").magnificPopup({
//     showCloseBtn: true,
//     closeOnBgClick: false,
//     mainClass: "mfp-with-zoom",
//     zoom: {
//         enabled: true,
//         duration: 300 // don't foget to change the duration also in CSS
//     },
//     items: {
//         src: "#otp_val"
//     },
//     type: "inline"
// });

// otp
$(function() {
    var otppin = $("#otpPin").pinlogin({
        fields: 6,
        autofocus: true,
        reset: false,
        hideinput: false,
        placeholder: "X",

        keydown: function(e, field, nr) {
            console.log(
                "The field with nr : " + nr + " is about to get a value"
            );
        },

        complete: function(pin) {
            var pin = $("#otp").val(pin);
            console.log("125214-**********************", pin);
            $(".otp_button").removeAttr("disabled");
        }
    });
    jQuery(".pinlogin-field").attr("placeholder", "X");
});


