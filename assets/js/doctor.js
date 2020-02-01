
let pending = document.getElementById('pendingPrescriptions')

function addPrescription() {
    document.getElementById('doctorDashboard').classList.add('d-none');
    document.getElementById('addPrescription').classList.remove('d-none');
    document.getElementById('pending-Prescriptions').classList.add('d-none');
    db.collection('PatientProfile').get().then(snapshot => {
        snapshot.forEach(doc => {
            patientList.innerHTML += `<option value='${doc.data().uid}'> ${doc.data().patientName}-Id(${doc.data().patientId}) </option>`;
        })
    })

    db.collection('PharmacyProfile').get().then(snapshot => {
        snapshot.forEach(doc => {
            pharmacyList.innerHTML += `<option value='${doc.data().uid}'> ${doc.data().pharmacyName}-Id(${doc.data().pharmacyId}) </option>`;
        })
    })
}

let patientList = document.getElementById('ChoosePatient')

let pharmacyList = document.getElementById('ChoosePharmacy')

function toDashboard() {
    document.getElementById('doctorDashboard').classList.remove('d-none');
    document.getElementById('addPrescription').classList.add('d-none');
    document.getElementById('pending-Prescriptions').classList.add('d-none');
    pending.innerHTML = '';
}

let NewPrescription = document.getElementById('newPrescription');

NewPrescription.addEventListener('submit', async e => {
    e.preventDefault();
    document.getElementById('prescriptionSubmit').disabled = true;
    let Prescription = {
        patient: NewPrescription['ChoosePatient'].value,
        pharmacy: NewPrescription['ChoosePharmacy'].value,
        drugName: NewPrescription['drug'].value,
        refills: NewPrescription['refills'].value,
        duration: NewPrescription['duration'].value,
        smartSigs: NewPrescription['smartSigs'].value,
        substitutionPermitted: NewPrescription['substitutionPermitted'].checked,
        patientName: '',
        pharmacyName: ''
    }

    await db.collection('PatientProfile').where("uid", "==", `${Prescription.patient}`).get().then(snapshot => {
        Prescription.patientName = snapshot.docs[0].data().patientName;
    });

    await db.collection('PharmacyProfile').where("uid", "==", `${Prescription.pharmacy}`).get().then(snapshot => {
        Prescription.pharmacyName = snapshot.docs[0].data().pharmacyName;
    })
    console.log(Prescription);

    db.collection('prescriptions').add(Prescription);
    NewPrescription.reset();
    toDashboard();
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