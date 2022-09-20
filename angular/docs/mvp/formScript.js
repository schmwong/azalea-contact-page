// Input field elements
const firstName = document.querySelector("#firstname");
const email = document.getElementById("email");
const message = document.getElementById("messagebox");

// Error message elements
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

// Error text displayed in UI
const nameError1 = "First name is required";
const nameError2 = "Only one name is allowed";
const emailError1 = "E-mail is required";
const emailError2 = "Invalid e-mail format";
const messageError1 = "Message cannot be blank";



// Send button is disabled by default, toggleButton() function checks for "all green" status
const btn = document.getElementById("submit-btn");
btn.disabled = true;

const toggleButton = () => {
	if (firstName.style.borderColor == "green" && email.style.borderColor == "green" && message.style.borderColor == "green") {
		btn.disabled = false;
	}
}



/* --------------------
Validator functions 
-------------------- */

// Includes numbers and non-Latin characters,
// Returns false if spaces, tabs, or line breaks are found between words
const nameRegex = /^['0-9\p{L}\p{M}]+([^\s\t\n])*['0-9\p{L}\p{M}]*$/ug;

// @ symbol and top level domain mandatory >> example@example.com
// additional country domain optional >> example@example.com.sg
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



function ValidateName(name) {
	return (nameRegex.test(name.value.trim()));
}

function ValidateEmail(mail) {
	return (emailRegex.test(mail.value.trim()));
}

function ValidateMessage(msg) {
	if (msg.value.trim().length == 0) {
		return (false);
	}
	return (true);
}


/* ----------------------------------
Calling Validators in Event Listeners
----------------------------------- */

// Event Listeners triggered upon selecting field
function focusEvent(inputElement) {
	inputElement.addEventListener("focus", (event) => {
		event.target.style.borderColor = "goldenrod";
		toggleButton();
	});
}


focusEvent(firstName);
focusEvent(email);
focusEvent(message);


// Event Listeners triggered by deselecting field
function unfocusEvent(inputElement, Validator, errorElement, error1, error2 = "") {
	inputElement.addEventListener("blur", (event) => {
		if (Validator(inputElement) == true) {
			event.target.style.borderColor = "green";
			errorElement.innerText = "";
			errorElement.style.visibility = "hidden";
			toggleButton();
		}
		else if (inputElement.value.trim().length == 0) {
			event.target.style.borderColor = "red";
			errorElement.innerText = error1;
			errorElement.style.visibility = "visible";
			btn.disabled = true;
		}
		else if (Validator(inputElement) == false) {
			event.target.style.borderColor = "red";
			errorElement.innerText = error2;
			errorElement.style.visibility = "visible";
			btn.disabled = true;
		}
		else {
			event.target.style.borderColor = "green";
			toggleButton();
		}
	});
}

unfocusEvent(firstName, ValidateName, nameError, nameError1, nameError2);
unfocusEvent(email, ValidateEmail, emailError, emailError1, emailError2);
unfocusEvent(message, ValidateMessage, messageError, messageError1);


// Event Listener to display character count in the message field
message.addEventListener("input", (event) => {
	let currentCount = message.value.trim().length;
	let characterCount = document.querySelector("#char-count");
	characterCount.innerText = currentCount;
});



