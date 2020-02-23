$(function () {
        // var currentDtaeContainer = $('.current-date');
        // var DATE_API = 'http://date.jsontest.com';
        //
        // function fetchDate(){
        //     $.ajax({
        //         url: DATE_API,
        //         type: 'GET'
        //     }).done(function (result) {
        //         currentDtaeContainer
        //             .text(result.time+", "+ result.date);
        //     });
        // }
        //
        // fetchDate();
        //
        // var starWarsContainer = $('.star-wars');
        // var PEOPLE_API = 'https://swapi.co/api';
        // var vader = '/people/88'
        // function fetchStarWars(){
        //     $.ajax({
        //         url: PEOPLE_API + vader,
        //         type: 'GET'
        //     }).done(function (result) {
        //         renderPerson(result)
        //     });
        // }
        // fetchStarWars();
        //
        // function renderPerson(person){
        //     var name = $('<strong>').text(person.name);
        //     starWarsContainer.append(name);
        // }

    var booksNameContainer = $('.books');
    var BOOKS_API = 'http://localhost:8282/books';

    function fetchBooks(){
        $.ajax({
            url: BOOKS_API,
            type:'GET'
        }).done(function (result) {
            Array.from(result).forEach(function (e) {
                var title = $('<h2></h2>').text(e.title);
                var div = $('<div></div>');
                booksNameContainer.append(title);
                title.after(div);
            })
        })
    }

    fetchBooks();
});