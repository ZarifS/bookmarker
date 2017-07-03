$(document).ready(function() {
    //Setup for using Slick carousel
    $('.sample').slick({
        autoplay: true,
        dots: true,
        infinite: true,
    });

    // Setting up listeners 

    //Book links to open new pages
    $('body').on('click', 'a.bookLinks', function() {
        console.log("Clicked a book Link");
        var id = $(this).attr('id');
        window.open("book.html?id=" + id);
    });

    //Category Display in Home page
    $("#categories a").click(function() {
        var categories = $(this).text();
        getBooksByCategory(categories, 10);
    });

    //Search Display in Home Page
    $("#submit").click(function() {
        var search = $('#searchForm').val();
        getBooksBySearch(search, 10);
    });
});

//Key for Google Books API
var key = 'AIzaSyAm9iY2lu-PTDd4gbFu7byI5b5MMlBYsWM';

function getBooksByCategory(categories, limit) {
    $.getJSON('https://www.googleapis.com/books/v1/volumes?q=subject:' + categories + '&maxResults=' + limit + '&key=' + key + '', function(data) {
        var items = data.items;
        $("#categoryResult").html(
            '<h2 class="text-center">' + categories + ' Books</h2>' +
            '<table class="table table-striped">' +
            '<thead><tr><th>#</th><th>Title</th><th>Author</th><th>Rating</th></tr></thead>' +
            '<tbody id="category-table"></tbody></table>'
        );
        items.forEach(function(book, i) {
            i = i + 1;
            title = (book.volumeInfo.title);
            author = (book.volumeInfo.authors[0]);
            id = (book.id);
            rating = (book.volumeInfo.averageRating)
            if (!rating) {
                rating = "-";
            }
            $("#category-table").append(
                '<tr><th scope="row">' + i + '</th>' +
                '<td><a class=bookLinks id=' + id + '>' + title + '</a></td>' +
                '<td>' + author + '</td>' +
                '<td>' + rating + '</tr>'
            )
        }, this);
    });
}

function getBooksBySearch(search, limit) {
    $.getJSON('https://www.googleapis.com/books/v1/volumes?q=' + search + '&maxResults=' + limit + '&key=' + key + '', function(data) {
        var items = data.items;
        console.log(items);
        $("#searchResults").html(
            '<h2 class="text-center">Search Results</h2>' +
            '<table class="table table-inverse">' +
            '<thead><tr><th>#</th><th>Title</th><th>Author</th><th>Average Rating</th></tr></thead>' +
            '<tbody id="search-table"></tbody></table>'
        );
        titles = [];
        items.forEach(function(book, i) {
            title = (book.volumeInfo.title);
            i = i + 1;
            titles[i] = title;
            author = (book.volumeInfo.authors[0]);
            id = (book.id);
            rating = (book.volumeInfo.averageRating)
            if (!rating) {
                rating = "-";
            }
            $("#search-table").append(
                '<tr><th scope="row">' + i + '</th>' +
                '<td><a class=bookLinks id=' + id + '>' + title + '</a></td>' +
                '<td>' + author + '</td>' +
                '<td>' + rating + '</tr>'
            )
        }, this);
    });
}