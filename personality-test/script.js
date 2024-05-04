const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .next-btn");
const prevBtn = document.querySelectorAll("form .previous-btn");
const form = document.querySelector("form");

nextBtn.forEach((button) => {
    button.addEventListener("click", () => {
        changeStep("next");
    });
});
prevBtn.forEach((button) => {
    button.addEventListener("click", () => {
        changeStep("prev");
    });
});

function changeStep(btn) {

    let index = 1;
    const activeForm = document.querySelector(".active-form");
    index = steps.indexOf(activeForm);
    console.log(index)
    steps[index].classList.remove("active-form");
    if (btn === "next") {
        index++;
    } else if (btn === "prev") {
        index--;
    }
    steps[index].classList.add("active-form");
}

function sendVerificationCode() {
    const userEmailInput = document.getElementById('userEmail');

    // Validate user input
    const emailPattern = /[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)/;
    if (!emailPattern.test(userEmailInput.value)) {
        alert('Please provide a valid Gmail or Yahoo address.');
        return;
    }

    // Make a request to the server to send the verification code
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userEmailInput.value,
        }),
    };

    fetch('http://localhost:3000/sendVerificationCode', requestOptions)
        .then(response => {
            if (response.ok) {
                alert('Verification code sent successfully!');
            } else {
                alert('Error sending verification code. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
}

function verifyCode() {
    const userEmailInput = document.getElementById('userEmail');
    const codeInput = document.getElementById('verificationCode');

    // Validate email and code inputs
    if (!userEmailInput.checkValidity() || !codeInput.checkValidity()) {
        alert('Please enter a valid email and verification code.');
        return;
    }

    // Make a request to the server to verify the code
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userEmailInput.value,
            code: codeInput.value,
        }),
    };

    fetch('http://localhost:3000/verifyCode', requestOptions)
        .then(response => {
            if (response.ok) {
                alert('Verification successful!');
                showQuestions();
            } else {
                alert('Verification failed. Please make sure the code is correct and try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
}


function showResult() {
    // Collect and calculate points for each course
    const courses = ["Product Owner", "Business Analysis", "Scrum Master", "Project Management", "Data Analysis", "Cyber Security"];
    let scores = Array(courses.length).fill(0);

    // Loop through each question and calculate scores
    for (let i = 0; i < courses.length; i++) {
        for (let j = 1; j <= 3; j++) {
            const radioName = `course${i + 1}q${j}`;
            const selectedValue = parseInt(document.querySelector(`input[name="${radioName}"]:checked`).value);
            scores[i] += selectedValue;
        }
    }

    // Find the course with the highest score
    const maxScore = Math.max(...scores);
    const winningCourses = courses.filter((course, index) => scores[index] === maxScore);

    // Display result
    if (winningCourses.length === 1) {
        alert(`Congratulations! Based on your answers, the recommended course for you is ${winningCourses[0]}.`);
    } else {
        const tieMessage = `There is a tie between the following courses: ${winningCourses.join(', ')}.`;
        const contactCoach = "Contact a coach for further deliberations";
        alert(`${tieMessage}\n\n${contactCoach}`);
    }
}