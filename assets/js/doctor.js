
let pending = document.getElementById('pendingPrescriptions')
let uid;
function addPrescription(patientid, patientName) {
    document.getElementById('PatientsRender').classList.add('d-none');

    document.getElementById('doctorDashboard').classList.add('d-none');
    document.getElementById('addPrescription').classList.remove('d-none');
    document.getElementById('pending-Prescriptions').classList.add('d-none');
    const patient = document.getElementById('ChoosePatient');
    patient.innerHTML = `<option value='${patientid}'> ${patientName}-Id(${patientid}) </option>`;
    // db.collection('PatientProfile').get().then(snapshot => {
    //     patientList.innerHTML = ' <option disabled selected>Choose Patient</option>';
    //     snapshot.forEach(doc => {
    //         patientList.innerHTML += `<option value='${doc.data().uid}'> ${doc.data().patientName}-Id(${doc.data().patientId}) </option>`;
    //     })
    // })

    db.collection('PharmacyProfile').get().then(snapshot => {
        pharmacyList.innerHTML = ' <option disabled selected>Choose Pharmacy</option>';
        snapshot.forEach(doc => {
            pharmacyList.innerHTML += `<option value='${doc.data().uid}'> ${doc.data().pharmacyName}-Id(${doc.data().pharmacyId}) </option>`;
        })
    })
}

function showPatients() {
    document.getElementById('PatientsRender').classList.remove('d-none');
    document.getElementById('doctorDashboard').classList.add('d-none');

    let patient = document.getElementById('patients');
    // patient.innerHTML = '';
    db.collection('PatientProfile').get().then(snapshot => {
        snapshot.forEach(doc => {

            patientList.innerHTML += `<td> ${doc.data().patientId}) </td>
            <td>  ${doc.data().patientName}</td>
            <td>  ${doc.data().mobno}</td>
            <td>  ${doc.data().email}</td>
            <td> <button onclick="addPrescription(${doc.data()})"></button></td>
            `;
        })
    })

}

const searchFun = document.getElementById('patientSearch')

searchFun.addEventListener('submit', async e => {
    e.preventDefault();
    const pid = searchFun["patientName"].value;
    document.getElementById('patientRenderName').classList.add('d-none');
    console.log(pid);
    db.collection('PatientProfile').where("patientId", "==", `${pid}`).get().then(snapshot => {
        console.log(snapshot)
        snapshot.forEach(doc => {
            document.getElementById('spinner').classList.remove('d-none');
            setTimeout(() => {
                document.getElementById('spinner').classList.add('d-none');
                document.getElementById('patientRenderName').classList.remove('d-none');
                document.getElementById('patientRenderName').innerHTML = `<button class="btn btn-large " onclick="addPrescription('${doc.data().patientId}','${doc.data().patientName}')"> ${doc.data().patientName}</button>`
            }, 2000);
        })
    })
})

let patientList = document.getElementById('ChoosePatient')

let pharmacyList = document.getElementById('ChoosePharmacy')



function toDashboard() {
    document.getElementById('doctorDashboard').classList.remove('d-none');
    document.getElementById('addPrescription').classList.add('d-none');
    document.getElementById('pending-Prescriptions').classList.add('d-none');
    document.querySelector('.tutorial').classList.add('d-none');
    document.querySelector('#demo').load();
    pending.innerHTML = '';
}



auth.onAuthStateChanged(user => {
    if (user) {
        uid = user.uid;
    }

})


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
        pharmacyName: '',
        date: Date.now()


    }

    await db.collection('PatientProfile').where("uid", "==", `${Prescription.patient}`).get().then(snapshot => {
        Prescription.patientName = snapshot.docs[0].data().patientName + `(${snapshot.docs[0].data().patientId})`;
    });
    await db.collection('DoctorProfile').where("uid", "==", `${uid}`).get().then(snapshot => {
        Prescription.doctorId = uid;
        Prescription.doctorName = snapshot.docs[0].data().doctorName;
    })
    await db.collection('PharmacyProfile').where("uid", "==", `${Prescription.pharmacy}`).get().then(snapshot => {
        console.log(snapshot.docs[0].data())
        Prescription.pharmacyName = snapshot.docs[0].data().pharmacyName;
    })
    console.log(Prescription);

    db.collection('prescriptions').add(Prescription);
    NewPrescription.reset();
    document.getElementById('prescriptionSubmit').disabled = false;
    toDashboard();
})

document.getElementById('pending').addEventListener('click', async e => {

    document.getElementById('pending').disabled = true;
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
        Prescription.patientName = snapshot.docs[0].data().patientName + `(${snapshot.docs[0].data().patientId})`;
    });
    await db.collection('DoctorProfile').where("uid", "==", `${uid}`).get().then(snapshot => {
        Prescription.doctorId = uid;
        Prescription.doctorName = snapshot.docs[0].data().doctorName;
    })
    await db.collection('PharmacyProfile').where("uid", "==", `${Prescription.pharmacy}`).get().then(snapshot => {
        Prescription.pharmacyName = snapshot.docs[0].data().pharmacyName;
    })

    db.collection('pendingPrescriptions').add(Prescription);
    NewPrescription.reset();
    toDashboard();
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

function tutorials() {
    document.getElementById('doctorDashboard').classList.add('d-none');
    document.querySelector('.tutorial').classList.remove('d-none');
}