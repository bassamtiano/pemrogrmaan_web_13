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

function displayMenu(dataMenu) {
    output = "";
    for (let i = 0; i < dataMenu.length; i++) {

        output += '<div class="col" style="padding-top: 10px; padding-bottom: 10px;">';
            output += '<div class="card" style="width:100%">';
                output += '<img class="img-fluid" style="border-radius: 5px 5px 0 0; width: 100%; height: 200px; object-fit: cover;" src="http://localhost:8081/api/restoran/menu/images/' + dataMenu[i]["picture_menu"] + '">';
                output += '<div class="card-body text-center">';
                    output += '<h5 class="card-title">';
                        output += dataMenu[i]["nama_menu"] + '</span>';
                        output += '<span class="badge bg-success">';
                        output += dataMenu[i]["status_menu"];
                        output += '</span>';
                    output += '</h4>';
                    output += '<p>';
                        output += 'Harga : ' + dataMenu[i]["harga_menu"];
                    output += '</p>';
                    output += '<div class="btn-group" role="group" aria-label="Basic example">';
                        output += '<a href="#" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEditMenu" onclick="load_form_data(' + dataMenu[i]["id"] + ')">';
                            output += '<i class="bi bi-file-diff-fill"></i>';
                            output += 'Edit';
                        output += '</a>';
                        output += '<i type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalDeleteMenu" onclick="displayDelete(' + dataMenu[i]["id"] + ')">';
                            output += '<i class="bi bi-file-earmark-x"></i>';
                            output += 'Delete';
                        output += '</i>';
                    output += '</div>';
                output += '</div>';
            output += '</div>';
        output += '</div>';

    }
    document.getElementById("menu-wrapper").innerHTML = output;
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
            alert("error");
        }
    }
    xhttp.open("GET", "http://localhost:8081/api/restoran/menu/search_menu_by_id.php?id=" + keyword_id);
    xhttp.send();
}


function displayDelete(keyword_id) {
    const xhttp = new XMLHttpRequest();
    let df = null
    xhttp.onload = function () {
        var dataForm = JSON.parse(this.responseText);
        if (dataForm.length >= 1) {
            df = dataForm
            document.querySelector(".delete-MNama").innerHTML = "Apakah Menu " + df[0]["MNama"] + " ingin dihapus !";
            document.getElementById("delete-MID").value = df[0]["MID"];
        }
        else {
            alert("error");
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