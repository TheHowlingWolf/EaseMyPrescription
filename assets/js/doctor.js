
let pending = document.getElementById('pendingPrescriptions')

function addPrescription() {
    document.getElementById('doctorDashboard').classList.add('d-none');
    document.getElementById('addPrescription').classList.remove('d-none');
    document.getElementById('pending-Prescriptions').classList.add('d-none');

}

let patientList = document.getElementById('ChoosePatient')
db.collection('PatientProfile').get().then(snapshot => {
    snapshot.forEach(doc => {
        patientList.innerHTML += `<option value='${doc.data().patientId}'> ${doc.data().patientName}-Id(${doc.data().patientId}) </option>`;
    })
})

let pharmacyList = document.getElementById('ChoosePharmacy')
db.collection('PharmacyProfile').get().then(snapshot=>{
    snapshot.forEach(doc=>{
        pharmacyList.innerHTML += `<option value='${doc.data().pharmacyId}'> ${doc.data().pharmacyName}-Id(${doc.data().pharmacyId}) </option>`;
    })
})
function toDashboard() {
    document.getElementById('doctorDashboard').classList.remove('d-none');
    document.getElementById('addPrescription').classList.add('d-none');
    document.getElementById('pending-Prescriptions').classList.add('d-none');
    pending.innerHTML = '';
}

let NewPrescription = document.getElementById('newPrescription');

NewPrescription.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('prescriptionSubmit').disabled = true;
    let Prescription = {
        pharmacy: NewPrescription['pharmacy'].value,
        drugName: NewPrescription['drug'].value,
        refills: NewPrescription['refills'].value,
        duration: NewPrescription['duration'].value,
        smartSigs: NewPrescription['smartSigs'].value,
        substitutionPermitted: NewPrescription['substitutionPermitted'].checked
    }
    db.collection('prescriptions').add(Prescription);

})

document.getElementById('pending').addEventListener('click', e => {

    document.getElementById('pending').disabled = true;
    let Prescription = {
        pharmacy: NewPrescription['pharmacy'].value,
        drugName: NewPrescription['drug'].value,
        refills: NewPrescription['refills'].value,
        duration: NewPrescription['duration'].value,
        smartSigs: NewPrescription['smartSigs'].value,
        substitutionPermitted: NewPrescription['substitutionPermitted'].checked
    }

    db.collection('pendingPrescriptions').add(Prescription);
})


function pendingRx() {
    document.getElementById('doctorDashboard').classList.add('d-none');


    document.getElementById('pending-Prescriptions').classList.remove('d-none');
    document.getElementById('addPrescription').classList.add('d-none');
    db.collection('pendingPrescriptions').get().then(snapshot => {
        snapshot.forEach(doc => {
            pending.innerHTML = ` <tr>
                        
            <td>${doc.data().pharmacy}</td>
            <td>${doc.data().drugName}</td>
            <td>${doc.data().refills}</td>
            <td>${doc.data().duration}</td>
            <td>${doc.data().smartSigs}</td>
            <td>${doc.data().substitutionPermitted ? 'Yes' : 'No'}</td>
        </tr>`+ pending.innerHTML;
        });
    })
}