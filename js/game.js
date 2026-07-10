console.log("game.js loaded");
// ==========================================
// Cyber Defense Lab
// Stage 1 - Cyber Detective
// ==========================================

let currentStage = 1;
let score = 0;

const startButton = document.getElementById("startGameBtn");
const mainMenu = document.getElementById("mainMenu");
const hud = document.getElementById("hud");
const storyPanel = document.getElementById("storyPanel");
const gameArea = document.getElementById("gameArea");
const controls = document.getElementById("controls");

const stageName = document.getElementById("stageName");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");

const scoreDisplay = document.getElementById("score");
const actionContent = document.getElementById("actionContent");

const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");
let detectiveProgress = {
    source: false,
    vulnerability: false,
    prevention: false
};

// ==========================================
// Start Game
// ==========================================

startButton.addEventListener("click", startGame);
previousBtn.addEventListener("click", goToPreviousStage);

function startGame() {
    mainMenu.classList.add("hidden");

    hud.classList.remove("hidden");
    storyPanel.classList.remove("hidden");
    gameArea.classList.remove("hidden");
    controls.classList.remove("hidden");

    document
        .getElementById("leaderboard")
        .classList.remove("hidden");

    displayLeaderboard();    

    loadStage1();
   
}

// ==========================================
// Stage 1
// ==========================================

function loadStage1() {

    currentStage = 1;

    stageName.textContent = "Cyber Detective";

    storyTitle.textContent =
        "Stage 1: Cyber Detective";

    storyText.textContent =
        "Review the evidence and determine how the attacker gained access.";

    ctx.clearRect(    0,    0,    canvas.width,    canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(    100,    50,    800,    450);
    ctx.fillStyle = "#000000";
    ctx.font = "24px Arial";
    ctx.fillText(    "From: support@secure-school-login.net",    130,    120);
    ctx.fillText(    "Subject: URGENT PASSWORD RESET",    130,    170);
    ctx.font = "18px Arial";
    ctx.fillText(    "Your account has been compromised.",    130,    260);
    ctx.fillText(    "Click the link below immediately.",    130,    300);
    ctx.fillStyle = "red";
    ctx.fillText(    "http://secure-school-reset.net",    130,    360);
    
    actionContent.innerHTML = `

        <h3>Evidence File</h3>

        <p>
            <strong>Email:</strong><br>
            From: support@secure-school-login.net<br>
            Subject: URGENT PASSWORD RESET
        </p>

        <p>
            <strong>Login Record:</strong><br>
            Time: 2:13 AM<br>
            Failed Attempts: 17
        </p>

        <hr>

        <h3>Question 1</h3>
        <p>What was the attack source?</p>

        <button onclick="answerSource('phishing')">
            Phishing Email
        </button>

        <button onclick="answerSource('router')">
            Router Failure
        </button>

        <button onclick="answerSource('power')">
            Power Outage
        </button>

        <hr>

        <h3>Question 2</h3>
        <p>What vulnerability was used?</p>

        <button onclick="answerVulnerability('password')">
            Weak Password
        </button>

        <button onclick="answerVulnerability('printer')">
            Printer Failure
        </button>

        <button onclick="answerVulnerability('wifi')">
            WiFi Signal
        </button>

        <hr>

        <h3>Question 3</h3>
        <p>Which recommendation improves security?</p>

        <button onclick="answerPrevention('mfa')">
            Multi-Factor Authentication
        </button>

        <button onclick="answerPrevention('nothing')">
            Do Nothing
        </button>

        <button onclick="answerPrevention('reboot')">
            Reboot Monitor
        </button>

        <hr>

        <div id="stageStatus">
           Complete all questions.
        </div>

    `;
}

// ==========================================
// Question Logic
// ==========================================

function answerSource(choice) {

    if (choice === "phishing") {
        detectiveProgress.source = true;
        addScore(10);
        alert("Correct! The attack began with phishing.");
    }
    else {
        alert("Incorrect. Review the email.");
    }

    checkStage1Complete();
}

function answerVulnerability(choice) {

    if (choice === "password") {
        detectiveProgress.vulnerability = true;
        addScore(10);
        alert("Correct! A weak password was exploited.");
    }
    else {
        alert("Incorrect. Check the login records.");
    }

    checkStage1Complete();
}

function answerPrevention(choice) {

    if (choice === "mfa") {
        detectiveProgress.prevention = true;
        addScore(10);
        alert("Correct! MFA adds protection.");
    }
    else {
        alert("Incorrect. Choose the strongest security measure.");
    }

    checkStage1Complete();
}

// ==========================================
// Stage Completion
// ==========================================

function checkStage1Complete() {

    if (
        detectiveProgress.source &&
        detectiveProgress.vulnerability &&
        detectiveProgress.prevention
    ) {

        document.getElementById("stageStatus").innerHTML = `
            <p class="success">
                ✅ Investigation Complete!
            </p>
            <p>
                You've identified the attack source and secured the account.
            </p>
        `;

        nextBtn.disabled = false;
    }
}

// ==========================================
// Score
// ==========================================

function addScore(points) {
    score += points;
    scoreDisplay.textContent = score;
}

// ==========================================
// Next Stage Button
// ==========================================

nextBtn.disabled = true;

nextBtn.addEventListener("click", () => {

    if (currentStage === 1) {

        storyTitle.textContent =
            "Stage 2: Network Map";

        storyText.textContent =
            "The next stage will allow players to navigate the network and trace the attack path.";

        actionContent.innerHTML = `
            <h3>Stage 2 Coming Next</h3>

            <p>
                Navigate connected systems, identify infected devices,
                and trace the attack across the network.
            </p>

            <p class="success">
                Stage 1 Complete
            </p>
        `;

        stageName.textContent = "Network Map";
        loadStage2();
        return;

    }
    if (currentStage === 2) {

        loadStage3();

        return;
}
    if (currentStage === 3) {

        loadStage4();

        return;
}
    if (currentStage === 4) {

        loadStage5();

        return;
}

});

function goToPreviousStage() {

    switch(currentStage) {

        case 2:
            loadStage1();
            break;

        case 3:
            loadStage2();
            break;

        case 4:
            loadStage3();
            break;

        case 5:
            loadStage4();
            break;
    }
}

// ==========================================
// Leaderboard
// ==========================================

let leaderboard =
    JSON.parse(
        localStorage.getItem("cyberLeaderboard")
    ) || [];
function saveScore(playerName, scoreValue) {

    leaderboard.push({

        player: playerName,
        score: scoreValue,

        date:
            new Date()
            .toLocaleDateString()

    });

    leaderboard.sort(
        (a, b) => b.score - a.score
    );

    leaderboard = leaderboard.slice(0, 10);

    localStorage.setItem(
        "cyberLeaderboard",
        JSON.stringify(leaderboard)
    );

    displayLeaderboard();
}
function displayLeaderboard() {

    const board =
        document.getElementById(
            "leaderboardContent"
        );

    if (!board) return;

    if (leaderboard.length === 0) {

        board.innerHTML =
            "<p>No scores yet.</p>";

        return;
    }

    let html = "";

    leaderboard.forEach(
        (entry, index) => {

            html += `

            <div class="leaderboard-entry">

                <span class="rank">
                    #${index + 1}
                </span>

                <span class="player-name">
                    ${entry.player}
                </span>

                <span class="player-score">
                    ${entry.score}
                </span>

            </div>

            `;
        }
    );

    board.innerHTML = html;
}
