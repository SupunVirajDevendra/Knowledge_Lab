let inputDetails = {};
let progress = 0;

function updateProgress(percentage) {
    progress = percentage;
    document.getElementById("progress").style.width = progress + "%";
    document.getElementById("progress").innerHTML = progress + "%";
}

function getUserDetails() {
    let fname, lname, age, gender, privacy;
    const nameRegex = /^[A-Za-z]+$/;

    while (!fname || !nameRegex.test(fname)) {
        fname = prompt("Enter your first name:", inputDetails.firstName || "");
        if (!fname) {
            alert("First name is required.");
        } else if (!nameRegex.test(fname)) {
            alert("First name must contain only alphabetic characters.");
            fname = "";
        }
    }

    while (!lname || !nameRegex.test(lname)) {
        lname = prompt("Enter your last name:", inputDetails.lastName || "");
        if (!lname) {
            alert("Last name is required.");
        } else if (!nameRegex.test(lname)) {
            alert("Last name must contain only alphabetic characters.");
            lname = "";
        }
    }

    while (!age || isNaN(age) || age <= 0) {
        age = prompt("Enter your age:", inputDetails.age || "");
        if (!age || isNaN(age) || age <= 0) alert("Please enter a valid age.");
    }

    while (!gender || !["male", "female", "other"].includes(gender.toLowerCase())) {
        gender = prompt("Enter your gender (male/female):", inputDetails.gender || "");
        if (!gender || !["male", "female"].includes(gender.toLowerCase())) 
            alert("Please enter a valid gender (male/female).");
    }

    while (!privacy || !["yes", "no"].includes(privacy.toLowerCase())) {
        privacy = prompt("Agree with privacy terms (yes/no):", inputDetails.privacyterms || "");
        if (!privacy || !["yes", "no"].includes(privacy.toLowerCase())) 
            alert("Please enter 'yes' or 'no'.");
    }

    inputDetails.firstName = fname;
    inputDetails.lastName = lname;
    inputDetails.age = age;
    inputDetails.gender = gender;
    inputDetails.privacyterms = privacy;

    document.getElementById("personalDetailsContent").innerHTML =
        "First Name: " + fname + "<br>" +
        "Last Name: " + lname + "<br>" +
        "Age: " + age + "<br>" +
        "Gender: " + gender + "<br>" +
        "Agree with privacy terms: " + privacy + "<br>";


    document.getElementById("startButton").style.display = "none";
    updateProgress(40);
    document.getElementById("buttonSection1").style.display = "block";
    document.getElementById("personalDetails").style.display = "block";
}

function getBackgroundDetails() {
    document.getElementById("buttonSection1").style.display = "none";

    let edulevel, iname;
    const validEduLevels = ["o/l", "a/l", "graduate"];
    
    // Validate educational level
    while (!edulevel || !validEduLevels.includes(edulevel.toLowerCase())) {
        edulevel = prompt("Educational level (o/l, a/l, graduate):", inputDetails.educationalLevel || "");
        if (!edulevel || !validEduLevels.includes(edulevel.toLowerCase())) {
            alert("Please enter a valid educational level (o/l, a/l, graduate).");
        }
    }

    // Validate school or institute name
    while (!iname) {
        iname = prompt("School name or institute name:", inputDetails.schoolname || "");
        if (!iname) {
            alert("School name or institute name is required.");
        }
    }

    inputDetails.educationalLevel = edulevel;
    inputDetails.schoolname = iname;

    document.getElementById("educationalBackgroundContent").innerHTML =
        "Educational Level: " + edulevel + "<br>" +
        "School name or Institute name: " + iname + "<br>";

    updateProgress(70);
    document.getElementById("buttonSection2").style.display = "block";
    document.getElementById("educationalBackground").style.display = "block";
}

function editForm() {
    getUserDetails();
    getBackgroundDetails();
    getAccountSignup();

    document.getElementById("submit").style.display = "block";
    document.getElementById("editButton").style.display = "block";
}

function submitAlert() {
    alert("Submitted successfully!");
    document.getElementById("submit").style.display = "none";
    document.getElementById("editButton").style.display = "none";
}
function getAccountSignup() {
    document.getElementById("buttonSection2").style.display = "none";

    let email, tNumber, username;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone number validation regex (assuming a basic validation, this can be adjusted based on requirements)
    const phoneRegex = /^[0-9]{10}$/;

    // Validate email
    while (!email || !emailRegex.test(email)) {
        email = prompt("Enter your e-mail:", inputDetails.email || "");
        if (!email || !emailRegex.test(email)) {
            alert("Please enter a valid email address.");
        }
    }

    // Validate phone number
    while (!tNumber || !phoneRegex.test(tNumber)) {
        tNumber = prompt("Enter your phone number (10 digits):", inputDetails.tNumber || "");
        if (!tNumber || !phoneRegex.test(tNumber)) {
            alert("Please enter a valid phone number (10 digits).");
        }
    }

    // Validate username
    while (!username) {
        username = prompt("Enter user name:", inputDetails.username || "");
        if (!username) {
            alert("Username is required.");
        }
    }

    inputDetails.email = email;
    inputDetails.tNumber = tNumber;
    inputDetails.username = username;

    document.getElementById("accountSignupContent").innerHTML =
        "Email: " + email + "<br>" +
        "Phone Number: " + tNumber + "<br>" +
        "Username: " + username + "<br>";

    updateProgress(100);
    document.getElementById("accountSignup").style.display = "block";
    document.getElementById("editButton").style.display = "block";
    document.getElementById("submit").style.display = "block";
}