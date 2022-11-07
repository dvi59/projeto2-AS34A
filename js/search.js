let carName = document.querySelector('#carName')
let tableResult = document.querySelector('#result')
let errors = document.querySelector('#carNameError')
let searchBtn = document.querySelector('#searchBtn')

carName.value = '';
searchBtn.disabled = true;

carName.addEventListener('keyup', () => {
    if (carName.value.length < 3) {
        errors.innerHTML = 'Digite ao menos 3 letras';
        searchBtn.disabled = true;
    } else {
        errors.innerHTML = '';
        searchBtn.disabled = false;
    }
});


function consultar() {
    var child = tableResult.lastElementChild;
    while (child) {
        if (child.tagName !== "TBODY") {
            tableResult.removeChild(child);
            child = tableResult.lastElementChild;
        } else {
            break;
        }
    }

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/cars?model=' + carName.value,
        headers: {'X-Api-Key': 'mLqNRQyW+lTu/RWiZfCnRg==iEumzB29d7n7NmGD'},
        contentType: 'application/json',
        success: function (result) {
            let data = result;
            for (let i = 0; i < data.length; i++) {
                var tr = document.createElement('tr')
                var td1 = document.createElement('td')
                var td2 = document.createElement('td')
                var td3 = document.createElement('td')
                td1.innerHTML = data[i].make
                td2.innerHTML = data[i].year
                td3.innerHTML = data[i].model
                tableResult.append(tr)
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}


