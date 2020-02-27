$(function () {
    var booksNameContainer = $('.books');
    var BOOKS_API = 'http://localhost:8282/books/';
    var addBookForm = $('#addBook');
    var submitButton = $('#addBook button');
    var Book = function(isbn, title, author, publisher, type){
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.type = type;
    };

    deleteSubmit(addBookForm);
    //fetchBooks(BOOKS_API,booksNameContainer);

    submitButton.on('click',function () {
        var newBook = new Book(
            $('#addBook input:nth-of-type(1)').val(),
            $('#addBook input:nth-of-type(2)').val(),
            $('#addBook input:nth-of-type(3)').val(),
            $('#addBook input:nth-of-type(4)').val(),
            $('#addBook input:nth-of-type(5)').val());

        sendBookToServer(BOOKS_API,newBook);
        fetchBooks(BOOKS_API,booksNameContainer);

    });

    deleteBook(BOOKS_API,booksNameContainer);

});
//-----------------------functions-----------------------------------------------------------
function deleteSubmit(btn){
    btn.on('submit', function (e) {
        e.preventDefault();
    });
}

function fetchBooks(api,container){
    $('.books').children().remove();
    $.ajax({
        url: api,
        type:'GET'
    }).done(function (result) {
        Array.from(result).forEach(function (e) {
            var title = $('<h2 class="title"></h2>').text(e.title);
            var div = $('<div class="description"></div>');
            div.text(e.id).slideUp();
            container.append(title);
            title.append(div);
            addDeleteButton(title);
            slideId(title,div);
        });
    });
}
function slideId(title,div){
    title.on('click',function () {
        div.slideToggle();
    });
}
function addDeleteButton(el){
    el.after('<button class="btn" data-ajax="DELETE">Delete book</button>');
}

function sendBookToServer(api,book){
    $.ajax({
        url: api,
        data: JSON.stringify(book),
        type:'POST',
        dataType: 'json',
        contentType: 'application/json'
    });
}

function deleteBook(api,container){
    container.on('click', '.btn',function () {
        ajaxDelete(api,getTextFromBook($(this)));
        fetchBooks(api,container);
    });
}
function ajaxDelete(api,el){
    $.ajax({
        url: api+el,
        type:'DELETE'
    });
}
function getTextFromBook(el){
    //text is also id of book
    return el.prev().children().eq(0).text()
}


