let uid;
let prescriptions = document.getElementById('showPrescriptions');
function allPrescriptions() {
    document.getElementById('all-prescription').classList.remove('d-none');
    document.getElementById('PharmacyDashboard').classList.add('d-none');
    
    db.collection('prescriptions').where('pharmacy', '==', `${uid}`).get().then(snapshot => {
        snapshot.forEach(doc => {

            
            prescriptions.innerHTML += `
            <td>${doc.data().patientName}</td>
            <td>${doc.data().drugName}</td>
            <td>${doc.data().refills}</td>
            <td>${doc.data().duration}</td>
            <td>${doc.data().smartSigs}</td>
            <td>${doc.data().substitutionPermitted ? 'Yes' : 'No'}</td>
        </tr>`

        })
    })
}




auth.onAuthStateChanged(user => {
    if (user) {
        uid = user.uid;
    }

})