//module imports
import {errorMessage,capitalize,registerSuccess} from './common.js';

//get elemets here
const errorElement = document.getElementById('error-message');
const successElement = document.getElementById('success-message');
const form = document.getElementById('form');

//API URLS here
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/signup' : 'https://barangay-covid-map.herokuapp.com/admin/signup';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);//store form credentials
  const fname = formData.get('first_name');
  const mname = formData.get('middle_name');
  const lname = formData.get('last_name');
  const mob_no = formData.get('mob_no');
  const user_name = formData.get('user_name');
  const password = formData.get('password');

  if (fname.trim() && lname.trim()//execute if form fields are all filled
    &&password.trim()&&user_name.trim()
    &&mob_no.trim()&&mname.trim()) {

    const first_name = capitalize(fname);
    const middle_name = capitalize(mname);
    const last_name = capitalize(lname);
  
    const user = {//put admin credentials into object
      first_name,
      middle_name,
      last_name,
      mob_no,
      password,
      user_name
    };

    fetch(API_URL, {//send object to the server
      method: 'POST',
      body: JSON.stringify(user),//make object in json format
      headers: {
        'content-type': 'application/json',
      }
    }).then(response => {
      response.text().then(result=>{//get text response from server
        if(result==='true'){//display success message
          registerSuccess(form,errorElement,successElement,'Regisrered Successfully');
        }
        else{
          errorMessage(errorElement,'Username already taken!');
        }
      });
    });
  } else {
    errorMessage(errorElement,'Fill the missing fields');
  }
});