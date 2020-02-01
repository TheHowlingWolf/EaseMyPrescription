
function addPrescription(){
 document.getElementById('doctorDashboard').classList.add('d-none');
 document.getElementById('addPrescription').classList.remove('d-none');
}

let NewPrescription = document.getElementById('newPrescription');

NewPrescription.addEventListener('submit',e=>{
    e.preventDefault();

    let Prescription = {
        pharmacy : NewPrescription['pharmacy'].value,
        drugName:  NewPrescription['drug'].value,
        refills:  NewPrescription['refills'].value,
        duration:  NewPrescription['duration'].value,
        smartSigs: NewPrescription['smartSigs'].value,
        substitutionPermitted: NewPrescription['substitutionPermitted'].checked
    }
    console.log(Prescription);
    db.collection('prescriptions').add(Prescription);

})


