$(document).ready(function () {

    // Check wether the user is already logged in or not
    
   // checkSession();

    $("#btn_login").click(function () {
        loginJquery();
    });
});

async function checkSession(){
    let token = localStorage.getItem('token');
    console.log('S1');
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
            console.log(result);
            if(result.status === true){
                window.location.replace("order_list.html");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

async function loginJquery(){
    let etEmail = $("#et_email");
    let etPass = $("#et_pass");

    let bodyData = {
        email: etEmail.val(),
        pass: etPass.val(),
    }

    console.log(bodyData);

    let request = $.ajax({
        url: "http://api.fikrihkl.xyz/api/login",
        type: "post",
        data: bodyData
    });

    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        localStorage.setItem('token', response.data.token)
        window.location.replace("order_list.html");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
       
    });
}

