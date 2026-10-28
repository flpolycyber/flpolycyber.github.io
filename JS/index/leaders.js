import leaders from '../../store/leaders.js';

const element = document.getElementById('leaders');
const box = document.getElementById('leaders');

const canvas = document.getElementById('packetCanvas');
const ctx = canvas.getContext("2d");
const springGreen = getComputedStyle(document.documentElement).getPropertyValue('--spring-green');

function resizeCanvas() {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        
        ctx.scale(dpr, dpr);
    }
}

const resizeObserver = new ResizeObserver(() => resizeCanvas());
resizeObserver.observe(canvas);
resizeCanvas();

// inserting the elements
function attachHoverAnimation(video, container, videoSrc) {    
    video.src = videoSrc;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.className = 'leader_pic';
    
    container.addEventListener('mouseenter', () => video.play());
    container.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Optional: Resets to start frame
    });

}

for (const [position, leader] of Object.entries(leaders)) {
    const name = leader["name"];
    const color = leader["color"];
    const pic = leader["pic"];

    if (name === undefined) continue;

    const item = document.createElement("div");
    item.style.color = color;

    const posEle = document.createElement("h3");
    const vidEle = document.createElement("video");
    const nameEle = document.createElement("h5");

    posEle.innerText = position;
    posEle.className = 'leaderEle';

    attachHoverAnimation(vidEle, item, pic);

    nameEle.innerText = name;
    nameEle.className = 'leaderEle';

    item.className = 'leader_item';
    item.appendChild(posEle);
    item.appendChild(vidEle);
    item.appendChild(nameEle);

    element.appendChild(item);
}


// making the routers fire

let pageVisible = !document.hidden;
document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
});

// IntersectionObserver pauses when the box is off-screen
let boxVisible = false;
const boxObserver = new IntersectionObserver(
    ([entry]) => {
        boxVisible = entry.isIntersecting;
    }, {
        threshold: 0
    }
);
boxObserver.observe(box);

const bounceKeyframes = [
    { transform: 'scale(1)' },
    { transform: 'scale(0.8)' },
    { transform: 'scale(1)' }
];

const bounceOptions = {
    duration: 300,
    easing: 'ease-out'
};

const PACKETSIZE = 8; //pixels
const PACKETWIDTH = PACKETSIZE * 2;

const minFreqShot = 1024; // ms
const maxFreqShot = 2018;
const VELOCITY = 512; // pixels/second

class Router {
    constructor(id, istop, isleft) {
        const el = document.getElementById(id);
        if (!el) {
            console.error(`${id} not found`);
            return;
        }

        // top is true, bottom is false
        // left is true, right is false
        this.el = el;
        this.istop = istop;
        this.isleft = isleft;

        // float to 0-1
        this.path1 = []; // verticle
        this.path2 = []; // horizontal

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            this.fire();
        });

        this.#scheduleNext();
    }

    fire() {
        if (Math.random() >= 0.5) {
            this.path1.push(0.0);
        } else {
            this.path2.push(0.0);
        }
        this.#bounce_router();
    }

    #bounce_router() {
        this.el.animate(bounceKeyframes, bounceOptions);
    }


    #scheduleNext() {
        const delay = Math.floor(Math.random() * (maxFreqShot - minFreqShot + 1)) + minFreqShot;

        setTimeout(() => {
            // Only do work when the page and section are actually visible
            if (pageVisible && boxVisible) {
                this.fire();
            }
            this.#scheduleNext();
        }, delay);
    }

    update(deltatime) {
        const currentWidth = canvas.clientWidth;
        const currentHeight = canvas.clientHeight;

        // emulating a stack 
        while(this.path1.length && this.path1[this.path1.length - 1] >= currentHeight){
            this.path1.pop();
        }

        while(this.path2.length && this.path2[this.path2.length - 1] >= currentWidth){
            this.path2.pop();
        }

        deltatime *= VELOCITY;

        // draw each path
        for (let i = 0; i < this.path1.length; i++) {
            this.path1[i] += deltatime;
            this.draw(this.path1[i], true); // verticle
        }

        for (let i = 0; i < this.path2.length; i++) {
            this.path2[i] += deltatime;
            this.draw(this.path2[i], false); // horizontal
        }
    }

    draw(distance, isVert) {
        // Keep packets inside canvas bounds
        const rightX = Math.max(0, canvas.clientWidth - PACKETSIZE);
        const bottomY = Math.max(0, canvas.clientHeight - PACKETSIZE);

        let x;
        let y;

        if (isVert) {
            // Vertical travel on left or right edge
            x = this.isleft ? 0 : rightX;
            y = (this.istop ? distance : (bottomY - distance));
            ctx.fillRect(x, y, PACKETSIZE, PACKETWIDTH);
        } else {
            // Horizontal travel on top or bottom edge
            y = this.istop ? 0 : bottomY;
            x = (this.isleft ? distance : (rightX - distance));
            ctx.fillRect(x, y, PACKETWIDTH, PACKETSIZE);
        }

    }
}

const routers = [
    new Router('router-top-left', true, true),
    new Router('router-top-right', true, false),
    new Router('router-bottom-left', false, true),
    new Router('router-bottom-right', false, false)
]

let lastTime = 0;

function animate(timestamp) {

    const deltaTime = Math.min((timestamp - lastTime) / 1000, 0.1);
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.fillStyle = springGreen;

    for (const router of routers) {
        router.update(deltaTime)
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);