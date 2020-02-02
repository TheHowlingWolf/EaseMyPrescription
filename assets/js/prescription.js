var jobDet;
var jobView = document.getElementById('jobs');
if (jobView) {
    auth.onAuthStateChanged(async function (user) {
        
        await db.collection('prescriptions').where('patient','==',user.uid)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data());
                var subs;
                if(doc.data().substitutionPermitted === true)
                subs= "Yes";
                else
                subs="No";
                //console.log(new Date(doc.data().date.seconds).toLocaleString());
                jobView.innerHTML += `
                <div class="col-6 align-self-center">
                    <div class="card text-change bg-light mb-3 mx-2 mt-2" style="max-width: 40rem; height: auto;">
                        <div class="card-header">Consultation with Dr.${doc.data().doctorName} </div>
                        <div class="card-body">
                        <h5 class="card-title"><span class="text-muted">Date:${Date(doc.data().date).toString()} </span>
                        <br/>Assigned Pharmacy : ${doc.data().pharmacyName}</h5>
                          <p class="card-text border border-round border-info text-change text-left justify-content">
                                <span class="font-weight-normal"><span class="">Rx</span><br/>
                                <span class="font-weight-bold pl-5">${doc.data().drugName}</span><br/>
                                <span class="font-weight-normal pl-5">${doc.data().smartSigs}</span><br/>
                                <span class="font-weight-bold pl-5">Duration: ${doc.data().duration}&nbsp;&nbsp;&nbsp;&nbsp;Refills: ${doc.data().refills}</span><br/>
                                <span class="font-weight-normal pl-5">Substitute Permission: ${subs}</span></span>
                            </p>
                        </div>
                      </div>
                </div>`
            });
        })
    })     
}


String.prototype.truncate = function (n) {
  if (this.length > n) {
    return this.substr(0, n - 1) + "...";
  }
  return this;
};

