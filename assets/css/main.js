
function Validator(options) { 

    var selectorRules = {};

    //Hàm thực hiện validate
    function Validate(inputElement,rules){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage;

        //Lấy ra các rules của selector
        var rules = selectorRules[rules.selector];

        //Lặp qua từng rules & kiếm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for(i = 0;i < rules.length; ++i ) {
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }
        

                if(errorMessage) {
                    errorElement.innerText = errorMessage;
                    inputElement.parentElement.classList.add('invalid');
                }else{
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
                return ! errorMessage;
    }
  // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    // Khi submit form
    formElement.onsubmit = function(e) {
        e.preventDefault();

        var isFormValid = true;
        //lặp qua các rules và validate
        options.rules.forEach(function(rules){
            var inputElement = formElement.querySelector(rules.selector);
            var isValid = Validate(inputElement,rules);
            if(!isValid) {
                isFormValid = false;
            }
        });
        if(isFormValid) {
            // Trường họp submit với javascript
            if(typeof options.onSubmit === 'function'){
                var enableInputs = formElement.querySelectorAll('[name]');
                var formValues = Array.from(enableInputs).reduce(function(values, input) {
                 values[input.name] = input.value;
                 return values;
                }, {});            
                options.onSubmit(formValues);
            } 
            // Trường hợp submi với hành vi mặt định
            else {
                formElement.submit();
            }
        }
    }
    if(formElement) {

        //lặp qua mỗi rules và xử lý (lắng nghe sự kiện blur, input ...)
        options.rules.forEach(function(rules){
            
           //Lưu lại các rules cho mỗi input
           if(Array.isArray(selectorRules[rules.selector])) {
            selectorRules[rules.selector].push(rules.test);
           }else {
            selectorRules[rules.selector] = [rules.test];
           }
            var inputElement = formElement.querySelector(rules.selector);
            

           if(inputElement) {
            // Xử lý trường hợp blur ra khỏi input
            inputElement.onblur= function() {
                Validate(inputElement,rules);
            }
            // Xử lý mỗi khi người dùng nhập vòa input

            inputElement.oninput = function() {
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid');
            }
           }
        });
          
    }

}

Validator.isRequired = function (selector,message) {
    return {
        selector:selector,
        test : function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function(selector,message) {
    return {
        selector:selector,
        test : function(value) {
            var regex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này không phải email'
        }
    };
}

Validator.minLength = function(selector, min, message) {
    return {
        selector:selector,
        test : function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector:selector,
        test : function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    };
}

function signup(e) {
event.preventDefault();
var email = document.getElementById("email").value;
var passWord = document.getElementById("password").value;
var user = {
    email : email,
    passWord :passWord,
}
 var json = JSON.stringify(value, user);
 localStorage.setItem(key, email,json);
 alert("đăng ký thành công")
}