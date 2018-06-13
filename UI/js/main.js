$(document).ready(function () {

    $('main.content .content-inner form button').on('click', function(event) {
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

        
    })
})