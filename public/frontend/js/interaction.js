$(".addToCart").on("click", function () {
    var product_id = $(this).data('product-id');
    var product_type = $(this).data('product-type');
    var week_id = $(this).data('week-id');
    var program_id = $(this).data('program-id');
    var weekly_sessions = $(this).data('week-session-array');

    if(product_type == "program")
    {
        product_id = "program-" + product_id;
    }
    if(product_type == "session")
    {
        product_id = "session-" + product_id;
    }
    if(product_type == "week")
    {
        product_id = "week-"+ week_id +"-" + product_id;
    }
    if(product_type == "material")
    {
        product_id = "material-" + product_id;
    }

    if (checkInCart(product_id)) {
        $(".toast_error").toast("show");

    }else{
        $.ajax({
            type: "GET",
            url: base_url + "/en/add-to-cart",
            data: {'product': product_id, 'type': product_type, 'week_id':  week_id, 'program_id' : program_id, 'weekly_sessions': weekly_sessions},
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data.status) {
                    var count = data.count;
                    $('#cartCount').data('count', count);
                    $('#cartCount').text(count);
                    $(".toast_success").toast("show");
                }
            }
        });
    }
});

function checkInCart($id) {

    // console.log("coming to chekinCart", $id);
    $.ajax({
        type: "GET",
        url: base_url + "/en/check-in-cart",
        dataType: "json",
        async: false,
        success: function (data) {
            console.log(data)
            if($.inArray($id, data.items) != -1) {
                $status = true;
            }else{
                $status = false;
            }
        }
    });
    return $status;
}

$(".removeCartItem").on("click", function () {

    rowId = $(this).data('id');
    $.ajax({
        type: "GET",
        url: base_url + "/en/cart-remove-item",
        data: {'rowId': rowId},
        dataType: "json",
        success: function (data) {
            if (data.status) {
                console.log(data);
                $('#' + rowId).remove();
                //$(this).parents('.itemTableContentWrap').remove();
                var summary = data.data.summary;

                let deliveryObj = summary.find(o => o.key === 'delivery');
                console.log(deliveryObj);

                if(deliveryObj === undefined){
                    $('#cart_item_delivery').hide();
                }

                $.each(summary, function (i, item) {

                    var price = item.value.value;

                    $('#' + item.key).html(price);
                    // $('#cart_item_' + item.key).hide();

                });

                var count = $('#cartCount').data('count');
                var count = count - 1;
                $('#cartCount').data('count', count);
                $('#cartCount').text(count);
                $('#cart_items_count').html(count);

                if (count == 0) {
                    $('#cart_view_proceed_to_check_out').hide();
                    $('#summary_card').hide();

                    $('#emptyCartWrap').show();
                } else {
                    $('#cart_view_proceed_to_check_out').show();
                }
            }
        }
    });
    //alert("remove item " + rowId);
});
