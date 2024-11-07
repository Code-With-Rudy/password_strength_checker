const indicator = document.querySelector(".indicator");
const input = document.querySelector("input");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
const text = document.querySelector(".text");
const showBtn = document.querySelector(".showBtn");

// Regular expressions for password strength checks
let regExpLower = /[a-z]/; // Lowercase letters
let regExpUpper = /[A-Z]/; // Uppercase letters
let regExpDigit = /\d+/; // Digits
let regExpSpecial = /[!@#$%^&*(),.?":{}|<>]/; // Special characters

function trigger() {
    let no = 0; // Initialize the strength level

    if (input.value !== "") {
        indicator.style.display = "flex";

        // Determine password strength
        const password = input.value;
        const hasLower = regExpLower.test(password);
        const hasUpper = regExpUpper.test(password);
        const hasDigit = regExpDigit.test(password);
        const hasSpecial = regExpSpecial.test(password);

        if (password.length < 6) {
            no = 1; // Weak password
        } else if (password.length >= 6 && (hasLower || hasUpper || hasDigit || hasSpecial)) {
            if ((hasLower && hasUpper) || (hasLower && hasDigit) || (hasUpper && hasDigit) || (hasLower && hasSpecial) || (hasUpper && hasSpecial)) {
                no = 2; // Medium password
            } else {
                no = 1; // Weak password
            }
        } 
        if (password.length >= 6 && hasLower && hasUpper && hasDigit && hasSpecial) {
            no = 3; // Strong password
        }

        // Reset classes
        weak.classList.remove("active");
        medium.classList.remove("active");
        strong.classList.remove("active");
        text.classList.remove("weak", "medium", "strong");
        text.style.display = "block"; // Ensure text is displayed

        // Update UI based on password strength
        if (no === 1) {
            weak.classList.add("active");
            text.textContent = "Your password is too weak";
            text.classList.add("weak");
        } else if (no === 2) {
            weak.classList.add("active");
            medium.classList.add("active");
            text.textContent = "Your password is medium";
            text.classList.add("medium");
        } else if (no === 3) {
            weak.classList.add("active");
            medium.classList.add("active");
            strong.classList.add("active");
            text.textContent = "Your password is strong";
            text.classList.add("strong");
        }

        // Show/Hide password button functionality
        showBtn.style.display = "block";
        showBtn.onclick = function () {
            if (input.type === "password") {
                input.type = "text";
                showBtn.textContent = "HIDE";
                showBtn.style.color = "#23ad5c";
            } else {
                input.type = "password";
                showBtn.textContent = "SHOW";
                showBtn.style.color = "#000";
            }
        };
    } else {
        indicator.style.display = "none";
        text.style.display = "none";
        showBtn.style.display = "none";
    }
}