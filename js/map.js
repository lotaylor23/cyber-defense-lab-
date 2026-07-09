
// ==========================================
// Stage 2 - Network Map
// ==========================================

let networkNodes = [];
let selectedNode = 0;
let nodesVisited = 0;

// ==========================================
// Canvas
// ==========================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ==========================================
// Network Definition
// ==========================================

function initializeNetworkMap() {

    networkNodes = [
        {
            id: "Email Server",
            x: 150,
            y: 150,
            infected: false,
            visited: false
        },
        {
            id: "Teacher Account",
            x: 400,
            y: 150,
            infected: true,
            visited: false
        },
        {
            id: "Core Router",
            x: 300,
            y: 300,
            infected: false,
            visited: false
        },
        {
            id: "Database",
            x: 600,
            y: 300,
            infected: true,
            visited: false
        },
        {
            id: "Student Records",
            x: 450,
            y: 500,
            infected: false,
            visited: false
        }
    ];

    selectedNode = 0;
    nodesVisited = 0;

    drawNetworkMap();

    updateMapInstructions();
}

// ==========================================
// Draw Connections
// ==========================================

function drawConnections() {

    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 2;

    connect(0, 1);
    connect(1, 2);
    connect(2, 3);
    connect(2, 4);
}

function connect(a, b) {

    ctx.beginPath();

    ctx.moveTo(
        networkNodes[a].x,
        networkNodes[a].y
    );

    ctx.lineTo(
        networkNodes[b].x,
        networkNodes[b].y
    );

    ctx.stroke();
}

// ==========================================
// Draw Nodes
// ==========================================

function drawNodes() {

    networkNodes.forEach((node, index) => {

        ctx.beginPath();

        let color = "#00aa66";

        if (node.infected) {
            color = "#cc3333";
        }

        if (index === selectedNode) {
            color = "#00ffff";
        }

        ctx.fillStyle = color;

        ctx.arc(
            node.x,
            node.y,
            35,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            node.id,
            node.x,
            node.y + 60
        );
    });
}

// ==========================================
// Main Draw Function
// ==========================================

function drawNetworkMap() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawConnections();
    drawNodes();
    drawPlayer();
}

// ==========================================
// Select Node
// ==========================================

function visitNode() {

    const node = networkNodes[selectedNode];

    if (!node.visited) {

        node.visited = true;
        nodesVisited++;

        addScore(5);

        let status = "";

        if (node.infected) {

            status = `
                <span class="danger">
                    ⚠ Infected System Detected
                </span>
            `;
        }
        else {

            status = `
                <span class="success">
                    ✅ System Healthy
                </span>
            `;
        }

        actionContent.innerHTML = `
            <h3>${node.id}</h3>

            ${status}

            <p>
                Systems Visited:
                ${nodesVisited} / ${networkNodes.length}
            </p>
        `;
    }

    checkMapCompletion();
}

// ==========================================
// Check Completion
// ==========================================

function checkMapCompletion() {

    if (nodesVisited === networkNodes.length) {

        addScore(20);

        actionContent.innerHTML = `
            <h3>Network Investigation Complete</h3>

            <p class="success">
                ✅ Attack path identified.
            </p>

            <p>
                Email Server →
                Teacher Account →
                Database
            </p>

            <p>
                Network ready for threat containment.
            </p>
        `;

        nextBtn.disabled = false;
    }
}

// ==========================================
// Instructions
// ==========================================

function updateMapInstructions() {

    actionContent.innerHTML = `
        <h3>Network Investigation</h3>

        <p>
            Use Left and Right Arrow Keys
            to navigate between systems.
            You can also click a node to inspect it.
        </p>

        <p>
            Press ENTER to inspect a node.
        </p>

        <p>
            Identify infected devices and
            trace the attack path.
        </p>
    `;
}

// ==========================================
// Keyboard Controls
// ==========================================

document.addEventListener("keydown", function(event) {

    if (currentStage !== 2) {
        return;
    }

    if (event.key === "ArrowRight") {

        selectedNode++;

        if (selectedNode >= networkNodes.length) {
            selectedNode = 0;
        }

        drawNetworkMap();
    }

    if (event.key === "ArrowLeft") {

        selectedNode--;

        if (selectedNode < 0) {
            selectedNode =
                networkNodes.length - 1;
        }

        drawNetworkMap();
    }

    if (event.key === "Enter") {

        visitNode();

        drawNetworkMap();
    }

});

// ==========================================
// Stage 2 Loader
// ==========================================

function loadStage2() {

    currentStage = 2;

    stageName.textContent = "Network Map";

    storyTitle.textContent =
        "Stage 2: Network Map";

    storyText.textContent =
        "Navigate the network and identify the attack route.";

    nextBtn.disabled = true;

    initializeNetworkMap();
}
canvas.addEventListener("click", function(event) {

    if (currentStage !== 2) {
        return;
    }

    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    networkNodes.forEach((node, index) => {

        const dx = mouseX - node.x;
        const dy = mouseY - node.y;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        if (distance <= 35) {

            selectedNode = index;

            drawNetworkMap();

            visitNode();
        }
    });

});

