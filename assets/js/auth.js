//Patient signup
const psite = document.getElementById('patientSignUp');
psite.addEventListener('submit', (e) => {
    //preventing default refresh
    e.preventDefault();

    //get patient info
    const patientname = psite['patientname'].value;
    const email = psite['email'].value;
    const password = psite['password'].value;
    const mobno = psite['mobno'].value;
    let patientNo;

    //signup the user using firebase
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            //  console.log(cred.user.uid);
            document.querySelector('.Register').classList.add('d-none');
            document.querySelector('.con-reg').classList.remove('d-none');
            setTimeout((time) => {
                psite.reset();
                auth.signOut().then(async () => {
                    document.querySelector('.login').classList.remove('d-none');
                    document.querySelector('.intro').classList.add('d-none');
                    document.querySelector('.Register').classList.add('d-none');
                    document.querySelector('.con-reg').classList.add('d-none');
                    document.querySelector('.register-nav').style.borderBottom = '0px solid #00BFA6';
                    document.querySelector('.home-nav').style.borderBottom = '0px solid #00BFA6';
                    document.querySelector('.login-nav').style.borderBottom = '2px solid #00BFA6';
                    document.querySelector('.choice').classList.remove('d-none');
                    document.querySelector('.patient').classList.add('d-none');
                    document.querySelector('.pharmacy').classList.add('d-none');
                    document.querySelector('.doctor').classList.add('d-none');
                    await db.collection("count")
                        .get()
                        .then(snapshots => {
                            patientNo = Number(snapshots.docs[0].data().patient) + 1;
                        });
                    db.collection('PatientProfile').add({
                        uid: cred.user.uid,
                        patientId: String(patientNo),
                        patientName: patientname,
                        email: email,
                        mobno: mobno,
                        isDoctor: false,
                        isPharmacy: false,
                        isPatient: true
                    });
                    db.collection("count")
                        .doc("3u8oWZjNoUwr3PQT39II")
                        .update({ patient: patientNo });
                })
            }, 2000);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.querySelector('.error').innerHTML = `OPPS! ${errorMessage}`;

        });

});

//Pharmacy Signup

const phsite = document.getElementById('pharmaSignUp');
phsite.addEventListener('submit', (e) => {
    //preventing default refresh
    e.preventDefault();

    //get patient info
    const patientname = phsite['ph-patientname'].value;
    const email = phsite['ph-email'].value;
    const password = phsite['ph-password'].value;
    const mobno = phsite['ph-mobno'].value;
    const license = phsite['ph-licno'].value;
    let pharNo;


    //signup the user using firebase
    auth.createUserWithEmailAndPassword(email, password)
        .then(async cred => {
            //  console.log(cred.user.uid);
            document.querySelector('.Register').classList.add('d-none');
            document.querySelector('.con-reg').classList.remove('d-none');
            setTimeout(async (time) => {
                phsite.reset();
                auth.signOut().then(async () => {
                    document.querySelector('.login').classList.remove('d-none');
                    document.querySelector('.intro').classList.add('d-none');
                    document.querySelector('.Register').classList.add('d-none');
                    document.querySelector('.con-reg').classList.add('d-none');
                    document.querySelector('.register-nav').style.borderBottom = '0px solid #00BFA6';
                    document.querySelector('.home-nav').style.borderBottom = '0px solid #00BFA6';
                    document.querySelector('.login-nav').style.borderBottom = '2px solid #00BFA6';
                    document.querySelector('.choice').classList.remove('d-none');
                    document.querySelector('.patient').classList.add('d-none');
                    document.querySelector('.pharmacy').classList.add('d-none');
                    document.querySelector('.doctor').classList.add('d-none');
                    await db.collection("count")
                        .get()
                        .then(snapshots => {
                            pharNo = Number(snapshots.docs[0].data().Pharmacy) + 1;
                        });
                    db.collection('PharmacyProfile').add({
                        uid: cred.user.uid,
                        pharmacyId:String(pharNo),
                        pharmacyName: patientname,
                        email: email,
                        mobno: mobno,
                        licenceNo: license,
                        isDoctor: false,
                        isPharmacy: true,
                        isPatient: false
                    });
                    db.collection("count")
                        .doc("3u8oWZjNoUwr3PQT39II")
                        .update({ Pharmacy: pharNo });
                })
            }, 2000);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.querySelector('.error').innerHTML = `OPPS! ${errorMessage}`;

        });

});

//doctor Signup

const dsite = document.getElementById('docSiteSignUp');
dsite.addEventListener('submit', (e) => {
    //preventing default refresh
    e.preventDefault();

    //get patient info
    const patientname = dsite['d-patientname'].value;
    const email = dsite['d-email'].value;
    const password = dsite['d-password'].value;
    const mobno = dsite['d-mobno'].value;
    const license = dsite['d-drno'].value;
    let pharNo;

    //signup the user using firebase
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            //  console.log(cred.user.uid);
            document.querySelector('.Register').classList.add('d-none');
            document.querySelector('.con-reg').classList.remove('d-none');
            setTimeout((time) => {
                dsite.reset();
                auth.signOut().then(async () => {
                    document.querySelector('.login').classList.remove('d-none');
                    document.querySelector('.intro').classList.add('d-none');
                    document.querySelector('.Register').classList.add('d-none');
                    document.querySelector('.con-reg').classList.add('d-none');
                    document.querySelector('.register-nav').style.borderBottom = '0px solid #00BFA6';
                    document.querySelector('.home-nav').style.borderBottom = '0px solid #00BFA6';
                    document.querySelector('.login-nav').style.borderBottom = '2px solid #00BFA6';
                    document.querySelector('.choice').classList.remove('d-none');
                    document.querySelector('.patient').classList.add('d-none');
                    document.querySelector('.pharmacy').classList.add('d-none');
                    document.querySelector('.doctor').classList.add('d-none');
                    await db.collection("count")
                        .get()
                        .then(snapshots => {
                            docNo = Number(snapshots.docs[0].data().doctor) + 1;
                        });
                    db.collection('DoctorProfile').add({
                        uid: cred.user.uid,
                        doctorId:String(docNo),
                        doctorName: patientname,
                        email: email,
                        mobno: mobno,
                        licenceNo: license,
                        isDoctor: true,
                        isPharmacy: false,
                        isPatient: false
                    });
                    db.collection("count")
                        .doc("3u8oWZjNoUwr3PQT39II")
                        .update({ doctor: docNo });
                })
            }, 2000);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.querySelector('.error').innerHTML = `OPPS! ${errorMessage}`;

        });

});

//login users
const Login = document.querySelector('#login-form');
Login.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const lg_email = Login['login_email'].value;
    const lg_pass = Login['login_password'].value;
    const lg_sid = Login['sid'].value;

    auth.signInWithEmailAndPassword(lg_email, lg_pass)
        .then((cred) => {
            document.querySelector('.login').classList.add('d-none');
            document.querySelector('.con-log').classList.remove('d-none');
            document.querySelector('.lgerror').innerHTML = '';
            Login.reset();
            setTimeout((time) => {
                auth.onAuthStateChanged(function (user) {
                    if (lg_sid === "pat") {
                        db.collection('PatientProfile').where('uid', '==', user.uid).get().then((snapshot) => {
                            var isDoctor = snapshot.docs[0].data().isDoctor;
                            var isPatient = snapshot.docs[0].data().isPatient;
                            var isPharmacy = snapshot.docs[0].data().isPharmacy;
                            console.log(isDoctor + "" + isPatient + "" + isPharmacy);

                            if (isPatient) {
                                window.location.assign('patient.html');
                            }
                            else {
                                document.querySelector('.lgerror').innerHTML = `OPPS! Please Select a Valid Identity`;
                            }
                        })
                    }
                    else if (lg_sid === "phar") {
                        db.collection('PharmacyProfile').where('uid', '==', user.uid).get().then((snapshot) => {
                            var isDoctor = snapshot.docs[0].data().isDoctor;
                            var isPatient = snapshot.docs[0].data().isPatient;
                            var isPharmacy = snapshot.docs[0].data().isPharmacy;
                            console.log(isDoctor + "" + isPatient + "" + isPharmacy);

                            if (isPharmacy) {
                                window.location.assign('pharmacy.html');
                            }
                            else {
                                document.querySelector('.lgerror').innerHTML = `OPPS! Please Select a Valid Identity`;
                            }
                        })
                    }
                    else if (lg_sid === "doc") {
                        db.collection('DoctorProfile').where('uid', '==', user.uid).get().then((snapshot) => {
                            var isDoctor = snapshot.docs[0].data().isDoctor;
                            var isPatient = snapshot.docs[0].data().isPatient;
                            var isPharmacy = snapshot.docs[0].data().isPharmacy;
                            console.log(isDoctor + "" + isPatient + "" + isPharmacy);

                            if (isDoctor) {
                                window.location.assign('doctor.html');
                            }
                            else {
                                document.querySelector('.lgerror').innerHTML = `OPPS! Please Select a Valid Identity`;
                            }
                        })
                    }
                    else {
                        document.querySelector('.lgerror').innerHTML = `OPPS! Please Select a Valid Identity`;
                    }
                })
            }, 2000);
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            document.querySelector('.lgerror').innerHTML = `OPPS! ${errorMessage}`;
        });
});
