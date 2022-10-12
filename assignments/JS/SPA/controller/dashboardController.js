$('.customerUL').css('display', 'none');
$('.itemUL').css('display', 'none');
$('.placeOrderUL').css('display', 'none');


$('.customerContent').css('display', 'none');
$('.itemContent').css('display', 'none');
$('.placeOrderContent').css('display', 'none');


$('.customer').click(function () {
    $('.dashUL').css('display', 'none');
    $('.itemUL').css('display', 'none');
    $('.placeOrderUL').css('display', 'none');
    $('.customerUL').css('display', 'flex');


    $('.dashboardContent').css('display', 'none');
    $('.customerContent').css('display', 'flex');
    $('.itemContent').css('display', 'none');
    $('.placeOrderContent').css('display', 'none');

});

$('.item').click(function () {
    $('.dashUL').css('display', 'none');
    $('.itemUL').css('display', 'flex');
    $('.placeOrderUL').css('display', 'none');
    $('.customerUL').css('display', 'none');


    $('.dashboardContent').css('display', 'none');
    $('.customerContent').css('display', 'none');
    $('.itemContent').css('display', 'flex');
    $('.placeOrderContent').css('display', 'none');

});

$('.placeOrder').click(function () {
    $('.dashUL').css('display', 'none');
    $('.itemUL').css('display', 'none');
    $('.placeOrderUL').css('display', 'flex');
    $('.customerUL').css('display', 'none');


    $('.dashboardContent').css('display', 'none');
    $('.customerContent').css('display', 'none');
    $('.itemContent').css('display', 'none');
    $('.placeOrderContent').css('display', 'flex');

});

$('.dashboard').click(function () {
    $('.dashUL').css('display', 'flex');
    $('.itemUL').css('display', 'none');
    $('.placeOrderUL').css('display', 'none');
    $('.customerUL').css('display', 'none');


    $('.dashboardContent').css('display', 'flex');
    $('.customerContent').css('display', 'none');
    $('.itemContent').css('display', 'none');
    $('.placeOrderContent').css('display', 'none');
});