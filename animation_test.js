var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

var playerAsset = [];

const playerPath = [
    "asset/playerTest2.babylon",
];

const pi = Math.PI;
const frameRate = 60;
const speed = 2.5;

function addAnimation(leg, forward=true) {
    const joint1Anim = new BABYLON.Animation("joint1Anim", "rotation.y", 
    frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const joint2Anim = new BABYLON.Animation("joint2Anim", "rotation.z", 
    frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const joint3Anim = new BABYLON.Animation("joint3Anim", "rotation.z", 
    frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames1 = [];
    const keyFrames2 = [];

    var joint1 = playerAsset[1];
    var joint2 = playerAsset[4];
    var joint3 = playerAsset[5];

    var i = 1;
    var j1 = 1;
    var j2 = 0;
    var k = 1;
    var add = 0;

    var f = 1;

    if (!forward) f = -1;

    if (leg == "fr") {
        joint1 = playerAsset[6];
        joint2 = playerAsset[9];
        joint3 = playerAsset[12];
        i = 1;
        j1 = 0;
        j2 = -1;
        add = 10;
    }
    else if (leg == "rl") {
        joint1 = playerAsset[7];
        joint2 = playerAsset[10];
        joint3 = playerAsset[13];
        i = -1;
        j1 = 0;
        j2 = 1;
        add = 10;
    }
    else if (leg == "rr") {
        joint1 = playerAsset[8];
        joint2 = playerAsset[11];
        joint3 = playerAsset[14];
        i = -1;
        j1 = -1;
        j2 = 0;
        add = 0;
    }

    keyFrames1.push({
        frame: 0,
        value: 0
    })
    keyFrames1.push({
        frame: 0.5*frameRate/speed,
        value: f*i*(25-add)/180*pi
    });
    keyFrames1.push({
        frame: 1.5*frameRate/speed,
        value: f*i*(-15-add)/180*pi
    });
    keyFrames1.push({
        frame: 2*frameRate/speed,
        value: 0
    });

    joint1Anim.setKeys(keyFrames1);
    joint3Anim.setKeys(keyFrames1);

    keyFrames2.push({
        frame: 0,
        value: j1*(12)/180*pi
    });
    keyFrames2.push({
        frame: 0.3*frameRate/speed,
        value: j1*(12)/180*pi
    });
    keyFrames2.push({
        frame: 0.45*frameRate/speed,
        value: j2*(12)/180*pi
    });
    keyFrames2.push({
        frame: 1.3*frameRate/speed,
        value: j2*(12)/180*pi
    });
    keyFrames2.push({
        frame: 1.45*frameRate/speed,
        value: j1*(12)/180*pi
    });
    keyFrames2.push({
        frame: 2*frameRate/speed,
        value: j1*(12)/180*pi
    });

    joint2Anim.setKeys(keyFrames2);

    joint1Anim.enableBlending = true;
    joint2Anim.enableBlending = true;
    joint3Anim.enableBlending = true;
    joint1Anim.blendingSpeed = 0.05;
    joint2Anim.blendingSpeed = 0.05;
    joint3Anim.blendingSpeed = 0.05;

    joint1.animations.push(joint1Anim);
    joint2.animations.push(joint2Anim);
    joint3.animations.push(joint3Anim);
}

function bodyAnimation() {
    const bodyAnim = new BABYLON.Animation("bodyAnim", "position.y", 
    frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    keyFrames = [];

    keyFrames.push({
        frame: 0,
        value: 0
    });
    keyFrames.push({
        frame: 0.45*frameRate/speed,
        value: -0.02
    });
    keyFrames.push({
        frame: 0.6*frameRate/speed,
        value: 0
    });
    keyFrames.push({
        frame: 1.45*frameRate/speed,
        value: -0.02
    });
    keyFrames.push({
        frame: 1.6*frameRate/speed,
        value: 0
    });
    keyFrames.push({
        frame: 2*frameRate/speed,
        value: 0
    });

    bodyAnim.setKeys(keyFrames);
    bodyAnim.enableBlending = true;
    bodyAnim.blendingSpeed = 0.05;

    playerAsset[2].animations.push(bodyAnim);
}

function stopAnimation() {
    const bodyStopAnim = new BABYLON.Animation("bodyStopAnim", "position.y", 
    frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const yRotAnim = new BABYLON.Animation("yRotAnim", "rotation.y", 
    frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const zRotAnim = new BABYLON.Animation("zRotAnim", "rotation.z", 
    frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    const indicesJoints1 = [1, 6, 7, 8];
    const indicesJoints23 = [4, 5, 9, 10, 11, 12, 13, 14];

    keyFrames = [];

    keyFrames.push({
        frame: 0,
        value: 0
    });
    keyFrames.push({
        frame: 0.5*frameRate/speed,
        value: 0
    });
    keyFrames.push({
        frame: frameRate/speed,
        value: 0
    });

    bodyStopAnim.setKeys(keyFrames);
    yRotAnim.setKeys(keyFrames);
    zRotAnim.setKeys(keyFrames);
    bodyStopAnim.enableBlending = true;
    yRotAnim.enableBlending = true;
    zRotAnim.enableBlending = true;
    bodyStopAnim.blendingSpeed = 0.05;
    yRotAnim.blendingSpeed = 0.05;
    zRotAnim.blendingSpeed = 0.05;

    indicesJoints1.forEach(n => {
        playerAsset[n].animations.push(yRotAnim);
    });
    indicesJoints23.forEach(n => {
        playerAsset[n].animations.push(zRotAnim);
    });
    playerAsset[2].animations.push(bodyStopAnim);
}

function main() {
    const player = playerAsset[2];

    slider1 = document.getElementById("front left joint 1");
    slider2 = document.getElementById("front left joint 2");
    slider3 = document.getElementById("front left joint 3");
    value1 = document.getElementById("slider1-value");
    value2 = document.getElementById("slider2-value");
    value3 = document.getElementById("slider3-value");
    button = document.getElementById("anim");
    buttonReverse = document.getElementById("animReverse");
    buttonPause = document.getElementById("animPause");
    buttonStop = document.getElementById("animStop");

    slider1.oninput = function() {
        playerAsset[1].rotation.y = slider1.value/180*pi;
        value1.innerHTML = slider1.value;
    }
    slider2.oninput = function() {
        playerAsset[4].rotation.z = slider2.value/180*pi;
        value2.innerHTML = slider2.value;
    }
    slider3.oninput = function() {
        playerAsset[5].rotation.z = slider3.value/180*pi;
        value3.innerHTML = slider3.value;
    }
    
    player.rotation.x = pi/2;
    player.rotation.z = pi/2+pi/4;

    var forward = true;

    var animations = [];

    button.onclick = function() {
        if (animations.length == 0) {
            addAnimation("fl");
            addAnimation("fr");
            addAnimation("rl");
            addAnimation("rr");
            bodyAnimation();
            for (var i = 0; i < playerAsset.length; i++) {
                animations.push(scene.beginAnimation(playerAsset[i], 0, 2*frameRate, true));
            }  
        }
        else {
            for (var i = 0; i < playerAsset.length; i++) {
                animations[i].restart();
            }
        }
    }
    buttonReverse.onclick = function() {
        forward = !forward;
        for (var i = 0; i < playerAsset.length; i++) {
            animations[i].stop();
            playerAsset[i].animations.length = 0;
        }
        animations.length = 0;
        addAnimation("fl", forward);
        addAnimation("fr", forward);
        addAnimation("rl", forward);
        addAnimation("rr", forward);
        bodyAnimation();
        for (var i = 0; i < playerAsset.length; i++) {
            animations.push(scene.beginAnimation(playerAsset[i], 0, 2*frameRate, true));
        }
    }
    buttonPause.onclick = function() {
        for (var i = 0; i < playerAsset.length; i++) {
            animations[i].pause();
        }
    }
    buttonStop.onclick = function() {
        for (var i = 0; i < playerAsset.length; i++) {
            animations[i].stop();
            playerAsset[i].animations.length = 0;         
        }
        animations.length = 0;
        stopAnimation();
        for (var i = 0; i < playerAsset.length; i++) {
            scene.beginAnimation(playerAsset[i], 0, frameRate/speed, false);
        }
    }
}

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("Camera", - pi / 1.5, pi / 2.5, 5, BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.wheelPrecision = 50;
    
    const light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1));
    const light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0));   
    light1.intensity =0.75;
    light2.intensity =0.5;

    var assetsManager = new BABYLON.AssetsManager(scene);

    playerPath.forEach(asset => {

        const name='load '+asset;
        const path='./';
        const meshTask = assetsManager.addMeshTask(name, "", path, asset);
        console.log("loading : "+ asset);
        
        meshTask.onSuccess = (task) => {
            // disable the original mesh and store it in the data structure
            console.log('loaded and stored '+asset);
            //for is needed if multiple meshes in same object 
            for(var i=0; i< task.loadedMeshes.length; i++) {
                //task.loadedMeshes[i].setEnabled(false);
                playerAsset.push(task.loadedMeshes[i]);
            }
        }
        meshTask.onError = function (task, message, exception) {
            console.log(message, exception);
        }
    });

    assetsManager.onFinish = function(tasks) {
        main();
    };

    assetsManager.load();

    return scene;
};

window.initFunction = async function() {
    
    var asyncEngineCreation = async function() {
        try {
            return createDefaultEngine();
        } 
        catch(e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }
    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    window.scene = createScene();
};

initFunction().then(() => {
    sceneToRender = scene        
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
});

    // Resize
window.addEventListener("resize", function () {
    engine.resize();
});