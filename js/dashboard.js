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
 
  const pendingRef = localStorage.getItem("pending_ref");
await supabaseClient.rpc("ensure_profile", { p_ref: pendingRef });
localStorage.removeItem("pending_ref");
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
    if (!container) return;

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
    loadReferralInfo();
    
    const copyBtn = document.getElementById("copyReferralBtn");
    const linkInput = document.getElementById("referralLink");
    
    if (copyBtn && linkInput) {
        copyBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(linkInput.value);
            } catch {
                linkInput.select();
                document.execCommand("copy");
            }
            alert("Referral link copied!");
        });
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
        "Minimum is ₦2,000.";
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
  a
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
// AUTO REFRESH DASHBOARD
// =========================

setInterval(async () => {

    try {

        await loadDashboard();

    } catch (error) {

        console.error(
            "Dashboard auto-refresh error:",
            error
        );

    }

}, 60 * 1000);


    //__________________
    //deposit function//
    //_-_-_-_-_-_-_-_-//
    
   document.getElementById("depositBtn").addEventListener("click", async () => {
    const amount = Number(document.getElementById("depositAmount").value);
    if (!(amount > 0)) return alert("Enter a valid amount");
    
    const { data, error } = await supabaseClient.functions.invoke("create-deposit", {
        body: { amount },
    });
    
    if (error) {
        let msg = error.message;
        try {
            const text = await error.context.text();
            try { msg = JSON.parse(text).error || text; } catch { msg = text; }
        } catch {}
        return alert("Deposit error: " + msg);
    }
    if (!data?.link) return alert(data?.error || "Deposit failed");
    
    window.location.href = data.link;
});

// EDIT: use demo details only, not a real bank account
const MANUAL_ACCOUNT = { bank: "Demo Bank", number: "0000000000", name: "InvestPro Demo" };

const manualAccountEl = document.getElementById("manualAccount");
if (manualAccountEl) {
  manualAccountEl.textContent =
    `Send to: ${MANUAL_ACCOUNT.bank} | ${MANUAL_ACCOUNT.number} | ${MANUAL_ACCOUNT.name}`;
}

document.getElementById("manualBtn")?.addEventListener("click", async () => {
  const amount = Number(document.getElementById("manualAmount").value);
  const sender = document.getElementById("manualSender").value.trim();
  const msg = document.getElementById("manualMsg");
  const btn = document.getElementById("manualBtn");

  if (!(amount >= 1000)) { msg.textContent = "Minimum deposit is ₦1,000."; return; }
  if (!sender) { msg.textContent = "Enter the sender account name."; return; }

  btn.disabled = true;
  msg.textContent = "Submitting...";

  const { data, error } = await supabaseClient.rpc("submit_manual_deposit", {
    p_amount: amount,
    p_sender_name: sender,
  });

  btn.disabled = false;

  if (error || !data?.success) {
    console.error(error);
    msg.textContent = data?.message || "Unable to submit deposit.";
    return;
  }

  msg.textContent = `✅ Submitted. Reference: ${data.reference}. Waiting for approval.`;
  document.getElementById("manualAmount").value = "";
  document.getElementById("manualSender").value = "";
});