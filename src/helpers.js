/* helpers.js
 *
 * Author: Emma Bethel, 12/3/20
 * 
 * I'll organize and document this later (if you're Dr. E and/or a TA reading 
 *  this & I never did that, oopsies :/ thanks for running the class that made 
 *  me remember why i love engineering though. it's been fun <3)
 */

 // resets airtable values to defaults for start of game
 function resetTable() {
    cloud_update('shooter_angle', 0);
    cloud_update('shots', 0);
    cloud_update('left_speed', 100);
    cloud_update('right_speed', 100);
    cloud_update('command', 'none');
    cloud_update('reset', false);
 }

 function resetGame() {
    resetPage();
    resetTable();

    cloud_update('reset', true);
 }

  // turns arms on and off (called whenever checkboxes are used)
  //TODO: possibly just change local vars instead of airtables?
function toggleArm(checked, arm) {
   cloud_update(arm + '_speed', checked ? 100 : 0)
}

 function resetPage() {
    armToggles = document.getElementsByClassName('armToggle');
    for(a of armToggles)
        a.checked = true;

    document.getElementById('angleSlider').value = 0;
 }