function loadAllCustomerIds() {
    $('#selectCusId').empty();
    $('#selectCusId').append(`<option disabled>select</option>`);
    for (let cus of cusArray) {
        $('#selectCusId').append(`<option>${cus.id}</option>`);
    }
}