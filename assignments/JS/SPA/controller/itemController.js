$('#txtItemCode, #txtItemName, #txtItemPrice, #txtQtyOnHand').on('keyup', function () {
    check1Validity1();
});


// item regex
const itmCodeRegEx = /^(I00-)[0-9]{3}$/;
const itmNameRegEx = /^[A-z ]{3,20}$/;
const itmPriceRegEx = /^[0-9]{1,}[.]?[0-9]{2}$/;
const itmQtyOnHandRegEx = /^[0-9]{1,}$/;

let itemValidations = [];
let c1 = {
    reg: itmCodeRegEx,
    field: $('#txtItemCode'),
    error: 'ItemCode pattern is wrong! ex: I00-001'
}
itemValidations.push(c1);
itemValidations.push({
    reg: itmNameRegEx,
    field: $('#txtItemName'),
    error: 'ItemName pattern is wrong! ex: A-z (3-20)'
});
itemValidations.push({
    reg: itmPriceRegEx,
    field: $('#txtItemPrice'),
    error: 'ItemPrice pattern is wrong! ex: (100 or 100.00)'
});
itemValidations.push({
    reg: itmQtyOnHandRegEx,
    field: $('#txtQtyOnHand'),
    error: 'QtyOnHand pattern is wrong! ex: (0-9)'
});

function check1Validity1() {
    for (let validation of itemValidations) {
        if (check1(validation.reg, validation.field)) {
            testSuccess1(validation.field, "");
        } else {
            setError1(validation.field, validation.error);
        }
    }
}

function testSuccess1(textField, msg) {
    if (textField.val().length <= 0) {
        textField.css('border', '1px solid #CED4DA');
        textField.parent().children('span').text("");
    } else {
        textField.css('border', '3px solid lightgreen');
        textField.parent().children('span').text(msg);
    }
}


function setError1(textField, msg) {
    if (textField.val().length <= 0) {
        textField.css('border', '1px solid #CED4DA');
        textField.parent().children('span').text("");
    } else {
        textField.css('border', '3px solid red');
        textField.parent().children('span').text(msg);
    }
}


// item array
var itmArray = [];
$('#btn_Save').on('click', function () {

    let textOfButton1 = $('#btn_Save').text();

    if (textOfButton1 == 'Save') {
        let itemCode = $('#txtItemCode').val();
        let itemName = $('#txtItemName').val();
        let itemPrice = $('#txtItemPrice').val();
        let qtyOnHand = $('#txtQtyOnHand').val();

        var item = {
            code: itemCode,
            name: itemName,
            price: itemPrice,
            qtyOnHand: qtyOnHand
        }

        swal({
            title: "Are you sure?",
            text: "Do you really want to add this item!",
            icon: "warning",
            buttons: true,
            // dangerMode: true,
        })
            .then((willDelete) => {

                if (willDelete) {
                    itmArray.push(item);
                    loadAllItems();

                    swal("Poof! Your imaginary item has been added!", {
                        icon: "success",
                    });
                }
            });

    } else {

        // update item
        itmArray[indexNo1].code = $('#txtItemCode').val();
        itmArray[indexNo1].name = $('#txtItemName').val();
        itmArray[indexNo1].price = $('#txtItemPrice').val();
        itmArray[indexNo1].qtyOnHand = $('#txtQtyOnHand').val();
        $('#btn_Save').text('Save');
        loadAllItems();

        swal({
            title: "Updated!",
            icon: "success",
            button: "OK",
        });
    }

    clearTextFields1();

});


// loadAllItems
function loadAllItems() {
    $('#tblItem').empty();

    for (var i of itmArray) {
        var row = "<tr><td>" + i.code + "</td><td>" + i.name + "</td><td>" + i.price + "</td><td>" + i.qtyOnHand + "</td><td class='operate'>\n" +
            "                        <div class=\"d-flex justify-content-center\" style=\"padding: 0; margin: 0;\">\n" +
            "                            <div aria-label=\"Basic mixed styles example\" class=\"btn-group btn-group-sm\" role=\"group\"\n" +
            "                                 style=\"padding: 0\">\n" +
            "                                <button class=\"btn btn-warning\" type=\"button\" id='btn_Edit'>Edit</button>\n" +
            "                                <button class=\"btn btn-danger\" type=\"button\" id='btn_Delete'>Delete</button>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </td></tr>"
        $('#tblItem').append(row);
    }
    loadAllItemCodes();

}


// press tab key
$('#txtItemCode, #txtItemName, #txtItemPrice, #txtQtyOnHand').on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});


$('#txtItemCode').keydown(function (event) {
    if (event.key == 'Enter' && check1(itmCodeRegEx, $('#txtItemCode'))) {
        var option = searchItem($('#txtItemCode').val());
        if (option == null) {
            $('#txtItemName').focus();
        }
    } else {
        $('#txtItemCode').focus();
    }
});

$('#txtItemName').keydown(function (event) {
    if (event.key == 'Enter' && check1(itmNameRegEx, $('#txtItemName'))) {
        $('#txtItemPrice').focus();
    }
});

$('#txtItemPrice').keydown(function (event) {
    if (event.key == 'Enter' && check1(itmPriceRegEx, $('#txtItemPrice'))) {
        $('#txtQtyOnHand').focus();
    }
});


function check1(regex, textField) {
    let inputValue = textField.val();
    return regex.test(inputValue);
}


// clear button
$('#btn_Clear').click(function () {
    clearTextFields1();
    $('#btn_Save').text('Save');
});

// click edit button
$('#tblItem').on('click', '#btn_Edit', function () {
    var itmCode = searchItem($(this).parents('tr').children(':first-child').text());
    $('#btn_Save').text('Update');
    findIndexNumber1(itmCode);
    getDefault1();
});

let indexNo1 = "";

function findIndexNumber1(itmID) {
    // console.log(itmArray.indexOf(itmID));
    indexNo1 = itmArray.indexOf(itmID);
    return indexNo1;
}

// search item
function searchItem(itmCode) {
    for (var i of itmArray) {
        if (i.code == itmCode) {
            setTextFieldValues1(i.code, i.name, i.price, i.qtyOnHand);
            return i;
        }
    }
    return null;
}

// set values
function setTextFieldValues1(code, name, price, qtyOnHand) {
    $('#txtItemCode').val(code);
    $('#txtItemName').val(name);
    $('#txtItemPrice').val(price);
    $('#txtQtyOnHand').val(qtyOnHand);
}


// delete item using delete button
$('#tblItem').on('click', '#btn_Delete', function () {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                let itmID = searchItem($(this).parents('tr').children(':first-child').text());
                let indexNumber = findIndexNumber1(itmID);
                itmArray.splice(indexNumber, 1);
                loadAllItems();

                clearTextFields1();
                $('#btn_Save').text('Save');

                swal("Poof! Your imaginary item has been deleted!", {
                    icon: "success",
                });
            }
        });

});

function clearTextFields1() {
    $('#txtItemCode, #txtItemName, #txtItemPrice, #txtQtyOnHand').val("");
    getDefault1();
}

// hide span text and get default border color
function getDefault1() {
    $('#txtItemCode, #txtItemName, #txtItemPrice, #txtQtyOnHand').parent().children('span').text("");
    $('#txtItemCode, #txtItemName, #txtItemPrice, #txtQtyOnHand').css('border', '1px solid #CED4DA');
}

