/* game.js
 *
 * Author: Emma Bethel, 12/4/20
 *
 * ugly, but it works... kind of
 * (TODO: write an actual header)
 */

 //TODO: write function for resetting position zero (offset var in robot obj, set it to current position whenever a certain button is pressed)

var robot;
var setupSuccessful = false;

// setting up motors/sensors
robotInit();

// shoots one ball
 function shootOnce() {
    console.log("pressed shoot");

    console.log("pos: " + robot.leftArm.get_position() + "deg: " + robot.leftArm.get_degrees_counted());

    robot.arms.start_tank(cloud_get("left_speed"), cloud_get("right_speed"));
    //TODO: make it angle instead of time based
        // weird bug: .get_position() gives really large numbers (in the thousands) and .get_degrees_counted() gets smaller ones that seem to cycle over? seems like it should be the other way around

    setTimeout(function() {
        robot.arms.stop();
        console.log("pos: " + robot.leftArm.get_position() + "deg: " + robot.leftArm.get_degrees_counted());
    }, (2000));

    cloud_update('command', 'none');
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
        setupSuccessful = true;
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

 function angleShooter(degrees) {
    //TODO: functionality for it to move with slider
 }