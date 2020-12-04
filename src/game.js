/* game.js
 *
 * Author: Emma Bethel, 12/4/20
 *
 * Bro imagine documenting your code. couldn't be me
 */

shooting = false;

 function shootOnce() {

    let leftArm = mySPIKE.Motor('F');
    let  rightArm = mySPIKE.Motor('E');
    let rotator = mySPIKE.Motor('C');
    let arms = mySPIKE.MotorPair('F', 'E');

    let initPos = rightArm.get_degrees_counted();

    //while(Math.abs(rightArm.get_degrees_counted()) - initPos < 720) {
        console.log(rightArm.get_degrees_counted());
        if(!shooting) {
            arms.start_tank(cloud_get('left_speed'), cloud_get('right_speed'));
            shooting = true;
        }

        setTimeout(function() {
            arms.stop();
        }, (2000));
    //}
    //arms.stop();

    cloud_update('command', 'none');
 }

 function goToStartPos() {
    let leftArm = mySPIKE.Motor('F');
    let rightArm = mySPIKE.Motor('E');
    let rotator = mySPIKE.Motor('C');
    let arms = mySPIKE.MotorPair('F', 'E');

    /*leftArm.start(30);

    for(let a = 0; a < 100; a++)
    {
        if(a % 10 == 0)
            console.log("counted: " + leftArm.get_degrees_counted());
            console.log("pos: " + leftArm.get_position());
    }*/

    //leftArm.stop();

    cloud_update("restart", false);

    //leftArm.run_to_position(0, 30, doneRunningMotor());
    //rightArm.run_to_position(0, 30, doneRunningMotor());
    //rotator.run_to_position(0, 30, doneRunningMotor());
 }

 function doneRunningMotor() {
    console.log("motor finished moving");
 }