let currentTab = "deposits";
let currentFilter = "all";
let data = { deposits: [], withdrawals: [], returns: [] };

const FILTERS = {
  deposits: ["all", "approved", "pending", "rejected"],
  withdrawals: ["all", "pending", "processing", "completed", "cancelled"],
  returns: ["all"],
};

const naira = (n) =>
  "₦" + Number(n || 0).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (d) => new Date(d).toLocaleString("en-NG");

async function loadHistory() {
  const total = document.getElementById("dhTotal");

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) { window.location.href = "login.html"; return; }

  await supabaseClient.rpc("settle_demo_returns");

  const [dep, wd, ret] = await Promise.all([
    supabaseClient.from("demo_deposits")
      .select("id, amount, status, created_at, approved_at, payment_reference")
      .eq("user_id", user.id).order("created_at", { ascending: false }),
    supabaseClient.from("demo_withdrawals")
      .select("id, amount, status, created_at, bank_name, account_name, account_number")
      .eq("user_id", user.id).order("created_at", { ascending: false }),
    supabaseClient.from("demo_earnings")
      .select("id, plan_name, principal, profit, total, created_at")
      .eq("user_id", user.id).order("created_at", { ascending: false }),
  ]);

  if (dep.error || wd.error || ret.error) {
    console.error(dep.error || wd.error || ret.error);
    total.textContent = "Unable to load history.";
    return;
  }

  data.deposits = dep.data || [];
  data.withdrawals = wd.data || [];
  data.returns = ret.data || [];
  render();
}

function renderFilters() {
  const box = document.getElementById("dhFilters");
  box.innerHTML = "";
  if (FILTERS[currentTab].length < 2) return;
  FILTERS[currentTab].forEach((f) => {
    const b = document.createElement("button");
    b.dataset.f = f;
    b.textContent = f.charAt(0).toUpperCase() + f.slice(1);
    if (f === currentFilter) b.className = "active";
    box.appendChild(b);
  });
}

function renderTotal() {
  const total = document.getElementById("dhTotal");
  const all = data[currentTab];

  if (currentTab === "deposits") {
    const sum = all.filter((d) => d.status === "approved").reduce((s, d) => s + Number(d.amount || 0), 0);
    total.textContent = `Total deposited: ${naira(sum)} (${all.length} deposit${all.length === 1 ? "" : "s"})`;
  } else if (currentTab === "withdrawals") {
    const sum = all.filter((w) => w.status === "completed").reduce((s, w) => s + Number(w.amount || 0), 0);
    total.textContent = `Total withdrawn: ${naira(sum)} (${all.length} request${all.length === 1 ? "" : "s"})`;
  } else {
    const sum = all.reduce((s, r) => s + Number(r.profit || 0), 0);
    total.textContent = `Total returns earned: ${naira(sum)} (${all.length} payout${all.length === 1 ? "" : "s"})`;
  }
}

function line(text) {
  const el = document.createElement("div");
  el.className = "dh-meta";
  el.textContent = text;
  return el;
}

function render() {
  renderFilters();
  renderTotal();

  const list = document.getElementById("dhList");
  const rows = data[currentTab].filter(
    (r) => currentFilter === "all" || r.status === currentFilter
  );
  list.innerHTML = "";

  if (!rows.length) {
    const p = document.createElement("p");
    p.textContent = "Nothing here yet.";
    list.appendChild(p);
    return;
  }

  rows.forEach((r) => {
    const card = document.createElement("div");
    card.className = "dh-card";

    const top = document.createElement("div");
    top.className = "dh-row";
    const amt = document.createElement("strong");
    const badge = document.createElement("span");

    if (currentTab === "returns") {
      amt.textContent = "+" + naira(r.total);
      badge.className = "dh-badge approved";
      badge.textContent = "credited";
    } else {
      amt.textContent = naira(r.amount);
      badge.className = "dh-badge " + r.status;
      badge.textContent = r.status;
    }
    top.append(amt, badge);
    card.appendChild(top);
    card.appendChild(line(fmt(r.created_at)));

    if (currentTab === "deposits") {
      if (r.approved_at) card.appendChild(line("Approved: " + fmt(r.approved_at)));
      card.appendChild(line("Ref: " + (r.payment_reference || "-")));
    } else if (currentTab === "withdrawals") {
      const acct = r.account_number || "";
      const masked = acct.length >= 4 ? "•••• " + acct.slice(-4) : acct;
      card.appendChild(line(`${r.bank_name || "-"} | ${r.account_name || "-"} | ${masked}`));
      card.appendChild(line("Request #" + r.id));
    } else {
      card.appendChild(line(`${r.plan_name || "Plan"}: invested ${naira(r.principal)} + return ${naira(r.profit)}`));
    }
    list.appendChild(card);
  });
}

document.getElementById("dhTabs").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  currentTab = btn.dataset.tab;
  currentFilter = "all";
  document.querySelectorAll("#dhTabs button").forEach((b) => b.classList.toggle("active", b === btn));
  render();
});

document.getElementById("dhFilters").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  currentFilter = btn.dataset.f;
  render();
});

loadHistory();