
// ==========================================
// Stage 4 - Escape Room
// ==========================================

let puzzleProgress = {
    password: false,
    cipher: false,
    website: false,
    lock: false
};

// ==========================================
// Stage Loader
// ==========================================

function loadStage4() {

    currentStage = 4;

    stageName.textContent = "Escape Room";

    storyTitle.textContent =
        "Stage 4: Cyber Escape Room";

    storyText.textContent =
        "Solve the cybersecurity challenges to unlock the Security Operations Center.";

    nextBtn.disabled = true;

    puzzleProgress = {
        password: false,
        cipher: false,
        website: false,
        lock: false
    };

    renderEscapeRoom();
}

// ==========================================
// Main Screen
// ==========================================

function renderEscapeRoom() {

    actionContent.innerHTML = `

        <h3>🔐 Escape Room Challenges</h3>

        <p>
            Complete all four puzzles.
        </p>

        <hr>

        <button onclick="showPasswordPuzzle()">
            Password Puzzle
        </button>

        <button onclick="showCipherPuzzle()">
            Cipher Puzzle
        </button>

        <button onclick="showWebsitePuzzle()">
            Website Puzzle
        </button>

        <button onclick="showLockPuzzle()">
            Security Lock
        </button>

        <hr>

        <p>
            Password: ${statusIcon(puzzleProgress.password)}
        </p>

        <p>
            Cipher: ${statusIcon(puzzleProgress.cipher)}
        </p>

        <p>
            Website: ${statusIcon(puzzleProgress.website)}
        </p>

        <p>
            Lock: ${statusIcon(puzzleProgress.lock)}
        </p>
    `;

    drawEscapeRoomCanvas();

    checkEscapeRoomCompletion();
}

function statusIcon(value) {
    return value ? "✅" : "❌";
}

// ==========================================
// Canvas
// ==========================================

function drawEscapeRoomCanvas() {

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
    ctx.font = "42px Arial";

    ctx.fillText(
        "CYBER ESCAPE ROOM",
        canvas.width / 2,
        120
    );

    ctx.font = "140px Arial";

    ctx.fillText(
        "🔐",
        canvas.width / 2,
        340
    );

    ctx.font = "22px Arial";

    ctx.fillStyle = "#ffffff";

    ctx.fillText(
        "Complete all puzzles to unlock the SOC",
        canvas.width / 2,
        500
    );
}

// ==========================================
// Puzzle 1
// ==========================================

function showPasswordPuzzle() {

    actionContent.innerHTML = `

        <h3>Password Puzzle</h3>

        <p>
            Which password is strongest?
        </p>

        <button onclick="solvePassword('a')">
            password123
        </button>

        <button onclick="solvePassword('b')">
            School2024
        </button>

        <button onclick="solvePassword('c')">
            P@ssw0rd!Secure24
        </button>
    `;
}

function solvePassword(choice) {

    if (choice === "c") {

        puzzleProgress.password = true;

        addScore(10);

        alert("Correct! Strong passwords are long and complex.");
    } else {

        alert("Try again.");
    }

    renderEscapeRoom();
}

// ==========================================
// Puzzle 2
// ==========================================

function showCipherPuzzle() {

    actionContent.innerHTML = `

        <h3>Cipher Challenge</h3>

        <p>
            Decode:
        </p>

        <h2>KHOOR</h2>

        <button onclick="solveCipher('HELLO')">
            HELLO
        </button>

        <button onclick="solveCipher('WORLD')">
            WORLD
        </button>

        <button onclick="solveCipher('EMAIL')">
            EMAIL
        </button>
    `;
}

function solveCipher(answer) {

    if (answer === "HELLO") {

        puzzleProgress.cipher = true;

        addScore(10);

        alert("Correct!");
    } else {

        alert("Incorrect.");
    }

    renderEscapeRoom();
}

// ==========================================
// Puzzle 3
// ==========================================

function showWebsitePuzzle() {

    actionContent.innerHTML = `

        <h3>Safe Website</h3>

        <p>
            Which URL is most trustworthy?
        </p>

        <button onclick="solveWebsite('a')">
            secure-bank-login.net
        </button>

        <button onclick="solveWebsite('b')">
            secure.bank.com
        </button>

        <button onclick="solveWebsite('c')">
            securebank-login-free.com
        </button>
    `;
}

function solveWebsite(choice) {

    if (choice === "b") {

        puzzleProgress.website = true;

        addScore(10);

        alert("Correct!");
    } else {

        alert("Look closely at the domain.");
    }

    renderEscapeRoom();
}

// ==========================================
// Puzzle 4
// ==========================================

function showLockPuzzle() {

    actionContent.innerHTML = `

        <h3>Security Lock</h3>

        <p>
            Enter the unlock code
        </p>

        <p>
            Hint: 4821
        </p>

        <input
            id="lockCode"
            type="text"
            maxlength="4">

        <button onclick="solveLock()">
            Unlock
        </button>
    `;
}

function solveLock() {

    const code =
        document.getElementById("lockCode").value;

    if (code === "4821") {

        puzzleProgress.lock = true;

        addScore(20);

        alert("SOC Unlocked!");
    } else {

        alert("Incorrect code.");
    }

    renderEscapeRoom();
}

// ==========================================
// Completion
// ==========================================

function checkEscapeRoomCompletion() {

    const complete =
        puzzleProgress.password &&
        puzzleProgress.cipher &&
        puzzleProgress.website &&
        puzzleProgress.lock;

    if (!complete) {
        return;
    }

    addScore(25);

    actionContent.innerHTML = `

        <h3 class="success">
            ✅ Escape Room Complete
        </h3>

        <p>
            You unlocked the Security Operations Center.
        </p>

        <p>
            The final defense stage is now available.
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
        "SOC ACCESS GRANTED",
        canvas.width / 2,
        canvas.height / 2
    );

    nextBtn.disabled = false;
}
