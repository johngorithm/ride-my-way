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


        var err = '';
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
    })
})