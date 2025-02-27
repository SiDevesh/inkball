import Matter from 'matter-js';
import { Drawable, Color } from '../entity-types';
import ball_red from '../img/ball_red.png';
import ball_blue from '../img/ball_blue.png';
import ball_gold from '../img/ball_gold.png';

const radius = 15;

const imageRed = new Image();
imageRed.src = ball_red;

const imageBlue = new Image();
imageBlue.src = ball_blue;

const imageGold = new Image();
imageGold.src = ball_gold;

/**
 * Creates a new Drawable containing a ball.
 * @param x 
 * @param y 
 * @param radius 
 */
export default function Ball(x: number, y: number, color: Color): Drawable {
    const body = Matter.Bodies.circle(x, y, radius, { inertia: Infinity, mass: 1 });

    body.restitution = 1;
    body.friction = 0;
    body.frictionAir = 0;
    body.frictionStatic = 1;
    body.force = {x: 0.02, y: 0.02};
        
    let image: HTMLImageElement = null;
    
    switch (color) {
        case Color.RED:
            image = imageRed;
            break;
        case Color.BLUE:
            image = imageBlue;
            break;
        case Color.GOLD:
            image = imageGold;
            break;
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (image.complete && image.naturalHeight > 0) {
            ctx.drawImage(image, body.position.x - radius, body.position.y - radius);
        } else {
            ctx.fillStyle = "#ff0000";
            ctx.beginPath();
            ctx.arc(body.position.x, body.position.y, radius, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    }

    return {
        body,
        draw,
        color,
    };
}
