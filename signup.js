$(document).ready(function(){

    $('#btn-register').click(function(){
        if(validate()){
            $("#loading_bar").toggleClass("visually-hidden", false);
            $("#tv-error-message").text("");
            $('#btn-register').prop('disabled', true);    
            register();
        }else{
            $("#tv-error-message").text("please fill email, password, name and phone number");
        }
    });

});

function register(){
    let email = $("#et-email").val();
    let pass = $("#et-pass").val();
    let name = $("#et-name").val();
    let phone = $("#et-phone").val();
    let address = $("#et-address").val();

    if(address.length === 0){
        address = "-"
    }

    let bodyData = {
        email: email,
        pass: pass,
        address: address,
        phone: phone,
        name: name
    };

    console.log(bodyData);

    let request = $.ajax({
        url: "http://api.fikrihkl.xyz/api/register",
        type: "post",
        data: bodyData
    });

    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        window.location.replace("login.html");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, jqXHR
        );
        $('#btn-register').prop('disabled', false);    
        $("#loading_bar").toggleClass("visually-hidden", true);
        $("#tv-error-message").text(jqXHR);
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
       
    });
}

function validate(){
    let isValid = true;

    let email = $("#et-email").val();
    let pass = $("#et-pass").val();
    let name = $("#et-name").val();
    let phone = $("#et-phone").val();
    let address = $("#et-address").val();

    console.log(`${email} ${pass} ${name} ${phone} ${address}`)

    if(!email){
        isValid = false;
    }
    if(!pass){
        isValid = false;
    }
    if(!name){
        isValid = false;
    }
    if(!phone){
        isValid = false;
    }

    return isValid;
}