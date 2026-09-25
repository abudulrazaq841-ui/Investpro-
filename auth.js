// =========================
// REFERRAL CODE FROM URL
// =========================

const referralCodeFromUrl =
    new URLSearchParams(window.location.search).get("ref");

if (referralCodeFromUrl) {
    localStorage.setItem(
        "investpro_referral_code",
        referralCodeFromUrl
    );
}


// =========================
// SIGN UP
// =========================

const signupForm =
    document.getElementById("signupForm");

const message =
    document.getElementById("message");

if (signupForm) {

    signupForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        if (!name || !email || !password) {
            message.textContent =
                "Please fill in all fields.";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            message.textContent =
                "Please enter a valid email address.";
            return;
        }

        if (password.length < 6) {
            message.textContent =
                "Password must be at least 6 characters.";
            return;
        }

        message.textContent =
            "Creating account...";

        const { error } =
            await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

        if (error) {
            message.textContent =
                error.message;
            return;
        }

        message.textContent =
            "Account created successfully. You can now log in.";

        signupForm.reset();
    });
}


// =========================
// LOGIN
// =========================

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        if (!email || !password) {
            loginMessage.textContent =
                "Please enter your email and password.";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            loginMessage.textContent =
                "Please enter a valid email address.";
            return;
        }

        loginMessage.textContent =
            "Signing in...";

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {

            console.error("Login error:", error);

            loginMessage.textContent =
                error.message;

            return;
        }

        if (!data || !data.user) {

            loginMessage.textContent =
                "Login failed. Please try again.";

            return;
        }

        loginMessage.textContent =
            "Login successful!";

        // =========================
        // REGISTER REFERRAL
        // =========================

        const savedReferralCode =
            localStorage.getItem(
                "investpro_referral_code"
            );

        if (savedReferralCode) {

            try {

                const { error: referralError } =
                    await supabaseClient.rpc(
                        "create_demo_referral",
                        {
                            p_referral_code:
                                savedReferralCode
                        }
                    );

                if (referralError) {

                    console.error(
                        "Referral registration error:",
                        referralError
                    );

                } else {

                    localStorage.removeItem(
                        "investpro_referral_code"
                    );
                }

            } catch (error) {

                console.error(
                    "Referral processing error:",
                    error
                );
            }
        }

        // =========================
        // GO TO DASHBOARD
        // =========================

        window.location.replace("dashboard.html");
    });
}