// this array will keep track of the days the user has clicked
let daysOpened = JSON.parse(localStorage.getItem('clickedDays'));

let icons = [
    '&#x1F6F7;',
    '&#x1F328;',
    '&#x1F43B;',
    '&#x1F332;',
    '&#x1F381;',
    '&#x1F936;',
    '&#x1F9E4;',
    '&#x1F9E3;',
    '&#x1F976;',
    '&#x1F31F;',
    '&#x26F8;',
    '&#x1F36A;',
    '&#x1F98C;',
    '&#x1F3C2;',
    '&#x26F7;',
    '&#x1F3BF;',
    '&#x1F3D2;',
    '&#x1F514;',
    '&#x1F6CF;',
    '&#x1F385;',
    '&#x1F3BF;',
    '&#x1F56F;',
    '&#x26c4;'
  ];


// variable to hold ALL the boxes for the days on the calander
const boxes = document.querySelectorAll('.num');
// reassign the icons to the Random list
icons = randomizeIcons(icons);
// will run when box is clicked on by user
function handleBoxClick(event) {
  const clickedBox = event.currentTarget.dataset.day;
  const today = new Date();
  // compare todays date with the box the user clicked on
  if(today.getDate() >= Number(clickedBox)){
    // show the emoji for the day

    //console.log(icons[Number(clickedBox)]);

    const day = event.currentTarget;
    day.innerHTML = icons[Number(clickedBox)-1];
    storeDaysClicked(Number(clickedBox));

  } else {
    console.log('You cannot open');
  }
}

// add event listner to every box
boxes.forEach(function(box){
  box.addEventListener('click', handleBoxClick);
});

function storeDaysClicked(day) {
  if(!localStorage.getItem('clickedDays')) {
    daysOpened = [];
  } else {
    daysOpened = JSON.parse(localStorage.getItem('clickedDays'));
  }
  if(!daysOpened.includes(day)) {
      daysOpened.push(day);
  }
  localStorage.setItem('clickedDays', JSON.stringify(daysOpened))
}

function randomizeIcons(oldList) {
  let randomList = [];
  if(!localStorage.getItem('icons')) {
    //randomize icons and place in local localStorage
    while(oldList.length > 0) {
      const index = Math.floor(Math.random() * oldList.length);
      // put random item from old list into new list
      randomList.push(oldList[index]);
      // remove item from old listner
      oldList.splice(index, 1); // start at index and remove one item
    }
    // put random list into local storage
    localStorage.setItem('icons', JSON.stringify(randomList));
  } else { // there is a list of ranomized icons
    randomList = JSON.parse(localStorage.getItem('icons'));
    // show the clicked boxes on the page
  }
  return randomList;
}

showClickedBoxes();

// shows previously clicked boxes
function showClickedBoxes(){
  if(daysOpened !== null){ //if there is something in there
    boxes.forEach(function (box){
      const day = Number(box.dataset.day);
      if(daysOpened.includes(day)){
        box.innerHTML = icons[day];
      }
    });
  }
}

// this function will reset the Calendar
function resetCalendar(){
  // only reset if they say yes to a prompt
  const answer = confirm('Are you sure you want to reset the calendar? This action cannot be undone.');
  if(answer){
    //clear all items in localStorage
    localStorage.clear();
    //reload the page
    document.location.reload();
  }
}

// add reset Button to the bottom of the Calendar
// create the button element
const resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset Calendar';
//add an event listener to call resetCalender
resetButton.addEventListener('click', resetCalendar);
// grab the footer
const footer = document.querySelector('footer');
// add the button to the footer after the opening footer tag
footer.insertAdjacentElement('afterbegin',resetButton);
// afterbegin, beforebegin, beforeend, afterend
footer.style.textAlign = 'center';
footer.style.paddingTop = '20px';
