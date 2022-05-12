$(document).ready(function () {

    // Check wether the user is already logged in or not
    checkSession();

});

async function checkSession(){
    let token = localStorage.getItem('token');
    $.ajax({
        url: 'https://api.fikrihkl.xyz/api/secret-route',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'appplication/json'
        },
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if(result.status === false){
                window.location.replace("Login.html");
            }
        },
        error: function (error) {
            window.location.replace("Login.html");
        }
    });
}