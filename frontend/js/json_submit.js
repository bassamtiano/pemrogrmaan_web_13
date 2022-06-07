function displayKoki(dataKoki) {
    output = "";
    for (let i = 0; i < dataKoki.length; i++) {
        output += "<option value='" + dataKoki[i]["KoID"] + "'>" + dataKoki[i]["KoNama"] + "</option>";
    }
    document.getElementById("add-pilih-koki").innerHTML = output;
    document.getElementById("update-pilih-koki").innerHTML = output;
}

function load_data_koki() {
    const xhttp = new XMLHttpRequest();
    let pf;
    xhttp.onload = function () {
        var dataKoki = JSON.parse(this.responseText);
        if (dataKoki.length >= 1) {
            displayKoki(dataKoki);
        }
        else {
            document.getElementById("pilih-koki").innerHTML = "";
        }
    }
    xhttp.open("GET", "http://localhost:8081/api/restoran/koki/view_koki.php");
    xhttp.send();
}

load_data_koki();

function submit_data_menu_image() {

    var form = document.forms.namedItem("form-menu");
    form.addEventListener('submit', function(ev) {

        var oOutput = document.querySelector("#menu-wrapper");
        oData = new FormData(form);

        var oReq = new XMLHttpRequest();
        oReq.open("POST", "http://localhost:8081/api/restoran/menu/add_menu.php", true);
        oReq.onload = function(oEvent) {
            if (oReq.status == 200) {
                search_data("");
            }
            else {
                oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
            }
        };
        
        oReq.send(oData);
        ev.preventDefault();

        var myModalEl = document.getElementById('modalTambahMenu');
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();

    }, false);
}

submit_data_menu_image();

function update_menu() {
    
    var form = document.forms.namedItem("form-update");
    form.addEventListener('submit', function(ev) {
        var oOutput = document.querySelector("#menu-wrapper"),
        oData = new FormData(form);

        var oReq = new XMLHttpRequest();
        oReq.open("POST", "http://localhost:8081/api/restoran/menu/update_menu.php", true);
        oReq.onload = function(oEvent) {
            if (oReq.status == 200) {
                search_data("");

                var myModalEl = document.getElementById('modalEditMenu');
                var modal = bootstrap.Modal.getInstance(myModalEl);
                modal.hide();
            }
            else {
                oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
            }
        };
        
        oReq.send(oData);
        ev.preventDefault();

        

    }, false);
}

update_menu();

function remove_menu() {
    var http = new XMLHttpRequest();

    var id = document.getElementById("delete-MID").value;

    var url = "http://localhost:8081/api/restoran/menu/delete_menu.php";
    var params = "MID=" + id;
    http.open('POST', url, true);


    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            search_data("");

            var myModalEl = document.getElementById('modalDeleteMenu');
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
        }
    }
    http.send(params);
}


