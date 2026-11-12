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
await supabaseClient.rpc("settle_demo_returns");

// Load user profile  
const { data: profile, error: profileError } =  
    await supabaseClient  
        .from("profiles")  
        .select("email, full_name, balance, total_invested")  
        .eq("id", user.id)  
        .single();  

if (profileError) {  
    console.error("Profile error:", profileError);  

    document.getElementById("welcomeMessage").textContent =  
        "Unable to load profile.";  

    return;  
}  

// Welcome message  
const displayName = (
    profile.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    (profile.email || user.email || "User").split("@")[0]
).trim();

document.getElementById("welcomeMessage").textContent =
    `Welcome, ${displayName}!`;
// Balance  
document.getElementById("balance").textContent =
    `₦${Number(profile.balance || 0).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
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
    
   

// EDIT: use demo details only, not a real bank account

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
// =========================
// SHARE REFERRAL LINK
// =========================
function getReferralLink() {
    const input = document.getElementById("referralLink");
    const link = input ? input.value.trim() : "";
    if (!link || link.toLowerCase().startsWith("loading")) {
        alert("Your referral link is still loading. Try again in a moment.");
        return null;
    }
    return link;
}
const SHARE_TEXT = `🚀 WELCOME TO INVESTPRO!
🔞 Approved by government for APC 

Your opportunity to explore a smarter way of managing investments starts here.

InvestPro brings together a modern digital investment experience, demonstration investment plans, an intuitive dashboard, and a referral programme.
 🔞 ÀBOUT INVESTPRO 
 this platform was improved by 
 Enugu government for election campaign 

💎 EXPLORE INVESTPRO:

📊 Investment Plans – Explore different plans, durations and displayed returns.

💰 Personal Dashboard – Monitor your demo balance and account activities.

📈 Investment Tracking – Follow your demonstration investments.

🤝 Referral Programme – Invite friends using your unique referral link.

🔐 Account Management – Enjoy a simple registration and dashboard experience.

🌟 Discover how modern digital investment platforms work.

🔥 CREATE YOUR FREE INVESTMENT ACCOUNT TODAY!

Join InvestPro using my personal referral link:`;
document.getElementById("shareWhatsApp")?.addEventListener("click", () => {
    const link = getReferralLink();
    if (!link) return;
    const url = "https://wa.me/?text=" + encodeURIComponent(SHARE_TEXT + " " + link);
    window.open(url, "_blank", "noopener");
});

document.getElementById("shareFacebook")?.addEventListener("click", () => {
    const link = getReferralLink();
    if (!link) return;
    const url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(link);
    window.open(url, "_blank", "noopener");
});

document.getElementById("shareMore")?.addEventListener("click", async () => {
    const link = getReferralLink();
    if (!link) return;

    if (navigator.share) {
        try {
            await navigator.share({ title: "InvestPro", text: SHARE_TEXT, url: link });
        } catch (e) { /* user closed the share menu */ }
    } else {
        try {
            await navigator.clipboard.writeText(link);
            alert("Link copied. Paste it anywhere to share.");
        } catch {
            alert("Copy this link: " + link);
        }
    }
});

// ===== POPUPS: DEPOSIT + WITHDRAW =====
// keep placeholder details while this is a demo
const MANUAL_ACCOUNT = { bank: "Opay", number: "9017748158", name: "InvestPro OR Maryam Jumai Omeh" };

const BANKS = ["Access Bank","Citibank Nigeria","Ecobank Nigeria","Fidelity Bank","First Bank of Nigeria",
  "First City Monument Bank","Globus Bank","Guaranty Trust Bank","Heritage Bank","Jaiz Bank","Keystone Bank",
  "Polaris Bank","Providus Bank","Stanbic IBTC Bank","Standard Chartered Bank","Sterling Bank","Titan Trust Bank",
  "Union Bank of Nigeria","United Bank For Africa","Unity Bank","Wema Bank","Zenith Bank","Opay","PalmPay",
  "Kuda","Moniepoint","VFD Microfinance Bank"];

const bankSelect = document.getElementById("withdrawalBank");
if (bankSelect && bankSelect.options.length <= 1) {
  BANKS.forEach((b) => bankSelect.add(new Option(b, b)));
}

function openModal(id) {
  document.getElementById(id)?.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModals() {
  document.querySelectorAll(".md-overlay.open").forEach((m) => m.classList.remove("open"));
  document.body.style.overflow = "";
}

document.getElementById("openDeposit")?.addEventListener("click", () => openModal("depositModal"));
document.getElementById("openWithdraw")?.addEventListener("click", () => openModal("withdrawModal"));
document.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", closeModals));
document.querySelectorAll(".md-overlay").forEach((o) =>
  o.addEventListener("click", (e) => { if (e.target === o) closeModals(); }));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModals(); });

// tabs
document.querySelectorAll(".md-tab").forEach((tab) =>
  tab.addEventListener("click", () => {
    document.querySelectorAll(".md-tab").forEach((t) => t.classList.toggle("active", t === tab));
    document.getElementById("tabCard").style.display = tab.dataset.tab === "card" ? "" : "none";
    document.getElementById("tabBank").style.display = tab.dataset.tab === "bank" ? "" : "none";
  }));

// Flutterwave deposit
document.getElementById("mdDepBtn")?.addEventListener("click", async () => {
  const amount = Number(document.getElementById("mdDepAmount").value);
  if (!(amount >= 2000)) return alert("Minimum deposit is ₦2,000.");

  const btn = document.getElementById("mdDepBtn");
  btn.disabled = true;
  btn.textContent = "Opening payment...";

  const { data, error } = await supabaseClient.functions.invoke("create-deposit", { body: { amount } });

  if (error || !data?.link) {
    let msg = data?.error || error?.message || "Deposit failed Try manual deposit ℹ️";
    try {
      const t = await error.context.text();
      try { msg = JSON.parse(t).error || t; } catch { msg = t; }
    } catch {}
    alert("Deposit error: " + msg);
    btn.disabled = false;
    btn.textContent = "Pay with Flutterwave";
    return;
  }
  window.location.href = data.link;
});

// bank transfer details + copy buttons
function setTxt(id, v) { const n = document.getElementById(id); if (n) n.textContent = v; }
setTxt("mdAcctBank", MANUAL_ACCOUNT.bank);
setTxt("mdAcctNumber", MANUAL_ACCOUNT.number);
setTxt("mdAcctName", MANUAL_ACCOUNT.name);

async function copyValue(text, btn) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const t = document.createElement("textarea");
    t.value = text; document.body.appendChild(t); t.select();
    document.execCommand("copy"); t.remove();
  }
  const old = btn.textContent;
  btn.textContent = "✅ Copied";
  btn.classList.add("done");
  setTimeout(() => { btn.textContent = old; btn.classList.remove("done"); }, 1500);
}
document.getElementById("mdCopyNumber")?.addEventListener("click", (e) => copyValue(MANUAL_ACCOUNT.number, e.currentTarget));
document.getElementById("mdCopyName")?.addEventListener("click", (e) => copyValue(MANUAL_ACCOUNT.name, e.currentTarget));

// manual deposit submit
document.getElementById("mdManBtn")?.addEventListener("click", async () => {
  const amount = Number(document.getElementById("mdManAmount").value);
  const sender = document.getElementById("mdManSender").value.trim();
  const msg = document.getElementById("mdManMsg");
  const btn = document.getElementById("mdManBtn");

  if (!(amount >= 1000)) { msg.textContent = "Minimum deposit is ₦1,000."; return; }
  if (!sender) { msg.textContent = "Enter the sender account name."; return; }

  btn.disabled = true;
  msg.textContent = "Submitting...";
  const { data, error } = await supabaseClient.rpc("submit_manual_deposit", { p_amount: amount, p_sender_name: sender });
  btn.disabled = false;

  if (error || !data?.success) {
    msg.textContent = data?.message || "Unable to submit deposit.";
    return;
  }
  msg.textContent = `✅ Submitted. Reference: ${data.reference}. Your balance updates after approval.`;
  document.getElementById("mdManAmount").value = "";
  document.getElementById("mdManSender").value = "";
});
// ===== TOP CARD =====
// ===== INVITE POPUP =====
document.getElementById("goReferral")?.addEventListener("click", () => {
  openModal("referralModal");
  loadReferralInfo();   // refresh code, link and stats each time it opens
});

document.getElementById("copyReferralBtn")?.addEventListener("click", async (e) => {
  const link = document.getElementById("referralLink")?.value || "";
  if (!link || link.toLowerCase().startsWith("loading")) return;
  const btn = e.currentTarget;
  try { await navigator.clipboard.writeText(link); }
  catch {
    const input = document.getElementById("referralLink");
    input.select(); document.execCommand("copy");
  }
  const old = btn.textContent;
  btn.textContent = "✅ Copied";
  setTimeout(() => { btn.textContent = old; }, 1500);
});

// ===== TOP CARD STATS =====
const fmtNaira = (n) =>
  "₦" + Number(n || 0).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

async function fillTopStats() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  // Demo Returns = total earned on the user's investments
  const { data: inv } = await supabaseClient
    .from("investments")
    .select("demo_earned")
    .eq("user_id", user.id);

  const returns = (inv || []).reduce((s, i) => s + Number(i.demo_earned || 0), 0);

  // Referral Bonus = bonuses from completed referrals
  const { data: refs } = await supabaseClient
    .from("referrals")
    .select("bonus_amount, status")
    .eq("referrer_id", user.id);

  const bonus = (refs || []).reduce((s, r) => s + Number(r.bonus_amount || 0), 0);

  const set = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.textContent = fmtNaira(v);
  };

  set("demoReturns", returns);
  set("topReferralBonus", bonus);

}

fillTopStats();

// ===== EARN REWARDS =====
const tkNaira = (n) =>
  "₦" + Number(n || 0).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function tkEl(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function tkSet(id, v) { const n = document.getElementById(id); if (n) n.textContent = v; }
function tkSafeUrl(u) {
  try { const x = new URL(u); return /^https?:$/.test(x.protocol) ? x.href : null; }
  catch { return null; }
}
function tkIcon(p) {
  p = String(p || "").toLowerCase();
  if (p.includes("whatsapp")) return "💬";
  if (p.includes("youtube")) return "▶️";
  if (p.includes("facebook")) return "📘";
  if (p.includes("instagram")) return "📷";
  if (p.includes("tiktok")) return "🎵";
  if (p.includes("twitter") || p.includes("x")) return "🐦";
  if (p.includes("telegram")) return "✈️";
  return "🎯";
}

async function tkRefreshSummary() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;
  const { data: p } = await supabaseClient
    .from("profiles").select("rewards_balance").eq("id", user.id).single();
  const v = tkNaira(p?.rewards_balance);
  tkSet("taskEarnings", v);
  tkSet("tkTotal", v);
}

async function loadTasks() {
  const list = document.getElementById("tkList");
  if (!list) return;

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const [t, s] = await Promise.all([
    supabaseClient.from("social_tasks")
      .select("id, title, description, platform, reward_amount, task_url")
      .eq("is_active", true).order("created_at", { ascending: true }),
    supabaseClient.from("user_task_submissions")
      .select("task_id, status").eq("user_id", user.id),
  ]);

  if (t.error || s.error) {
    console.error(t.error || s.error);
    list.textContent = "Unable to load tasks.";
    return;
  }

  const status = {};
  (s.data || []).forEach((r) => { status[r.task_id] = r.status; });

  const tasks = t.data || [];
  const done = tasks.filter((x) => status[x.id] === "approved").length;
  tkSet("tkProgress", `${done} of ${tasks.length} tasks completed`);
  const fill = document.getElementById("tkBarFill");
  if (fill) fill.style.width = (tasks.length ? (done / tasks.length) * 100 : 0) + "%";

  list.innerHTML = "";
  if (!tasks.length) { list.textContent = "No tasks available right now."; return; }

  tasks.forEach((task) => {
    const st = status[task.id];
    const card = tkEl("div", "tk-card");

    const head = tkEl("div", "tk-head");
    head.appendChild(tkEl("div", "tk-ico", tkIcon(task.platform)));
    const info = tkEl("div");
    info.appendChild(tkEl("p", "tk-title", task.title));
    info.appendChild(tkEl("p", "tk-desc", task.description || ""));
    head.appendChild(info);
    head.appendChild(tkEl("div", "tk-reward", "+" + tkNaira(task.reward_amount)));
    card.appendChild(head);

    if (st) {
      const label = { pending: "⏳ Pending review", approved: "✅ Approved", rejected: "❌ Rejected, you can resubmit" }[st];
      card.appendChild(tkEl("span", "tk-badge " + st, label));
    }

    const url = tkSafeUrl(task.task_url);
    if (url && st !== "approved") {
      const a = tkEl("a", "tk-visit", "Visit Platform");
      a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
      card.appendChild(a);
    }

    if (st !== "approved") {
      const locked = st === "pending";
      const input = tkEl("input", "tk-proof");
      input.type = "text";
      input.placeholder = "Paste your proof or public link";
      input.maxLength = 500;
      input.disabled = locked;

      const btn = tkEl("button", "tk-submit", st === "rejected" ? "Resubmit task" : "Submit task");
      btn.type = "button";
      btn.disabled = locked;
      btn.addEventListener("click", () => submitTask(task.id, input, btn));

      card.append(input, btn);
    }
    list.appendChild(card);
  });
}

async function submitTask(taskId, input, btn) {
  const msg = document.getElementById("tkMsg");
  const proof = input.value.trim();
  if (proof.length < 5) { msg.textContent = "Enter your proof first."; return; }

  btn.disabled = true;
  msg.textContent = "Submitting...";

  const { data, error } = await supabaseClient.rpc("submit_task", {
    p_task_id: taskId,
    p_proof: proof,
  });

  if (error || !data?.success) {
    console.error(error);
    msg.textContent = data?.message || "Unable to submit task.";
    btn.disabled = false;
    return;
  }
  msg.textContent = "✅ " + data.message;
  await loadTasks();
}

function openTasksPopup() {
  openModal("tasksModal");
  tkSet("tkProgress", "Loading...");
  loadTasks();
  tkRefreshSummary();
}
document.getElementById("openTasks")?.addEventListener("click", openTasksPopup);
document.getElementById("taskStat")?.addEventListener("click", openTasksPopup);

tkRefreshSummary();