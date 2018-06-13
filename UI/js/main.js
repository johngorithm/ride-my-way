$(document).ready(function () {

    $('main.content .content-inner form button#login-btn').on('click', function(event) {
        event.preventDefault();
        var err = '';
        var errorOutput = $('.content .content-inner form p.error-message');
        var username = $('.content .content-inner form input[name=username]').val();
        var password = $('.content .content-inner form input[name=password]').val();

        if (!username && !password){
            err = 'Username and Password are both required!';
            errorOutput.text(err);
        }
        else if(!username && password){
            err = 'Username is required!';
            if(!(password.length >= 6)) {
                err = 'Username is required and Password is less than 6 characters'
            }
            errorOutput.text(err);
        }
        else if (!password && username){
            err = 'Password is required!';
            errorOutput.text(err);
        }else if (username && password){
            if(!(password.length >= 6)) {
                err = 'Password is less than 6 characters'
                errorOutput.text(err);
            }else{
            window.location.href = './home.html';
            }
            
        }

        
    });


    $('main.content .content-inner form button#register-btn').on('click', function(event) {
        event.preventDefault();

        var errorOutput = $('.content .content-inner form p.error-message');
        errorOutput.text = '';

        var firstname = $('.content .content-inner form input[name=firstname]');
        var lastname = $('.content .content-inner form input[name=lastname]');
        var email = $('.content .content-inner form input[name=email]');
        var username = $('.content .content-inner form input[name=username]');
        var password = $('.content .content-inner form input[name=password]');

        var fields = [firstname, lastname, email, username, password];
        var allProvided = true;
        fields.forEach(function(field) {
            if(!field.val()) {
                field.prev().text('This field is require!');
                allProvided = false;
            }else{
                
                if(field.attr('name') == 'password'){
                    if(!(field.val().length >= 6)){
                        field.prev().text('Password must be at least 6 characters!');
                        allProvided = false;
                    }
                }else{
                    field.prev().text('');
                }
            }
        });

        if(allProvided) {
            window.location.href = './home.html';
        }
    });

    var rideDetailModal = $('.modal#detail-modal');

    $('.tile .tile-footer button.view').on('click', function(e) {
        var info = $(this).data('ride-info');

        $('.modal#detail-modal .modal-content .tile .tile-heading h4 span').text(info.destination).css('text-transform', 'uppercase');
        $('.modal#detail-modal .modal-content .tile .tile-heading p span').text(info.from);
        $('.modal#detail-modal .modal-content .tile .tile-body .row p.date').text(info.date);
        $('.modal#detail-modal .modal-content .tile .tile-body .row p.time').text(info.time);
        $('.modal#detail-modal .modal-content .tile .tile-body.not-first p.driver').text(info.driver);

        //clear old message
        $('.modal#detail-modal .modal-content .tile .tile-heading span.message').text('')
    
        rideDetailModal.css('display','block');
    });

    //closing the ride detail modal on clicking the modal overlay
    $(window).click(function(event) {
        var target = $(event.target);

        if(target.is('#detail-modal')) {
            rideDetailModal.css('display','none');
        }
    });

    //closing the modal with the .close button
    $('.modal#detail-modal .modal-content .tile .tile-footer button.close').on('click', function(event) {
        $('.modal#detail-modal').css('display', 'none');
    })

    $('.modal#detail-modal .modal-content .tile .tile-footer button.join').on('click', function() {
        $('.modal#detail-modal .modal-content .tile .tile-heading span.message').text('REQUEST SENT')
    })


})