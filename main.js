'use script';
 const addKastBtn = document.getElementById('add-kast-btn');
 const deskKastInput = document.getElementById('description-kast');
 const mytoWrapper = document.querySelector('.myto-wrapper');
 
let kasts;
!localStorage.kasts ? kasts = [] : kasts = JSON.parse(localStorage.getItem('kasts'));

let mytoItemElems = [];

 function Kast(description) {
     this.description = description;
     this.completed = false;
 }

const createTemplate = (kast, index) => {
  return `
      <div class="myto-item">
          <div class="description ${kast.completed ? 'checked' : ''}">${kast.description} 
          <div class="buttons">
              <input onclick="completeKast(${index})" class="btn-complete" type="checkbox" ${kast.completed ? 'checked' : ''}>
              <button onclick="deleteKast(${index})" class="btn-delete">Очистить</button>
          </div>
        </div>
    </div>

  `
}
 
const filterKasts = () => {
  const activeKasts = kasts.length && kasts.filter(item => item.completed == false);
  const completedKasts = kasts.length && kasts.filter(item => item.completed == true);
  kasts = [...activeKasts,...completedKasts];
}

const fillHtmlList = () => {
  mytoWrapper.innerHTML = "";
  if(kasts.length > 0) {
    filterKasts();
    kasts.forEach((item, index) => {
      mytoWrapper.innerHTML += createTemplate(item, index);
    });
    mytoItemElems = document.querySelectorAll('.myto-item');
    
  }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('kasts', JSON.stringify(kasts));
}

const completeKast = index => {
  console.log(index);
  kasts[index].completed = !kasts[index].completed;
  if(kasts[index].completed) {
     mytoItemElems[index].classList.add('checked');
    
  }else {
    mytoItemElems[index].classList.remove('checked');
  }


  updateLocal();
  fillHtmlList();
}

///event listener 
addKastBtn.addEventListener('click', () => {
     kasts.push(new Kast(deskKastInput.value));
     updateLocal();   
     fillHtmlList();
     deskKastInput.value = '';
})

const deleteKast = index => {
 setTimeout(() => {
      kasts.splice(index, 1);
      updateLocal();
      fillHtmlList();
    },800)
}


 //const kast = {
   //  description : 'прогуляться на воздухе',
     //completed : false
//} 