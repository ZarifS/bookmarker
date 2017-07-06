$(document).ready(function() {
    $('#placeOrder').click(function() {
        if (checkEmpty()) {
            alert("Order has been placed successfully!");
        }
    });
});

function checkEmpty() {
    var a = document.forms['registration_form'].firstname.value;
    var b = document.forms['registration_form'].lastname.value;
    var c = document.forms['registration_form'].email.value;
    var d = document.forms['shipping_form'].address.value;
    var e = document.forms['shipping_form'].city.value;
    var f = document.forms['shipping_form'].state.value;
    var h = document.forms['shipping_form'].zip.value;
    var i = document.forms['payment_form'].card.value;
    var j = document.forms['payment_form'].ccv.value;
    var k = document.forms['payment_form'].month.value;
    var l = document.forms['payment_form'].year.value;
    if (a == null || a == "", b == null || b == "", c == null || c == "", d == null || d == "",
        e == null || e == "", f == null || f == "", h == null || h == "",
        i == null || i == "", j == null || j == "", k == null || k == "", l == null || l == "") {
        alert("Please fill in all the fields.");
        return false;
    }
    return true;
};