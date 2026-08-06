const certificates = [

{
    id: "2026-001",
    name: "Muhammad Hasnain",
    course: "HTML & CSS",
    issueDate: "05 August 2026",
    status: "Verified",
    image: "images/OIP.jpg"
},

{
    id: "2026-002",
    name: "Ali Khan",
    course: "JavaScript Basics",
    issueDate: "10 August 2026",
    status: "Verified",
    image: "images/ali.jpg"
},

{
    id: "2026-003",
    name: "Sara Ahmed",
    course: "Graphic Design",
    issueDate: "15 August 2026",
    status: "Verified",
    image: "images/sara.jpg"
},

{
    id: "2026-004",
    name: "Ahmed Raza",
    course: "MS Word",
    issueDate: "20 August 2026",
    status: "Verified",
    image: "images/ahmed.jpg"
},

{
    id: "2026-005",
    name: "Fatima Noor",
    course: "Microsoft Excel",
    issueDate: "25 August 2026",
    status: "Verified",
    image: "images/fatima.jpg"
}

];

function verifyCertificate(){

    const input = document.getElementById("certificateInput").value.trim();

    const result = document.getElementById("result");

    const certificate = certificates.find(cert => cert.id === input);

    result.style.display = "block";

    if(certificate){

        result.innerHTML = `
        <div class="card">

            <img src="${certificate.image}"
                 alt="${certificate.name}"
                 class="applicant-img"
                 onerror="this.src='https://placehold.co/150x150?text=No+Image'">

            <h2 class="success"> Certificate Verified</h2>

            <p><strong>Student Name:</strong> ${certificate.name}</p>

            <p><strong>Certificate ID:</strong> ${certificate.id}</p>

            <p><strong>Course:</strong> ${certificate.course}</p>

            <p><strong>Issue Date:</strong> ${certificate.issueDate}</p>

            <p><strong>Status:</strong> ${certificate.status}</p>

            <br>

            <p class="verify_text" style="color:green;">
                ✔ This certificate is officially verified.
            </p>

        </div>  
        `;

    }else{

        result.innerHTML=`

        <div class="card">

        <h2 class="error">❌ Certificate Not Found</h2>

        <p>
        No certificate exists with this ID.
        </p>

        </div>

        `;

    }

}