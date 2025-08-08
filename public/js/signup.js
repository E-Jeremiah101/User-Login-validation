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

function checkEmail(input) {
  const re =
    /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//check required function
function checkRequired(inputArr){
  inputArr.forEach(function (input){
   if (input.value.trim() === ''){
    showError(input, `${getFieldName(input)} is Required`);
   }
   else{
    showSuccess(input);
  }
  });
}

//check input length

function checkLength(input, min, max){
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be atleast ${min} characters`)
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`)
  } else {
    showSuccess(input);
  }
}



//check password matcch
function checkPasswordMatch(input1, input2){
  if(input1.value !== input2.value){
    showError(input2, "Password do not match")
  }
  
}

//get field name
function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//Event listenetrs
form.addEventListener('submit', function (e) {
  e.preventDefault();
  //SHORT CUT
  checkRequired([fullName, userName, email, password ]);
  // checkLength(username, 5, 15 );
  checkLength(password, 6, 25);
  checkEmail(email);

  if (fullName.value === "") {
    showError(fullName, "Fullname is required");
  } else {
    showSuccess(fullName);
  }
  if (userName.value === "") {
    showError(userName, "username is required");
  } else {
    showSuccess(userName);
  }

  if (email.value === "") {
    showError(email, "Email is required");
  } else if (!isValidEmail(email.value)) {
    showError(email, "Email is not valid");
  } else {
    showSuccess(email);
  }

  if (password.value === "") {
    showError(password, "Password is required");
  } else {
    showSuccess(password);
  }
})

