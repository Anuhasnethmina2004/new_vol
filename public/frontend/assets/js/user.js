var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');


window.addEventListener('load', function() {
    $(function() {
        $.each($('#verifyOTPForm').serializeArray(), function(index, value){
            if( value.name.includes('loginpin_pinlogin_')){
                console.log(value);
            }
        });

    });
});

    // Numeric only control handler
    // $('.phone').keypress(function (e) {
    //     var charCode = (e.which) ? e.which : event.keyCode;
    //     if (String.fromCharCode(charCode).match(/[^0-9]/g))
    //         return false;
    // }).keyup(function (event) {
    //
    //     var elem = $(this);
    //     var ln = elem.val().length;
    //
    //     if (ln > 0) {
    //         if (elem.val().slice(0, 1) != 0) {
    //
    //             var starr = elem.val().split("");
    //
    //             starr.unshift(0);
    //             elem.val(starr.join(''));
    //         }
    //
    //     }
    //
    //     if (ln > 10) {
    //         var st = elem.val().slice(0, 10);
    //         elem.val(st);
    //         return;
    //     }
    //
    // });

$('.phone').keypress(function (event) {
    if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
        event.preventDefault();
    }
}).keyup(function (event) {

    var elem = $(this);
    var ln = elem.val().length;

    if (ln > 0) {
        if (elem.val().slice(0, 1) != 0) {

            var starr = elem.val().split("");

            starr.unshift(0);
            elem.val(starr.join(''));
        }

    }

    if (ln > 10) {
        var st = elem.val().slice(0, 10);
        elem.val(st);
        return;
    }

});


$.validator.addMethod(
    "tendigits",
    function (value, element) {
        if (value == "")
            return false;
        return value.match(/^\d{10}$/);
    },
    "Please enter valid phone number with 10 digits"
);

$.validator.addMethod("validEmail", function(email, element) {
    return email.match(
        /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
    );
}, "Please enter a valid email address.");


function OTPRequestPopUP(selector){
    $('#o-msg-wrap').hide();
    //OPEN OTP REQUEST POPUP
    $(selector).magnificPopup({
        showCloseBtn: true,
        closeOnBgClick: false,
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 300
        },
        items: {
            src: '#forgot-popup',
        },
        type: 'inline',
        callbacks: {
            beforeOpen: function() {
                $('#otp_phone').val("");
                $('#phone-error').html("");
                $('body').addClass('mfp-active');
            },
            beforeClose: function() {
                $('body').removeClass('mfp-active');
            }
        }
    });
}



//OTP SEND AFTER ENTER Verication Code
function sendOTPRequest(route,phone) {
    $('#invalidOtpMessage').html("");
    $('#phone-error').html("");
    $('#otp-error').html("");
    $('#o-msg-wrap').hide();
    $.ajax({
        type: "POST",
        url: route,
        data: {
            phone:phone,
            _token: CSRF_TOKEN
        }, // serializes the form's elements.
        success: function(data) {
            if(data.status == true){
                $('#o-msg-wrap').hide();
                successMessage('OTP has been sent to your mobile');
                $('#otp_phone_verify').val(data.phone);
                verifyOTPPopup();
            }else{
                $('#o-msg-wrap').show();
                $('#invalidOtpMessage').html(data.message);
                $('#phone-error').html(data.message);
            }
        },
        error: function(data) {

            var errors = data.responseJSON.errors;
            $.each(errors, function(index, value){
                $('#'+index+'-error').html(value[0]);
            });
            $('#o-msg-wrap').show();
        }
    });
}


function verifyOTPPopup() {
    $('#o-msg-wrap').hide();
    $('#btnVerified').prop('disabled',true);

    $.magnificPopup.open({
        showCloseBtn: true,
        closeOnBgClick: false,
        mainClass: "mfp-with-zoom",
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        },
        items: {
            src: "#verify_otp"
        },
        type: "inline",
        focus: "#loginpin_pinlogin_0"
    }, 0);

    var loginpin = $('#loginpin').pinlogin({
        fields : 6,
        hideinput: false,
        reset : false,
        autofocus : true,
        complete : function(pin){
            $('#btnVerified').prop('disabled',false);
        },
    });
}



//VERIFIED OTP
function verifiedOTP(route,phone,form_selector='#verifyOTPForm',pin_selector='loginpin_pinlogin_') {
    $('#otp-error').html("");
    $('#o-msg-wrap').hide();
    var pinValue ='';
    $.each($(form_selector).serializeArray(), function(index, value){
        if( value.name.includes(pin_selector)){
            pinValue += value.value;
        }
    });

console.log(pinValue);

    $.ajax({
        type: "POST",
        url: route,
        data: {
            phone: phone,
            _token: CSRF_TOKEN,
            otp: pinValue
        },
        success: function(data) {
            if(data.status == true){
                if(form_selector == "#verifyOTPPasswordForm"){
                    OpenPasswordChangePopup();
                }else {
                    if(data.extra) {
                        successMessage('OTP is verified.');
                        window.location.href = data.redirect + '?data=' + data.phone;
                    }else{
                        window.location.href = data.redirect;
                    }
                }
            }else{
                $('#invalidOtpMessage').html(data.message);
                $('.otp-wrap').addClass('is-error');
                $('#o-msg-wrap').show();
            }

        },
        error: function(data) {

            var errors = data.responseJSON.errors;
            $.each(errors, function(index, value){
                $('#'+index+'-error').html(value[0]);
            });
            $('#o-msg-wrap').show();
        }
    });
}


//RESEND OTP
function resendOtp(route,phone,resend_phone,form_selector='#verifyOTPForm',pin_selector='loginpin_pinlogin_') {

// console.log(phone,resend_phone);
        $('#otp-error').html("");
        var pinValue ='';
        $.each($(form_selector).serializeArray(), function(index, value){
            if( value.name.includes(pin_selector)){
              $('[name='+pin_selector+(index-1)+']').val("");
            }
        });
    $('[name='+pin_selector+0+']').focus();
    $('#invalidOtpMessage').html("");
    $('#otp-error').html("");
    $('#o-msg-wrap').hide();
    var authtype = "{{ Config::get('constants.auth_type') }}";
    if(authtype == 'phone'){
        $.ajax({
            type: "POST",
            url: route, //route
            data: {
                phone: phone,
                _token: CSRF_TOKEN
            },
            success: function(data) {
    
                if (data.status == true) {
                    successMessage('OTP has been sent to your mobile');
                } else {
                    $('#invalidOtpMessage').html(data.message);
                    $('.otp-wrap').addClass('is-error');
                    $('#o-msg-wrap').show();
                }
    
            }
        });
}else{
    $.ajax({
        type: "POST",
        url: route, //route
        data: {
            email: phone,
            phone: resend_phone,
            _token: CSRF_TOKEN
        },
        success: function(data) {

            if (data.status == true) {
                successMessage('OTP has been sent to your Email');
            } else {
                $('#invalidOtpMessage').html(data.message);
                $('.otp-wrap').addClass('is-error');
                $('#o-msg-wrap').show();
            }

        }
    });
}
}


//change password -------------------------------------------------------------------------------

function OTPPasswordRequestPopUP(selector){

    //OPEN OTP REQUEST POPUP
    $(selector).magnificPopup({
        showCloseBtn: true,
        closeOnBgClick: false,
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 300
        },
        items: {
            src: '#change-password',
        },
        type: 'inline',
        callbacks: {
            beforeOpen: function() {
                $('#otp_phone_password').val("");
                $('#phone-error').html("");
                $('#o-msg-wrap').hide();
                $('body').addClass('mfp-active');
            },
            beforeClose: function() {
                $('body').removeClass('mfp-active');
            }
        }
    });
}




//OTP SEND AFTER ENTER Verication Code
function sendOTPPasswordRequest(route,phone,email=null) {
    
    $('#invalidOtpMessage').html("");
    $('#phone-error').html("");
    $('#o-msg-wrap').hide();
    var authtype = "{{ Config::get('constants.auth_type') }}";
    if(authtype == 'phone'){
        $.ajax({
            type: "POST",
            url: route,
            data: {
                phone:phone,
                _token: CSRF_TOKEN
            }, // serializes the form's elements.
            success: function(data) {
                if(data.status == true){
                    $('#otp_phone_verify_password').val(data.phone);
                    successMessage(data.message)
                    verifyOTPPasswordPopup();
                }else{
                    $('#invalidOtpMessage').html(data.message);
                    $('.otp-wrap').addClass('is-error');
                    $('#o-msg-wrap').show();
                }
            },
            error: function(data) {
                var errors = data.responseJSON.errors;
                $.each(errors, function(index, value){
                    $('#'+index+'-error').html(value[0]);
                });
            }
        });
}else{
    $.ajax({
        type: "POST",
        url: route,
        data: {
            email:phone,
            phone:email,
            _token: CSRF_TOKEN
        }, // serializes the form's elements.
        success: function(data) {
            if(data.status == true){
                $('#otp_phone_verify_password').val(data.email);
                successMessage(data.message)
                verifyOTPPasswordPopup();
            }else{
                $('#invalidOtpMessage').html(data.message);
                $('.otp-wrap').addClass('is-error');
                $('#o-msg-wrap').show();
            }
        },
        error: function(data) {
            var errors = data.responseJSON.errors;
            $.each(errors, function(index, value){
                $('#'+index+'-error').html(value[0]);
            });
        }
    });
}
}


function verifyOTPPasswordPopup() {
    $('#o-msg-wrap').hide();
    $('#btnVerifiedPassword').prop('disabled',true);

    $.magnificPopup.open({
        showCloseBtn: true,
        closeOnBgClick: false,
        mainClass: "mfp-with-zoom",
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        },
        items: {
            src: "#verify_otp_password"
        },
        type: "inline",
        focus: "#loginpin1_pinlogin_0"
    }, 0);

    var loginpin = $('#loginpin1').pinlogin({
        fields : 6,
        hideinput: false,
        reset : false,
        autofocus : true,
        complete : function(pin){
            console.log('You entered: ' + pin);
            $('#btnVerifiedPassword').prop('disabled',false);
        }
    });
}


function OpenPasswordChangePopup() {
    $('#o-msg-wrap').hide();
    $.magnificPopup.open({
        showCloseBtn: true,
        closeOnBgClick: false,
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 300
        },
        items: {
            src: '#change-password-popup',
        },
        type: 'inline',
        callbacks: {
            beforeOpen: function() {
                $('body').addClass('mfp-active');
            },
            beforeClose: function() {
                $('body').removeClass('mfp-active');
            }
        }
    });
}




