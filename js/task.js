// ======================================
// INVESTPRO SOCIAL TASK SYSTEM
// Matches existing supabase.js
// ======================================

document.addEventListener("DOMContentLoaded", async function () {

    const db = window.supabaseClient;

    const container = document.getElementById("tasksContainer");
    const balanceElement = document.getElementById("rewardsBalance");
    const completedElement = document.getElementById("completedTasks");
    const message = document.getElementById("taskMessage");

    // Check Supabase connection
    if (!db) {
        container.textContent = "Supabase connection unavailable.";
        console.error("InvestPro: Supabase client not found.");
        return;
    }

    // Check authentication
    const { data: authData, error: authError } =
        await db.auth.getUser();

    if (authError || !authData.user) {
        window.location.href = "login.html";
        return;
    }

    const user = authData.user;

    // ======================================
    // LOAD REWARDS BALANCE
    // ======================================

    async function loadBalance() {

        const { data, error } = await db
            .from("profiles")
            .select("rewards_balance")
            .eq("id", user.id)
            .single();

        if (error) {
            console.error("Rewards balance error:", error);
            return;
        }

        balanceElement.textContent =
            Number(data.rewards_balance || 0).toFixed(2);
    }

    // ======================================
    // LOAD SOCIAL TASKS
    // ======================================

    async function loadTasks() {

        container.textContent = "Loading available tasks...";

        const { data: tasks, error } = await db
            .from("social_tasks")
            .select("*")
            .eq("is_active", true)
            .order("id", { ascending: true });

        if (error) {

            console.error("Task loading error:", error);

            container.textContent =
                "Unable to load tasks: " + error.message;

            return;
        }

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

        const submissionMap = new Map(
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

        if (!tasks || tasks.length === 0) {
            container.textContent = "No active tasks available.";
            return;
        }

        // ======================================
        // DISPLAY TASK CARDS
        // ======================================

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
            visit.className = "task-btn";
            visit.textContent = "Visit Platform";

            const controls = document.createElement("div");

            const existing = submissionMap.get(String(task.id));

            if (existing) {

                const status = document.createElement("p");

                status.className =
                    "task-status " + existing.status;

                status.textContent =
                    "Status: " + existing.status.toUpperCase();

                controls.appendChild(status);

                const button = document.createElement("button");

                button.className = "task-btn";
                button.disabled = true;

                button.textContent =
                    existing.status === "approved"
                        ? "Reward Credited"
                        : existing.status === "pending"
                        ? "Under Review"
                        : "Rejected";

                controls.appendChild(button);

            } else {

                const proof = document.createElement("input");

                proof.type = "text";
                proof.maxLength = 1000;
                proof.placeholder =
                    "Enter proof or public link";

                const submit = document.createElement("button");

                submit.className = "task-btn";
                submit.textContent = "Submit Task";

                submit.addEventListener("click", async function () {

                    const proofValue = proof.value.trim();

                    if (!proofValue) {
                        alert("Please enter your task proof.");
                        return;
                    }

                    submit.disabled = true;
                    submit.textContent = "Submitting...";

                    const { error: submitError } = await db
                        .from("user_task_submissions")
                        .insert({
                            task_id: task.id,
                            proof: proofValue
                        });

                    if (submitError) {

                        console.error(submitError);

                        alert(submitError.message);

                        submit.disabled = false;
                        submit.textContent = "Submit Task";

                        return;
                    }

                    if (message) {
                        message.textContent =
                            "Task submitted successfully. Waiting for admin approval.";
                    }

                    await loadTasks();

                });

                controls.append(proof, submit);
            }

            card.append(
                title,
                description,
                reward,
                visit,
                controls
            );

            container.appendChild(card);

        });
    }

    // ======================================
    // INITIALIZE PAGE
    // ======================================

    try {

        await Promise.all([
            loadBalance(),
            loadTasks()
        ]);

    } catch (error) {

        console.error("InvestPro task system:", error);

        container.textContent =
            "System error: " + error.message;

    }

});