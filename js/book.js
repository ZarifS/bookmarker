$(document).ready(function() {
    //Setup for getting urlParameter(s) passed in
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    var id = getUrlParameter('id');
    getBookInfoByID(id);
});

var key = 'AIzaSyAm9iY2lu-PTDd4gbFu7byI5b5MMlBYsWM';

function getBookInfoByID(id) {
    $.getJSON('https://www.googleapis.com/books/v1/volumes/' + id + '?key=' + key + '', function(data) {
        console.log(data);
        book = data.volumeInfo;
        images = book.imageLinks;
        if (images.medium) {
            imageLink = images.medium;
        } else {
            imageLink = images.small;
        }
        desc = book.description;
        author = book.authors[0];
        pages = book.pageCount;
        title = book.title;
        moreInfo = book.infoLink;
        if (book.averageRating) {
            rating = book.averageRating;
        } else rating = "N/A"
        if (data.saleInfo.retailPrice) {
            price = data.saleInfo.retailPrice.amount;
            currency = data.saleInfo.retailPrice.currencyCode;
        } else {
            price = '$4.99';
            currency = 'CAD';
        }

        //Setting page title
        $("title").html(
            '' + title + ''
        )

        //Filling the div sections in book.html/body/#bookInformation
        $("#bookImage").html(
            '<img src=' + imageLink + ' class=bookImage </>'
        )
        $("#bookTitle").html(
            '<h1>' + title + ' </h1>'
        )
        $("#author").html(
            '<h3>By: ' + author + ' </h3>'
        )
        $("#description").html(
            '<p class="text-justify">' + desc + '</p>'
        )
        $("#rating").html(
            '<h4 >Average Rating: ' + rating + '</h4>'
        )
        $("#pageCount").html(
            '<h4>Pages: ' + pages + '</h4>'
        )
        $("#price").html(
            '<h4>' + price + ' ' + currency + '</h4>'
        )
    });
};