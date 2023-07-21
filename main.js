// **** Select elements from the DOM ****


// Select the notes container 

const notesContainer = 
document.querySelector('.sticky_container');

const pinnedContainer = 
document.querySelector('.sticky_wrapper');

const toggleShowPinned = 
document.querySelector('.toggleShowPinned');


const openPinnedSticky = document.querySelector('.openPinnedSticky');

// select the button to create new sticky note's card
const createSticky =
document.querySelector('.createSticky');
   


const inputColor = 
document.querySelector('.inputColor');




// ****create the DB with Localstorage****
const notes = JSON.parse(localStorage.getItem('sticky_notes') || '[]');



let allCards ;






  // Generate an random ID for each note
  function generateID()
  {
   
   let id = ''
   
   let chars = '0123456789'
   
   
   for (let i = 0; i < 7; i++) {
    
    const randomIndex = Math.floor(Math.random() * chars.length);
    
     id += chars[randomIndex];
    
   }
 
   return id
   
  }



 function createNewCard() {
   
  const id = generateID();
  const date = new Date().toLocaleString();

  const newCard = {
    id: id,
    note: '',
    bgColor: '',
    textColor: '',
    fontFamily : '', 
    height: '',
    date: date,
    pinned: false
  };

  notes.push(newCard);
  
  localStorage.setItem('sticky_notes', JSON.stringify(notes));

  }



createSticky.addEventListener('click',function(e) {

   createNewCard()
   displayNotes();

});


 let x, y;
 let height ;

createSticky.addEventListener('touchstart', function(event) {
  const { clientX, clientY } = event.touches[0];
  x = clientX;
  y = clientY;
});


createSticky.addEventListener('touchmove', function(event) {
  event.preventDefault();
  const { clientX, clientY } = event.touches[0];
  const deltaX = clientX - x;
  const deltaY = clientY - y;
  const newX = createSticky.offsetLeft + deltaX;
  const newY = createSticky.offsetTop + deltaY;
  createSticky.style.left = newX + 'px';
  createSticky.style.top = newY + 'px';
  x = clientX;
  y = clientY;
});


function displayNotes() {
  let card = '';
  
  // Check if the notes array is defined
  if (!notes) {
    notes = []; // Initialize an empty array if it's undefined or null
  }

  notes.forEach((note) => {
    const newCard = `
      <div class='sticky_note' style='background-color:${note.bgColor};height :${note.height}px' id='${note.id}' data-id='${note.id}'>
      
        <textarea data-id='${note.id}' oninput='addingNotes(${note.id},this)' style='color:${note.textColor};font-family:${note.fontFamily}'>
        
          ${note.note !== '' ? note.note : 'Empty sticky note'}
          
        </textarea>
        <div class='action_btns'>
        <button class='resizeBtn' ontouchmove='resizeCard(${note.id},this, event)'>
            <svg xmlns="http://www.w3.org/2000/svg" meta-id='${note.id}' height="15" viewBox="0 -960 960 960" width="15"><path d="M480-120 320-280l44-44 86 86v-484l-86 86-44-44 160-160 160 160-44 44-86-86v484l86-86 44 44-160 160Z"/></svg>
          </button>
          
          <button onclick='pinToTop(${note.id})'>
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="m634-448 86 77v60H510v241l-30 30-30-30v-241H240v-60l80-77v-332h-50v-60h414v60h-50v332Zm-313 77h312l-59-55v-354H380v354l-59 55Zm156 0Z"/></svg>
          </button>
          
          <button onclick='setCardColor(${note.id},this)'>
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="m255-917 43-43 347.686 347.686Q669-589 669-555.374q0 33.627-23 56.374L468-321q-23 23-54 23t-54-23L182-499q-23-22.774-23-56.439 0-33.666 23-56.44L371-801 255-917Zm159 159L215-559h398L414-758Zm337.788 477Q722-281 701-302.15 680-323.3 680-353q0-17.348 8-37.174T710-431q8-13 19.5-28t22.5-28q11 13 22.5 28t19.5 28q14 21 22 40.826T824-353q0 29.7-21.212 50.85-21.213 21.15-51 21.15ZM80 1v-121h800V1H80Z"/></svg> 
          </button>
          
          <button onclick='setTextColor(${note.id},this)'>
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M90 0v-140h780V0H90Zm130-280 220-560h80l220 560h-75l-57-150H352l-57 150h-75Zm156-214h208L482-765h-4L376-494Z"/></svg> 
          </button>
          
           <button onclick='setTextFormat(${note.id},this)'>
          <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M430-160v-540H200v-100h560v100H530v540H430Z"/></svg>
           </button>
          
          
          <button meta-id='${note.id}' onclick='deleteNoteBtn(${note.id})'>
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
          </button>
        
        </div>
        <span class='date'>
          ${note.date}
        </span>
      </div>
    `;
    card += newCard;
  });

  notesContainer.innerHTML = card;
  allCards = document.querySelectorAll('.sticky_note');

}

displayNotes();



  

// Resize card eff3ct 

 function resizeCard(CardId, btn, event)
  {
   
   event.preventDefault();
   
   const card = 
   btn.parentElement.parentElement;
   
   const id = CardId ;
   
  height = event.touches[0].clientY.toFixed();
   
  card.style.height = height + 'px'
  
  const FindById = notes.find((n) => n.id == id);
  
   FindById.height = height 
   
   localStorage.setItem('sticky_notes', JSON.stringify(notes));
  // console.log(height)
  }







 // Add Effect to cards 

  function handleIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('data-id');
      const targetCard = document.getElementById(id);
      if (targetCard) {
        targetCard.classList.add('active');
      }
    } else {
      const id = entry.target.getAttribute('data-id');
      const targetCard = document.getElementById(id);
      if (targetCard) {
        targetCard.classList.remove('active');
      }
    }
  });
}

// Create a new IntersectionObserver
const observer = new IntersectionObserver(handleIntersect, {
  rootMargin: '-10% 0px',
  threshold: 0,
});

// Observe all the cards
allCards.forEach((card) => {
  observer.observe(card);
});


 function addingNotes(id, event){
  
    const ID = id
   //  console.log(event.value)
     const findById = notes.find((n) => n.id == ID);
    
    
    if (findById) {
     
      findById.note = event.value.trim()
     
    localStorage.setItem('sticky_notes',JSON.stringify(notes));
    

    }
    
    
   // console.log(ID)
    
 }
 

 function toggleShowSticky()
 {
  
  const stickyContainer  = document.querySelector('.pinned_container');
  
  stickyContainer.classList.toggle('active');
  
   window.scrollTo({
     top : 0, 
     behavior : "smooth"
   });
  
 }
 
 
 
  function pinToTop(noteId)
  {
   
   const ID = noteId 
    
    const FindById = notes.find((n) => n.id == ID);
    
    FindById.pinned = !FindById.pinned
    
    localStorage.setItem('sticky_notes',JSON.stringify(notes));
    
    displayPinnedToTop()
  }
 
 
 
 function displayPinnedToTop()
 {
  
  let html = ''
  
  const  note = 
  notes.filter((n) => n.pinned == true);
//  console.log(note)

   if (note.length) {
   toggleShowPinned.addEventListener('click',toggleShowSticky)

    }

document.querySelector('.amountOfSticky').innerHTML = `You have ${note.length} Pinned Sticky`


   for (let notes in note) {
    
    let newCard = `
   <div class="pinned_sticky" style='background-color:${note[notes].bgColor}' onclick='scrollToCard(${note[notes].id}, this)'>
     <div class='stickyNote' style='color:${note[notes].textColor}'>
       ${note[notes].note}
     </div>
     
     <div class="action_btns">
      
      <button onclick='openPinned(${note[notes].id})'>
      <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z"/></svg> 
      
      </button>
      
      <button onclick='pinToTop(${note[notes].id})'>
       <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="m634-448 86 77v60H510v241l-30 30-30-30v-241H240v-60l80-77v-332h-50v-60h414v60h-50v332Zm-313 77h312l-59-55v-354H380v354l-59 55Zm156 0Z"/></svg>
      </button>
      
   
       <button onclick='deleteNoteBtn(${note[notes].id})'>
        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
       </button>
     </div>
     
   </div>
    `
    html += newCard 
   }
  
 pinnedContainer.innerHTML = html
   
  
 }
 
 displayPinnedToTop()
 
 
 function scrollToCard(id, btn)
 {
   
   const stickyCard = btn
   
  // console.log(card)
   stickyCard.style.pointerEvents = 'none' ;
  
  const stickyId = id 
  
    const a = 
    document.createElement('a');
  
      a.href = `#${id}`
      a.click()
        
        
      allCards.forEach((card) => {
       const cardId = card.dataset.id 
      
        if (cardId.includes(stickyId)){
           card.classList.add('view');
           setTimeout(() => {
             card.classList.remove('view')
        stickyCard.style.pointerEvents  = 'auto';

           },4000);
        }
         
      }); 
      
        
 };
 
 
 
 
 
 function openPinned(noteId)
 {

  const FindById = notes.find((n) => n.id == noteId);
  
  const {note, bgColor, textColor } = FindById 
  
  
  openPinnedSticky.classList.add('active');
  
  const noteSticky = openPinnedSticky.querySelector('.note');
  
  noteSticky.innerHTML = note 
  noteSticky.style.color = textColor
  openPinnedSticky.style.backgroundColor = bgColor 
 }
 

function closeOpenPinnedSticky(){
 
  openPinnedSticky.classList.remove('active');

 
}
 
 
 const palletteCardsColor = [
  { bgColor: '#F94144', textColor: '#F94144' },
  { bgColor: '#F3722C', textColor: '#F3722C' },
  { bgColor: '#F8961E', textColor: '#F8961E' },
  { bgColor: '#F9844A', textColor: '#F9844A' },
  { bgColor: '#F9C74F', textColor: '#F9C74F' },
  { bgColor: '#90BE6D', textColor: '#90BE6D' }, 
  { bgColor: '#43AA8B', textColor: '#43AA8B' }, 
  { bgColor: '#4D908E', textColor: '#4D908E' }, 
  { bgColor: '#90BE6D', textColor: '#90BE6D' }, 
  { bgColor: '#577590', textColor: '#577590' }, 
  { bgColor: '#277DA1', textColor: '#277DA1' }, 
  { bgColor : '#1B263B',textColor : '#FFFFFF'}
];


  let i = 0
 
 function setCardColor(id,btn){
  
  i < palletteCardsColor.length - 1? i++ : i = 0
  
    const card = btn.parentElement.parentElement
    
    
    const { bgColor } = palletteCardsColor[i]
    
    
      card.style.backgroundColor = bgColor;
      
     
     const FindById = notes.find((n) => n.id == id);
    
     FindById.bgColor = bgColor;
     
    
    localStorage.setItem('sticky_notes',JSON.stringify(notes));
     
    
 }
 
 
 function setTextColor(id, btn)
 {
  
  i < palletteCardsColor.length - 1? i++ : (i = 0)
  
    const card = btn.parentElement.parentElement
    
    const text = card.querySelector('textarea');
    
    
    const  { textColor }  = palletteCardsColor[i]
    
      text.style.color = textColor
     
     const FindById = notes.find((n) => n.id == id);
    
     
     FindById.textColor = textColor
    
    localStorage.setItem('sticky_notes',JSON.stringify(notes));
     
    
  
 }
 
 
 const fontFams = [
  'VarelaRound', 
  'DancingScript',
  'Zeyada',
  'KanitLight',
  'KanitBold',
  'KanitBlack'
];

let f = 0;

function setTextFormat(id, btn) {
  f < fontFams.length - 1 ? f++ : (f = 0);

  const card = btn.parentElement.parentElement;
  const text = card.querySelector('textarea');
  text.style.fontFamily = fontFams[f];

  const FindById = notes.find((n) => n.id == id);
  FindById.fontFamily = fontFams[f];

  localStorage.setItem('sticky_notes', JSON.stringify(notes));
}

 
function deleteNoteBtn(id) {
 
  const ID = id
  
  // console.log(id);
  
   if (confirm('Delete Sticky note?')) {
    
    const FindById = notes.filter((n) => n.id != ID)
   
   
   localStorage.setItem('sticky_notes',JSON.stringify(FindById));
     
   //console.log(FindById);

       displayNotes()
    
   }

}



