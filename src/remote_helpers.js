/* remote_helpers.js
 *
 * Author: Emma Bethel, 12/3/20
 * 
 * Purpose: controlling remote side of game
 */

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

   document.getElementById('angle-slider').value = 0;
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

function highContrast() {
   let instructions = document.getElementById("instructions");

   instructions.setAttribute("background-color") =  "#fff5d9";
}