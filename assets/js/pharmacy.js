function allPrescriptions(){
    document.getElementById('all-prescription').classList.remove('d-none');
}

auth.onAuthStateChanged(user=>{
    if(user) console.log(user);
    else console.log("err")
})