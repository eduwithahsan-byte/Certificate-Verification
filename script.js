/* =====================================================
   CERTIFICATE DATA
===================================================== */

const certificates = {

    "HWT-2026-001": {

        name: "Muhammad Hasnain",

        course: "Computer Basics",

        issueDate: "05 August 2026",

        photo: "personal.png",

        status: "Verified"

    },


    "HWT-2026-002": {

        name: "Ali Raza",

        course: "Web Development",

        issueDate: "06 August 2026",

        photo: "student-002.jpg",

        status: "Verified"

    },


    "HWT-2026-003": {

        name: "Student Name",

        course: "Graphic Designing",

        issueDate: "07 August 2026",

        photo: "images/student-003.jpg",

        status: "Verified"

    }

};


/* =====================================================
   GET ELEMENTS
===================================================== */

const form =
    document.getElementById("verifyForm");

const input =
    document.getElementById("certificateId");

const button =
    document.getElementById("verifyButton");

const result =
    document.getElementById("result");

const message =
    document.getElementById("message");


/* =====================================================
   NORMALIZE ID
===================================================== */

function normalizeId(value) {

    return value
        .trim()
        .toUpperCase();

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   GET INITIALS
===================================================== */

function getInitials(name) {

    return name

        .split(/\s+/)

        .filter(Boolean)

        .slice(0,2)

        .map(word => word.charAt(0))

        .join("")

        .toUpperCase();

}


/* =====================================================
   LOADING
===================================================== */

function showLoading() {

    result.innerHTML = `

        <div class="loading-card">

            <div>

                <div class="loader"></div>

                <h3>
                    Verifying Certificate
                </h3>

                <p>
                    Checking official certificate record...
                </p>

            </div>

        </div>

    `;

}


/* =====================================================
   INVALID
===================================================== */

function showInvalid(id) {

    message.textContent =
        "Certificate ID could not be verified.";

    message.className =
        "message error";


    result.innerHTML = `

        <div class="invalid-card">

            <div class="invalid-icon">
                !
            </div>

            <h3>
                Certificate Not Found
            </h3>

            <p>
                No official certificate record was
                found for the ID you entered.
            </p>

            <div class="invalid-id">

                ${escapeHTML(id)}

            </div>

            <button
                class="try-again"
                onclick="tryAgain()"
            >
                Try Again
            </button>

        </div>

    `;

}


/* =====================================================
   VERIFIED
===================================================== */

function showVerified(id, data) {

    message.textContent =
        "Certificate successfully verified.";

    message.className =
        "message success";


    const initials =
        getInitials(data.name);


    result.innerHTML = `

        <article class="verified-card">


            <!-- VERIFIED HEADER -->

            <div class="verified-top">

                <span class="verified-badge">

                    <span class="badge-check">
                        ✓
                    </span>

                    CERTIFICATE VERIFIED

                </span>


                <span class="record-id">

                    ID:
                    ${escapeHTML(id)}

                </span>

            </div>



            <!-- STUDENT -->

            <div class="student-profile">


                <div class="photo-frame">

                    <img
                        src="${escapeHTML(data.photo)}"
                        alt="${escapeHTML(data.name)}"
                        onerror="
                            this.style.display='none';
                            this.nextElementSibling.style.display='grid';
                        "
                    >

                    <div
                        class="photo-fallback"
                        style="display:none;"
                    >
                        ${initials}
                    </div>

                </div>


                <div class="student-intro">

                    <span class="eyebrow">
                        OFFICIAL STUDENT RECORD
                    </span>

                    <h2>
                        ${escapeHTML(data.name)}
                    </h2>

                    <p>
                        ${escapeHTML(data.course)}
                    </p>

                </div>

            </div>



            <!-- DETAILS -->

            <div class="details-grid">


                <div class="detail">

                    <span class="detail-label">
                        Student Name
                    </span>

                    <strong>
                        ${escapeHTML(data.name)}
                    </strong>

                </div>


                <div class="detail">

                    <span class="detail-label">
                        Certificate ID
                    </span>

                    <strong>
                        ${escapeHTML(id)}
                    </strong>

                </div>


                <div class="detail">

                    <span class="detail-label">
                        Course / Program
                    </span>

                    <strong>
                        ${escapeHTML(data.course)}
                    </strong>

                </div>


                <div class="detail">

                    <span class="detail-label">
                        Issue Date
                    </span>

                    <strong>
                        ${escapeHTML(data.issueDate)}
                    </strong>

                </div>


                <div class="detail">

                    <span class="detail-label">
                        Verification Status
                    </span>

                    <strong class="status">

                        <span class="status-dot"></span>

                        ${escapeHTML(data.status)}

                    </strong>

                </div>


            </div>



            <!-- AUTHENTICITY -->

            <div class="authenticity">

                <span class="auth-icon">
                    ✓
                </span>

                <p>

                    This certificate record has been
                    successfully verified through the
                    official verification system of
                    Helpline Welfare Trust.

                </p>

            </div>


        </article>

    `;

}


/* =====================================================
   VERIFY
===================================================== */

function verifyCertificate(id) {

    const cleanId =
        normalizeId(id);


    /* Empty */

    if (!cleanId) {

        message.textContent =
            "Please enter a certificate ID.";

        message.className =
            "message error";

        input.focus();

        return;

    }


    /* Disable */

    button.disabled = true;

    input.disabled = true;


    message.textContent =
        "Verifying...";

    message.className =
        "message";


    showLoading();


    /* Simulated verification */

    setTimeout(() => {

        const certificate =
            certificates[cleanId];


        if (certificate) {

            showVerified(
                cleanId,
                certificate
            );


            /* Update URL */

            const url =
                new URL(
                    window.location.href
                );

            url.searchParams.set(
                "id",
                cleanId
            );

            window.history.replaceState(
                {},
                "",
                url
            );

        }

        else {

            showInvalid(
                cleanId
            );

        }


        button.disabled = false;

        input.disabled = false;

    }, 650);

}


/* =====================================================
   FORM
===================================================== */

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        verifyCertificate(
            input.value
        );

    }
);


/* =====================================================
   TRY AGAIN
===================================================== */

function tryAgain() {

    input.value = "";

    message.textContent = "";

    message.className =
        "message";

    result.innerHTML = `

        <div class="welcome-card">

            <div class="welcome-icon">
                <span>✓</span>
            </div>

            <h3>
                Ready to Verify
            </h3>

            <p>
                Enter a certificate ID above to
                retrieve the official certificate record.
            </p>

        </div>

    `;

    input.focus();

}


/* =====================================================
   AUTOMATIC URL / QR VERIFICATION
=====================================================

Example:

index.html?id=HWT-2026-001

QR Code بعد میں اسی URL پر point کرے گا۔

===================================================== */

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const urlCertificateId =
    urlParams.get("id");


if (urlCertificateId) {

    input.value =
        normalizeId(
            urlCertificateId
        );

    verifyCertificate(
        urlCertificateId
    );

}