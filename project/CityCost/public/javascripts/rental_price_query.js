$(document).ready(() => {
    //set a listener on textbox
    $('#input').on("change", (evt) => {
        let text = $('#input').val();
        //the {text:text} sends a parameter named text with the
        $.get('/zipcode', {text:text})
            .done((data) => {
                console.log(data);
                $('#rental_prices').prepend('<li>'+text+': '+data['result']+'</li>');
                $('#input').val('');

            })
            .fail((xhr) => {
                alert('Problem contacting server');
                console.log(xhr);
            });
    });

});