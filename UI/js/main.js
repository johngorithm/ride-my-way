$(document).ready(function () {

    $('main.content .wrapper form button#login-btn').on('click', function(event) {
        event.preventDefault();
        var err = '';
        var errorOutput = $('.content .wrapper form p.error-message');
        var username = $('.content .wrapper form input[name=username]').val();
        var password = $('.content .wrapper form input[name=password]').val();

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


    $('main.content .wrapper form button#register-btn').on('click', function(event) {
        event.preventDefault();

        var errorOutput = $('.content .wrapper form p.error-message');
        errorOutput.text = '';

        var firstname = $('.content .wrapper form input[name=firstname]');
        var lastname = $('.content .wrapper form input[name=lastname]');
        var email = $('.content .wrapper form input[name=email]');
        var username = $('.content .wrapper form input[name=username]');
        var password = $('.content .wrapper form input[name=password]');

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
    });

    $('.inner-container div button.accept-btn').on('click', function() {
        $(this).text('ACCEPTED').css('background-color', 'green');
    })


    
    $('.inner-container div button.reject-btn').on('click', function(event) {
        var requestId = $(this).parent().parent().attr('id');
        var passenger = $(this).parent().prev().children().children().html();

        var status = $(this).prev().text();

        if(status == "ACCEPTED") {
            var responseHtml = '<p class="error-message">Sorry, You have already accepted this ride';
            $('#reject-ride-request-modal .modal-content .tile .tile-body').html(responseHtml);
            $('#reject-ride-request-modal .modal-content .tile .tile-footer button.reject-btn').hide();
            $('#reject-ride-request-modal').css('display','block');            
        }else{
            var responseHtml = '<p class="confirm-msg small">Are you sure you want to REJECT a ride request from <span>John</span> </p> <p class="error-message smaller"></p>'
            $('#reject-ride-request-modal .modal-content .tile .tile-body').html(responseHtml);
            $('#reject-ride-request-modal .modal-content .tile .tile-footer button.reject-btn').show().attr('data-request_id', requestId);
            $('#reject-ride-request-modal .modal-content .tile .tile-body p span').text(passenger);
            $('#reject-ride-request-modal').css('display','block');
        }
        
    });

    $(window).click(function(event) {
        var target = $(event.target);

        if(target.is('#reject-ride-request-modal')) {
            $('#reject-ride-request-modal').css('display','none');
        }
    });

    //close button for #reject-ride-request-modal
    $('.modal#reject-ride-request-modal .modal-content .tile .tile-footer button.close').on('click', function(event) {
        $('.modal#reject-ride-request-modal').css('display', 'none');
    })

    $('.modal#reject-ride-request-modal .modal-content .tile .tile-footer button.reject-btn').on('click', function() {
        var requestId = $(this).data('request_id');
        console.log(requestId)
        $('.inner-container#'+requestId).css('display', 'none');
        $('.modal#reject-ride-request-modal .modal-content .tile .tile-body p.error-message').text('RIDE REJECTED')
    });


})