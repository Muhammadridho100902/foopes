$(document).ready(function() {
    getListRecipe();


})

async function proccessData(json) {
    let listRecipe = json.data;
    let item = [];
    for (let index = 0; index < listRecipe.length; index++) {
        let element = `
        <div class="col shadow-sm p-2 rounded-3 my-2">
            <img style="object-fit:cover; height:220px; width:100%;" src="${listRecipe[index].img_url}" class="img-fluid rounded-3" width="auto">
            <h3 class="fs-4 text-center pt-2">${listRecipe[index].name}</h3>
            <div class="d-flex">
                <img width="20px" src="img/ic_time.svg"/>
                <div class="mx-2">${listRecipe[index].approx_time_cook}</div>
            </div>
            <div class="d-flex">
                <img width="20px" src="img/ic_cooking.svg"/>
                <div class="mx-2">${listRecipe[index].recipe_order_count} ordered</div>
            </div>
            <div class="text-end">
                <button class="btn btn-outlined-primary rounded-3 mt-3 align-items-center">
                    
                    <img width="35px" src="img/ic_arrow-right.svg"/>
                </button>
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