async function loadAdminDashboard() {

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
        window.location.href = "login.html";
        return;
    }

    // =========================
    // CHECK ADMIN ROLE
    // =========================

    const { data: profile, error: profileError } =
        await supabaseClient
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

    if (profileError || !profile) {
        console.error("Profile error:", profileError);
        alert("Unable to verify your account.");
        window.location.href = "dashboard.html";
        return;
    }

    if (profile.role !== "admin") {
        alert("Access denied. Admins only.");
        window.location.href = "dashboard.html";
        return;
    }


    // =========================
    // LOAD USERS
    // =========================

    const { data: users, error: usersError } =
        await supabaseClient
            .from("profiles")
            .select("id, email, role, balance, total_invested")
            .order("email", {
                ascending: true
            });

    if (usersError) {

        console.error("Users error:", usersError);

        document.getElementById(
            "adminUsersContainer"
        ).innerHTML =
            "<p>Unable to load users.</p>";

    } else {

        document.getElementById("totalUsers").textContent =
            users.length;

        renderAdminUsers(users);
    }


    // =========================
    // LOAD INVESTMENTS
    // =========================

    const { data: investments, error: investmentsError } =
        await supabaseClient
            .from("investments")
            .select(`
                id,
                user_id,
                amount,
                status,
                created_at,
                investment_plans (
                    name,
                    return_rate
                )
            `)
            .order("created_at", {
                ascending: false
            });

    if (investmentsError) {

        console.error(
            "Investments error:",
            investmentsError
        );

        document.getElementById(
            "adminInvestmentsContainer"
        ).innerHTML =
            "<p>Unable to load demo investments.</p>";

    } else {

        document.getElementById(
            "totalInvestments"
        ).textContent = investments.length;

        const totalDemoAmount =
            investments.reduce(
                (total, investment) => {
                    return total +
                        Number(investment.amount || 0);
                },
                0
            );

        document.getElementById(
            "totalDemoAmount"
        ).textContent =
            `₦${totalDemoAmount.toLocaleString("en-NG", {
                minimumFractionDigits: 2
            })}`;

        window.adminInvestmentsData =
            investments || [];

        renderAdminInvestments(investments);
    }


    // =========================
    // LOAD DEMO PLANS
    // =========================

    const { data: plans, error: plansError } =
        await supabaseClient
            .from("investment_plans")
            .select("*")
            .order("min_amount", {
                ascending: true
            });

    if (plansError) {

        console.error(
            "Plans error:",
            plansError
        );

        document.getElementById(
            "adminPlansContainer"
        ).innerHTML =
            "<p>Unable to load demo plans.</p>";

    } else {

        document.getElementById(
            "totalPlans"
        ).textContent = plans.length;

        renderAdminPlans(plans);
    }
}


// =========================
// RENDER USERS
// =========================

function renderAdminUsers(users) {

    const container =
        document.getElementById(
            "adminUsersContainer"
        );

    if (!users || users.length === 0) {

        container.innerHTML =
            "<p>No users found.</p>";

        return;
    }

    container.innerHTML = "";

    users.forEach(user => {

        const card =
            document.createElement("div");

        card.className =
            "dashboard-investment-card";

        card.innerHTML = `
            <div class="investment-header">

                <div class="investment-title">
                <span class="investment-status">
    ACTIVE
</span>

                    <div class="investment-icon">
                        👤
                    </div>

                    <div>
                        <h3>
                            ${user.email || "No email"}
                        </h3>

                        <p>
                            Account role:
                            ${user.role || "user"}
                        </p>
                    </div>

                </div>

                <span class="investment-status">
                    ${user.role || "user"}
                </span>

            </div>

            <div class="investment-details">

                <div class="investment-detail">
                    <span>📧 Email</span>
                    <strong>
                        ${user.email || "Not available"}
                    </strong>
                </div>

                <div class="investment-detail">
                    <span>🔐 Role</span>
                    <strong>
                        ${user.role || "user"}
                    </strong>
                </div>

                <div class="investment-detail">
                    <span>💰 Balance</span>
                    <strong>
                        ₦${Number(user.balance || 0).toLocaleString("en-NG", {
                            minimumFractionDigits: 2
                        })}
                    </strong>
                </div>

                <div class="investment-detail">
                    <span>📊 Total Demo Invested</span>
                    <strong>
                        ₦${Number(user.total_invested || 0).toLocaleString("en-NG", {
                            minimumFractionDigits: 2
                        })}
                    </strong>
                </div>

                <div class="investment-detail">
                    <span>🆔 Account ID</span>
                    <strong>
                        ${user.id}
                    </strong>
                </div>

            </div>
        `;

        container.appendChild(card);
    });
}


// =========================
// RENDER INVESTMENTS
// =========================

function renderAdminInvestments(investments) {

    const container =
        document.getElementById(
            "adminInvestmentsContainer"
        );

    if (!investments || investments.length === 0) {

        container.innerHTML =
            "<p>No demo investments found.</p>";

        return;
    }

    container.innerHTML = "";

    investments.forEach(investment => {

        const plan =
            investment.investment_plans || {};

        const card =
            document.createElement("div");

        card.className =
            "dashboard-investment-card";

        const amount =
            Number(investment.amount || 0)
                .toLocaleString("en-NG", {
                    minimumFractionDigits: 2
                });

        const date =
            new Date(
                investment.created_at
            ).toLocaleDateString("en-NG");

        card.innerHTML = `
            <div class="investment-header">

                <div class="investment-title">

                    <div class="investment-icon">
                        📊
                    </div>

                    <div>
                        <h3>
                            ${plan.name || "Unknown Plan"}
                        </h3>

                        <p>
                            Demo investment
                        </p>
                    </div>

                </div>

                <span class="investment-status">
                    ${investment.status}
                </span>

            </div>

            <div class="investment-details">

                <div class="investment-detail">
                    <span>💰 Amount</span>
                    <strong>
                        ₦${amount}
                    </strong>
                </div>

                <div class="investment-detail">
                    <span>📈 Return Rate</span>
                    <strong>
                        ${Number(plan.return_rate || 0)}%
                    </strong>
                </div>

                <div class="investment-detail">
                    <span>📅 Started</span>
                    <strong>
                        ${date}
                    </strong>
                </div>

            </div>

            <button
                class="investment-view-btn"
                type="button"
                onclick="openAdminInvestmentModal(
                    window.adminInvestmentsData.find(
                        item => item.id === ${investment.id}
                    )
                )">
                View Details →
            </button>
        `;

        container.appendChild(card);
    });
}


// =========================
// RENDER PLANS
// =========================

function renderAdminPlans(plans) {

    const container =
        document.getElementById(
            "adminPlansContainer"
        );

    if (!plans || plans.length === 0) {

        container.innerHTML =
            "<p>No demo plans found.</p>";

        return;
    }

    container.innerHTML = "";

    plans.forEach(plan => {

        const card =
            document.createElement("div");

        card.className =
            "dashboard-investment-card";

        card.innerHTML = `
            <div class="investment-header">

                <div class="investment-title">

                    <div class="investment-icon">
                        📈
                    </div>

                    <div>
                        <h3>
                            ${plan.name}
                        </h3>

                        <p>
                            ${plan.description || "Demo plan"}
                        </p>
                    </div>

                </div>

            </div>

            <div class="investment-details">

                <div class="investment-detail">
                    <span>💰 Minimum</span>
                    <strong>
                        ₦${Number(plan.min_amount)
                            .toLocaleString("en-NG")}
                    </strong>
                </div>

                <div class="investment-detail">
                    <span>📅 Duration</span>
                    <strong>
                        ${plan.duration_days} days
                    </strong>
                </div>

                <div class="investment-detail">
                    <span>📈 Return Rate</span>
                    <strong>
                        ${plan.return_rate}%
                    </strong>
                </div>

            </div>

            <button
                class="investment-view-btn"
                type="button"
                onclick="editDemoPlan(${plan.id})">
                Edit Demo Plan ✏️
            </button>
        `;

        container.appendChild(card);
    });
}


// =========================
// EDIT DEMO PLAN
// =========================

async function editDemoPlan(planId) {

    const { data: plan, error } =
        await supabaseClient
            .from("investment_plans")
            .select("*")
            .eq("id", planId)
            .single();

    if (error || !plan) {

        alert("Unable to load this demo plan.");
        console.error(error);
        return;
    }

    const name = prompt(
        "Plan name:",
        plan.name
    );

    if (name === null) return;

    const description = prompt(
        "Plan description:",
        plan.description || ""
    );

    if (description === null) return;

    const minAmount = prompt(
        "Minimum amount:",
        plan.min_amount
    );

    if (minAmount === null) return;

    const duration = prompt(
        "Duration in days:",
        plan.duration_days
    );

    if (duration === null) return;

    const returnRate = prompt(
        "Demo return rate (%):",
        plan.return_rate
    );

    if (returnRate === null) return;


// Validate the values
const minAmountNumber = Number(minAmount);
const durationNumber = Number(duration);
const returnRateNumber = Number(returnRate);

if (
    !Number.isFinite(minAmountNumber) ||
    minAmountNumber <= 0
) {
    alert("Minimum amount must be a valid positive number.");
    return;
}

if (
    !Number.isInteger(durationNumber) ||
    durationNumber <= 0
) {
    alert("Duration must be a positive whole number.");
    return;
}

if (
    !Number.isFinite(returnRateNumber) ||
    returnRateNumber < 0
) {
    alert("Demo return rate must be a valid number.");
    return;
}


const { error: updateError } =
        await supabaseClient
            .from("investment_plans")
            .update({
                name: name.trim(),
                description: description.trim(),
                min_amount: minAmountNumber,
duration_days: durationNumber,
return_rate: returnRateNumber
            })
            .eq("id", planId);

    if (updateError) {

        alert("Unable to update the demo plan.");
        console.error(updateError);
        return;
    }

    alert("Demo plan updated successfully!");

    loadAdminDashboard();
}


// =========================
// ADMIN INVESTMENT MODAL
// =========================

function openAdminInvestmentModal(investment) {

    if (!investment) return;

    const plan =
        investment.investment_plans || {};

    const amount =
        Number(investment.amount || 0);

    document.getElementById(
        "adminModalPlanName"
    ).textContent =
        plan.name || "Investment Details";

    document.getElementById(
        "adminModalDescription"
    ).textContent =
        "Demo investment information";

    document.getElementById(
        "adminModalAmount"
    ).textContent =
        `₦${amount.toLocaleString("en-NG", {
            minimumFractionDigits: 2
        })}`;

    document.getElementById(
        "adminModalReturnRate"
    ).textContent =
        `${Number(plan.return_rate || 0)}%`;

    document.getElementById(
        "adminModalStatus"
    ).textContent =
        investment.status || "active";

    document.getElementById(
        "adminModalDate"
    ).textContent =
        new Date(
            investment.created_at
        ).toLocaleDateString("en-NG");

    document.getElementById(
        "adminModalUserId"
    ).textContent =
        investment.user_id || "--";

    document.getElementById(
        "adminInvestmentModal"
    ).classList.add("active");
}


function closeAdminInvestmentModal() {

    document.getElementById(
        "adminInvestmentModal"
    ).classList.remove("active");
}


// =========================
// LOGOUT
// =========================

async function logout() {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {

        console.error(error);
        return;
    }

    window.location.href = "login.html";
}


// =========================
// START ADMIN DASHBOARD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadAdminDashboard();

        const logoutBtn =
            document.getElementById("logoutBtn");

        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    logout();
                }
            );
        }
        const refreshAdminBtn =
    document.getElementById("refreshAdminBtn");

if (refreshAdminBtn) {

    refreshAdminBtn.addEventListener(
        "click",
        () => {
            loadAdminDashboard();
        }
    );
}


        const closeModal =
            document.getElementById(
                "closeAdminInvestmentModal"
            );

        if (closeModal) {

            closeModal.addEventListener(
                "click",
                closeAdminInvestmentModal
            );
        }


        const modal =
            document.getElementById(
                "adminInvestmentModal"
            );

        if (modal) {

            modal.addEventListener(
                "click",
                event => {

                    if (event.target === modal) {
                        closeAdminInvestmentModal();
                    }

                }
            );
        }

    }
);
// =========================
// DEMO WITHDRAWALS
// =========================

async function loadAdminWithdrawals() {

    const container =
        document.getElementById("adminWithdrawals");

    if (!container) return;

    container.innerHTML =
        "<p>Loading withdrawals...</p>";

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
        container.innerHTML =
            "<p>Please log in as an admin.</p>";
        return;
    }

    const {
        data: withdrawals,
        error
    } = await supabaseClient
        .from("demo_withdrawals")
        .select(`
            id,
            user_id,
            amount,
            bank_name,
            account_name,
            account_number,
            status,
            created_at
        `)
        .order("created_at", {
            ascending: false
        });

    if (error) {

        console.error(
            "Admin withdrawals error:",
            error
        );

        container.innerHTML =
            "<p>Unable to load withdrawals.</p>";

        return;
    }

    if (!withdrawals || withdrawals.length === 0) {

        container.innerHTML =
            "<p>No demo withdrawals yet.</p>";

        return;
    }

    container.innerHTML = "";

    withdrawals.forEach(withdrawal => {

        const card =
            document.createElement("div");

        card.className =
            "admin-withdrawal-card";

        const amount =
            Number(withdrawal.amount || 0)
                .toLocaleString("en-NG", {
                    minimumFractionDigits: 2
                });

        const date =
            new Date(
                withdrawal.created_at
            ).toLocaleString("en-NG");

        const accountNumber =
            withdrawal.account_number || "";

        const maskedAccount =
            accountNumber.length >= 4
                ? "•••• •••• " +
                  accountNumber.slice(-4)
                : accountNumber;

        const status =
            withdrawal.status || "pending";

        card.innerHTML = `

            <div class="admin-withdrawal-header">

                <div>
                    <span>Withdrawal #${withdrawal.id}</span>

                    <strong>
                        ₦${amount}
                    </strong>
                </div>

                <span class="
                    withdrawal-status
                    ${status}
                ">
                    ${status}
                </span>

            </div>

            <div class="admin-withdrawal-details">

                <p>
                    <span>🏦 Bank</span>
                    <strong>
                        ${withdrawal.bank_name}
                    </strong>
                </p>

                <p>
                    <span>👤 Account Name</span>
                    <strong>
                        ${withdrawal.account_name}
                    </strong>
                </p>

                <p>
                    <span>💳 Account Number</s