$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    getRecipe(id);

    $(".btn-logout").click(function(){
        logout();
    });
});

function logout(){
    localStorage.setItem('token', "");
    window.location.replace("login.html");
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
            window.location.replace("login.html");
            console.log(error);
            $('#tv-error-message').toggleClass('visually-hidden', false);
            $('#loading_bar').toggleClass('visually-hidden', true);
            $('#btn-order').prop('disabled', false);    
            
            $('#tv-error-message').text(error);
        }
    });
}

function calculateSubtotal(listIngredients){
    let subtotal = 0;
    listIngredients.forEach(element => {
        subtotal+= element.price;
    });
    $('#tv-subtotal').text(`Rp.${subtotal}`);
}

function parseData(json){
    $('#iv-recipe').attr("src", json.data.img_url);
    $('#tv-name').text(json.data.name);
    $('#tv-time-cook').text(json.data.approx_time_cook);
    $('#tv-order-count').text(json.data.recipe_order_count);
    $('#iv-order').attr('href', `order_confirmation.html?id=${json.data.id}`);
    $('#tv-guide').text(json.data.guide);

    calculateSubtotal(json.data.ingredients);

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