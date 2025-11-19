// x = 300;
// y = 300;
// size = 80;

// function car(x, y, size) {
//   rectMode(CENTER);
//   fill(255, 0, 0);
//   rect(x, y, size + 80, size);
//   fill(0, 0, 0);
//   circle(x - 40, y + 40, size - 30);
//   circle(x + 40, y + 40, size - 30);
// }

// function setup() {
//   createCanvas(600, 600);
// }

// function draw() {
//   background(89, 180, 78);
//   if (keyIsPressed === true) {
//     if (keyCode === UP_ARROW) {
//       y -= 4;
//     } else if (keyCode === DOWN_ARROW) {
//       y += 4;
//     } else if (keyCode === LEFT_ARROW) {
//       x -= 4;
//     } else if (keyCode === RIGHT_ARROW) {
//       x += 4;
//     }
//   }

//   if (x - size / 2 > width) {
//     x = 0;
//   } else if (x + size / 2 < 0) {
//     x = 600;
//   }
//   if (y - size / 2 > height) {
//     y = 0;
//   } else if (y + size / 2 < 0) {
//     y = 600;
//   }
//   car(x, y, size);
// }

/**
 * Initializes the canvas and sets the background color.
 * Called once when the program starts.
 *
 *
 */
// class Ball {
//   constructor(x, y, diameter, warna) {
//     this.x = x;
//     this.y = y;
//     this.speedX = random(4);
//     this.speedY = random(4);
//     this.diameter = diameter;
//     this.warna = warna;
//   }

//   display() {
//     noStroke();
//     fill(this.warna);
//     circle(this.x, this.y, this.diameter, this.warna);
//   }

//   move() {
//     this.x += this.speedX;
//     this.y -= this.speedY;

//     if (this.x >= width - this.diameter / 2 || this.x <= +this.diameter / 2) {
//       this.speedX *= -1;
//     }

//     if (this.y >= height - this.diameter / 2 || this.y <= +this.diameter / 2) {
//       this.speedY *= -1;
//     }
//   }
// }

// let balls = [];

// function setup() {
//   createCanvas(600, 600);
//   for (let index = 0; index < 3; index++) {
//     balls.push(
//       new Ball(
//         random(600),
//         random(600),
//         random(100),
//         color(random(255), random(255), random(255), random(255))
//       )
//     );
//   }
// }

// function draw() {
//   background(78, 101, 109);
//   for (let ball of balls) {
//     ball.display();
//     ball.move();
//   }
// }

// function mouseClicked() {
//   balls.push(
//     new Ball(
//       mouseX,
//       mouseY,
//       random(100),
//       color(random(255), random(255), random(255), random(255))
//     )
//   );
// }
// Jumlah partikel dasar awal (contoh atom karbon)
let electrons = 6;   // jumlah elektron awal
let proton = 6;      // jumlah proton dalam nukleus
let neutron = 6;     // jumlah neutron dalam nukleus

// Variabel untuk posisi sudut elektron dan kecepatan putarnya
let electronAngles = [];
let speeds = [];

function setup() {
  createCanvas(600, 450); // ukuran kanvas
  angleMode(RADIANS);     // mode sudut menggunakan radian
  initElectrons();        // inisialisasi posisi awal elektron
  textFont("Arial");      // font teks
}

function initElectrons() {
  // fungsi untuk mengatur ulang posisi dan kecepatan elektron
  electronAngles = [];
  speeds = [];

  for (let i = 0; i < electrons; i++) {
    electronAngles.push(random(TWO_PI));  // sudut acak tiap elektron
    speeds.push(random(0.01, 0.03));      // kecepatan acak tiap elektron
  }
}

function draw() {
  background(12, 25, 45); // warna latar

  let cx = width / 2;      // posisi tengah X
  let cy = height / 2 + 20; // posisi tengah Y sedikit turun

  // ===== Gambar inti atom (proton + neutron) =====
  fill(255, 100, 100);
  noStroke();
  ellipse(cx, cy, 60); // nukleus

  // Teks jumlah proton & neutron
  fill(255);
  textAlign(CENTER);
  textSize(12);
  text("P: " + proton + " | N: " + neutron, cx, cy + 4);

  // ===== Gambar orbit elektron =====
  noFill();
  stroke(150, 200, 255);
  ellipse(cx, cy, 160);  // orbit kulit 1
  ellipse(cx, cy, 220);  // orbit kulit 2

  // ===== Animasi elektron =====
  for (let i = 0; i < electrons; i++) {
    electronAngles[i] += speeds[i]; // update pergerakan elektron

    // Elektron dibagi berdasarkan kulit:
    // Elektron ke 0 dan 1 = kulit pertama
    // Elektron lainnya = kulit kedua
    let r = i < 2 ? 80 : 110; 

    // Hitung posisi elektron berdasarkan sudut dan radius
    let x = cx + cos(electronAngles[i]) * r;
    let y = cy + sin(electronAngles[i]) * r;

    // Gambar elektron
    fill(200, 230, 255);
    noStroke();
    ellipse(x, y, 12);
  }

  // ===== Informasi jumlah elektron =====
  fill(255);
  textAlign(LEFT);
  textSize(14);
  text("Elektron: " + electrons, 20, height - 40);

  // Petunjuk tombol kontrol
  textSize(12);
  text("← kurangi | → tambah | R reset", 20, height - 20);
}

// ===== Kontrol keyboard =====
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    // tambah elektron
    electrons++;
    initElectrons();

  } else if (keyCode === LEFT_ARROW) {
    // kurangi elektron, tapi tidak boleh negatif
    if (electrons > 0) electrons--;
    initElectrons();

  } else if (key === 'r' || key === 'R') {
    // reset kembali ke atom karbon
    electrons = 6;
    initElectrons();
  }
}
