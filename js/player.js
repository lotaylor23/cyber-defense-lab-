
// ==========================================
// Player Module
// ==========================================

let player = {
    name: "Cyber Analyst",
    x: 150,
    y: 150,
    size: 20,
    speed: 10,
    color: "#00ffff",
    systemsSecured: 0
};

// ==========================================
// Reset Position
// ==========================================

function resetPlayer() {

    player.x = 150;
    player.y = 150;
}

// ==========================================
// Draw Player
// ==========================================

function drawPlayer() {

    if (!ctx) return;

    // Body

    ctx.beginPath();

    ctx.fillStyle = player.color;

    ctx.arc(
        player.x,
        player.y,
        player.size,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Outline

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label

    ctx.fillStyle = "#ffffff";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "Player",
        player.x,
        player.y - 30
    );
}

// ==========================================
// Movement
// ==========================================

function movePlayer(direction) {

    switch(direction) {

        case "up":
            player.y -= player.speed;
            break;

        case "down":
            player.y += player.speed;
            break;

        case "left":
            player.x -= player.speed;
            break;

        case "right":
            player.x += player.speed;
            break;
    }

    keepPlayerInBounds();
}

// ==========================================
// Stay Inside Canvas
// ==========================================

function keepPlayerInBounds() {

    if (!canvas) return;

    if (player.x < player.size) {
        player.x = player.size;
    }

    if (player.y < player.size) {
        player.y = player.size;
    }

    if (player.x > canvas.width - player.size) {
        player.x = canvas.width - player.size;
    }

    if (player.y > canvas.height - player.size) {
        player.y = canvas.height - player.size;
    }
}

// ==========================================
// Distance Between Objects
// ==========================================

function distanceBetween(x1, y1, x2, y2) {

    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}

// ==========================================
// Collision Detection
// ==========================================

function isNearNode(node, radius = 50) {

    return distanceBetween(
        player.x,
        player.y,
        node.x,
        node.y
    ) <= radius;
}

// ==========================================
// Security Actions
// ==========================================

function secureSystem() {

    player.systemsSecured++;

    if (typeof addScore === "function") {
        addScore(5);
    }
}

// ==========================================
// Keyboard Controls
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        switch(event.key) {

            case "w":
            case "ArrowUp":
                movePlayer("up");
                break;

            case "s":
            case "ArrowDown":
                movePlayer("down");
                break;

            case "a":
            case "ArrowLeft":
                movePlayer("left");
                break;

            case "d":
            case "ArrowRight":
                movePlayer("right");
                break;
        }

    }
);

// ==========================================
// Draw Player on Current Canvas
// ==========================================

function renderPlayer() {

    drawPlayer();
}

// ==========================================
// Stats
// ==========================================

function getPlayerStats() {

    return {
        systemsSecured:
            player.systemsSecured,

        position: {
            x: player.x,
            y: player.y
        }
    };
}
