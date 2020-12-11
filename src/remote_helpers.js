/* remote_helpers.js
 *
 * Author: Emma Bethel, 12/3/20
 * 
 * Controls remote side of game
 */

var attempts = 0;

var displayScreen;
var darkColors, lightColors;

window.addEventListener('DOMContentLoaded', pageSetup);

/* resets airtable values and input elements on page, tells robot to reset 
 *  motor positions 
 */
function resetGame() {
   resetPage();
   resetTable();

   cloud_update('reset', true);
}

// turns arms on and off (called whenever checkboxes are used)
function toggleArm(checked, arm) {
   cloud_update(arm + '_speed', checked ? 100 : 0);
   updateArmsDisplay();
}

// resets airtable values to defaults for start of game
function resetTable() {
   cloud_update('hits', 0);
   cloud_update('shooter_angle', 0);
   cloud_update('shots', 0);
   cloud_update('left_speed', 100);
   cloud_update('right_speed', 100);
   cloud_update('command', 'none');
   cloud_update('reset', false);
}

// resets checkboxes and slider to default positions
function resetPage() {
   let armToggles = document.getElementsByClassName('arm-toggle');
   for(a of armToggles)
      a.checked = true;

   updateAttempts(0);
   resetDisplay();
   document.getElementById('angle-slider').value = 0;
   
   checkForHit(0);
}

// updates angle in airtables and text on page displaying angle
function updateAngle(val) {
   cloud_update('shooter_angle', val);
   document.getElementById("display-angle").innerText = "Angle: " + val;
}

// updates text on page saying which arms are in use
function updateArmsDisplay() {
   let label = document.getElementById("display-arms");
   let left = document.getElementById("left-arm-toggle");
   let right = document.getElementById("right-arm-toggle");

   if(left.checked && right.checked)
      label.innerText = "Using Both Arms";
   else if(left.checked)
      label.innerText = "Using Left Arm";
   else if(right.checked)
      label.innerText = "Using Right Arm";
   else
      label.innerText = "No Arms In Use";
}

/* edits colors of HTML objects to switch between light/dark modes
 * PARAMETERS: mode- "light" or "dark" (representing mode to be switched to)
 */
function colorSwitchTo(mode) {
   let colors, nextMode;
   if(mode == "light") {
      colors = lightColors;
      nextMode = "dark";
   } else {
      colors = darkColors;
      nextMode = "light";
   }
   document.getElementById("color-switch").setAttribute("value", nextMode);

   document.getElementById("instructions").style.backgroundColor =  colors.instructions;

   let displayScreen = document.getElementById("display-screen");
   displayScreen.style.backgroundColor = colors.displayBackground;
   displayScreen.style.color = colors.displayText;

   let controlsDiv = document.getElementById("controls");
   controlsDiv.style.backgroundColor =  colors.controlsBackground;
   controlsDiv.style.color = colors.controlsText;

   let buttons = document.getElementsByClassName("remote-page-button");
   for(b of buttons) {
      b.style.backgroundColor = colors.buttons;
      b.classList.remove('button-' + nextMode);
      b.classList.add('button-' + mode);
   }
   document.getElementById("color-switch").innerText = nextMode + " mode";
   
   document.body.style.backgroundImage = colors.background;
}

// tell the robot to shoot and update attempts accordingly
function fire() {
   cloud_update('command', 'FIRE!');
   updateAttempts(attempts + 1);
}

/* updates attempts, both in memory and on page 
 * PARAMETERS: newVal- vupdated value to be stored
 */
function updateAttempts(newVal) {
   attempts = newVal;
   document.getElementById("display-attempts").innerText = "Attempts: " + attempts;
}

// tracks when targets are hit & keeps score accordingly
// PARAMETERS: currHits- total # of known hits so far
function checkForHit(currHits) {
   let gameActive = true;
   let storedHits = currHits;
   console.log("checking for hits");

   let hitsFromCloud = parseInt(cloud_get("hits"));
   if(hitsFromCloud && storedHits < hitsFromCloud) {
      storedHits++;
      gameActive = storedHits < 3;
      reactToHit(gameActive);
   }

   // if at least one target is still up, check again in 4 seconds
   if(gameActive)
      setTimeout(function() { checkForHit(storedHits); }, 4000);

}

/* give appropriate feedback to user on most recent hit
 * PARAMETERS: gameActive- true if all targets are down, false otherwise (if 
 *   all targets are down, final score will be shown)
 */
function reactToHit(gameActive) {
   if(gameActive) {
      displayScreen.feedback.innerText = "Nice Hit!";
      setTimeout(function () { displayScreen.feedback.innerHTML = "&nbsp;"; }, 5000);
   } else {
      clearDisplay();
      displayScreen.angle.innerText = "Final Score: " + (33 - attempts);
      displayScreen.feedback.innerText = "Press start to play again!";
   }
}

// empties display screen of all text
function clearDisplay() {
   displayScreen.angle.innerHTML = "&nbsp;";
   displayScreen.arms.innerHTML = "&nbsp;";
   displayScreen.feedback.innerHTML = "&nbsp;";
   displayScreen.attempts.innerHTML = "&nbsp;";
}

// populates display screen with text for beginning of game
function resetDisplay() {
   displayScreen.angle.innerText = "Angle: 0";
   displayScreen.arms.innerText = "Using Both Arms";
   displayScreen.feedback.innerHTML = "&nbsp;";
   displayScreen.attempts.innerText = "Attempts: 0";
}

// initializes global vars & starts cloud checking
function pageSetup() {
   // initializing displayScreen (for ease of future HTML manipulation)
   displayScreen = {
      angle: document.getElementById("display-angle"),
      arms: document.getElementById("display-arms"),
      feedback: document.getElementById("display-feedback"),
      attempts: document.getElementById("display-attempts")
   };

   checkForHit(0);
   initColors();
}

// initializes color codes for light/dark modes
function initColors() {
   darkColors = {
      instructions: "#07071f",
      buttons: "#454559",
      controlsBackground: "#808080",
      controlsText: "#000000",
      background: "url('space2.jpg')",
      displayBackground: "#000000",
      displayText: "#5f9e00"
   };

   lightColors = {
      instructions: "#309eb9", 
      buttons: "#258399",
      controlsBackground: "#cc8d96",
      controlsText: "#ffffff",
      background: "url('space1.jpg')",
      displayBackground: "#f7d7ea",
      displayText: "#37383f"
   };
}