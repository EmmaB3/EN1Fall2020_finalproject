/* game.js
 *
 * Author: Emma Bethel, 12/4/20
 *
 * ugly, but it works... kind of
 * (TODO: write an actual header)
 */

 // https://tuftsceeo.github.io/SPIKE-Web-Interface/

var robot;

// setting up motors/sensors
window.addEventListener('load', robotInit());

// shoots one ball
 function shootOnce() {
    console.log("shooting");

    if(cloud_get("left_speed") == 100)
        robot.leftArm.run_for_degrees(715, -100);
    if(cloud_get("right_speed") == 100)
        robot.rightArm.run_for_degrees(720, 100);

    cloud_update('command', 'none');
 }

function runToZero(motor) {
    let counter = 0;
    let direction = (motor.get_degrees_counted() < 0) ? -1 : 1;
    while(motor.get_degrees_counted() != 0 && counter < 1000) {
        // PID control except it's just P
        let speed = Math.round(100 * Math.abs(motor.get_degrees_counted()) / 180);
        motor.start(25 * direction);
        console.log(motor.get_degrees_counted());
        counter++;
    }
    motor.stop();
}

function updateHits() {
    var currHit = cloud_get("hits");
    if(currHit === "")
        cloud_update("hits", 1);
    else
        cloud_update("hits", parseInt(currHit) + 1);
}

 /* initializes robot object with necessary motors and sensors
  * if spike is not connected, will repeat attempt every 2 seconds until 
  * successful inititalization
  */
 function robotInit() {
    if(mySPIKE && mySPIKE.isActive()) {
        robot = {
            leftArm: mySPIKE.Motor('F'),
            rightArm: mySPIKE.Motor('E'),
            rotator: mySPIKE.Motor('C'),
            arms: mySPIKE.MotorPair('F', 'E')

        };
        console.log("initialized robot!");
    } else {
        console.log("could not initialize robot. trying again in 2 s");
        setTimeout(robotInit, 2000);
    }
 }

 // Moves motors to starting positions
 function goToStartPos() {
    console.log(robot.leftArm.get_position());
    robot.leftArm.run_to_position(0, 30);
    robot.rightArm.run_to_position(0, 30);
    robot.rotator.run_to_position(0, 30);

    console.log(robot.leftArm.get_position());

    console.log("in start position");
    cloud_update("reset", false);
 }

 /* Angles shooter to current chosen angle
  * NOTE: defines 0 degrees as position in which spike prime was turned on
  */
function angleShooter(name, value) {
    robot.rotator.run_to_position(value, 50);
}