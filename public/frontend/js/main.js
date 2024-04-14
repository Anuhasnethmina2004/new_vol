$(function() {
    //scroll - navigation -----------------------
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 50) {
            $("#navBarWrap").addClass("fixedNav");
        } else {
            $("#navBarWrap").removeClass("fixedNav");
        }
    });

    $(window).on("load", function() {
        if ($(window).scrollTop() > 50) {
            $("#navBarWrap").addClass("fixedNav");
        } else {
            $("#navBarWrap").removeClass("fixedNav");
        }
    });

    // navBar - mobile -----------------------

    $("#navbar-open").on("click", function() {
        $("#navbarToggler").addClass("show");
        $("body").css("overflow", "hidden");
    });
    $("#navbar-close").on("click", function() {
        $("#navbarToggler").removeClass("show");
        $("body").css("overflow", "auto");
    });

    $(".menu").click(function() {
        $(this).toggleClass("open");
    });

    // sub menu -----------------------

    $(".subMenuHandler .subMenu").on("click", function() {
        $(this)
            .parent(".subMenuHandler")
            .toggleClass("showSubMenu");
    });
    $(".secondaryParent").on("click", function() {
        $(this)
            .find(".secondarySubWrap")
            .toggleClass("showSubMenuList");
    });
});

$(".sub-link-wrap").each(function() {
    if (
        $(this)
            .html()
            .trim().length == 0
    ) {
        $(this).hide();
        $(this).hide();
        $(this)
            .parents(".secondaryParent")
            .addClass("hide-icon");
    }
});

//slick slider ----------------------------

$(".slick-carousel").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 400,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

//select 2

$(document).ready(function() {
    $(".form-select").select2({
        // minimumResultsForSearch: -1
    });
});

//validation ----------------------------
$(function() {
    $("form[name='login']").validate({
        rules: {
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            password: {
                required: true
            }
        },

        messages: {
            password: {
                required: "Required field "
            },

            phone: {
                // required: "Please Enter Your Mobile Number",
                // number: "Please enter numbers Only"
                required: "Please enter mobile number",
                digits: "Please enter numbers only",
                minlength: "Minimum 10 digits required",
                maxlength: "Maximum 10 digits are allowed"
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });
    $("form[name='newPassword']").validate({
        rules: {
            password: {
                required: true,
                minlength: 8
            },
            confirmPassword: {
                equalTo: "#password"
            }
        },

        messages: {
            password: {
                required: "Required field",
                minlength: "Please enter atleast 8 characters"
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });
    $("form[name='fogotPassword']").validate({
        rules: {
            otp_phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            }
        },

        messages: {
            otp_phone: {
                // required: "Please Enter Your Mobile Number",
                // number: "Please enter numbers Only"
                required: "This field is required",
                digits: "Please enter numbers only",
                minlength: "Minimum 10 digits are required",
                maxlength: "Maximum 10 digits are allowed"
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });
    $("form[name='register']").validate({
        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            password: {
                required: true,
                minlength: 8
            },
            password_confirmation: {
                equalTo: "#password"
            }
        },

        messages: {
            first_name: {
                required: "Required field "
            },
            last_name: {
                required: "Required field "
            },
            email: {
                required: "Required field ",
                email: "Email format is not valid"
            },
            phone: {
                required: "This field is required",
                digits: "Please enter numbers only",
                minlength: "Minimum 10 digits are required",
                maxlength: "Maximum 10 digits are allowed"
            },
            password: {
                required: "Required field ",
                minlength: "Minimum 8 characters are required"
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });
    $("form[name='registerCustomer']").validate({
        rules: {
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            password: {
                required: true,
                minlength: 8
            }
        },

        messages: {
            password: {
                required: "Required field ",
                minlength: "Minimum 8 characters are required"
            },

            phone: {
                required: "This field is required",
                digits: "Please enter numbers only",
                minlength: "Minimum 10 digits are required",
                maxlength: "Maximum 10 digits are allowed"
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });
    $("form[name='deliveryInfo']").validate({
        rules: {
            name: {
                required: true
            },
            address_1: {
                required: true
            },
            address_2: {
                required: true
            },
            city: {
                required: true
            }
        },

        messages: {
            address_1: {
                required: "Required field "
            },

            name: {
                required: "Required field "
            },
            address_2: {
                required: "Required field "
            },
            city: {
                required: "Required field "
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });

    //update info
    $("form[name='updateInfo']").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            first_name: {
                required: true
            },
            address_1: {
                required: true
            },
            address_2: {
                required: true
            },
            last_name: {
                required: true
            },
            city: {
                required: true
            }
        },

        messages: {
            first_name: {
                required: "Required field "
            },
            last_name: {
                required: "Required field "
            },
            address_1: {
                required: "Required field "
            },
            address_2: {
                required: "Required field "
            },

            email: {
                required: "Required field ",
                email: "Please enter valid email"
            },
            city: {
                required: "Required field "
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });

    $("form[name='updatePassword']").validate({
        rules: {
            current_password: {
                required: true
            },
            password: {
                required: true,
                minlength: 8
            },
            password_confirmation: {
                equalTo: "#password"
            }
        },

        messages: {
            password: {
                required: "Required field ",
                minlength: "Minimum 8 characters are required"
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });

    $("form[name='updatePhone']").validate({
        rules: {
            new_phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            }
        },

        messages: {
            new_phone: {
                // required: "Please Enter Your Mobile Number",
                // number: "Please enter numbers Only"
                required: "This field is required",
                digits: "Please enter numbers only",
                minlength: "Minimum 10 digits are required",
                maxlength: "Maximum 10 digits are allowed"
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });
    $("form[name='newsLetter']").validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },

        messages: {
            email: {
                required: "An email is required",
                email: "Please enter valid email"
            }
        },

        submitHandler: function(form) {
            form.submit();
        }
    });
});

//delete item --------------------------------

$(".cartItem").each(function() {
    $(".removeCartItem").click(function() {
        $(this)
            .parent()
            .remove();
    });
});

//review discount apply ------------------

$(".discount_apply").on("click", function(e) {
    e.preventDefault();

    coupon = $(".coupon").val();

    if (coupon != "") {
        $("#discount_apply").hide();
        $("#applyClose").show();
        $("#applyInput").attr("readonly", true);
        console.log(coupon);
    }
});

$("#applyClose").on("click", function() {
    $(".coupon").val("");
    $("#applyInput").attr("readonly", false);
    $("#discount_apply").show();
    $("#applyClose").hide();
    $(".discount_apply").click();
});

//my account tab hash ------------------

$(function() {
    var hash = window.location.hash;
    hash && $('.accountTab a[href="' + hash + '"]').tab("show");

    $(".accountTab a").click(function(e) {
        e.preventDefault;
        $(this).tab("show");
        $(this)
            .parents(".accountTab")
            .find("li")
            .removeClass("active");
        $(this)
            .parent("li")
            .addClass("active");
        var scrollmem = $("body").scrollTop();
        window.location.hash = this.hash;
        $("html,body").scrollTop(scrollmem);
    });
});

//Table row click ----------------
$(document).ready(function($) {
    $(".table-row").click(function() {
        if (!$(this).hasClass("disable_href")) {
            window.document.location = $(this).data("href");
        }
    });
});

$("#change_phone_num").on("click", function() {
    $(".top_update_info").hide();
    $(".bottom_update_info").show();
});

$(function() {
    $(".toast-success").toast({ animation: true, autohide: true, delay: 3000 });
    $(".toast-error").toast({ animation: true, autohide: true, delay: 3000 });

    $(".toast_success_secondary").toast({
        animation: true,
        autohide: true,
        delay: 3000
    });
    $(".toast_error_secondary").toast({
        animation: true,
        autohide: true,
        delay: 3000
    });

    // $("#show1").on("click", function() {
    //     $(".toast_success").toast("show");
    // });

    // $("#hide1").on("click", function() {
    //     $(".toast_success").toast("hide");
    // });
    // $("#show2").on("click", function() {
    //     $(".toast_error").toast("show");
    // });

    // $("#hide2").on("click", function() {
    //     $(".toast_error").toast("hide");
    // });
    $("#toast_close").on("click", function() {
        $(".toast-success").toast("hide");
        $(".toast-error").toast("hide");
    });
    $("#toast-secondary_close").on("click", function() {
        $(".toast_success_secondary").toast("hide");
        $(".toast_error_secondary").toast("hide");
    });
});
