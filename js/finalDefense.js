// ==========================================
// Stage 5 - Final Defense
// ==========================================

let defenseThreats = [];
let defensesCompleted = 0;
let finalDefenseWon = false;

// ==========================================
// Threats
// ==========================================

function initializeFinalDefense() {

    defenseThreats = [

        {
            id: 1,
            name: "Phishing Campaign",
            solution: "Training",
            secured: false
        },

        {
            id: 2,
            name: "Credential Attack",
            solution: "MFA",
            secured: false
        },

        {
            id: 3,
            name: "Unpatched Server",
            solution: "Patch",
            secured: false
        },

        {
            id: 4,
            name: "Malware Infection",
            solution: "Antivirus",
            secured: false
        },

        {
            id: 5,
            name: "Ransomware Attack",
            solution: "Backup",
            secured: false
        }

    ];

    defensesCompleted = 0;
    finalDefenseWon = false;
}

// ==========================================
// Stage Loader
// ==========================================

function loadStage5() {

    currentStage = 5;

    stageName.textContent = "Final Defense";

    storyTitle.textContent =
        "Stage 5: Final Defense";

    storyText.textContent =
        "A coordinated attack is spreading across the network. Deploy the correct defenses to stop the breach.";

    nextBtn.disabled = true;

    initializeFinalDefense();

    drawFinalDefenseCanvas();

    renderDefenseThreat();
}

// ==========================================
// Canvas
// ==========================================

function drawFinalDefenseCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#081020";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.textAlign = "center";

    ctx.fillStyle = "#ff4444";

    ctx.font = "52px Arial";

    ctx.fillText(
        "NETWORK UNDER ATTACK",
        canvas.width / 2,
        100
    );

    // Core Server

    ctx.fillStyle = "#00ffff";

    ctx.fillRect(
        430,
        220,
        140,
        100
    );

    ctx.fillStyle = "#ffffff";

    ctx.font = "22px Arial";

    ctx.fillText(
        "CORE SERVER",
        canvas.width / 2,
        280
    );

    // Threat Counter

    ctx.fillStyle = "#ffffff";

    ctx.font = "22px Arial";

    ctx.fillText(
        `Threats Stopped: ${defensesCompleted}/5`,
        canvas.width / 2,
        450
    );
}

// ==========================================
// Threat Display
// ==========================================

function renderDefenseThreat() {

    const threat =
        defenseThreats.find(
            t => !t.secured
        );

    if (!threat) {

        completeFinalDefense();

        return;
    }

    actionContent.innerHTML = `

        <h3>${threat.name}</h3>

        <p>
            Choose the most effective
            security control.
        </p>

        <button onclick="deployDefense('Firewall')">
            Firewall
        </button>

        <button onclick="deployDefense('Patch')">
            Patch
        </button>

        <button onclick="deployDefense('MFA')">
            MFA
        </button>

        <button onclick="deployDefense('Training')">
            Training
        </button>

        <button onclick="deployDefense('Antivirus')">
            Antivirus
        </button>

        <button onclick="deployDefense('Backup')">
            Backup
        </button>

        <hr>

        <p>
            Remaining Threats:
            ${5 - defensesCompleted}
        </p>

    `;
}

// ==========================================
// Defense Logic
// ==========================================

function deployDefense(defense) {

    const threat =
        defenseThreats.find(
            t => !t.secured
        );

    if (!threat) return;

    if (defense === threat.solution) {

        threat.secured = true;

        defensesCompleted++;

        addScore(20);

        actionContent.innerHTML = `

            <h3 class="success">
                ✅ Threat Neutralized
            </h3>

            <p>
                ${threat.name}
            </p>

            <p>
                Control Applied:
                ${defense}
            </p>

        `;

        drawFinalDefenseCanvas();

        setTimeout(() => {

            renderDefenseThreat();

        }, 1200);

    } else {

        addScore(-5);

        actionContent.innerHTML = `

            <h3 class="danger">
                ❌ Incorrect Defense
            </h3>

            <p>
                ${defense}
                is not the best solution.
            </p>

            <button onclick="renderDefenseThreat()">
                Try Again
            </button>

        `;
    }
}

// ==========================================
// Victory Screen
// ==========================================

function completeFinalDefense() {

    finalDefenseWon = true;

    addScore(50);

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#00ff88";

    ctx.font = "60px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "NETWORK SECURED",
        canvas.width / 2,
        250
    );

    ctx.font = "30px Arial";

    ctx.fillText(
        "Mission Successful",
        canvas.width / 2,
        330
    );

    actionContent.innerHTML = `

        <h3 class="success">
            🏆 Mission Complete
        </h3>

        <p>
            All systems have been secured.
        </p>

        <ul>
            <li>Phishing Blocked</li>
            <li>Accounts Protected</li>
            <li>Servers Patched</li>
            <li>Malware Removed</li>
            <li>Backups Restored</li>
        </ul>

        <p>
            Final Score:
            <strong>${score}</strong>
        </p>

    `;

    document.getElementById(
        "finalScore"
    ).textContent = score;

    document.getElementById(
        "blockedThreats"
    ).textContent = defensesCompleted;

    document.getElementById(
        "protectedSystems"
    ).textContent = "5";

    setTimeout(() => {

        gameArea.classList.add("hidden");
        controls.classList.add("hidden");
        storyPanel.classList.add("hidden");

        document
            .getElementById("resultsScreen")
            .classList.remove("hidden");

    }, 2500);
}
