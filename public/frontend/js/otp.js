$(function() {
    var otppin = $("#otpPin").pinlogin({
        fields: 6,
        autofocus: true,
        reset: false,
        hideinput: false,

        complete: function(pin) {
            $("#otp").val(pin);
            
        }

    });

    $(".popup-continue").on("click", function(e) {
        e.preventDefault();

        var form = $("#verifyOTPForm");
        var url = form.attr("action");

        console.log(form.serialize());

        var formData = {
            phone: $("#phone").val(),
            otp: pin,
            _token: $("#token").val()
        };

        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            success: function(data) {
                if (data.isVerified == true) {
                    location.href = base_url;
                } else {
                    $("#invalidOtpMessage").html(
                        "Invalid OTP, Please enter correct OTP"
                    );
                }
                //alert(data); // show response from the php script.
            }
        });
    });



    var otppin = $("#otpChangePhonePin").pinlogin({
        fields: 6,
        autofocus: true,
        reset: false,
        hideinput: false,
        placeholder: "X",

        complete: function(pin) {
            $("#otp").val(pin);
            $(".otp_button").removeAttr("disabled");

            
        }
    });

    $(".popup-continue").on("click", function(e) {
        e.preventDefault();
        var form = $("#changeMobileConfirm");
        var url = form.attr("action");

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data) {
                if (data.status == true) {
                    // successMessage('Phone number has been changed successfully')
                    // $('.phoneNumChange').val(data.phone).focus();

                    location.reload();
                    $(".top_update_info").show();
                } else {
                    $("#invalidOtpMessage").html(
                        "Invalid OTP, Please enter correct OTP"
                    );
                }
                //alert(data); // show response from the php script.
            }
        });
    });

    jQuery(".pinlogin-field").attr("placeholder", "X");

    $("#changePhoneNumber").click(function(e) {
        // alert(1)
        $.magnificPopup.open(
            {
                showCloseBtn: true,
                closeOnBgClick: false,
                mainClass: "mfp-with-zoom",
                focus: "#otpPin_pinlogin_0",
                zoom: {
                    enabled: true,
                    duration: 300 // don't foget to change the duration also in CSS
                },
                items: {
                    src: "#change-phone-popup"
                },
                type: "inline"
            },
            0
        );
        // $(this).parents(".form-group").find('.phoneNumChange').val('').focus();
    });
});
