let uid;
let prescriptions = document.getElementById('showPrescriptions');
function allPrescriptions() {
    document.getElementById('all-prescription').classList.remove('d-none');
    document.getElementById('PharmacyDashboard').classList.add('d-none');
    prescriptions.innerHTML = '';
    
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
            <td><div class="text-right">
            <button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#exampleModal">
                Transfer
            </button>
        <div class="modal fade text-center" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Transfer Alert</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <img src="./assets/pictures/caution.svg" alt="" width="40">
                    <p class="lead">Note: Transfering prescription is subject to further availiability of medicine from the transfered pharmacy. Please consult before Transfering.</span></p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-info btn-md" data-dismiss="modal" onclick="trasferPrescript('${doc.data().patientName}','${doc.data().doctorName}','${doc.data().drugName}','${doc.data().duration}','${doc.id}')">Proceed</button>
                </div>
            </div>
            </div>
        </div></td>
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
    <td colspan="5"> Next Refill after ${duration}</td>
    `

    document.getElementById(docId).classList.add('text-muted');
    document.getElementById(docId).style.background = '#dcdee0';
    
}

function trasferPrescript(pname, docName,drugName,duration, docId){
    console.log(pname);
    console.log(drugName);
    document.getElementById(docId).innerHTML = `
    <td>${pname}</td>
    <td>${docName}</td>
    <td>${drugName}</td>
    <td colspan="5"> Next Refill after ${duration}</td>
    `

    document.getElementById(docId).classList.add('text-muted');
    document.getElementById(docId).style.background = '#dcdee0';
    document.querySelector('#all-prescription').classList.add('d-none');
    document.querySelector('#render-pharmacy').classList.remove('d-none');
}



auth.onAuthStateChanged(user => {
    if (user) {
        uid = user.uid;
    }

})

var jobDet;
var jobView = document.getElementById('pharmacy');
if (jobView) {
    auth.onAuthStateChanged(async function (user) {

        await db.collection('PharmacyProfile')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    jobView.innerHTML += `
                <div class="col-5 align-self-center rendered-patient">
                    <div class="card text-change bg-light mb-3 mx-2 mt-2" style="max-width: 40rem; height: auto;">
                        <div class="card-header">${doc.data().pharmacyName} </div>
                        <div class="card-body">
                        <h6 class="card-title"><span class="text-muted">Pharmacy ID: ${doc.data().pharmacyId}</span></h6>
                          <p class="card-text text-change text-left justify-content">
                                <span class="font-weight-normal">Mobile Number:${doc.data().mobno} </span><br/>
                                <span class="font-weight-normal">Email ID : ${doc.data().email} </span><br/>
                                <span class="font-weight-normal">Address: ${doc.data().licenceNo} </span>
                                <div class="text-right"><span class="btn btn-info btn-md" onclick="transfered()">Transfer Now</span><br/></div>
                            </p>
                        </div>
                      </div>
                </div>`
                });
            })
    })
}


function searchPharmacy() {
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
        var pharmacy = document.querySelector('#pharmacySearchID').value;
        var jobView = document.getElementById('pharmacy');
        if (pharmacy !== "") {
            await db.collection('PharmacyProfile').where("pharmacyId", "==", `${pharmacy}`)
                .get()
                .then(snapshot => {

                    console.log('success')
                    jobView.innerHTML += `
            <div class="col-5 align-self-start searched-patient">
                <div class="card text-change bg-light mb-3 mx-2" style="max-width: 40rem; height: auto;">
                    <div class="card-header">Consultation with ${snapshot.docs[0].data().pharmacyName} </div>
                    <div class="card-body">
                    <h6 class="card-title"><span class="text-muted">Patient ID: ${snapshot.docs[0].data().pharmacyId}</span></h6>
                      <p class="card-text text-change text-left justify-content">
                            <span class="font-weight-normal">Mobile Number:${snapshot.docs[0].data().mobno} </span><br/>
                            <span class="font-weight-normal">Email ID : ${snapshot.docs[0].data().email} </span><br/>
                            <span class="font-weight-normal">Address: ${snapshot.docs[0].data().licenceNo} </span>
                            <div class="text-right"><span class="btn btn-info btn-md" onclick="transfered()">Chat Now</span><br/></div>
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

function transfered(){
    document.querySelector('.con-reg').classList.remove('d-none');
    document.querySelector('#render-pharmacy').classList.add('d-none');
    setTimeout(()=>{
        document.querySelector('.con-reg').classList.add('d-none');
        document.querySelector('#all-prescription').classList.remove('d-none');
    },2000)
    
}