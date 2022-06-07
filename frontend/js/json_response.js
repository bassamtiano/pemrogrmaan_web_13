function displayMenu(dataMenu) {
    output = "";
    for (let i = 0; i < dataMenu.length; i++) {
        // output += "<p>" + dataMenu[i]["nama_menu"] + "<p/>"

        output += '<div class="menu-item">';
            output += '<div class="menu-picture">';
                output += '<img id="menu-picture" src="http://localhost:8081/api/restoran/menu/images/' + dataMenu[i]["picture_menu"] + '">';
            output += '</div>';
            output += '<div class="menu-desc">';
                output += '<span class="menu-name">' + dataMenu[i]["nama_menu"] + '</span>';
                output += '<span class="menu-harga">Harga = ' + dataMenu[i]["harga_menu"] + '</span>';
                output += '<span class="menu-status">' + dataMenu[i]["status_menu"] + '</span>';
                output += '<span class="menu-status">';
                    output += '<button class="remove-button" onclick="remove_menu(' + dataMenu[i]["id"] + ')">Remove</button>';
                    output += '<button class="remove-button" onclick="load_form_data(' + dataMenu[i]["id"] + ')">Edit</button>';
                output += '</span>';
            output += '</div>';
        output += '</div>';

    }
    document.getElementById("menu-wrapper").innerHTML = output;
}

function search_data(keyword) {
    const xhttp = new XMLHttpRequest();
    let pf;
    xhttp.onload = function () {
        var dataMenu = JSON.parse(this.responseText);
        if (dataMenu.length >= 1) {
            displayMenu(dataMenu);
        }
        else {
            document.getElementById("menu-wrapper").innerHTML = "";
        }
    }
    xhttp.open("GET", "http://localhost:8081/api/restoran/menu/search_menu.php?keyword=" + keyword);
    xhttp.send();
}

function displayForm(dataForm) {
    document.getElementById("update-MID").value = dataForm[0]["MID"];
    document.getElementById("update-pilih-koki").value = dataForm[0]["KoID"];
    document.getElementById("update-menu-nama").value = dataForm[0]["MNama"];
    document.getElementById("update-harga-menu").value = dataForm[0]["MHarga"];

    document.getElementById("update-pilih-koki").value = dataForm[0]["KoID"];

    if (dataForm[0]["MStatus"] == 1) {
        document.getElementById("update-mstatus_1").setAttribute('checked', '');
    }
    else if (dataForm[0]["MStatus"] == 0) {
        document.getElementById("update-mstatus_0").setAttribute('checked', '');
    }
}

function load_form_data(keyword_id) {
    const xhttp = new XMLHttpRequest();
    let pf;
    xhttp.onload = function () {
        var dataForm = JSON.parse(this.responseText);
        if (dataForm.length >= 1) {
            displayForm(dataForm)
        }
        else {
            document.getElementById("menu-wrapper").innerHTML = "";
        }
    }
    xhttp.open("GET", "http://localhost:8081/api/restoran/menu/search_menu_by_id.php?id=" + keyword_id);
    xhttp.send();
}

function clear_form() {
    document.getElementById("MID").value = null
    document.getElementById("pilih-koki").value = null
    document.getElementById("menu-nama").value = null
    document.getElementById("harga-menu").value = null;

    document.getElementById("mstatus_1").setAttribute('checked', '');   
}
 
const searchElement = document.querySelector('#search-menu');

searchElement.addEventListener('input', () => {
    var keyword = searchElement.value;
    search_data(keyword);
});

document.addEventListener('DOMContentLoaded', function() {
   search_data("");
}, false);