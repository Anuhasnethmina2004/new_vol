var selectedCart = [];
var removedProducts = [];
var currentCart = [];
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

$(document).ready(function () {

});

function addItemToCart($program_id, $type, $tariff=null, $date=null,$purchase_type='monthly',$moduleId=null) {
    if ($program_id == '') {
        return;
    }
    // var loader = pageLoading('#popup-loadrer');
    // loader.show();

    switch ($type) {
        case 'programme':
            $btnId = "#add-to-cart-pro-"+$program_id+'-'+$tariff+'-'+$date+'-'+$purchase_type;
            break;
        case 'module':
            $btnId = "#add-to-cart-pro-"+$program_id+'-'+$tariff+'-'+$date+'-'+$purchase_type;
            break;
        case 'bundle':
            $btnId = "#add-to-cart-bun-"+$program_id+'-'+$date;
            break;
        case 'material':
            $btnId = "#add-to-cart-mat-"+$program_id+'-'+$tariff;
            break;
        default:
            $btnId = "#add-to-cart-nan-"+$program_id;
            break;
    }
    $($btnId).prop('disabled',true);
    $($btnId+' .add-btn-txt').html('<div class="loader-btn"></div>');
    $.ajax({
        type: 'POST',
        url: base_url + '/add-to-cart',
        dataType: 'json',
        data: {program_id: $program_id, type: $type, tariff: $tariff, month: $date, purchase_type: $purchase_type,module_id:$moduleId,_token:CSRF_TOKEN},
        beforeSend: function () {
            // $("#loading-spinner-2").show();
        },
        success: function (data) {
            // loader.hide();
            $('.cart-number').html(data.count);
            if(data.status){
                $($btnId+' .add-btn-txt').html($inCartTxt);
                successMessage(data.message);
            }else{
                $($btnId+' .add-btn-txt').html($addToCartTxt);
                $($btnId).prop('disabled',false);
                errorMessage(data.message);
            }
        }, error: function (data) {
            // loader.hide();
            $($btnId+' .add-btn-txt').html($addToCartTxt);
            $($btnId).prop('disabled',false);
            errorMessage("Something went wrong");
        }
    });
}

function removeItemFromCart(rowId) {
    // var loader = pageLoading('#cartLoadrer');
    // loader.show();
    var loadCartitems = "";
    $.ajax({
        type: 'POST',
        url: base_url + '/'+ lang_code +'/cart-remove-item',
        dataType: 'json',
        data: {rowId:rowId,_token:CSRF_TOKEN},
        beforeSend: function () {

        },
        success: function (data) {

            // loader.hide();
            if (data.status) {
                if (data.cartData.length > 0) {
                    $.each(data.cartData, function (key, value) {
                        loadCartitems +=    '<div class="w-layout-grid cart-item-grid">'+
                                                '<div class="order-item-details">'+
                                                    '<div id="w-node-ded1d67b-c678-1873-e9a7-30ddcd135060-8dad86d2" class="grid-item order-details is-mobile">'+
                                                        '<div class="text-size-regular text-weight-medium">'+value.product_name+(value.month?' | '+moment(value.month).format('MMMM - YYYY'):"")+'</div>';
                        if (value.type=="bundle"){
                            if (value.bundle_items.programs.length > 0){
                                $.each(value.bundle_items.programs, function (indx, pro) {
                                    loadCartitems += '<div class="subject">'+ pro.title+(value.month?' | '+moment(value.month).format('MMMM - YYYY'):"")+'</div>';
                                });
                            }
                            if (value.bundle_items.materials.length > 0){
                                $.each(value.bundle_items.materials, function (indx, mat) {
                                    loadCartitems += '<div class="subject">'+ mat.title +'</div>';
                                });
                            }
                        }
                        loadCartitems += '</div>'+
                                                '</div>'+
                                                '<div id="w-node-ded1d67b-c678-1873-e9a7-30ddcd13506e-8dad86d2" class="grid-item is-cart">'+
                                                    '<div class="text-size-regular text-weight-bold text-align-right">'+value.price.currency+" "+(value.price.value??"0.00")+'</div>'+
                                                    '<div class="remove-item-wrap" onclick="removeItemFromCart(\''+value.rowId+'\')">'+
                                                        '<div class="remove-item w-embed"><svg width="16" height="16" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M13.167 4.00033H17.3337V5.66699H15.667V16.5003C15.667 16.7213 15.5792 16.9333 15.4229 17.0896C15.2666 17.2459 15.0547 17.3337 14.8337 17.3337H3.16699C2.94598 17.3337 2.73402 17.2459 2.57774 17.0896C2.42146 16.9333 2.33366 16.7213 2.33366 16.5003V5.66699H0.666992V4.00033H4.83366V1.50033C4.83366 1.27931 4.92146 1.06735 5.07774 0.91107C5.23402 0.75479 5.44598 0.666992 5.66699 0.666992H12.3337C12.5547 0.666992 12.7666 0.75479 12.9229 0.91107C13.0792 1.06735 13.167 1.27931 13.167 1.50033V4.00033ZM14.0003 5.66699H4.00033V15.667H14.0003V5.66699ZM6.50033 8.16699H8.16699V13.167H6.50033V8.16699ZM9.83366 8.16699H11.5003V13.167H9.83366V8.16699ZM6.50033 2.33366V4.00033H11.5003V2.33366H6.50033Z"></path></svg></div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>';
                    });

                    $('.cart-item-div').html(loadCartitems);
                    $('.cart-number').html(data.cartData.length);
                } else {
                    $('.cart-item-div').html('');
                    $('.checkout-btn').hide();
                    $('.cart-number').html(0);
                    location.reload();
                }

                if (data.summary[1].value.original_value) {
                    if (data.summary[1].value.original_value > 0) {
                        $('.delivery-div').show();
                    } else {
                        $('.delivery-div').hide();
                    }
                    $('.delivery-value').html(data.summary[1].value.currency+" "+(data.summary[1].value.value??"0.00"));
                }else{
                    $('.delivery-div').hide();
                }
                // if (data.summary[2].value.original_value) {
                //     if (data.summary[2].value.original_value > 0) {
                //         $('.discount-div').show();
                //         $('.discount-name').html("("+data.discount.title+")");
                //     } else {
                //         $('.discount-div').hide();
                //         $('.discount-name').html('');
                //     }
                //     $('.discount-value').html(data.summary[2].value.currency+" "+(data.summary[2].value.value??"0.00"));
                // }else{
                //     $('.discount-div').hide();
                //     $('.discount-name').html('');
                // }
                // if (data.summary[4].value.original_value > 0 ) {
                //     $('.wallet-div').show();
                //     $('.wallet-value').html("-"+data.summary[4].value.currency+" "+(data.summary[4].value.value??"0.00"));
                //     $('.wallet-balance').html(data.summary[4].rest.currency+" "+(data.summary[4].rest.value??"0.00"));
                // } else {
                //     $('.wallet-div').hide();
                //     $('.wallet-value').html('');
                //     $('.wallet-balance').html('');
                // }
                $('.subtotal-value').html(data.summary[0].value.currency+" "+(data.summary[0].value.value??"0.00"));
                $('.total-value').html(data.summary[0].value.currency+" "+price((data.summary[0].value.original_value??0) + (data.summary[1].value.original_value??0)));

                successMessage(data.message);
            } else {
                errorMessage(data.message);
            }

        }, error: function (data) {
            // loader.hide();

            var message = "";
            if (typeof (data.responseJSON.status) != "undefined") {
                var message = data.responseJSON.message;
                $('#coupon').val('');
            }
        }
    });
}

function price($amount) {
    return Number($amount.toFixed(2)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
}

function removeItemFromReview(rowId) {
    // var loader = pageLoading('#cartLoadrer');
    // loader.show();
    var loadCartitems = "";
    $.ajax({
        type: 'POST',
        url: base_url + '/'+ lang_code +'/cart-remove-item',
        dataType: 'json',
        data: {rowId:rowId,_token:CSRF_TOKEN},
        beforeSend: function () {

        },
        success: function (data) {

            // loader.hide();
            if (data.status) {
               // var item_count_text =  "trans('general.items_in_cart',['item_count'=> data.cartData.length ],$lang_code);
             //   console.log(item_count_text);
                if (data.cartData.length > 0) {
                    var hiddenLable = $('.order-count-hidden').text();
                    $('.order-count').text();
                    let cart_in_item_label = hiddenLable.replace(":item_count", data.cartData.length);
                    $('.order-count').text(cart_in_item_label);
                    $.each(data.cartData, function (key, value) {
                        loadCartitems +=    '<div class="w-layout-grid cart-item-grid">'+
                                                '<div class="order-item-details">'+
                                                    '<div id="w-node-ded1d67b-c678-1873-e9a7-30ddcd135060-8dad86d2" class="grid-item order-details is-mobile">'+
                                                        '<div class="text-size-regular text-weight-medium">'+value.product_name+(value.month?' | '+moment(value.month).locale(lang_code).format('MMMM - YYYY'):"")+'</div>';
                        if (value.type=="bundle"){
                            if (value.bundle_items.programs.length > 0){
                                $.each(value.bundle_items.programs, function (indx, pro) {
                                    loadCartitems += '<div class="subject">'+ pro.title+(value.month?' | '+moment(value.month).locale(lang_code).format('MMMM - YYYY'):"")+'</div>';
                                });
                            }
                            if (value.bundle_items.materials.length > 0){
                                $.each(value.bundle_items.materials, function (indx, mat) {
                                    loadCartitems += '<div class="subject">'+ mat.title +'</div>';
                                });
                            }
                        }
                        loadCartitems += '</div>'+
                                                '</div>'+
                                                '<div id="w-node-ded1d67b-c678-1873-e9a7-30ddcd13506e-8dad86d2" class="grid-item is-cart">'+
                                                    '<div class="text-size-regular text-weight-bold text-align-right">'+value.price.currency+" "+(value.price.value??"0.00")+'</div>'+
                                                    '<div class="remove-item-wrap" onclick="removeItemFromReview(\''+value.rowId+'\')">'+
                                                        '<div class="remove-item w-embed"><svg width="16" height="16" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M13.167 4.00033H17.3337V5.66699H15.667V16.5003C15.667 16.7213 15.5792 16.9333 15.4229 17.0896C15.2666 17.2459 15.0547 17.3337 14.8337 17.3337H3.16699C2.94598 17.3337 2.73402 17.2459 2.57774 17.0896C2.42146 16.9333 2.33366 16.7213 2.33366 16.5003V5.66699H0.666992V4.00033H4.83366V1.50033C4.83366 1.27931 4.92146 1.06735 5.07774 0.91107C5.23402 0.75479 5.44598 0.666992 5.66699 0.666992H12.3337C12.5547 0.666992 12.7666 0.75479 12.9229 0.91107C13.0792 1.06735 13.167 1.27931 13.167 1.50033V4.00033ZM14.0003 5.66699H4.00033V15.667H14.0003V5.66699ZM6.50033 8.16699H8.16699V13.167H6.50033V8.16699ZM9.83366 8.16699H11.5003V13.167H9.83366V8.16699ZM6.50033 2.33366V4.00033H11.5003V2.33366H6.50033Z"></path></svg></div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>';
                    });

                    $('.cart-item-div').html(loadCartitems);
                    $('.cart-number').html(data.cartData.length);
                } else {
                    location.reload();
                    $('.cart-item-div').html('<div>No items in cart</div>');
                    $('.checkout-btn').hide();
                    $('.cart-number').html(0);
                }

                $bundleDiscountHtml = "";
                if (data.bundle_discounts.length > 0) {
                    $.each(data.bundle_discounts, function (key, value) {
                        $bundleDiscountHtml += '<div class="w-layout-grid cart-prices-grid">'+
                                                    '<div id="w-node-f1f5d1a1-c4f5-9def-38f7-63fcb51d448e-41ad86d3" class="grid-item">'+
                                                        '<div class="text-size-small text-color-gray-2 text-weight-medium">'+
                                                            '<strong>'+$discountTxt+'</strong> <span class="">('+value.title+')</span></div>'+
                                                    '</div>'+
                                                    '<div id="w-node-f1f5d1a1-c4f5-9def-38f7-63fcb51d4493-41ad86d3" class="grid-item order-details">'+
                                                        '<div class="text-size-small text-color-gray-2 text-weight-medium">'+price(value.discounted_value??0)+'</div>'+
                                                    '</div>'+
                                                '</div>';
                    });
                }
                $('.bundle-discounts').html($bundleDiscountHtml);

                if (data.summary[1].value.original_value) {
                    if (data.summary[1].value.original_value > 0) {
                        $('.delivery-div').show();
                    } else {
                        $('.delivery-div').hide();
                    }
                    $('.delivery-value').html(data.summary[1].value.currency+" "+(data.summary[1].value.value??"0.00"));
                }else{
                    $('.delivery-div').hide();
                }
                if (data.summary[2].value.original_value) {
                    if (data.summary[2].value.original_value > 0) {
                        $('.discount-div').show();
                        $('.discount-name').html("("+data.discount.title+")");
                    } else {
                        $('.discount-div').hide();
                        $('.discount-name').html('');
                    }
                    $('.discount-value').html(data.summary[2].value.currency+" "+(data.summary[2].value.value??"0.00"));
                }else{
                    $('.discount-div').hide();
                    $('.discount-name').html('');
                }

                if (data.summary[4].value.original_value > 0 ) {
                    $('.wallet-div').show();
                    $('.wallet-value').html(data.summary[4].value.currency+" "+"-"+(data.summary[4].value.value??"0.00"));
                    $('.wallet-balance').html(data.summary[4].rest.currency+" "+(data.summary[4].rest.value??"0.00"));
                } else {
                    $('.wallet-div').hide();
                    $('.wallet-value').html('');
                    $('.wallet-balance').html('');
                }
                $('.subtotal-value').html(data.summary[0].value.currency+" "+(data.summary[0].value.value??"0.00"));
                $('.total-value').html(data.summary[3].value.currency+" "+(data.summary[3].value.value??"0.00"));
                console.log(data.summary[3].value.currency+" "+(data.summary[3].value.value??"0.00"));

                successMessage(data.message);
            } else {
                errorMessage(data.message);
            }

        }, error: function (data) {
            // loader.hide();

            var message = "";
            if (typeof (data.responseJSON.status) != "undefined") {
                var message = data.responseJSON.message;
                $('#coupon').val('');
            }
        }
    });
}

// function updateCart(displayMessage) {
//     var cart_order_id = $('#cart_order_id').val();
//     var cart_id = $('#cart_id').val();
//     var coupon = $('#added_coupon').val();
//     var send_notifications = $('input[name="send_notifications"]').val();
//     var data = [];
//     data.push({ name: 'coupon', value: coupon });
//     data.push({ name: 'send_notifications', value: send_notifications });
//     data.push({ name: 'cart', value: JSON.stringify(currentCart) });
//     // var loader = pageLoading('#cartLoadrer');
//     // loader.show();


//     $.ajax({
//         type: 'PUT',
//         url: base_url + '/order/updateCart/' + cart_order_id,
//         dataType: 'json',
//         data: data,
//         beforeSend: function () {

//         },
//         success: function (data) {
//             var loadCartitems = '';
//             currentCart = data.cartData.cart_items;
//             $('#cartItemsData').empty();
//             $.each(data.cartData.cart_items, function (key, value) {
//                 loadCartitems += '<tr> <td>' + value.product_name + (value.month?" ( " + moment(value.month).format('MMMM - YYYY') + " )":"") +'</td>' +
//                     '<td>'+ value.type + '</td>' +
//                     '<td>' + value.price.value + '</td>' +
//                     '<td class="item_total_price_'+value.id+'">' + value.product_total.value + '</td> ' +
//                     '<td> ' +
//                     '<button type="button" class="icon-btn rounded remove"' +
//                     'onclick="removeDiv2(this,'+value.id+',\''+value.type+'\''+ (value.tariff?',\''+value.tariff+'\'':"")+')"><i class="icon"></i></button> ' +
//                     '</td>' +
//                     '</tr>';
//             });
//             removedProducts = [];
//             $('#cartItemsData').append(loadCartitems);
//             $('input[type="number"]').numberInput();
//             console.log(data.summary[0].value);
//             console.log(data.summary[1].value);
//             console.log(data.summary[2].value);

//             if (data.cartData.cart_items.length == 0) {
//                 $('#applyCoupon').prop('disabled', true);
//                 $('#qytUpdate').prop('disabled', true);
//             } else {
//                 $('#applyCoupon').prop('disabled', false);
//                 $('#qytUpdate').prop('disabled', false);
//             }

//             if (data.summary[0].value.value) {
//                 $('.subtotal-value').html(data.summary[0].value.currency+" "+(data.summary[0].value.value??"0.00"));
//             }
//             if (data.summary[1].value.value) {
//                 if (data.summary[1].value.value > 0) {
//                     $('.delivery-div').show();
//                 } else {
//                     $('.delivery-div').hide();
//                 }
//                 $('.delivery-value').html(data.summary[1].value.currency+" "+(data.summary[1].value.value??"0.00"));
//             }else{
//                 $('.delivery-div').hide();
//             }
//             if (data.summary[2].value.value) {
//                 if (data.summary[2].value.value > 0) {
//                     $('.discount-div').show();
//                     $('.discount-name').html("("+data.discount.title+")");
//                 } else {
//                     $('.discount-div').hide();
//                     $('.discount-name').html('');
//                 }
//                 $('.discount-value').html(data.summary[2].value.currency+" "+(data.summary[2].value.value??"0.00"));
//             }else{
//                 $('.discount-div').hide();
//                 $('.discount-name').html('');
//             }
//             if (data.summary[3].value.value) {
//                 $('.total-value').html(data.summary[3].value.currency+" "+(data.summary[3].value.value??"0.00"));
//             }
//             if (data.summary[4].value.original_value > 0 ) {
//                 $('.wallet-div').show();
//                 $('.wallet-value').html("-"+data.summary[4].value.currency+" "+(data.summary[4].value.value??"0.00"));
//                 // $('.wallet-balance').html(data.summary[4].rest.value??0);
//             } else {
//                 $('.wallet-div').hide();
//                 $('.wallet-value').html('');
//                 // $('.wallet-balance').html(data.summary[4].rest.value??0);
//             }
//             successMessage('Cart Updated successfully.');
//         }, error: function (data) {
//             loader.hide();
//             console.log(data);
//             if (typeof (data.responseJSON.errors) != "undefined" && typeof (data.responseJSON.errors.qty) != "undefined") {
//                 var message = data.responseJSON.errors.qty[0];
//             } else {
//                 var message = 'Product(s) quantity is required.';
//             }

//             if (typeof (data.responseJSON.status) != "undefined") {
//                 var message = data.responseJSON.message;
//                 $('#coupon').val('');
//             }
//             errorMessage("Something went wrong");
//         }
//     });
// }

function applyCouponCode(btnLabel = null) {
    // var loader = pageLoading('#cartLoadrer');
    // loader.show();

    var coupon = $('#discount').val();
    var loadCartitems = "";
    $(".discount-add-btn, .discount-rm-btn").prop('disabled',true);
    $(".discount-add-btn").html('<div class="loader-btn"></div>');
    $(".close-button .loading-dots").show();
    $(".close-button .x-svg").hide();
    $.ajax({
        type: 'POST',
        url: base_url + '/'+ lang_code +'/apply-coupon',
        dataType: 'json',
        data: {coupon:coupon,_token:CSRF_TOKEN},
        beforeSend: function () {
            // $("#loading-spinner-2").show();
        },
        success: function (data) {
            $(".discount-add-btn").html(btnLabel ?? "Apply");
            $(".close-button .loading-dots").hide();
            $(".close-button .x-svg").show();
            // loader.hide();
            if (data.status) {
                if (data.cartData.length > 0) {
                    $.each(data.cartData, function (key, value) {
                        loadCartitems +=    '<div class="w-layout-grid cart-item-grid">'+
                                                '<div class="order-item-details">'+
                                                    '<div id="w-node-ded1d67b-c678-1873-e9a7-30ddcd135060-8dad86d2" class="grid-item order-details is-mobile">'+
                                                        '<div class="text-size-regular text-weight-medium">'+value.product_name+(value.month?' | '+moment(value.month).format('MMMM - YYYY'):"")+'</div>';
                        if (value.type=="bundle"){
                            if (value.bundle_items.programs.length > 0){
                                $.each(value.bundle_items.programs, function (indx, pro) {
                                    loadCartitems += '<div class="subject">'+ pro.title+(value.month?' | '+moment(value.month).format('MMMM - YYYY'):"")+'</div>';
                                });
                            }
                            if (value.bundle_items.materials.length > 0){
                                $.each(value.bundle_items.materials, function (indx, mat) {
                                    loadCartitems += '<div class="subject">'+ mat.title +'</div>';
                                });
                            }
                        }
                        loadCartitems += '</div>'+
                                                '</div>'+
                                                '<div id="w-node-ded1d67b-c678-1873-e9a7-30ddcd13506e-8dad86d2" class="grid-item is-cart">'+
                                                    '<div class="text-size-regular text-weight-bold text-align-right">'+value.price.currency+" "+(value.price.value??"0.00")+'</div>'+
                                                    '<div class="remove-item-wrap" onclick="removeItemFromReview(\''+value.rowId+'\')">'+
                                                        '<div class="remove-item w-embed"><svg width="16" height="16" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M13.167 4.00033H17.3337V5.66699H15.667V16.5003C15.667 16.7213 15.5792 16.9333 15.4229 17.0896C15.2666 17.2459 15.0547 17.3337 14.8337 17.3337H3.16699C2.94598 17.3337 2.73402 17.2459 2.57774 17.0896C2.42146 16.9333 2.33366 16.7213 2.33366 16.5003V5.66699H0.666992V4.00033H4.83366V1.50033C4.83366 1.27931 4.92146 1.06735 5.07774 0.91107C5.23402 0.75479 5.44598 0.666992 5.66699 0.666992H12.3337C12.5547 0.666992 12.7666 0.75479 12.9229 0.91107C13.0792 1.06735 13.167 1.27931 13.167 1.50033V4.00033ZM14.0003 5.66699H4.00033V15.667H14.0003V5.66699ZM6.50033 8.16699H8.16699V13.167H6.50033V8.16699ZM9.83366 8.16699H11.5003V13.167H9.83366V8.16699ZM6.50033 2.33366V4.00033H11.5003V2.33366H6.50033Z"></path></svg></div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>';
                    });

                    $('.cart-item-div').html(loadCartitems);
                    $('.cart-number').html(data.cartData.length);
                } else {
                    $('.cart-item-div').html('<div>No items in cart</div>');
                    $('.checkout-btn').hide();
                    $('.cart-number').html(0);
                }

                $bundleDiscountHtml = "";
                if (data.bundle_discounts.length > 0) {
                    $.each(data.bundle_discounts, function (key, value) {
                        $bundleDiscountHtml += '<div class="w-layout-grid cart-prices-grid">'+
                                                    '<div id="w-node-f1f5d1a1-c4f5-9def-38f7-63fcb51d448e-41ad86d3" class="grid-item">'+
                                                        '<div class="text-size-small text-color-gray-2 text-weight-medium">'+
                                                            '<strong>'+$discountTxt+'</strong> <span class="">('+value.title+')</span></div>'+
                                                    '</div>'+
                                                    '<div id="w-node-f1f5d1a1-c4f5-9def-38f7-63fcb51d4493-41ad86d3" class="grid-item order-details">'+
                                                        '<div class="text-size-small text-color-gray-2 text-weight-medium">'+price(value.discounted_value??0)+'</div>'+
                                                    '</div>'+
                                                '</div>';
                    });
                }
                $('.bundle-discounts').html($bundleDiscountHtml);

                if (data.summary[1].value.original_value) {
                    if (data.summary[1].value.original_value > 0) {
                        $('.delivery-div').show();
                    } else {
                        $('.delivery-div').hide();
                    }
                    $('.delivery-value').html(data.summary[1].value.currency+" "+(data.summary[1].value.value??"0.00"));
                }else{
                    $('.delivery-div').hide();
                }
                if (data.summary[2].value.original_value) {
                    if (data.summary[2].value.original_value > 0) {
                        $('.discount-div').show();
                        $('.discount-name').html("("+data.discount.title+")");
                        $('#discount_').val(coupon);
                        $('#discount').val('');
                        $('#discount_').show();
                        $('#discount').hide();
                        $('.discount-add-btn').prop('disabled',true);
                        $('.discount-add-btn').hide();
                        if (coupon) {
                            $('.discount-add-btn').prop('disabled',true);
                            $('.discount-add-btn').hide();
                            $('.discount-rm-btn').prop('disabled',false);
                            $('.discount-rm-btn').show();
                        } else {
                            $('#discount').show();
                            $('#discount_').hide();
                            $('.discount-add-btn').prop('disabled',true);
                            $('.discount-add-btn').show();
                            $('.discount-rm-btn').prop('disabled',true);
                            $('.discount-rm-btn').hide();
                        }
                    } else {
                        $('.discount-div').hide();
                        $('.discount-name').html('');
                        $('#discount').show();
                        $('#discount_').hide();
                        $('.discount-add-btn').prop('disabled',true);
                        $('.discount-add-btn').show();
                        $('.discount-rm-btn').prop('disabled',true);
                        $('.discount-rm-btn').hide();
                    }
                    $('.discount-value').html(data.summary[2].value.currency+" "+(data.summary[2].value.value??"0.00"));
                }else{
                    $('.discount-div').hide();
                    $('.discount-name').html('');
                    $('#discount').show();
                    $('#discount_').hide();
                    $('.discount-add-btn').prop('disabled',false);
                    $('.discount-add-btn').show();
                    $('.discount-rm-btn').prop('disabled',true);
                    $('.discount-rm-btn').hide();
                }
                if (Object.keys(data.summary[4]).length>0 && data.summary[4].value.original_value > 0 ) {
                    $('.wallet-div').show();
                    $('.wallet-value').html("-"+data.summary[4].value.currency+" "+(data.summary[4].value.value??"0.00"));
                    $('.wallet-balance').html(data.summary[4].rest.currency+" "+(data.summary[4].rest.value??"0.00"));
                } else {
                    $('.wallet-div').hide();
                    $('.wallet-value').html('');
                    $('.wallet-balance').html('');
                }
                $('.subtotal-value').html(data.summary[0].value.currency+" "+(data.summary[0].value.value??"0.00"));
                $('.total-value').html(data.summary[3].value.currency+" "+(data.summary[3].value.value??"0.00"));
                successMessage(data.message);
            } else {
                errorMessage(data.message);
            }
        }, error: function (data) {
            var added_coupon = $('#added_coupon').val();

            if (typeof (data.responseJSON.errors) != "undefined" && typeof (data.responseJSON.errors.qty) != "undefined") {
                var message = data.responseJSON.errors.qty[0];
            } else {
                var message = 'Product(s) quantity is required.';
            }

            if (typeof (data.responseJSON.status) != "undefined") {
                var message = data.responseJSON.message;
                // $('#coupon').val('');
                $('#coupon').val(added_coupon);
                $('#coupon_').hide();
                $('#coupon_').val('');
                $('#coupon').show();
            }
            errorMessage("Something went wrong");
        }
    });
}

function errorMessage($message) {
    Toastify({
        text: $message??"",
        duration: 5000,
        className: "error-tostify",
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#FECDCA",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            borderRadius: "6px",
            fontFamily: 'Inter',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#344054",
            paddingLeft:"40px",
        },
        onClick: function(){} // Callback after click
    }).showToast();
};

function successMessage($message) {
    Toastify({
        text: $message??"",
        duration: 5000,
        className: "success-tostify",
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#37CE86",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            borderRadius: "6px",
            fontFamily: 'Inter',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FFFFFF",
            paddingLeft:"40px",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}


// profile upload

function readURL(input) {
    if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                    $('#upload-profile-image')
                            .attr('src', e.target.result)
                            .width(60)
                            .height(60)
                            .show();
            };

            reader.readAsDataURL(input.files[0]);
    }
};

$('#o-message-close').click(function() {
    $(this).parents('#o-msg-wrap').hide();
  });
function pageLoading(el) {

    var $loader = $(el === undefined ? '#page-loader' : el);
    var body = $('html,body');
    var show = function () {
        body.css('overflow', 'hidden');
        $loader.addClass('active');
    }

    var hide = function () {
        body.css('overflow', '');
        $loader.removeClass('active');
    }

    return {
        show: show,
        hide: hide,
    }
}

// file attachment

const dt = new DataTransfer();


$("#attachment").on('change', function(e){

    if(this.files.length >= 2 && document.getElementById("files-names").childElementCount >= 1 ){
        errorMessage("You can only upload a maximum of 2 files");
    }
    else if(this.files.length > 2 || document.getElementById("files-names").childElementCount == 2){
        errorMessage("You can only upload a maximum of 2 files");
    }
    else{
        var input = document.getElementById('attachment');
        // var filePath = input.files.item(i).name;
        // var upname = filePath.replace(/^.*[\\\/]/, '');
        // var ext = filePath.substring(filePath.lastIndexOf('.') + 1);
        // var filename = upname.substring(0, upname.length - 4);
        // var fileNameNew = "";



        for(var i = 0; i < this.files.length; i++){
            var filePath = input.files.item(i).name;
            var upname = filePath.replace(/^.*[\\\/]/, '');
            var ext = filePath.substring(filePath.lastIndexOf('.') + 1);
            var filename = upname.substring(0, upname.length - 4);
            var fileNameNew = "";

            if (filename.length > 10) {
                var fileNameFst = filename.substring(0, 9);
                var fileNameLst = filename.substring(filename.length - 5, filename.length);
                fileNameNew = fileNameFst + "...." + fileNameLst + "." + ext;
            } else {
                fileNameNew = filename + "." + ext;
            }

            let fileBloc = $('<li/>', {class: 'file-block'}),
                fileName = $('<span/>', {class: 'name inbox-box', text: fileNameNew});

            fileBloc.append(fileName).append('<span class="file-delete remove-input-list"></span>')
                ;
            $("#filesList > #files-names").append(fileBloc);
        };

        for (let file of this.files) {
            dt.items.add(file);
        }

        this.files = dt.files;

        $('span.file-delete').click(function(){
            let finame = $(this).prev('span.name').text();
            console.log(finame);
            $(this).parent().remove();
            for(let i = 0; i < dt.items.length; i++){

                if(finame === dt.items[i].getAsFile().name){

                    dt.items.remove(i);
                    continue;
                }
            }

            document.getElementById('attachment').files = dt.files;

        });

    }

});
