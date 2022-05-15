$(document).ready(function() {
    getListRecipe();


})

async function proccessData(json) {
    let listRecipe = json.data;
    let item = [];
    for (let index = 0; index < listRecipe.length; index++) {
        let element = `
        <div class="col-4 card">
        <div class="card-body">
            <img src="${listRecipe[index].img_url}" class="img-fluid rounded-3" width="auto">
            <h3 class="card-title text-center pt-2">${listRecipe[index].name}</h3>
            <div class="fw-bold">Time Cooking: ${listRecipe[index].approx_time_cook}</div>
            <div class="fw-bold">Recipe Order: ${listRecipe[index].recipe_order_count}</div>
            <div class="text-center">
                <button class="btn btn-primary mt-3">Get Details</button>
            </div>
        </div>
    </div>
    `;
        item.push(element);
    }
    $('#list-recipe').append(item)
}

async function getListRecipe() {
    let token = localStorage.getItem('token');
    $.ajax({
        url: 'https://api.fikrihkl.xyz/api/get-recipe',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'appplication/json'
        },
        contentType: 'application/json; charset=utf-8',
        success: function(result) {
            proccessData(result)
            console.log(result)
        },
        error: function(error) {

        }
    });
}