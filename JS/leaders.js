import leaders from '../store/leaders.js';

const element = document.getElementById('leaders');
const box = document.getElementById('leaders');

const canvas = document.getElementById('packetCanvas');
const ctx = canvas.getContext("2d");
ctx.fillStyle = "SpringGreen"; // never changed to a new color

function attachHoverOnlyAnimatedWebp(item, imgElement, animatedSrc) {
    let stillSrc = null;
    let replayToggle = 0;
    const replaySources = [`${animatedSrc}?play=0`, `${animatedSrc}?play=1`];

    const sourceImage = new Image();
    sourceImage.decoding = 'sync';

    sourceImage.addEventListener('load', () => {
        const canvas = document.createElement('canvas');
        canvas.width = sourceImage.naturalWidth;
        canvas.height = sourceImage.naturalHeight;

        const context = canvas.getContext('2d');
        if (!context) {
            imgElement.src = animatedSrc;
            return;
        }

        context.drawImage(sourceImage, 0, 0);
        stillSrc = canvas.toDataURL('image/png');
        imgElement.src = stillSrc;
    });

    sourceImage.addEventListener('error', () => {
        imgElement.src = animatedSrc;
    });

    sourceImage.src = animatedSrc;

    const playAnimation = () => {
        replayToggle = replayToggle === 0 ? 1 : 0;
        imgElement.src = replaySources[replayToggle];
    };

    const pauseAnimation = () => {
        if (stillSrc) {
            imgElement.src = stillSrc;
        }
    };

    item.addEventListener('mouseenter', playAnimation);
    item.addEventListener('focus', playAnimation);
    item.addEventListener('mouseleave', pauseAnimation);
    item.addEventListener('blur', pauseAnimation);
    imgElement.setAttribute('loading', 'lazy');
}

for (const leader of leaders) {
    const position = leader["position"];
    const name = leader["name"];
    const color = leader["color"];
    const pic = leader["pic"];

    if (name === undefined) continue;

    const item = document.createElement("div");
    item.style.color = color;

    const posEle = document.createElement("h3");
    const picEle = document.createElement("img");
    const nameEle = document.createElement("h5");

    posEle.innerText = position;
    posEle.className = 'leaderEle';

    picEle.className = 'leader_pic';
    attachHoverOnlyAnimatedWebp(item, picEle, pic);

    nameEle.innerText = name;
    nameEle.className = 'leaderEle';

    item.className = 'leader_item';
    item.appendChild(posEle);
    item.appendChild(picEle);
    item.appendChild(nameEle);

    element.appendChild(item);
}

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

const PACKETSIZE = 4; //pixels
const minShot = 1000;
const maxShot = 3000;

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
        this.path1 = [];
        this.path2 = [];

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
        const delay = Math.floor(Math.random() * (maxShot - minShot + 1)) + minShot;

        setTimeout(() => {
            // Only do work when the page and section are actually visible
            if (pageVisible && boxVisible) {
                this.fire();
            }
            this.#scheduleNext();
        }, delay);
    }

    update(deltatime) {
        for (let i = 0; i < this.path1.length; i++) {
            this.path1[i] += deltatime;
            if (this.path1[i] >= 1.0) {
                this.path1.splice(i, 1);
                continue;
            }
            this.draw(this.path1[i], true);
        }

        for (let i = 0; i < this.path2.length; i++) {
            this.path2[i] += deltatime;
            if (this.path2[i] >= 1.0) {
                this.path2.splice(i, 1);
                continue;
            }
            this.draw(this.path2[i], false);
        }
    }

    draw(percent, isVert) {
        // Keep packets inside canvas bounds
        const rightX = Math.max(0, canvas.width - PACKETSIZE);
        const bottomY = Math.max(0, canvas.height - PACKETSIZE);

        let x = rightX;
        let y = bottomY;

        if (isVert) {
            // Vertical travel on left or right edge
            x = this.isleft ? 0 : rightX;
            y = (this.istop ? percent : (1 - percent)) * bottomY;
        } else {
            // Horizontal travel on top or bottom edge
            y = this.istop ? 0 : bottomY;
            x = (this.isleft ? percent : (1 - percent)) * rightX;
        }

        ctx.fillRect(x, y, PACKETSIZE, PACKETSIZE);
    }
}

const routers = [
    new Router('top-left', true, true),
    new Router('top-right', true, false),
    new Router('bottom-left', false, true),
    new Router('bottom-right', false, false)
]

let lastTime = 0;

function animate(timestamp) {

    const deltaTime = Math.min((timestamp - lastTime) / 1000, 0.1);
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const router of routers) {
        router.update(deltaTime)
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);