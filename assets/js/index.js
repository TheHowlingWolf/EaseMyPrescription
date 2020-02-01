const { remote } = require("electron");
var win = remote.BrowserWindow.getFocusedWindow();

function login() {
    document.querySelector('.login').classList.remove('d-none');
    document.querySelector('.intro').classList.add('d-none');
    document.querySelector('.Register').classList.add('d-none');
    document.querySelector('.register-nav').style.borderBottom = '0px solid #00BFA6';
    document.querySelector('.home-nav').style.borderBottom = '0px solid #00BFA6';
    document.querySelector('.login-nav').style.borderBottom = '2px solid #00BFA6';
    document.querySelector('.lgerror').innerHTML = '';
    document.querySelector('.choice').classList.remove('d-none');
    document.querySelector('.patient').classList.add('d-none');
    document.querySelector('.pharmacy').classList.add('d-none');
    document.querySelector('.doctor').classList.add('d-none');
}
function signup() {
    document.querySelector('.intro').classList.add('d-none');
    document.querySelector('.login').classList.add('d-none');
    document.querySelector('.Register').classList.remove('d-none');
    document.querySelector('.register-nav').style.borderBottom = '2px solid #00BFA6';
    document.querySelector('.login-nav').style.borderBottom = '0px solid #00BFA6';
    document.querySelector('.home-nav').style.borderBottom = '0px solid #00BFA6';
    document.querySelector('.error').innerHTML = '';
}
function home() {
    document.querySelector('.login').classList.add('d-none');
    document.querySelector('.intro').classList.remove('d-none');
    document.querySelector('.Register').classList.add('d-none');
    document.querySelector('.register-nav').style.borderBottom = '0px solid #00BFA6';
    document.querySelector('.login-nav').style.borderBottom = '0px solid #00BFA6';
    document.querySelector('.home-nav').style.borderBottom = '2px solid #00BFA6';
    document.querySelector('.choice').classList.remove('d-none');
    document.querySelector('.patient').classList.add('d-none');
    document.querySelector('.pharmacy').classList.add('d-none');
    document.querySelector('.doctor').classList.add('d-none');
}

function genSlip() {
    document.querySelector('.components').classList.add('d-none');
    document.querySelector('.slip').classList.remove('d-none');
}

function userback() {
    document.querySelector('.components').classList.remove('d-none');
    document.querySelector('.slip').classList.add('d-none');
}

function patient(){
    document.querySelector('.choice').classList.add('d-none');
    document.querySelector('.patient').classList.remove('d-none');
    document.querySelector('.pharmacy').classList.add('d-none');
    document.querySelector('.doctor').classList.add('d-none');
}

function pharmacy(){
    document.querySelector('.choice').classList.add('d-none');
    document.querySelector('.patient').classList.add('d-none');
    document.querySelector('.pharmacy').classList.remove('d-none');
    document.querySelector('.doctor').classList.add('d-none');
}

function doctor(){
    document.querySelector('.choice').classList.add('d-none');
    document.querySelector('.patient').classList.add('d-none');
    document.querySelector('.pharmacy').classList.add('d-none');
    document.querySelector('.doctor').classList.remove('d-none');
}

function choiceBack(){
    document.querySelector('.choice').classList.remove('d-none');
    document.querySelector('.patient').classList.add('d-none');
    document.querySelector('.pharmacy').classList.add('d-none');
    document.querySelector('.doctor').classList.add('d-none');
}

auth.onAuthStateChanged((user) => {
    db.collection('UserProfile').where('uid', '==', user.uid).get().then((snapshot) => {
        document.querySelector('#site-name').innerHTML = snapshot.docs[0].data().siteName;
    })


})

function winclose() {
    win.close();
  }
  function winmin() {
    win.minimize();
  }
  