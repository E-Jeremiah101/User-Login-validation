const form = document.getElementById('form');
const fullName = document.getElementById('FullName');
const userName = document.getElementById('UserName');
const email = document.getElementById('Email');
const password = document.getElementById('Password');
const submit = document.getElementById('submit');

//show error function
function showError (input, message){
const formControl = input.parentElement;
formControl.className = 'form-control error';
const small = formControl.querySelector('small');
small.innerText = message;
}

//show success
function showSuccess(input){
formControl = input.parentElement;
formControl.className = 'form-control success';
};

// Email check
function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
}

// Required check
function checkRequired(input, fieldName) {
  if (input.value.trim() === '') {
    showError(input, `${fieldName} is required`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}


// Length check
function checkLength(input, min, max, fieldName) {
  if (input.value.length < min) {
    showError(input, `${fieldName} must be at least ${min} characters`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${fieldName} must be less than ${max} characters`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}



//get field name
// function getFieldName(input){
//   return input.id.charAt(0).toUpperCase() + input.id.slice(1)
// }//

//Event listenetrs or
// Submit event
form.addEventListener('submit', function (e) {
  e.preventDefault();

  let validFullName = checkRequired(fullName, "Full Name");
  let validUserName = checkRequired(userName, "Username");
  let validEmail = checkRequired(email, "Email") && checkEmail(email);
  let validPassword = checkRequired(password, "Password") && checkLength(password, 6, 25, "Password");

  if (validFullName && validUserName && validEmail && validPassword) {
    window.location.href = "login.html";
  }
});

