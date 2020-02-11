
let pending = document.getElementById('pendingPrescriptions')
let uid;


function addPrescription(drugname) {
    document.getElementById('PatientsRender').classList.add('d-none');
    document.getElementById('drug').innerHTML = `<option value = '${drugname}'>${drugname}</option>`
    document.getElementById('doctorDashboard').classList.add('d-none');
    document.getElementById('addPrescription').classList.remove('d-none');
    document.getElementById('pending-Prescriptions').classList.add('d-none');
    document.getElementById('render-drugs').classList.add('d-none');
    document.getElementById('prescriptionSubmit').disabled = false;
    // db.collection('PatientProfile').get().then(snapshot => {
    //     patientList.innerHTML = ' <option disabled selected>Choose Patient</option>';
    //     snapshot.forEach(doc => {
    //         patientList.innerHTML += `<option value='${doc.data().uid}'> ${doc.data().patientName}-Id(${doc.data().patientId}) </option>`;
    //     })
    // })

    // db.collection('PharmacyProfile').get().then(snapshot => {
    //     pharmacyList.innerHTML = ' <option disabled selected>Choose Pharmacy</option>';
    //     snapshot.forEach(doc => {
    //         pharmacyList.innerHTML += ``;
    //     })
    // })
}


function showPatients() {
    document.getElementById('PatientsRender').classList.remove('d-none');
    document.getElementById('doctorDashboard').classList.add('d-none');
}
const searchPharmacy = document.getElementById('pharmacySearch');

searchPharmacy.addEventListener('submit', async e => {
    e.preventDefault();
    document.getElementById('pharmacySearch').classList.add('d-none');
    document.getElementById('pharmacyRenderName').classList.add('d-none');

    const pharId = searchPharmacy['pharmacyName'].value;
    db.collection('PharmacyProfile').where('pharmacyId', '==', `${pharId}`).get().then(snapshot => {
        console.log(snapshot.docs[0])
        document.getElementById('spinner1').classList.remove('d-none');
        if (snapshot.docs.length === 0) {
            setTimeout(() => {
                document.getElementById('spinner1').classList.add('d-none');
                document.getElementById('pharmacyRenderName').classList.remove('d-none');
                document.getElementById('pharmacySearch').classList.remove('d-none');
                document.getElementById('pharmacyRenderName').innerHTML = "<h4 class='text-dark'>Invalid Patient Id </h4>"

            }, 2000);
        }
        else {
            snapshot.forEach(doc => {
                document.getElementById('ChoosePharmacy').innerHTML = `<option value='${doc.data().uid}'> ${doc.data().pharmacyName}-Id(${doc.data().pharmacyId}) </option>`;
                setTimeout(() => {
                    document.getElementById('spinner1').classList.add('d-none');
                    document.getElementById('pharmacyRenderName').classList.remove('d-none');
                    document.getElementById('pharmacyRenderName').innerHTML = `<div class="col-4 align-self-center rendered-patient mx-auto">
                <div class="card text-change bg-light mb-3 mx-2 mt-2" style="max-width: 40rem; height: auto;">
                    <div class="card-header font-weight-bold">Pharmacy ${doc.data().pharmacyName} </div>
                    <div class="card-body">
                    <h6 class="card-title"><span class="text-muted">Pharmacy ID: ${doc.data().pharmacyId}</span></h6>
                      <p class="card-text text-change text-left justify-content">
                            <span class="font-weight-normal">Mobile Number:${doc.data().mobno} </span><br/>
                            <span class="font-weight-normal">Email ID : ${doc.data().email} </span><br/>
                            <span class="font-weight-normal">Licence No : ${doc.data().licenceNo} </span>
                            <div class="text-right"><span class="btn btn-info btn-md" onclick="chooseDrugs('${doc.data().uid}','${doc.data().pharmacyName}','${doc.data().pharmacyId}')">Prescribe Now</span><br/></div>
                        </p>
                    </div>
                  </div>
            </div>`;

                }, 2000);
            })
        }
    })

})



const searchFun = document.getElementById('patientSearch')

searchFun.addEventListener('submit', async e => {
    e.preventDefault();
    const pid = searchFun["patientName"].value;
    document.getElementById('patientRenderName').classList.add('d-none');
    console.log(pid);
    db.collection('PatientProfile').where("patientId", "==", `${pid}`).get().then(snapshot => {
        if (snapshot.docs.length === 0) {
            document.getElementById('spinner').classList.remove('d-none');
            setTimeout(() => {
                document.getElementById('spinner').classList.add('d-none');
                document.getElementById('patientRenderName').classList.remove('d-none');
                document.getElementById('patientSearch').classList.remove('d-none');
                document.getElementById('patientRenderName').innerHTML = "<h4 class='text-dark'>Invalid Patient Id </h4>"

            }, 2000);
        }
        else {
            snapshot.forEach(doc => {

                const patient = document.getElementById('ChoosePatient');
                patient.innerHTML = `<option value='${doc.data().uid}'> ${doc.data().patientName}-Id(${doc.data().patientId}) </option>`;


                document.getElementById('patientSearch').classList.add('d-none');
                document.getElementById('spinner').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('spinner').classList.add('d-none');
                    document.getElementById('patientRenderName').classList.remove('d-none');
                    document.getElementById('patientRenderName').innerHTML = `<div class="col-4 align-self-center rendered-patient">
                <div class="card text-change bg-light mb-3 mx-2 mt-2" style="max-width: 40rem; height: auto;">
                    <div class="card-header font-weight-bold">Consultation with ${doc.data().patientName} </div>
                    <div class="card-body">
                    <h6 class="card-title"><span class="text-muted">Patient ID: ${doc.data().patientId}</span></h6>
                      <p class="card-text text-change text-left justify-content">
                            <span class="font-weight-normal">Mobile Number:${doc.data().mobno} </span><br/>
                            <span class="font-weight-normal">Email ID : ${doc.data().email} </span><br/>
                            <span class="font-weight-normal">Address: ${doc.data().address} </span>
                            <div class="text-right"><span class="btn btn-info btn-md" onclick="choosePharmacy()">Prescribe Now</span><br/></div>
                        </p>
                    </div>
                  </div>
            </div>`

                }, 2000);
            })
        }
    })
})

function chooseDrugs(Uid, name, id) {
    document.getElementById('pharmacyRender').classList.add('d-none');
    document.getElementById('render-drugs').classList.remove('d-none');
    document.getElementById('ChoosePharmacy').innerHTML = `<option value='${Uid}'> ${name}-Id(${id}) </option>`;
    document.getElementById('pharmacySearch').classList.remove('d-none');

}

let patientList = document.getElementById('ChoosePatient')

let pharmacyList = document.getElementById('ChoosePharmacy')

function choosePharmacy() {
    document.getElementById('PatientsRender').classList.add('d-none');
    document.getElementById('pharmacyRender').classList.remove('d-none');
    document.getElementById('patientSearch').classList.remove('d-none');
}


db.collection('PharmacyProfile').get().then(snapshot => {
    snapshot.forEach(doc => {
        document.getElementById('ChoosePharmacy').innerHTML = `<option value='${doc.data().uid}'> ${doc.data().pharmacyName}-Id(${doc.data().pharmacyId}) </option>`;
        setTimeout(() => {
            document.getElementById('spinner1').classList.add('d-none');
            document.getElementById('pharmacyRenderName').classList.remove('d-none');
            document.getElementById('pharmacyRenderName').innerHTML += `<div class="col-4 align-self-center rendered-patient mx-auto">
            <div class="card text-change bg-light mb-3 mx-2 mt-2" style="max-width: 40rem; height: auto;">
                <div class="card-header font-weight-bold">Pharmacy ${doc.data().pharmacyName} </div>
                <div class="card-body">
                <h6 class="card-title"><span class="text-muted">Pharmacy ID: ${doc.data().pharmacyId}</span></h6>
                  <p class="card-text text-change text-left justify-content">
                        <span class="font-weight-normal">Mobile Number:${doc.data().mobno} </span><br/>
                        <span class="font-weight-normal">Email ID : ${doc.data().email} </span><br/>
                        <span class="font-weight-normal">Licence No : ${doc.data().licenceNo} </span>
                        <div class="text-right"><span class="btn btn-info btn-md" onclick="chooseDrugs('${doc.data().uid}','${doc.data().pharmacyName}','${doc.data().pharmacyId}')">Prescribe Now</span><br/></div>
                    </p>
                </div>
              </div>
        </div>`;

        }, 2000);
    })
})

function toDashboard() {
    document.getElementById('doctorDashboard').classList.remove('d-none');
    document.getElementById('addPrescription').classList.add('d-none');
    document.getElementById('pending-Prescriptions').classList.add('d-none');
    document.querySelector('.tutorial').classList.add('d-none');
    document.querySelector('#render-chats').classList.add('d-none');
    document.querySelector('#demo').load();
    document.getElementById('patientRenderName').innerHTML = "";
    document.getElementById('PatientsRender').classList.add('d-none');
    document.getElementById('pharmacyRender').classList.add('d-none')
    document.getElementById('pharmacySearch').classList.remove('d-none');
    document.getElementById('patientSearch').classList.remove('d-none');
    document.getElementById('render-drugs').classList.add('d-none');
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

    db.collection('prescriptions').add(Prescription).then();
    NewPrescription.reset();
    document.getElementById('prescribe').innerHTML = "Successfully Prescribed";
    document.getElementById('confirm').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('addPrescription').classList.add('d-none');
        document.getElementById('confirm').classList.add('d-none');
        toDashboard();
    }, 2000);
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
    document.getElementById('prescribe').innerHTML = "Added to Pending"
    document.getElementById('confirm').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('addPrescription').classList.add('d-none');
        document.getElementById('pending').disabled = false;
        document.getElementById('confirm').classList.add('d-none');
        toDashboard();
    }, 2000);
})


function pendingRx() {
    document.getElementById('doctorDashboard').classList.add('d-none');


    document.getElementById('pending-Prescriptions').classList.remove('d-none');
    document.getElementById('addPrescription').classList.add('d-none');
    db.collection('pendingPrescriptions').get().then(snapshot => {
        snapshot.forEach(doc => {
            pending.innerHTML = ` <tr>
                        
            <td>${doc.data().pharmacyName}</td>
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

function chatSearch() {
    document.getElementById('doctorDashboard').classList.add('d-none');
    document.getElementById('addPrescription').classList.add('d-none');
    document.getElementById('pending-Prescriptions').classList.add('d-none');
    document.querySelector('.tutorial').classList.add('d-none');
    document.querySelector('#demo').load();
    document.querySelector('#render-chats').classList.remove('d-none');
}

var jobDet;
var jobView = document.getElementById('patients');
if (jobView) {
    auth.onAuthStateChanged(async function (user) {

        await db.collection('PatientProfile')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    jobView.innerHTML += `
                <div class="col-4 align-self-center rendered-patient">
                    <div class="card text-change bg-light mb-3 mx-2 mt-2" style="max-width: 40rem; height: auto;">
                        <div class="card-header">Consultation with ${doc.data().patientName} </div>
                        <div class="card-body">
                        <h6 class="card-title"><span class="text-muted">Patient ID: ${doc.data().patientId}</span></h6>
                          <p class="card-text text-change text-left justify-content">
                                <span class="font-weight-normal">Mobile Number:${doc.data().mobno} </span><br/>
                                <span class="font-weight-normal">Email ID : ${doc.data().email} </span><br/>
                                <span class="font-weight-normal">Address: ${doc.data().address} </span>
                                <div class="text-right"><span class="btn btn-info btn-md" onclick="toggleFab('${doc.data().patientName}')">Chat Now</span><br/></div>
                            </p>
                        </div>
                      </div>
                </div>`
                });
            })
    })
}

function searchPatient() {
    var render_static = document.querySelectorAll('.render-static');
    for (var i = 0; i < render_static.length; i++) {
        render_static[i].classList.add('d-none');
    }
    var rendered_patient = document.querySelectorAll('.rendered-patient');
    for (var i = 0; i < rendered_patient.length; i++) {
        rendered_patient[i].classList.add('d-none');
    }
    var searched_patient = document.querySelectorAll('.searched-patient');
    for (var i = 0; i < searched_patient.length; i++) {
        searched_patient[i].classList.add('d-none');
    }
    document.querySelector('.render-loader').classList.remove('d-none');
    setTimeout(async () => {
        var patient = document.querySelector('#patientSearchID').value;
        console.log(patient);
        var jobView = document.getElementById('patients');
        if (patient !== "") {
            await db.collection('PatientProfile').where("patientId", "==", `${patient}`)
                .get()
                .then(snapshot => {

                    console.log('success')
                    jobView.innerHTML += `
            <div class="col-4 align-self-start searched-patient">
                <div class="card text-change bg-light mb-3 mx-2" style="max-width: 40rem; height: auto;">
                    <div class="card-header">Consultation with ${snapshot.docs[0].data().patientName} </div>
                    <div class="card-body">
                    <h6 class="card-title"><span class="text-muted">Patient ID: ${snapshot.docs[0].data().patientId}</span></h6>
                      <p class="card-text text-change text-left justify-content">
                            <span class="font-weight-normal">Mobile Number:${snapshot.docs[0].data().mobno} </span><br/>
                            <span class="font-weight-normal">Email ID : ${snapshot.docs[0].data().email} </span><br/>
                            <span class="font-weight-normal">Address: ${snapshot.docs[0].data().address} </span>
                            <div class="text-right"><span class="btn btn-info btn-md" onclick="toggleFab('${snapshot.docs[0].data().patientName}')">Chat Now</span><br/></div>
                        </p>
                    </div>
                  </div>
            </div>`;
                })
                .catch(async error => {
                    console.log(error);
                    jobView.innerHTML += `
            <h3 class="text-light mb-2 text-center searched-error">Sorry no patient with entered ID found in the database!</h3>`
                    await setTimeout(() => {
                        var rendered_patient = document.querySelectorAll('.rendered-patient');
                        for (var i = 0; i < rendered_patient.length; i++) {
                            rendered_patient[i].classList.remove('d-none');
                        }
                        var searched_error = document.querySelectorAll('.searched-error');
                        for (var i = 0; i < searched_error.length; i++) {
                            searched_error[i].classList.add('d-none');
                        }
                    }, 3000);
                });
            var render_static = document.querySelectorAll('.render-static');
            for (var i = 0; i < render_static.length; i++) {
                render_static[i].classList.remove('d-none');
            }
            document.querySelector('.render-loader').classList.add('d-none');
        }
        else {
            var render_static = document.querySelectorAll('.render-static');
            for (var i = 0; i < render_static.length; i++) {
                render_static[i].classList.remove('d-none');
            }
            document.querySelector('.render-loader').classList.add('d-none');
            var searched_patient = document.querySelectorAll('.searched-patient');
            for (var i = 0; i < searched_patient.length; i++) {
                searched_patient[i].classList.add('d-none');
            }
            var searched_error = document.querySelectorAll('.searched-error');
            for (var i = 0; i < searched_error.length; i++) {
                searched_error[i].classList.add('d-none');
            }
            for (var i = 0; i < rendered_patient.length; i++) {
                rendered_patient[i].classList.remove('d-none');
            }
        }
    }, 2000);
}