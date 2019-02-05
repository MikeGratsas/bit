$(function () {
    $('.employees').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                 }
            }
        ]
    });

    $('.expand').click(function (event) {
        $(this).prev('p').toggleClass('multi-line-overflow');
        var shorten = $(this).hasClass("shorten");
        $(this).attr('title', 'Click to read ' + (shorten ? 'more' : 'less'));
        $(this).html(shorten ? 'Read More <span class="fas fa-arrow-circle-right"></span>': 'Read Less <span class="fas fa-arrow-circle-left"></span>');
        $(this).toggleClass('shorten');
    });

    $('#subscribe').click(function (event) {
        event.preventDefault();
        if (!$('#email').val()) {
            alert("You must enter email to subscribe");
        }
        else {
          if ($('.g-recaptcha').length) {
            grecaptcha.execute();
          }
          else {
            grecaptcha.execute('6LeixI4UAAAAAFshGFsgG4HqUz_THtKzWpb4Dcfq', { action: 'homepage' }).then(function (token) {
                console.log('Token is executed\n' + token);
                $('g-recaptcha-response').val(token);
                onSubmit(token);
            });
          }
        }
    });

    $('#subscribe-form').submit(function (event) {
        if (!confirm('Do you confirm subscription?'))
            event.preventDefault();
    });
});

function onSubmit(token) {
    $('#subscribe-form').submit();
}
