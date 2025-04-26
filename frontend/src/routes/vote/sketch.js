let carney, pp, dog, hand; 
let gameState = "play"; 
let confetti = [];

const figures = [
    { img: null, x: 10, y: 130, w: 200, h: 240 }, // carney 
    { img: null, x: 200, y: 70, w: 220, h: 260 },  // pp 
    { img: null, x: 400, y: 100, w: 180, h: 220 }  // dog
];

function preload() {
    carney = loadImage('../../public/carney.png');
    pp = loadImage('../../public/pp.png');
    dog = loadImage('../../public/dog.png');
    hand = loadImage('../../hand.png'); 
}

function setup() {
    createCanvas(600, 400);
    noCursor();
    figures[0].img = carney;
    figures[1].img = pp;
    figures[2].img = dog;
}

function draw() {
    background(0);

    let camNorm = map(mouseX, 0, width, -1, 1);
    let camOffset = camNorm * 150;

    const eyeData = [
        [ {x: 113, y: 108}, {x: 156, y: 110} ], // Carney
        [ {x: 164, y: 126}, {x: 206, y: 130} ], // PP
        [ {x: 382, y: 349}, {x: 538, y: 343} ]  // Dog
    ];
    const imgSizes = [
        {w: 329, h: 433},   // Carney
        {w: 380, h: 408},   // PP
        {w: 1080, h: 1080}  // Dog
    ];

    hovered = [false, false, false];
    drawParams = [];

    for (let i = 0; i < figures.length; i++) {
        let depth = map(i, 0, figures.length - 1, 1, 0.5);
        let fx = figures[i].x - camOffset * depth;
        let fy = figures[i].y;
        let fw = figures[i].w;
        let fh = figures[i].h;

        let cx = fx + fw / 2;
        let cy = fy + fh / 2;
        let rx = fw / 2;
        let ry = fh / 2;
        let over = sq((mouseX - cx) / rx) + sq((mouseY - cy) / ry) < 1;

        if (over && gameState === "play") {
            hovered[i] = true;
            let vibrateAmt = 2;
            let growScale = 1.3;
            let vibX = random(-vibrateAmt, vibrateAmt);
            let vibY = random(-vibrateAmt, vibrateAmt);
            fw *= growScale;
            fh *= growScale;
            fx = fx - (fw - figures[i].w) / 2 + vibX;
            fy = fy - (fh - figures[i].h) / 2 + vibY;
        }

        drawParams.push({fx, fy, fw, fh});
        image(figures[i].img, fx, fy, fw, fh);
    }

    if (gameState === "play") {
        fill(30, 30, 30, 245);
        noStroke();
        beginShape();
        vertex(0, 0); vertex(width, 0); vertex(width, height); vertex(0, height);
        beginContour();
        for (let a = TWO_PI; a > 0; a -= 0.1) {
            let x = mouseX + cos(a) * 110;
            let y = mouseY + sin(a) * 110;
            vertex(x, y);
        }
        endContour();
        endShape(CLOSE);
    }

    let handW = 160;
    let handH = 120;
    let handScale = hovered.some(h => h) ? 1.15 : 1.0;
    let drawHandW = handW * handScale;
    let drawHandH = handH * handScale;
    let handX = width - drawHandW + 20;
    let handY = height - drawHandH + 10;
    image(hand, handX, handY, drawHandW, drawHandH);

    if (gameState === "play") {
        for (let i = 0; i < figures.length; i++) {
            if (!hovered[i]) {
                let {fx, fy, fw, fh} = drawParams[i];
                for (let j = 0; j < 2; j++) {
                    let ex = map(eyeData[i][j].x, 0, imgSizes[i].w, 0, fw) + fx;
                    let ey = map(eyeData[i][j].y, 0, imgSizes[i].h, 0, fh) + fy;
                    noStroke();
                    for (let r = 10; r > 2; r -= 2) {
                        fill(255, 0, 0, map(r, 10, 2, 40, 180));
                        ellipse(ex, ey, r, r);
                    }
                    fill(255, 0, 0, 255);
                    ellipse(ex, ey, 4, 4);
                }
            }
        }
    }

    if (gameState === "win") {
        for (let i = 0; i < confetti.length; i++) {
            let c = confetti[i];
            fill(c.c);
            push();
            translate(c.x, c.y);
            rotate(c.rot);
            ellipse(0, 0, c.r, c.r * 0.5);
            pop();
            c.x += c.vx;
            c.y += c.vy;
            c.rot += c.vrot;
            if (c.y > height + 20) {
                c.y = random(-100, 0);
                c.x = random(width);
            }
        }
    }

    // banner
    fill(20, 20, 40, 230);
    noStroke();
    rect(0, 0, width, 60, 0, 0, 20, 20);

    textAlign(CENTER, TOP);
    if (gameState === "win") {
        fill(80, 255, 120);
        textSize(28);
        textStyle(BOLD);
        text("Correct choice!", width / 2, 10);

        textSize(16);
        textStyle(NORMAL);
        fill(255);
        text("You may proceed.", width / 2, 40);
    } else {
        fill(255, 220, 80);
        textSize(28);
        textStyle(BOLD);
        text("Canadian Federal Election 2025", width / 2, 10);

        textSize(16);
        textStyle(NORMAL);
        fill(255);
        text("Who will you vote for?", width / 2, 40);
    }
}

function mousePressed() {
    if (gameState === "play") {
        // Check if dog is clicked
        let i = 2; // dog index 2
        let {fx, fy, fw, fh} = drawParams[i];
        let cx = fx + fw / 2;
        let cy = fy + fh / 2;
        let rx = fw / 2;
        let ry = fh / 2;
        if (sq((mouseX - cx) / rx) + sq((mouseY - cy) / ry) < 1) {
            gameState = "win";
            for (let j = 0; j < 80; j++) {
                confetti.push({
                    x: random(width),
                    y: random(-100, 0),
                    r: random(6, 14),
                    c: color(random(255), random(255), random(255)),
                    vy: random(2, 5),
                    vx: random(-2, 2),
                    rot: random(TWO_PI),
                    vrot: random(-0.1, 0.1)
                });
            }
            // SHAWN -- OVER HERE -- HERE'S WHERE YOU CAN DO NEXT PAGE
            // WHEN THE DOG IS CLICKED, SHOW A BUTTON TO GO TO THE NEXT PAGE
            // DON'T GO TO NEXT PAGE INSTANTLY, SHOW THE BUTTON TO GO TO THE NEXT PAGE
            // AND WAIT FOR THE USER TO CLICK IT
            if (window.parent) {
                window.parent.postMessage({showNext: true}, "*");
            }
        }
    }
}