function loadAllCustomerIds() {
    $('#selectCusId').empty();
    $('#selectCusId').append(`<option>select</option>`);

    for (let cus of cusArray) {
        $('#selectCusId').append(`<option>${cus.id}</option>`);
    }
}

function loadAllItemCodes() {
    $('#selectItmCode').empty();
    $('#selectItmCode').append(`<option>select</option>`);

    for (let itm of itmArray) {
        $('#selectItmCode').append(`<option>${itm.code}</option>`);
    }
}


$('#selectCusId').change(function () {
    let selectedVal = $(this).val();
    for (let cus of cusArray) {
        if (cus.id == selectedVal) {
            setCustomerDetails(cus);
        } else if ('select' == selectedVal) {
            $('#cusID, #cusName, #cusAddress, #cusSalary').val("");
        }
    }

});

function setCustomerDetails(cusObj) {
    $('#cusID').val(cusObj.id);
    $('#cusName').val(cusObj.name);
    $('#cusAddress').val(cusObj.address);
    $('#cusSalary').val(cusObj.salary);
}

$('#selectItmCode').change(function () {
    let selectedVal1 = $(this).val();
    for (let itm of itmArray) {
        if (itm.code == selectedVal1) {
            setItemDetails(itm);
        } else if ('select' == selectedVal1) {
            $('#itmCode, #itmName, #itmPrice, #itmQty').val("");
        }
    }

});

function setItemDetails(itmObj) {
    $('#itmCode').val(itmObj.code);
    $('#itmName').val(itmObj.name);
    $('#itmPrice').val(itmObj.price);
    $('#itmQty').val(itmObj.qtyOnHand);
}


$('#addToCart').on('click', function () {

    let validate1 = ($('#orderQty').val().length != 0);
    let validate2 = ($('#itmQty').val() >= $('#orderQty').val());

    if (validate1 && validate2) {

            var itemRow = "<tr><td>"+$('#itmCode').val()+"</td><td>"+$('#itmName').val()+"</td><td>"+$('#itmPrice').val()+"</td><td>"+$('#orderQty').val()+"</td><td>"+143100+"</td><td>\n" +
                "                        <div class=\"d-flex justify-content-center\" style=\"padding: 0; margin: 0;\">\n" +
                "                            <div aria-label=\"Basic mixed styles example\" class=\"btn-group btn-group-sm\" role=\"group\"\n" +
                "                                 style=\"padding: 0\">\n" +
                "                                <button class=\"btn btn-danger\" type=\"button\">Remove</button>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </td></tr>"

        $('#tblPurchaseItem').append(itemRow);

    } else {
        alert('Something went wrong...!!!');
    }

});

