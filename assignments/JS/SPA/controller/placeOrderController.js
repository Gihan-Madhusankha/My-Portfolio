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

