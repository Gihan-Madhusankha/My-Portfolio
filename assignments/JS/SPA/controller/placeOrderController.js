function loadAllCustomerIds() {
    $('#selectCusId').empty();
    $('#selectCusId').append(`<option>select</option>`);

    for (let cus of cusArray) {
        $('#selectCusId').append(`<option>${cus.id}</option>`);
    }
}


$('#selectCusId').change(function () {
    let selectedVal = $(this).val();
    for (let cus of cusArray) {
        if (cus.id == selectedVal) {
            setCustomerDetails(cus);
        } else if ('select' == selectedVal){
            $('#cusID, #cusName, #cusAddress, #cusSalary').val("");
        }
    }

});

function setCustomerDetails(cusObj){
    $('#cusID').val(cusObj.id);
    $('#cusName').val(cusObj.name);
    $('#cusAddress').val(cusObj.address);
    $('#cusSalary').val(cusObj.salary);
}
