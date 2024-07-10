import { snake, side } from "..";
import { drawSnake } from "./drawSnake";

const keysDirectionMap: any = {
	ArrowDown: "down",
	ArrowUp: "up",
	ArrowLeft: "left",
	ArrowRight: "right",
};

const autoWalk = () => {
	moveSnake();
	if (!snake.alive) {
		// fail state
		let score = document.getElementById("score");
		if (score) {
			score.innerText = "Dead 💀";
		}
		clearInterval(walkIntervalId);
		window.removeEventListener("keydown", changeDirection);
	} else {
		drawSnake();
	}
};

const moveSnake = () => {
	if (checkIfOppositeDirectionInput(snake.direction)) return undefined;

	delete snake.points[snake.length - 1].head;
	let newHead = snake.points.slice(-1)[0];
	let newX = newHead.x;
	let newY = newHead.y;
	switch (snake.direction) {
		case "right":
			snake.points.push({ x: ++newX, y: newY, head: true });
			break;
		case "left":
			snake.points.push({ x: --newX, y: newY, head: true });
			break;
		case "up":
			snake.points.push({ x: newX, y: --newY, head: true });
			break;
		case "down":
			snake.points.push({ x: newX, y: ++newY, head: true });
			break;
	}
	snake.points.shift();

	checkIfStepExists();
};

const checkIfOppositeDirectionInput = (direction: string) => {
	switch (direction) {
		case "right":
			return snake.direction === "left";
		case "left":
			return snake.direction === "right";
		case "up":
			return snake.direction === "down";
		case "down":
			return snake.direction === "up";
	}
};

const changeDirection = (e: KeyboardEvent) => {
	if (
		e.key !== "ArrowRight" &&
		e.key !== "ArrowLeft" &&
		e.key !== "ArrowUp" &&
		e.key !== "ArrowDown"
	)
		return;

	if (keysDirectionMap[e.key] === snake.direction) return; // for handling long key presses

	if (!checkIfOppositeDirectionInput(keysDirectionMap[e.key])) {
		snake.direction = keysDirectionMap[e.key];
		clearInterval(walkIntervalId);
		walkIntervalId = setInterval(autoWalk, 200);
		autoWalk();
	}
};

const checkIfStepExists = () => {
	const head = snake.points.slice(-1)[0];
	if (head.x < 0 || head.y < 0 || head.x > side - 1 || head.y > side - 1) {
		snake.alive = false;
	}
};

console.log("Hi from snakeMovement");

let walkIntervalId = setInterval(autoWalk, 200);

export { changeDirection };
