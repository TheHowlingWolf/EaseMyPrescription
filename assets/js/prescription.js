let uid;
let prescriptions = document.getElementById('showPrescriptions');
function allPrescriptions() {
    document.getElementById('all-prescription').classList.remove('d-none');
    document.getElementById('PharmacyDashboard').classList.add('d-none');
    
    
    db.collection('prescriptions').where('patient', '==', `${uid}`).get().then(snapshot => {
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



auth.onAuthStateChanged(user => {
    if (user) {
        uid = user.uid;
    }

})