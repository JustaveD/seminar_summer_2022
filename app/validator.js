
// Đối tượng Validator

let check;

function Validator(options) {

    let formElement = document.querySelector(options.form);

    function valid(messageError, messageElement) {

        if (messageError) {
            messageElement.innerText = messageError;
            check = false;
        }
        else {
            messageElement.innerText = "";
            check = true;
        }

    }

    if (formElement) {

        options.rules.forEach(function (rule) {

            let inputElement = formElement.querySelector(rule.selector);
            console.log(rule.selector);

            if (inputElement) {
                inputElement.addEventListener('blur', function () {

                    //value: inputElement.value
                    //truyền value vào hàm valid cho nó xử lí
                    //kết quả xử lí sẽ trả về lỗi cho messageError.
                    //messageError sẽ được truyền vào trong valid để hiển thị lỗi

                    let value = inputElement.value;
                    let messageError = rule.test(value);

                    console.log(inputElement);
                    if (messageError !== undefined) {
                        inputElement.classList.add('error');
                    } else {
                        inputElement.classList.remove('error');

                    }

                    let messageElement = inputElement.parentElement.querySelector(options.messageElement);

                    valid(messageError, messageElement);



                })

                inputElement.addEventListener('focus', function () {
                    let messageElement = inputElement.parentElement.querySelector(options.messageElement);
                    inputElement.classList.remove('error');
                    valid('', messageElement);

                })

                inputElement.addEventListener('input', function () {

                    if (inputElement.id == 'password-confirmation') {

                        let value = inputElement.value;
                        let messageError = rule.test(value);
                        let messageElement = inputElement.parentElement.querySelector(options.messageElement);
                        valid(messageError, messageElement);
                    }
                })
            }
        })
    }


}


// Định nghĩa các rules
// Nguyên tắc của các rules:
//      Required: Nhận giá trị value, trả về message lỗi nếu value = '' ngược lại 
//              trả về undefined
//      Email: Dùng regex để kiểm tra và trả về như required
//      minLength: Nhận giá trị của value, tính length so sánh với 'min'
//      isPhonenmber: Các giá trị số điện thoại
//      isMSSV: mssv có format 'ps15446'
//      isScore: điểm phải bé hơn = 10 và lớn =0 là số
//      isName: không có khoảng trắng 2 bên, dùng trim để xử lí, tất cả là chữ.
//      isNumber: Là số và không chứa số âm
Validator.isRequired = function (selector) {

    return {
        selector: selector,
        test: function (value) {

            return value ? undefined : 'Không được bỏ trống trường này!';

        }
    }
}

Validator.isEmail = function (selector) {

    return {
        selector: selector,
        test: function (value) {

            //Regex cho email có cả unicode

            let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            return regex.test(value) ? undefined : "Email không hợp lệ!";
        }
    }

}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {

            return value.length >= min ? undefined : `Trường này phải có ít nhất ${min} kí tự!`;

        }
    }
}

Validator.checkPassword = function (form, selector, password) {
    return {
        selector: selector,
        test: function (value) {

            let formElement = document.querySelector(form);
            return value == formElement.querySelector(password).value ? undefined : 'Mật khẩu không chính xác!';

        }
    }
}
Validator.checkPhone = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            //Regex cho số điẹn thoại.
            // (123) 456-7890
            // (123)456-7890
            // 123-456-7890
            // 123.456.7890
            // 1234567890
            // +31636363634
            // 075-63546725

            let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return regex.test(value) ? undefined : 'Định dạng số điện thoại không đúng!';
        }
    }
}
Validator.isMSSV = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /PS\d{5}/;
            value = value.toUpperCase();
            return regex.test(value) ? undefined : 'Mã số sinh viên phải có dạng PSXXXXX';
        }
    }
}

Validator.isName = function (selector) {

    return {
        selector: selector,
        test: function (value) {
            let regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
            return regex.test(value) ? undefined : 'Tên không phù hợp!';
        }
    }
}

Validator.isScore = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /\d+/;
            return regex.test(value) ? undefined : 'Điểm chỉ chứa số!';
        }

    }
}

Validator.isNumber = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            if (parseFloat(value) && parseFloat(value) > 0) {
                return undefined;
            }
            else {
                return `Trường này chỉ chứa số và không được âm!`;
            }
        }
    }
}

Validator.isCMND = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /\d{9}/;
            return regex.test(value) ? undefined : 'Không đúng định dạng CMND';
        }
    }
}