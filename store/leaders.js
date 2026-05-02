
// type leaders = {
//     position: String,
//     name: String, // undefined will be skipped
//     pic: String, // absolute path
//     color: String, // HTML Color Name
// }[]

// Emoji found on https://googlefonts.github.io/noto-emoji-animation/
// used magick to compress the animated webps
// magick mogrify -format webp -quality 90 -define webp:method=6 *.webp

const leaders = [
    {"position": "President", "name": "Jonahthan Kim", "pic": "/assets/leader/Alien-monster.webp", "color": "Cyan"},
    {"position": "Vice President", "name": "Ellie de Berry", "pic": "/assets/leader/Penguin.webp", "color": "Magenta"},
    {"position": "Chief of Staff", "name": "Colton Hewell", "pic": "/assets/leader/Arm-mechanical.webp", "color": "Lime"},
    {"position": "Secretary", "name": "Jennifer Perera", "pic": "/assets/leader/Skull.webp", "color": "Thistle"},
    {"position": "Treasurer", "name": "Skylar Limburg", "pic": "/assets/leader/Coin.webp", "color": "Gold"},
    {"position": "Blue Team Leader", "name": "Skylar Limburg", "pic": "/assets/leader/Locked.webp", "color": "DeepSkyBlue"},
    {"position": "Red Team Leader", "name": "Colton Henwell & Jayson Santiago", "pic": "/assets/leader/Flying-saucer.webp", "color": "Crimson"},
    {"position": "Hardware Leader", "name": "Skylar Limburg", "pic": "/assets/leader/Pager.webp", "color": "Orange"},
    {"position": "Social Media Manager", "name": "TBA", "pic": "/assets/leader/Camera-flash.webp", "color": "HotPink"},
    {"position": "Website Leader", "name": "Skylar Limburg", "pic": "/assets/leader/Rocket.webp", "color": "MediumSpringGreen"},
];


export default leaders;

