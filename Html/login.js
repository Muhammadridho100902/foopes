$(document).ready(function () {
    $("#btn_login").click(function () {
        loginJquery();
    });
});

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

