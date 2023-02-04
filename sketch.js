let data;
let columns;

function preload() {
	data = loadTable('./src/hts.csv', 'csv', 'header');
}
function setup() {
	angleMode(DEGREES);
	createCanvas(800, 800, SVG);
	const rowCount = data.getRowCount();
}

function draw() {
	background(255);
	strokeWeight(1);
	circle(mouseX, mouseY, 20);
	let margin = 300;
	let celWidth = (width - margin) / data.columns.length;
	let celHeight = (height - margin) / data.rows.length;

	for (let j = 1; j < data.columns.length; j++) {
		const x = j * celWidth + margin / 2;
		push();
		translate(x, height - 20);
		rotate(-45);
		noStroke();
		textSize(8);
		text(data.columns[j].slice(0, 30), 0, 0);
		pop();

		const c = color(random(0, 255), random(0, 255), 0);
		stroke(c);
		for (let i = 0; i < data.rows.length; i++) {
			const count = data.rows[i].obj[data.columns[j]];
			let value = count ? int(count) : 0;

			const y = i * celHeight + margin / 2;

			const maxLines = 30;

			if (j == 1) {
				value = map(value, 45, 58, 1, maxLines);
			} else if (j == 2) {
				value = map(value, 25, 31, 1, maxLines);
			} else if (j == 3) {
				value = map(value, 36, 66, 1, maxLines);
			}

			// text(int(value), x, y);
			for (let k = 0; k < value; k++) {
				const v = p5.Vector.random2D();
				v.setMag(value * random(0.4, 1));
				push();
				translate(x - v.x / 2, y - v.y / 2);
				line(0, 0, v.x * 3, v.y);
				pop();
			}
			// save(`mySVG${i}.svg`);
		}
	}
	const timeStamp =
		year() +
		'-' +
		month() +
		'-' +
		day() +
		' ' +
		hour() +
		minute() +
		second();
	// save(`svg${timeStamp}.svg`);

	noLoop();
}
