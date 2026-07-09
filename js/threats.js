
// ==========================================
// Stage 3 - Threat Response
// ==========================================

let currentThreatIndex = 0;
let threatsResolved = 0;

const threatEvents = [
    {
        name: "Phishing Email",
        description:
            "Multiple users received an email requesting password verification.",
        choices: [
            "Block Sender",
            "Restart Server",
            "Ignore Alert"
        ],
        correct: "Block Sender"
    },

    {
        name: "Malware Detection",
        description:
            "A workstation is executing suspicious software.",
        choices: [
            "Quarantine Device",
            "Print Report",
            "Disable Monitor"
        ],
        correct: "Quarantine Device"
    },

    {
        name: "Weak Credentials",
        description:
            "Several accounts are using simple passwords.",
        choices: [
            "Enable MFA",
            "Rename Users",
            "Clear Browser Cache"
        ],
        correct: "Enable MFA"
    },

    {
        name: "Ransomware Activity",
        description:
            "Files on a server are being encrypted.",
        choices: [
            "Isolate Server",
            "Increase Brightness",
            "Restart Keyboard"
        ],
        correct: "Isolate Server"
    }
];

// ==========================================
// Stage 3 Loader
// ==========================================

function loadStage3() {

    currentStage = 3;

    stageName.textContent = "Threat Response";

    storyTitle.textContent =
        "Stage 3: Threat Response";

    storyText.textContent =
        "Analyze cyber threats and choose the best defensive action.";

    nextBtn.disabled = true;

    currentThreatIndex = 0;
    threatsResolved = 0;

    drawThreatScreen();
}

// ==========================================
// Display Threat
// ==========================================

function drawThreatScreen() {

    const threat =
        threatEvents[currentThreatIndex];

    actionContent.innerHTML = `
        <h3>${threat.name}</h3>

        <p>${threat.description}</p>

        <p>
            Select the best response:
        </p>

        <button onclick="resolveThreat('${threat.choices[0]}')">
            ${threat.choices[0]}
        </button>

        <button onclick="resolveThreat('${threat.choices[1]}')">
            ${threat.choices[1]}
        </button>

        <button onclick="resolveThreat('${threat.choices[2]}')">
            ${threat.choices[2]}
        </button>

        <hr>

        <p>
            Threat ${currentThreatIndex + 1}
            of ${threatEvents.length}
        </p>
    `;

    drawThreatVisualization(threat);
}

// ==========================================
// Canvas Display
// ==========================================

function drawThreatVisualization(threat) {

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

    ctx.fillStyle = "#00ffff";
    ctx.font = "36px Arial";

    ctx.fillText(
        threat.name,
        canvas.width / 2,
        120
    );

    ctx.fillStyle = "#ffffff";
    ctx.font = "22px Arial";

    ctx.fillText(
        "Threat Detected",
        canvas.width / 2,
        180
    );

    let icon = "⚠";

    if (threat.name === "Phishing Email") {
        icon = "✉️";
    }

    if (threat.name === "Malware Detection") {
        icon = "☣";
    }

    if (threat.name === "Weak Credentials") {
        icon = "🔑";
    }

    if (threat.name === "Ransomware Activity") {
        icon = "🔒";
    }

    ctx.font = "120px Arial";

    ctx.fillText(
        icon,
        canvas.width / 2,
        380
    );
}

// ==========================================
// Threat Resolution
// ==========================================

function resolveThreat(choice) {

    const threat =
        threatEvents[currentThreatIndex];

    if (choice === threat.correct) {

        addScore(15);

        threatsResolved++;

        actionContent.innerHTML = `
            <h3 class="success">
                Threat Contained
            </h3>

            <p>
                Correct Response:
                ${choice}
            </p>
        `;

        setTimeout(() => {

            currentThreatIndex++;

            if (
                currentThreatIndex <
                threatEvents.length
            ) {
                drawThreatScreen();
            }
            else {
                completeThreatStage();
            }

        }, 1000);

    } else {

        addScore(-5);

        actionContent.innerHTML = `
            <h3 class="danger">
                Incorrect Response
            </h3>

            <p>
                ${choice}
                is not the best defensive action.
            </p>

            <button onclick="drawThreatScreen()">
                Try Again
            </button>
        `;
    }
}

// ==========================================
// Stage Completion
// ==========================================

function completeThreatStage() {

    addScore(25);

    actionContent.innerHTML = `
        <h3 class="success">
            Threat Response Complete
        </h3>

        <p>
            You successfully contained:
        </p>

        <ul>
            <li>Phishing</li>
            <li>Malware</li>
            <li>Credential Abuse</li>
            <li>Ransomware</li>
        </ul>

        <p>
            The network is stable.
            Proceed to the escape room.
        </p>
    `;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#00ff88";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "NETWORK STABILIZED",
        canvas.width / 2,
        canvas.height / 2
    );

    nextBtn.disabled = false;
}
