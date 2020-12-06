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
   cloud_update(arm + '_speed', checked ? 100 : 0)
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
   armToggles = document.getElementsByClassName('armToggle');
   for(a of armToggles)
      a.checked = true;

   document.getElementById('angleSlider').value = 0;
}