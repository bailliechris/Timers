//Update constant clock display
//Returns a "pretty" version of the current time
function currentTime(){
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  if (hours < 10){
    hours = "0" + hours;
  }

  if (minutes < 10){
    minutes = "0" + minutes;
  }

  if (seconds < 10){
    seconds = "0" + seconds;
  }

  return (hours + ":" + minutes + ":" + seconds)
}

//Function called by  setInterval() updates main clock and fires
//Updates for running stopwatches.
function updateClock(){
  document.getElementById("app").innerHTML = currentTime();

  updateStopWatches();
}

//Updates stopwatches if any exist in the collection object
function updateStopWatches(){
  if (collection.timer.length > 0){
    for (let i=0; i<collection.timer.length; i++){
      if(collection.timer[i].returnDeleteTag() === false){
        id = collection.timer[i].returnID();
        document.getElementById(id+"p").innerHTML = collection.timer[i].update(Date.now(), "html");
      }
      else if (collection.timer[i].returnDeleteTag() === true){
        collection.timer.splice(i, 1);
      }
      
    }

  }
  
}

//Interface function calls
//Starts a watch
function startWatch(id){
  for (let i=0; i<collection.timer.length; i++){
    if (collection.timer[i].returnID() === id){
      console.log(collection.timer[i].returnID());
      collection.timer[i].setStartTime(Date.now())
    }
  }
  
}

//Pauses the stopwatch
function pauseTimer(id){
  for (let i=0; i<collection.timer.length; i++){
    if (collection.timer[i].returnID() === id){
      console.log(collection.timer[i].returnID());
      collection.timer[i].pause(Date.now())
    }
  }
}

//Resumes
function resumeTimer(id){
  for (let i=0; i<collection.timer.length; i++){
    if (collection.timer[i].returnID() === id){
      console.log(collection.timer[i].returnID());
      collection.timer[i].resume(Date.now())
    }
  }
}

//Deletes the stopwatch and buttons from the page
function deleteTimer(id){
  //Trigger a delete tag in class so it can be cleanly deleted after update.
  for (let i=0; i<collection.timer.length; i++){
    if (collection.timer[i].returnID() === id){
      collection.timer[i].deleteMe();
    }
  }

  document.getElementById(id).remove();
}

//Create new timer button, persistent on the page
function addNewTimer(){
  drawNewTimer(collection.index);
  collection.index += 1;
}

//Creates all a new p and fills with the buttons for a timer
//Also creates the p tag for the timer time to go in.
function drawNewTimer(id){
  let newDiv = document.createElement("p");
  newDiv.id = id;

  let startbutton = document.createElement("input");
  startbutton.type="button";
  startbutton.value="Start / Reset";
  startbutton.id= id;
  startbutton.addEventListener("click", function() {startWatch(id)}, false);

  let pausebutton = document.createElement("input");
  pausebutton.type="button";
  pausebutton.value="Pause";
  pausebutton.id= id;
  pausebutton.addEventListener("click", function() {pauseTimer(id)}, false);

  let resumebutton = document.createElement("input");
  resumebutton.type="button";
  resumebutton.value="Resume";
  resumebutton.id= id;
  resumebutton.addEventListener("click", function() {resumeTimer(id)}, false);

  let deletebutton = document.createElement("input");
  deletebutton.type="button";
  deletebutton.value="Delete";
  deletebutton.id= id;
  deletebutton.addEventListener("click", function() {deleteTimer(id)}, false);

  let timeDisplay = document.createElement("p");
  timeDisplay.id=id+"p";
  timeDisplay.innerHTML = id;

  //Add all new items to the previous p tag
  newDiv.appendChild(startbutton);
  newDiv.appendChild(pausebutton);
  newDiv.appendChild(resumebutton);
  newDiv.appendChild(deletebutton);
  newDiv.appendChild(timeDisplay);

  //insert all into the page
  let currentDiv = document.getElementById("original");
  document.body.insertBefore(newDiv, currentDiv);

  //Create Timer Object
  collection.timer.push(new stopWatch(id));
}

//Create Variables and set launch function

//Index simply used to give all new stopwatches a unique ID
//So they can be easily deleted.
let collection = {
  timer :new Array(), 
  index :0
};

setInterval(updateClock, 1000);

//Nice time conversion!
/* function timeConversion(millisec) {

        var seconds = (millisec / 1000).toFixed(1);

        var minutes = (millisec / (1000 * 60)).toFixed(1);

        var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

        var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

        if (seconds < 60) {
            return seconds + " Sec";
        } else if (minutes < 60) {
            return minutes + " Min";
        } else if (hours < 24) {
            return hours + " Hrs";
        } else {
            return days + " Days"
        }
    }*/