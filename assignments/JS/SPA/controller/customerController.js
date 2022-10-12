$('#txtCustomerId, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary').on('keyup', function () {
    checkValidity();
});


// customer regex
const cusIDRegEx = /^(C00-)[0-9]{3}$/;
const cusNameRegEx = /^[A-z ]{3,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{2}$/;

let customerValidations = [];
let c = {
    reg: cusIDRegEx,
    field: $('#txtCustomerId'),
    error: 'CustomerId pattern is wrong! ex: C00-001'
}
customerValidations.push(c);
customerValidations.push({
    reg: cusNameRegEx,
    field: $('#txtCustomerName'),
    error: 'CustomerName pattern is wrong! ex: A-z (3-20)'
});
customerValidations.push({
    reg: cusAddressRegEx,
    field: $('#txtCustomerAddress'),
    error: 'CustomerAddress pattern is wrong! ex: A-z (0-9., /)'
});
customerValidations.push({
    reg: cusSalaryRegEx,
    field: $('#txtCustomerSalary'),
    error: 'CustomerSalary pattern is wrong! ex: 100 or 100.00'
});


function checkValidity() {
    for (let validation of customerValidations) {
        if (check(validation.reg, validation.field)) {
            testSuccess(validation.field, "");
        } else {
            setError(validation.field, validation.error);
        }
    }
}

function check(regex, textField) {
    let inputValue = textField.val();
    // console.log(regex.test(inputValue));
    return regex.test(inputValue);
}

function testSuccess(textField, msg) {
    if (textField.val().length <= 0) {
        textField.css('border', '1px solid #ced4da');
        textField.parent().children('span').text("");
    } else {
        textField.css('border', '3px solid lightgreen');
        textField.parent().children('span').text(msg);
    }
}

function setError(textField, msg) {
    if (textField.val().length <= 0) {
        textField.css('border', '1px solid #ced4da');
        textField.parent().children('span').text("");
    } else {
        textField.css('border', '3px solid red');
        textField.parent().children('span').text(msg);
    }
}


// customer array
var cusArray = [];
$('#btnSave').on('click', function () {

    let textOfButton = $('#btnSave').text();
    // save customer
    if (textOfButton == 'Save') {
        let customerId = $('#txtCustomerId').val();
        let customerName = $('#txtCustomerName').val();
        let customerAddress = $('#txtCustomerAddress').val();
        let customerSalary = $('#txtCustomerSalary').val();

        var customer = {
            id: customerId,
            name: customerName,
            address: customerAddress,
            salary: customerSalary
        }

        swal({
            title: "Are you sure?",
            text: "Do you really want to add this customer!",
            icon: "warning",
            buttons: true,
            // dangerMode: true,
        })
            .then((willDelete) => {

                if (willDelete) {
                    cusArray.push(customer);
                    loadAllCustomers();

                    swal("Poof! Your imaginary customer has been added!", {
                        icon: "success",
                    });
                }
            });

    } else {

        // update customer
        cusArray[indexNo].id = $('#txtCustomerId').val();
        cusArray[indexNo].name = $('#txtCustomerName').val();
        cusArray[indexNo].address = $('#txtCustomerAddress').val();
        cusArray[indexNo].salary = $('#txtCustomerSalary').val();
        $('#btnSave').text('Save');
        loadAllCustomers();

        swal({
            title: "Updated!",
            // text: "You clicked the button!",
            icon: "success",
            button: "OK",
        });
    }

    clearTextFields();

});

function loadAllCustomers() {
    $('#tblCustomer').empty();

    for (var i of cusArray) {
        var row = "<tr><td>" + i.id + "</td><td>" + i.name + "</td><td>" + i.address + "</td><td>" + i.salary + "</td><td class='operate'>\n" +
            "                        <div class=\"d-flex justify-content-center\" style=\"padding: 0; margin: 0;\">\n" +
            "                            <div aria-label=\"Basic mixed styles example\" class=\"btn-group btn-group-sm\" role=\"group\"\n" +
            "                                 style=\"padding: 0\">\n" +
            "                                <button class=\"btn btn-warning btnEdit\" type=\"button\" id='btnEdit'>Edit</button>\n" +
            "                                <button class=\"btn btn-danger\" type=\"button\" id='btnDelete'>Delete</button>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </td></tr>"
        $('#tblCustomer').append(row);
    }

}

// press tab key
$('#txtCustomerId, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary').on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});

$('#txtCustomerId').keydown(function (event) {
    if (event.key == 'Enter' && check(cusIDRegEx, $('#txtCustomerId'))) {
        var option = searchCustomer($('#txtCustomerId').val());
        if (option == null) {
            $('#txtCustomerName').focus();
        }
    } else {
        $('#txtCustomerId').focus();
    }
});

$('#txtCustomerName').keydown(function (event) {
    if (event.key == 'Enter' && check(cusNameRegEx, $('#txtCustomerName'))) {
        $('#txtCustomerAddress').focus();
    }
});

$('#txtCustomerAddress').keydown(function (event) {
    if (event.key == 'Enter' && check(cusAddressRegEx, $('#txtCustomerAddress'))) {
        $('#txtCustomerSalary').focus();
    }
});

// clear button
$('#btnClear').click(function () {
    clearTextFields();
    $('#btnSave').text('Save');
});

function clearTextFields() {
    $('#txtCustomerId, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary').val("");
    getDefault();
}

// edit button
$('#tblCustomer').on('click', '#btnEdit', function () {
    var cusID = searchCustomer($(this).parents('tr').children(':first-child').text());
    $('#btnSave').text('Update');
    findIndexNumber(cusID);
    getDefault();

});

// hide span text and get default border color
function getDefault() {
    $('#txtCustomerId, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary').parent().children('span').text("");
    $('#txtCustomerId, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary').css('border', '1px solid #CED4DA');
}


let indexNo = "";

function findIndexNumber(cusID) {
    // console.log(cusArray.indexOf(cusID));
    indexNo = cusArray.indexOf(cusID);
    return indexNo;
}

// delete customer using delete button
$('#tblCustomer').on('click', '#btnDelete', function () {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                let cusID = searchCustomer($(this).parents('tr').children(':first-child').text());
                let indexNumber = findIndexNumber(cusID);
                cusArray.splice(indexNumber, 1);
                loadAllCustomers();

                clearTextFields();
                $('#btnSave').text('Save');

                swal("Poof! Your imaginary customer has been deleted!", {
                    icon: "success",
                });
            }
        });


});

// search customer
function searchCustomer(cusId) {
    for (var i of cusArray) {
        if (i.id == cusId) {
            setTextFieldValues(i.id, i.name, i.address, i.salary);
            return i;
        }
    }
    return null;
}

function setTextFieldValues(id, name, address, salary) {
    $('#txtCustomerId').val(id);
    $('#txtCustomerName').val(name);
    $('#txtCustomerAddress').val(address);
    $('#txtCustomerSalary').val(salary);
}