let uid;
let prescriptions = document.getElementById('showPrescriptions');
function allPrescriptions() {
    document.getElementById('all-prescription').classList.remove('d-none');
    document.getElementById('PharmacyDashboard').classList.add('d-none');
    
    
    db.collection('prescriptions').where('pharmacy', '==', `${uid}`).get().then(snapshot => {
        snapshot.forEach(doc => {

            console.log(doc)
            prescriptions.innerHTML += `
            <tr id="${doc.id}">
            <td>${doc.data().patientName}</td>
            <td>${doc.data().doctorName}</td>
            <td>${doc.data().drugName}</td>
            <td>${doc.data().duration}</td>
            <td>${doc.data().smartSigs}</td>
            <td>${doc.data().substitutionPermitted ? 'Yes' : 'No'}</td>
            <td> <a class="btn btn-sm fa fa-check" onClick="nextRefill('${doc.data().patientName}','${doc.data().doctorName}','${doc.data().drugName}','${doc.data().duration}','${doc.id}')"  > </a>  </td>
        </tr>`

        })
    })
}

function toDashboard(){
    document.getElementById('all-prescription').classList.add('d-none');
    document.getElementById('PharmacyDashboard').classList.remove('d-none');
}

function nextRefill(pname, docName,drugName,duration, docId) {
    console.log(pname);
    console.log(drugName);
    document.getElementById(docId).innerHTML = `
    <td>${pname}</td>
    <td>${docName}</td>
    <td>${drugName}</td>
    <td colspan="4"> Next Refill after ${duration}</td>
    `

    document.getElementById(docId).classList.add('text-muted');
    document.getElementById(docId).style.background = '#dcdee0';
    
}


auth.onAuthStateChanged(user => {
    if (user) {
        uid = user.uid;
    }

})