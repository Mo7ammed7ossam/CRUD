// declare variables

// inputs
var inpName = document.getElementById("inpName");
var inpAge = document.getElementById("inpAge");
var inpSalary = document.getElementById("inpSalary");
var inpCountry = document.getElementById("inpCountry");
var inpSearch = document.getElementById("inpSearch");

// buttons
var btnInsert = document.getElementById("btnInsert"); // button insert

// outputs
var outputdata = document.getElementById("outputdata"); // tbody display

// globale variable
var clientContainer;
var toggler = false;
var globalIndex = 0;

/////////////////////////////////////////////////////////////////////////////////

// declare functions

// Enter Data
function addFun() {
    var clientAdd = {
        cName: inpName.value,
        cAge: inpAge.value,
        cSalary: inpSalary.value,
        cCountry: inpCountry.value
    }
    clientContainer.push(clientAdd);
    localStorage.setItem("clientContainer", JSON.stringify(clientContainer));
}

// Display Data
function showFun() {
    var clientDisplay = "";
    for (var i = 0; i < clientContainer.length; i++) {
        var id = i + 1;
        clientDisplay += `<tr>
                                <td>` + id + `</td>
                                <td>` + clientContainer[i].cName + `</td>
                                <td>` + clientContainer[i].cAge + `</td>
                                <td>` + clientContainer[i].cSalary + `</td>
                                <td>` + clientContainer[i].cCountry + `</td>
                                <td>
                                    <button onclick="deleteFun(` + i + `)" class="btn btn-danger" type="button">Delet</button>
                                </td>
                                <td>
                                    <button onclick="retriveFun(` + i + `)" class="btn btn-info" type="button">Update</button>
                                </td>
                              </tr>`
    }
    outputdata.innerHTML = clientDisplay;
}

// Delete Data
function deleteFun(index) {
    clientContainer.splice(index, 1);
    showFun();
    localStorage.setItem("clientContainer", JSON.stringify(clientContainer));
}

// Retrive Data
function retriveFun(index) {
    inpName.value = clientContainer[index].cName;
    inpAge.value = clientContainer[index].cAge;
    inpSalary.value = clientContainer[index].cSalary;
    inpCountry.value = clientContainer[index].cCountry;

    btnInsert.innerHTML = "Updata";
    globalIndex = index;
    toggler = true;
}

// Update Data
function updateFun() {
    clientContainer[globalIndex].cName = inpName.value;
    clientContainer[globalIndex].cAge = inpAge.value;
    clientContainer[globalIndex].cSalary = inpSalary.value;
    clientContainer[globalIndex].cCountry = inpCountry.value;
}

// Search Data
function searchFun() {
    var clientSearch = "";
    for (var i = 0; i < clientContainer.length; i++) {
        var id = i + 1;
        if (clientContainer[i].cName.includes(inpSearch.value)) {
            clientSearch += `<tr>
                                        <td>` + id + `</td>
                                        <td>` + clientContainer[i].cName + `</td>
                                        <td>` + clientContainer[i].cAge + `</td>
                                        <td>` + clientContainer[i].cSalary + `</td>
                                        <td>` + clientContainer[i].cCountry + `</td>
                                        <td>
                                            <button onclick="deleteFun(` + i + `)" class="btn btn-danger" type="button">Delet</button>
                                        </td>
                                        <td>
                                            <button onclick="retriveFun(` + i + `)" class="btn btn-info" type="button">Update</button>
                                        </td>
                                      </tr>`
        }
    }
    outputdata.innerHTML = clientSearch
}


//////////////////////////////////////////////////////////////

// Final Actions
//check
if (localStorage.getItem("clientContainer") == null) {
    clientContainer = [];
} else {
    clientContainer = localStorage.getItem(JSON.parse("clientContainer"));
    showFun();
    console.log(clientContainer)
}

// button click
btnInsert.onclick = function() {
    if (toggler == false) {
        addFun();
    } else {
        updateFun();
    }
    btnInsert.innerHTML = "Insert";
    toggler = false;
    showFun();
}

// search
inpSearch.onkeyup = function() {
    searchFun();
}