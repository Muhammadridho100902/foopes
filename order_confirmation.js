let isDataLoaded = false;
let deliveryFee = 25000;
let subtotal = 0;
let total = 0;
let id = -1;
$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    id = urlParams.get('id');

    $('#btn-order').click(function(){
        if(validate()){
            $('#tv-error-message').toggleClass('visually-hidden', true);
            $('#loading_bar').toggleClass('visually-hidden');
            $('#btn-order').prop('disabled', true);    

            createOrder();
        }else{
            $('#tv-error-message').toggleClass('visually-hidden', false);
        }
        
    });

    getRecipe(id);
});

function validate(){
    let isValid = true;
    
    let name = $('#et-name').val();
    let address = $('#et-address').val();
    let phone = $('#et-phone').val();
    if(name.length === 0){
        isValid = false;
    }
    if(phone.length === 0){
        isValid = false;
        console.log("HERE "+phone.length)
    }
    if(address.length === 0){
        isValid = false;
    }
    if(!isDataLoaded){
        isValid = false;
    }

    return isValid;
}

async function createOrder(){
    let token = localStorage.getItem('token');

    let bodyData = {
        address: $('#et-address').val(),
        phone: $('#et-phone').val(),
        recipe_id: parseInt(id),
        total_price: total,
        delivery_fee: deliveryFee
    };

    console.log(bodyData);

    let req = $.ajax({
        url: "https://api.fikrihkl.xyz/api/order",
        headers : {
            'Authorization': 'Bearer '+token
        },
        type: "post",
        data: bodyData
    });

    req.done(function (response, textStatus, jqXHR){
        console.log(response);
        window.location.replace("order_success.html");
    });

    // Callback handler that will be called on failure
    req.fail(function (jqXHR, textStatus, errorThrown){
        
    });
}

async function getRecipe(id){
    let token = localStorage.getItem('token');
    $.ajax({
        url: `https://api.fikrihkl.xyz/api/recipe?id=${id}`,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'appplication/json'
        },
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            isDataLoaded = true;
            console.log(result);
            parseData(result);
        },
        error: function (error) {
            console.log(error);
            $('#tv-error-message').toggleClass('visually-hidden', false);
            $('#loading_bar').toggleClass('visually-hidden', true);
            $('#btn-order').prop('disabled', false);    
            
            $('#tv-error-message').text(error);
        }
    });
}

function calculateSubtotal(listIngredients){
    subtotal = 0;
    listIngredients.forEach(element => {
        subtotal+= element.price;
    });
}

function calculateTotal(){
    total = 0;
    total += subtotal;
    total += deliveryFee;
}

function accumulatePricing(){
    $('#tv-subtotal').text(`Rp.${subtotal}`);
    $('#tv-delivery-fee').text(`Rp.${deliveryFee}`);
    $('#tv-total').text(`Rp.${total}`);
}

function parseData(json){
    $('#iv-recipe').attr("src", json.data.img_url);
    $('#tv-recipe-name').text(json.data.name);

    calculateSubtotal(json.data.ingredients);
    calculateTotal();
    accumulatePricing();

    let listItem = json.data;
    let listLayout = [];
    
    listItem.ingredients.forEach(element => {
        let layout = `
        <div class="col my-2">
            <div class="bg-light p-2 rounded-3">
                <div class="fw-bold">
                    ${element.name}
                </div>
                <div class="d-flex justify-content-between" style="font-size: 15px;">
                    <div>${element.quantity}</div>
                    <div>Rp.${element.price}</div>
                </div>
            </div>
        </div>
        `.trim();
        listLayout.push(layout);
    });

    $('#list-ingredients').append(listLayout);


}