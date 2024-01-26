const form = document.getElementById("form");

const FORM_FIELDS_ERROR_MESSAGES = {
    'user-name': 'Please enter your name.',
    'user-email': 'Please enter a valid email address.',
    'user-height': 'Please enter your height.',
    'user-weight': 'Please enter your weight.'
};
const BMI_RESULT_LABEL = 'Your Body Mass Index (BMI) Result = ';

const BMI_RESULT_DESCRIPTIONS = {
    'underWeight': 'Your BMI falls within the underweight range',
    'normal': 'Your BMI falls within the normal or healthy weight range',
    'overWeight': 'Your BMI falls within the overweight range',
    'obesity': 'Your BMI falls within the obese range'
};

let userDetails = {
	userName: '',
	userEmail: '',
	userHeight: '',
	userWeight: ''
  };

form.addEventListener("submit", (event) => {
	event.preventDefault(); // Preventing default form submission.

	userDetails.userName = document.getElementById("user-name").value;
	userDetails.userEmail = document.getElementById("user-email").value;
	userDetails.userHeight = document.getElementById("user-height").value;
	userDetails.userWeight = document.getElementById("user-weight").value;

	if (!checkFormFields()) { return; }

	calculateBmi();
});

function checkFormFields() {
    let isValid = true;

    if (userDetails.userName === "") {
        showInputFieldDescription('user-name', false);
        isValid = false;
    } else {
        showInputFieldDescription('user-name', true);
    }

    if (userDetails.userEmail === "") {
        showInputFieldDescription('user-email', false);
        isValid = false;
    } else {
        showInputFieldDescription('user-email', true);
    }

    if (userDetails.userHeight <= 0) {
        showInputFieldDescription('user-height', false);
        isValid = false;
    } else {
        showInputFieldDescription('user-height', true);
    }

    if (userDetails.userWeight <= 0) {
        showInputFieldDescription('user-weight', false);
        isValid = false;
    } else {
        showInputFieldDescription('user-weight', true);
    }

    return isValid;
};

function showInputFieldDescription (fieldName, isValidInputField) {
	const field = document.getElementById(fieldName);
    field.style.borderColor = isValidInputField ? "" : "red";

    const errorField = document.getElementById(fieldName + '-error');
    errorField.textContent = isValidInputField ? "" : FORM_FIELDS_ERROR_MESSAGES[fieldName];
    errorField.style.color = isValidInputField ? "" : "red";
};

function calculateBmi () {
	// BMI calculation formula: weight / ((height * height) / 10000).
	const bmiResult = (userDetails.userWeight / ((userDetails.userHeight * userDetails.userHeight) / 10000)).toFixed(2); // fixing to 2 decimal points only.

    const bmiResultContainerElement = document.getElementById("bmiResult");
    const bmiResultDescrptionContainerElement = document.getElementById("bmiResultDescrption");
    
    bmiResultContainerElement.innerHTML = BMI_RESULT_LABEL + bmiResult;
    bmiResultContainerElement.removeAttribute('display');

    if (bmiResult < 18.5) {
        bmiResultDescrptionContainerElement.innerHTML = BMI_RESULT_DESCRIPTIONS['underWeight'];
    } else if (bmiResult < 24.9) {
        bmiResultDescrptionContainerElement.innerHTML = BMI_RESULT_DESCRIPTIONS['normal'];
    } else if (bmiResult < 29.9) {
        bmiResultDescrptionContainerElement.innerHTML = BMI_RESULT_DESCRIPTIONS['overWeight'];
    } else {
        bmiResultDescrptionContainerElement.innerHTML = BMI_RESULT_DESCRIPTIONS['obesity'];
    }
};