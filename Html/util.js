function getData(url, onSuccess, onError){
    let token = localStorage.getItem('token');
    console.log('S1');
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'appplication/json'
        },
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            console.log(result);
            onSuccess(result);
        },
        error: function (error) {
            console.log(error);
            onError(error);
        }
    });
}

module.exports = {
    getData
}