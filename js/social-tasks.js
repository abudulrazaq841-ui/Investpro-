// ======================================
// INVESTPRO SOCIAL TASK SYSTEM
// STEP 1: LOAD SOCIAL TASKS
// ======================================

(async function () {

    const container = document.getElementById("tasksContainer");

    const balanceElement = document.getElementById("rewardsBalance");

    const completedElement = document.getElementById("completedTasks");

    const message = document.getElementById("taskMessage");

    // Use existing InvestPro Supabase connection
    const db = window.supabaseClient;

    // Check connection
    if (!db) {
        container.textContent = "Supabase connection not found.";
        console.error("InvestPro: Database client unavailable.");
        return;
    }

    try {

        container.textContent = "Checking account...";

        // Check logged-in user
        const { data: authData, error: authError } =
            await db.auth.getUser();

        if (authError) throw authError;

        if (!authData.user) {
            window.location.href = "login.html";
            return;
        }

        const user = authData.user;

        // ==================================
        // LOAD REWARDS BALANCE
        // ==================================

        async function loadRewardsBalance() {

            const { data, error } = await db
                .from("profiles")
                .select("rewards_balance")
                .eq("id", user.id)
                .single();

            if (error) {
                console.error("Balance loading error:", error);
                balanceElement.textContent = "Unavailable";
                return;
            }

            balanceElement.textContent =
                Number(data.rewards_balance || 0).toFixed(2);
        }

        // ==================================
        // LOAD SOCIAL TASKS
        // ==================================

        async function loadSocialTasks() {

            container.textContent = "Loading available tasks...";

            const { data: tasks, error } = await db
                .from("social_tasks")
                .select("id, title, description, platform, reward_amount, task_url")
                .eq("is_active", true)
                .order("id", { ascending: true });

            if (error) {

                console.error("Social tasks error:", error);

                container.textContent =
                    "Unable to load tasks: " + error.message;

                return;
            }

            if (!tasks || tasks.length === 0) {

                container.textContent =
                    "No active social tasks available.";

                return;
            }

            // Load user's task history
            const { data: submissions, error: historyError } =
                await db
                    .from("user_task_submissions")
                    .select("task_id, status")
                    .eq("user_id", user.id);

            if (historyError) {

                console.error("Task history error:", historyError);

                container.textContent =
                    "Unable to load task history: " +
                    historyError.message;

                return;
            }

            const history = new Map(
                submissions.map(item => [
                    String(item.task_id),
                    item
                ])
            );

            completedElement.textContent =
                submissions.filter(
                    item => item.status === "approved"
                ).length;

            container.innerHTML = "";

            // ==================================
            // DISPLAY TASK CARDS
            // ==================================

            tasks.forEach(task => {

                const card = document.createElement("div");

                card.className = "task-card";

                const title = document.createElement("h3");
                title.textContent = task.title;

                const description = document.createElement("p");
                description.textContent = task.description || "";

                const reward = document.createElement("p");
                reward.className = "task-reward";

                reward.textContent =
                    "Reward: ₦" +
                    Number(task.reward_amount).toFixed(2);

                const visit = document.createElement("a");

                visit.href = task.task_url;
                visit.target = "_blank";
                visit.rel = "noopener noreferrer";
                visit.className = "task-button";
                visit.textContent = "Visit Platform";

                card.append(title, description, reward, visit);

                const existing = history.get(String(task.id));

                if (existing) {

                    const status = document.createElement("p");

                    status.className =
                        "task-status " + existing.status;

                    status.textContent =
                        "Status: " +
                        existing.status.toUpperCase();

                    card.appendChild(status);

                } else {

                    const proof = document.createElement("input");

                    proof.type = "text";
                    proof.className = "proof-input";
                    proof.placeholder = "Enter task proof or public link";
                    proof.maxLength = 1000;

                    const submit = document.createElement("button");

                    submit.className = "task-button";
                    submit.textContent = "Submit Task";

                    submit.addEventListener("click", async function () {

                        if (!proof.value.trim()) {
                            alert("Please enter your proof.");
                            return;
                        }

                        submit.disabled = true;
                        submit.textContent = "Submitting...";

                        const { error } = await db
                            .from("user_task_submissions")
                            .insert({
                                task_id: task.id,
                                proof: proof.value.trim()
                            });

                        if (error) {

                            console.error("Submission error:", error);

                            alert(error.message);

                            submit.disabled = false;
                            submit.textContent = "Submit Task";

                            return;
                        }

                        message.textContent =
                            "Submission received! Awaiting admin review.";

                        await loadSocialTasks();

                    });

                    card.append(proof, submit);
                }

                container.appendChild(card);

            });

        }

        // ==================================
        // INITIALIZE
        // ==================================

        await loadRewardsBalance();

        await loadSocialTasks();

        console.log("InvestPro social tasks initialized.");

    } catch (error) {

        console.error("InvestPro task system error:", error);

        container.textContent =
            "System error: " + error.message;

    }

})();