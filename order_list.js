$(document).ready(function() {

    // Check wether the user is already logged in or not
    getRecipe();

});

async function getRecipe() {
    let token = localStorage.getItem('token');
    $.ajax({
        url: 'https://api.fikrihkl.xyz/api/order/get-list',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'appplication/json'
        },
        contentType: 'application/json; charset=utf-8',
        success: function(result) {
            console.log(result);
            let listOrder = result.data;
            let listItemHtml = [];
            listOrder.forEach(e => {
                let element = `<div class="card mt-4">
                <div class="card-body">
                    <div class="card p-md-4 shadow-lg mt-2">
                        <h6>Shopping ${e.order_date} <span class="status-order">${e.status}</span></h6>
                        <h6>Foopes Web Order List</h6>
                        <div class="details pt-1">
                            <div class="container-img">
                                <img class="container-img" src="${e.img_url}"></img>
                            </div>
                            <div class="txt-next">
                                <h6>${e.recipe_name}</h6>
                                <h6 style="font-weight: lighter">Delivery Fee: Rp. ${e.delivery_fee}</h6>
                                <h6 class="pt-4" style="font-weight: 500">Total Price: Rp. ${e.total_price}</h6>
                            </div>
                        </div>
                        <div class="text-right">
                        <a href="order_detail.html?id=${e.id}">
                            <button class="btn btn-outlined-primary rounded-3 mt-3 align-items-center">
                                
                                <img width="35px" src="img/ic_arrow-right.svg"/>
                            </button>
                        </a>
                    </div>
                    </div>
                </div>
            </div>`;

                listItemHtml.push(element);
            });
            $('#list-order').append(listItemHtml);
        },
        error: function(error) {
            window.location.replace("login.html");
        }
    });
}