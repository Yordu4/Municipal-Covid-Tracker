const errorMessage=(errorElement,message)=>{
    errorElement.textContent=message;
    errorElement.style.display='block';
}

const registerSuccess=(form,errorElement,successElement,message)=>{
  form.style.display='none';
  successElement.textContent=message;
  successElement.style.display='block';
  errorElement.style.display='none';
}

const getAnnouncements=()=>{
    const announcementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/announcement' : 'https://barangay-covid-map.herokuapp.com/announcement';
    fetch(announcementAPI_URL,{
    }).then(response=>{
      response.json().then(result=>{
        result.reverse();
        result.forEach(announcement => {
          const div = document.createElement('div');
          const title = document.createElement('h3');
          const body = document.createElement('p');
          const date = document.createElement('small');
  
          body.textContent = announcement.body;
          title.className = 'announcement--element';
          body.className = 'announcement--element';
          date.className = 'announcement--element';
          title.textContent = announcement.title;
          date.textContent = new Date(announcement.date);
  
          div.appendChild(title);
          div.appendChild(body);
          div.appendChild(date);
  
          announcementSection.appendChild(div);
        });
      });
    });
  }

const capitalize=(str)=>{
  return str.replace(/^./, str[0].toUpperCase());
}

export {errorMessage,getAnnouncements,capitalize,registerSuccess};