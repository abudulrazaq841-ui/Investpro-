// =========================
// AUTO UPDATE DEMO INVESTMENTS
// =========================

async function updateUserInvestments() {

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
        return;
    }

    const {
        data: investments,
        error
    } = await supabaseClient
        .from("investments")
        .select("id, status")
        .eq("user_id", user.id)
        .eq("status", "active");

    if (error) {
        console.error(
            "Unable to load active investments:",
            error
        );
        return;
    }

    if (!investments || investments.length === 0) {
        return;
    }

    for (const investment of investments) {

        const {
            data,
            error: updateError
        } = await supabaseClient.rpc(
            "update_demo_investment",
            {
                p_investment_id: investment.id
            }
        );

        if (updateError) {

            console.error(
                `Investment ${investment.id} update error:`,
                updateError
            );

            continue;
        }

        if (data && !data.success) {

            console.error(
                `Investment ${investment.id}:`,
                data.message
            );
        }
    }
}

async function loadDashboard() {

const {  
    data: { user },  
    error: userError  
} = await supabaseClient.auth.getUser();  

if (userError || !user) {  
    window.location.href = "login.html";  
    return;  
}  
  // Update investments before displaying them
await updateUserInvestments();

// Load user profile  
const { data: profile, error: profileError } =  
    await supabaseClient  
        .from("profiles")  
        .select("email, balance, total_invested")  
        .eq("id", user.id)  
        .single();  

if (profileError) {  
    console.error("Profile error:", profileError);  

    document.getElementById("welcomeMessage").textContent =  
        "Unable to load profile.";  

    return;  
}  

// Welcome message  
document.getElementById("welcomeMessage").textContent =  
    `Welcome, ${profile.email || user.email || "User"}!`;  

// Balance  
document.getElementById("balance").textContent =  
    `₦${Number(profile.balance || 0).toLocaleString("en-NG", {  
        minimumFractionDigits: 2  
    })}`;  

// Load user's demo investments  
const { data: investments, error: investmentError } =  
    await supabaseClient  
        .from("investments")  
        .select(`
    id,
    amount,
    status,
    created_at,
    demo_earned,
    last_update_at, 
            investment_plans (  
name,  
description,  
duration_days,  
return_rate

)
`)
.eq("user_id", user.id)
.order("created_at", { ascending: false });
window.investmentsData = investments || [];

const container =  
    document.getElementById("investmentsContainer");  

if (investmentError) {  
    console.error("Investment error:", investmentError);  

    container.innerHTML =  
        "<p>Unable to load investments.</p>";  

    return;  
}  
    // Calculate demo investment summary  
const totalInvested = investments.reduce(  
    (total, investment) =>  
        total + Number(investment.amount || 0),  
    0  
);  

const activeInvestments = investments.filter(  
    investment => investment.status === "active"  
).length;  

// Demo return calculation  
const demoReturns = investments.reduce(
    (total, investment) => {
        return total +
            Number(investment.demo_earned || 0);
    },
    0
);

document.getElementById("totalInvested").textContent =  
    `₦${totalInvested.toLocaleString("en-NG", {  
        minimumFractionDigits: 2  
    })}`;  

document.getElementById("activeInvestments").textContent =  
    activeInvestments;  

document.getElementById("demoReturns").textContent =  
    `₦${demoReturns.toLocaleString("en-NG", {  
        minimumFractionDigits: 2  
    })}`;  

if (!investments || investments.length === 0) {  
    container.innerHTML =  
        "<p>You have no demo investments yet.</p>";  

    return;  
}  

container.innerHTML = "";  

investments.forEach(investment => {  

const card = document.createElement("div");  

card.className = "dashboard-investment-card";  

const plan = investment.investment_plans || {};  

const planName = plan.name || "Unknown Plan";  
const description = plan.description || "Demo investment plan";  

const amount = Number(investment.amount || 0)  
    .toLocaleString("en-NG", {  
        minimumFractionDigits: 2  
    });  

const duration = plan.duration_days || 0;  
const returnRate = Number(plan.return_rate || 0);  

const date = new Date(investment.created_at)  
    .toLocaleDateString("en-NG");  

card.innerHTML = `  
    <div class="investment-header">  

        <div class="investment-title">  

            <div class="investment-icon">  
                📊  
            </div>  

            <div>  
                <h3>${planName}</h3>  
                <p>${description}</p>  
            </div>  

        </div>  

        <span class="investment-status">  
            ${investment.status}  
        </span>  

    </div>  


    <div class="investment-details">  

        <div class="investment-detail">  
            <span>💰 Amount</span>  
            <strong>₦${amount}</strong>  
        </div>  

        <div class="investment-detail">  
            <span>📅 Duration</span>  
            <strong>${duration} days</strong>  
        </div>  

        <div class="investment-detail">  
            <span>📈 Demo Return</span>  
            <strong>${returnRate}%</strong>  
        </div>  
        <div class="investment-detail">
    <span>💰 Earned So Far</span>
    <strong>
        ₦${Number(investment.demo_earned || 0).toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 2
            }
        )}
    </strong>
</div> 


    <div class="investment-date">  
        Started: ${date}  
    </div>  


    <button  
class="investment-view-btn"  
type="button"  
onclick="openInvestmentModal(window.investmentsData.find(item => item.id === ${investment.id}))">  
View Details →

</button>  
    `;  container.appendChild(card);

});
}

async function logout() {

const { error } =  
    await supabaseClient.auth.signOut();  

if (error) {  
    console.error(error);  
    return;  
}  

window.location.href = "login.html";

}

document.addEventListener("DOMContentLoaded", () => {

loadDashboard();  

const logoutBtn =  
    document.getElementById("logoutBtn");  

if (logoutBtn) {  
    logoutBtn.addEventListener("click", (event) => {  
        event.preventDefault();  
        logout();  
    });  
}

});
function viewInvestmentDetails(investmentId) {
const investment = window.investmentsData?.find(
item => item.id === investmentId
);

if (!investment) {  
    alert("Investment details not found.");  
    return;  
}  

const plan = investment.investment_plans || {};  

const amount = Number(investment.amount || 0);  

const returnRate = Number(plan.return_rate || 0);  

const demoReturn = amount * returnRate / 100;  

const date = new Date(  
    investment.created_at  
).toLocaleDateString("en-NG");  

alert(  
    `Investment Details\n\n` +  
    `Plan: ${plan.name || "Unknown Plan"}\n` +  
    `Amount: ₦${amount.toLocaleString("en-NG", {  
        minimumFractionDigits: 2  
    })}\n` +  
    `Duration: ${plan.duration_days || 0} days\n` +  
    `Demo Return Rate: ${returnRate}%\n` +  
    `Estimated Demo Return: ₦${demoReturn.toLocaleString("en-NG", {  
        minimumFractionDigits: 2  
    })}\n` +  
    `Status: ${investment.status}\n` +  
    `Started: ${date}`  
);

}
// ===== INVESTMENT DETAILS MODAL =====

function openInvestmentModal(investment) {

const plan = investment.investment_plans || {};  

const amount = Number(investment.amount || 0);  
const returnRate = Number(plan.return_rate || 0);  
const demoReturn = amount * returnRate / 100;  

document.getElementById("modalPlanName").textContent =  
    plan.name || "Investment Details";  

document.getElementById("modalDescription").textContent =  
    plan.description || "Demo investment plan.";  

document.getElementById("modalAmount").textContent =  
    `₦${amount.toLocaleString("en-NG", {  
        minimumFractionDigits: 2  
    })}`;  

document.getElementById("modalDuration").textContent =  
    `${plan.duration_days || 0} days`;  

document.getElementById("modalReturnRate").textContent =  
    `${returnRate}%`;  

document.getElementById("modalDemoReturn").textContent =  
    `₦${demoReturn.toLocaleString("en-NG", {  
        minimumFractionDigits: 2  
    })}`;  

document.getElementById("modalStatus").textContent =  
    investment.status || "active";  

document.getElementById("modalDate").textContent =  
    new Date(investment.created_at).toLocaleDateString("en-NG");  

document.getElementById("investmentModal")  
    .classList.add("active");

}

function closeInvestmentModal() {
document.getElementById("investmentModal")
.classList.remove("active");
}

document.addEventListener("click", (event) => {

if (event.target.id === "closeInvestmentModal") {  
    closeInvestmentModal();  
}  

if (event.target.id === "investmentModal") {  
    closeInvestmentModal();  
}

});
// =========================
// REFERRAL SECTION
// =========================

async function loadReferralInfo() {

const {  
    data: { user },  
    error: userError  
} = await supabaseClient.auth.getUser();  

if (userError || !user) {  
    console.error(  
        "Unable to get current user:",  
        userError  
    );  
    return;  
}  

// Get the user's referral code  
const {  
    data: profile,  
    error: profileError  
} = await supabaseClient  
    .from("profiles")  
    .select("referral_code")  
    .eq("id", user.id)  
    .single();  

if (profileError || !profile) {  
    console.error(  
        "Referral profile error:",  
        profileError  
    );  
    return;  
}  

const referralCode =  
    profile.referral_code || "Not available";  

const referralCodeElement =  
    document.getElementById("referralCode");  

const referralLinkElement =  
    document.getElementById("referralLink");  

// Display referral code  
if (referralCodeElement) {  
    referralCodeElement.textContent =  
        referralCode;  
}  

// Build referral link  
if (  
    referralLinkElement &&  
    referralCode !== "Not available"  
) {  

    const currentPage =  
        window.location.href;  

    const baseUrl =  
        currentPage.substring(  
            0,  
            currentPage.lastIndexOf("/") + 1  
        );  

    const referralLink =  
        `${baseUrl}signup.html?ref=${encodeURIComponent(  
            referralCode  
        )}`;  

    referralLinkElement.value =  
        referralLink;  
}  


// =========================  
// REFERRAL STATISTICS  
// =========================  

const {  
    data: referrals,  
    error: referralError  
} = await supabaseClient  
    .from("referrals")  
    .select(  
        "bonus_amount, status"  
    )  
    .eq("referrer_id", user.id);  

if (referralError) {  

    console.error(  
        "Referral statistics error:",  
        referralError  
    );  

    return;  
}  

const referralCount =  
    referrals  
        ? referrals.length  
        : 0;  

const referralBonus =  
    referrals  
        ? referrals.reduce(  
            (total, referral) =>  
                total +  
                Number(  
                    referral.bonus_amount || 0  
                ),  
            0  
        )  
        : 0;  

const referralCountElement =  
    document.getElementById(  
        "referralCount"  
    );  

const referralBonusElement =  
    document.getElementById(  
        "referralBonus"  
    );  

if (referralCountElement) {  

    referralCountElement.textContent =  
        referralCount;  
}  

if (referralBonusElement) {  

    referralBonusElement.textContent =  
        `₦${referralBonus.toLocaleString(  
            "en-NG",  
            {  
                minimumFractionDigits: 2  
            }  
        )}`;  
}

}

// =========================
// COPY REFERRAL LINK
// =========================

document.addEventListener("DOMContentLoaded", () => {
  loadWithdrawalHistory();

loadReferralInfo();   loadDemoDepositHistory();

const copyButton =  
    document.getElementById("copyReferralBtn");  

if (copyButton) {  

    copyButton.addEventListener(  
        "click",  
        async () => {  

            const link =  
                document.getElementById(  
                    "referralLink"  
                ).value;  

            try {  

                await navigator.clipboard.writeText(link);  

                copyButton.textContent =  
                    "✅ Copied!";  

                setTimeout(() => {  
                    copyButton.textContent =  
                        "📋 Copy";  
                }, 2000);  

            } catch (error) {  

                console.error(  
                    "Copy error:",  
                    error  
                );  

                alert(  
                    "Unable to copy the referral link."  
                );  
            }  
        }  
    );  
}

});
// =========================
// DEMO WITHDRAWAL
// =========================

async function submitDemoWithdrawal(event) {

    event.preventDefault();

    const amountInput =
        document.getElementById("withdrawalAmount");

    const bankInput =
        document.getElementById("withdrawalBank");

    const accountNameInput =
        document.getElementById("withdrawalAccountName");

    const accountNumberInput =
        document.getElementById("withdrawalAccountNumber");

    const message =
        document.getElementById("withdrawalMessage");

    const button =
        document.getElementById("withdrawalBtn");

    const amount =
        Number(amountInput.value);

    const bankName =
        bankInput.value.trim();

    const accountName =
        accountNameInput.value.trim();

    const accountNumber =
        accountNumberInput.value.trim();

    if (!amount || amount < 2000) {
    message.textContent =
        "Minimum demo withdrawal is ₦2,000.";
    return;
    }

    if (!bankName || !accountName || !accountNumber) {
        message.textContent =
            "Please complete all withdrawal details.";
        return;
    }

    if (!/^\d{10}$/.test(accountNumber)) {
        message.textContent =
            "Account number must contain 10 digits.";
        return;
    }

    button.disabled = true;
    button.textContent = "Processing...";

    message.textContent =
        "Creating demo withdrawal...";

    const {
        data,
        error
    } = await supabaseClient.rpc(
        "create_demo_withdrawal",
        {
            p_amount: amount,
            p_bank_name: bankName,
            p_account_name: accountName,
            p_account_number: accountNumber
        }
    );

    if (error) {

        console.error(
            "Withdrawal error:",
            error
        );

        message.textContent =
            "Unable to create demo withdrawal.";

        button.disabled = false;
        button.textContent =
            "💸 Request Demo Withdrawal";

        return;
    }

    if (!data || !data.success) {

        message.textContent =
            data?.message ||
            "Withdrawal request failed.";

        button.disabled = false;
        button.textContent =
            "💸 Request Demo Withdrawal";

        return;
    }

    message.textContent =
        "✅ Demo withdrawal requested successfully.";

    amountInput.value = "";
    bankInput.value = "";
    accountNameInput.value = "";
    accountNumberInput.value = "";

    button.disabled = false;
    button.textContent =
        "💸 Request Demo Withdrawal";

    // Update displayed balance
    const balanceElement =
        document.getElementById("balance");

    if (balanceElement) {

        balanceElement.textContent =
            `₦${Number(data.new_balance || 0).toLocaleString(
                "en-NG",
                {
                    minimumFractionDigits: 2
                }
            )}`;
    }

    const withdrawalBalance =
        document.getElementById(
            "withdrawalBalance"
        );

    if (withdrawalBalance) {

        withdrawalBalance.textContent =
            `₦${Number(data.new_balance || 0).toLocaleString(
                "en-NG",
                {
                    minimumFractionDigits: 2
                }
            )}`;
    }
  await loadWithdrawalHistory();
}


// =========================
// CONNECT WITHDRAWAL FORM
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const withdrawalForm =
        document.getElementById(
            "withdrawalForm"
        );

    if (withdrawalForm) {

        withdrawalForm.addEventListener(
            "submit",
            submitDemoWithdrawal
        );
    }

});
// =========================
// LOAD WITHDRAWAL HISTORY
// =========================

async function loadWithdrawalHistory() {

    const container =
        document.getElementById(
            "withdrawalHistory"
        );

    if (!container) {
        return;
    }

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
        container.innerHTML =
            "<p>Please log in to view withdrawals.</p>";
        return;
    }

    const {
        data: withdrawals,
        error
    } = await supabaseClient
        .from("demo_withdrawals")
        .select(`
            id,
            amount,
            bank_name,
            account_name,
            account_number,
            status,
            created_at
        `)
        .eq("user_id", user.id)
        .order("created_at", {
            ascending: false
        });

    if (error) {

        console.error(
            "Withdrawal history error:",
            error
        );

        container.innerHTML =
            "<p>Unable to load withdrawal history.</p>";

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
        "withdrawal-history-card";

    const amount =
        Number(withdrawal.amount || 0)
            .toLocaleString("en-NG", {
                minimumFractionDigits: 2
            });

    const dateTime =
        new Date(withdrawal.created_at);

    const formattedDate =
        dateTime.toLocaleDateString("en-NG", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    const formattedTime =
        dateTime.toLocaleTimeString("en-NG", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    const accountNumber =
        withdrawal.account_number || "";

    const maskedAccount =
        accountNumber.length >= 4
            ? "•••• •••• " + accountNumber.slice(-4)
            : accountNumber;

    const status =
        withdrawal.status || "pending";

    const statusLabel =
        status.charAt(0).toUpperCase() +
        status.slice(1);

    const pendingActive =
        true;

    const processingActive =
        ["processing", "completed"].includes(status);

    const completedActive =
        status === "completed";

    const cancelled =
        status === "cancelled";

    card.innerHTML = `
        <div class="withdrawal-history-top">

            <div>
                <span class="withdrawal-history-label">
                    Withdrawal ID
                </span>

                <strong class="wi