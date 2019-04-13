$(document).ready(() => {
    //set a listener on textbox
    $('#input').on("change", (evt) => {
        let text = $('#input').val();
        //the {text:text} sends a parameter named text with the
        $.get('/zipcode', {text:text})
            .done((data) => {
                console.log(data);
                output= "<br>"+data['result'].studio+"<br>"+data['result'].one_bedroom+"<br>"+data['result'].two_bedroom+"<br>"+data['result'].three_bedroom+"<br>"+data['result'].all_homes+"<br>"+data['result'].walkscore
                $('#rental_prices').prepend('<li>'+text+': '+output+'</li>');
                $('#input').val('');

            })
            .fail((xhr) => {
                alert('Problem contacting server');
                console.log(xhr);
            });
    });

});