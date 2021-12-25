// Đối tượng `Validator`
function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var selectorRules = {};

  // Hàm thực hiện validate
  function validate(inputElement, rule) {
    var errorElement = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.errorSelector);
    var errorMessage;

    // Lấy ra các rules của selector
    var rules = selectorRules[rule.selector];

    // Lặp qua từng rule & kiểm tra
    // Nếu có lỗi thì dừng việc kiểm
    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case "radio":
        case "checkbox":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );
          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage !== undefined) {
      inputElement.classList.add("error");
    } else {
      inputElement.classList.remove("error");
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add(
        "invalid"
      );
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "valid"
      );
    } else {
      errorElement.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
      getParent(inputElement, options.formGroupSelector).classList.add("valid");
    }

    return !errorMessage;
  }

  // Lấy element của form cần validate
  var formElement = document.querySelector(options.form);
  let btnSubmit = document.querySelector(".btn-info");
  if (btnSubmit) {
    // Khi submit form
    btnSubmit.onclick = function (e) {
      var isFormValid = true;

      // Lặp qua từng rules và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        showInfo();
      }
    };

    // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
    options.rules.forEach(function (rule) {
      // Lưu lại các rules cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach(function (inputElement) {
        // Xử lý trường hợp blur khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        // Xử lý mỗi khi người dùng nhập vào input
        inputElement.oninput = function () {
          var errorElement = getParent(
            inputElement,
            options.formGroupSelector
          ).querySelector(options.errorSelector);
          errorElement.innerText = "";
          inputElement.classList.remove("error");
          getParent(inputElement, options.formGroupSelector).classList.remove(
            "invalid"
          );
        };

      });
    });
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

Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || "Vui lòng nhập trường này";
    },
  };
};

Validator.isMSSV = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      let regex = /PS\d{5}/;
      value = value.toUpperCase();
      return regex.test(value)
        ? undefined
        : "Mã số sinh viên phải có dạng PSXXXXX";
    },
  };
};

Validator.isName = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      let regex =
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
      return regex.test(value) ? undefined : "Tên không phù hợp!";
    },
  };
};
