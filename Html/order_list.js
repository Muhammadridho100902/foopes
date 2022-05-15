$(document).ready(function () {

    // Check wether the user is already logged in or not
    getRecipe();

});

async function getRecipe(){
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
        success: function (result) {
            console.log(result);
            let listOrder = result.data;
            let listItemHtml = [];
            listOrder.forEach(e => {
                let element = `<div>${e.address}</div>`;
                element += `<div>${e.phone}</div>`;
                element += `<div>${e.total_price}</div>`;
                element += `<div>${e.delivery_fee}</div>`;
                element += `<div>${e.status}</div>`;
                element += `<div>${e.name}</div>`;
                element += `<img src="${e.img_url}"/>`;

                listItemHtml.push(element);
            });
            $('#list-order').append(listItemHtml);
        },
        error: function (error) {
            window.location.replace("Login.html");
        }
    });
}