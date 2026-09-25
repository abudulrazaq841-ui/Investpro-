/* ===== PERFECT DARK THEME ===== */
:root{
  --bg: #0b0e14;
  --bg-card: #151a25;
  --bg-input: #1e2535;
  --bg-dark: #070a10;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --text: #f8fafc;
  --text-dim: #94a3b8;
  --text-light: #64748b;
  --border: #1e293b;
  --border-light: #2a3447;
  --white: #ffffff;
  --green: #22c55e;
  --shadow: 0 10px 30px rgba(0,0,0,0.5);
  --radius: 14px;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', Arial, sans-serif;
}

body{
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

/* ===== HEADER ===== */
header{
  background: rgba(11, 14, 20, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  color: white;
  padding: 18px 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo{
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.logo span{
  color: var(--primary);
}

nav a{
  color: var(--text-dim);
  text-decoration: none;
  margin-left: 24px;
  font-weight: 600;
  font-size: 14px;
  transition: 0.2s;
}

nav a:hover{
  color: var(--text);
}

/* ===== HERO ===== */
.hero{
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  background: 
    radial-gradient(800px at 20% 30%, rgba(59,130,246,0.15) 0%, transparent 60%),
    radial-gradient(600px at 80% 70%, rgba(139,92,246,0.12) 0%, transparent 60%),
    var(--bg);
  color: white;
  position: relative;
}

.hero-content{
  max-width: 750px;
  animation: fadeUp 0.8s ease;
}

.hero h1{
  font-size: clamp(38px, 6vw, 58px);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 20px;
  letter-spacing: -1.8px;
}

.hero p{
  font-size: 17px;
  line-height: 1.7;
  margin-bottom: 35px;
  color: var(--text-dim);
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.btn{
  display: inline-block;
  padding: 14px 28px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  margin: 6px;
  transition: all 0.2s;
  font-size: 14px;
  border: 1px solid transparent;
}

.btn-primary{
  background: var(--text);
  color: var(--bg);
}

.btn-primary:hover{
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255,255,255,0.15);
}

.btn-secondary{
  border: 1px solid var(--border-light);
  color: var(--text);
  background: var(--bg-card);
}

.btn-secondary:hover{
  background: var(--bg-input);
  border-color: var(--text-dim);
}

/* ===== FEATURES ===== */
.features{
  padding: 90px 6%;
  text-align: center;
}

.features h2{
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.8px;
}

.features > p{
  color: var(--text-dim);
  max-width: 600px;
  margin: 0 auto 50px;
  font-size: 15px;
}

.cards{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  text-align: left;
}

.card{
  background: var(--bg-card);
  padding: 30px 24px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.card:hover{
  transform: translateY(-4px);
  border-color: var(--border-light);
  box-shadow: var(--shadow);
}

.card h3{
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 700;
}

.card p{
  color: var(--text-dim);
  line-height: 1.7;
  font-size: 14px;
  margin: 10px 0;
}

/* ===== AUTH ===== */
.auth-section{
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.auth-box{
  width: 100%;
  max-width: 430px;
  background: var(--bg-card);
  padding: 38px 30px;
  border-radius: 18px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  animation: fadeUp 0.5s ease;
}

.auth-box h1{
  text-align: center;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 800;
}

.auth-box > p{
  text-align: center;
  color: var(--text-dim);
  margin-bottom: 28px;
  font-size: 14px;
}

.form-group{
  margin-bottom: 18px;
}

.form-group label{
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 12px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input{
  width: 100%;
  padding: 13px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  transition: 0.2s;
  background: var(--bg-input);
  color: var(--text);
}

.form-group input:focus{
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
}

.form-group input::placeholder{
  color: var(--text-light);
}

.auth-btn{
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: var(--primary);
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 10px;
}

.auth-btn:hover{
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.auth-link{
  margin-top: 22px;
  text-align: center;
  font-size: 13px;
  color: var(--text-dim);
}

.auth-link a{
  color: var(--primary);
  text-decoration: none;
  font-weight: 700;
}

#message{
  margin-top: 15px;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  background: var(--bg-input);
}

/* ===== FOOTER ===== */
footer{
  background: var(--bg-dark);
  border-top: 1px solid var(--border);
  color: var(--text-dim);
  text-align: center;
  padding: 28px 20px;
  font-size: 13px;
}

/* ===== ANIMATIONS ===== */
@keyframes fadeUp{
  from{opacity:0; transform: translateY(12px)}
  to{opacity:1; transform: translateY(0)}
}

/* ===== MOBILE ===== */
@media (max-width: 640px){
  header{padding: 16px 5%}
  .logo{font-size: 19px}
  nav a{margin-left: 14px; font-size: 13px}
  .features{padding: 60px 5%}
  .auth-box{padding: 28px 22px}
  .hero{padding: 60px 20px}
}
/* ===== DASHBOARD DARK ===== */
.dashboard{
  padding: 0;
  background: var(--bg);
}

.top-bar{
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  padding: 18px 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
}

.top-bar h2{
  font-size: 18px;
  font-weight: 700;
}

.dashboard-content{
  padding: 30px 6%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.stat-card{
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
}

.stat-card h4{
  color: var(--text-dim);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.stat-card h1{
  font-size: 28px;
  font-weight: 800;
}

.stat-card p{
  font-size: 13px;
  color: var(--text-dim);
  margin-top: 8px;
}

.ref-box{
  background: var(--bg-input);
  border: 1px dashed var(--border-light);
  padding: 14px;
  border-radius: 10px;
  word-break: break-all;
  font-size: 13px;
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.copy-btn{
  background: var(--primary);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.actions{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 18px;
}

.action-btn{
  background: var(--bg-input);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.action-btn:hover{
  background: var(--border);
}
/* Dashboard */

.dashboard-summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 25px 0;
}

.dashboard-summary .card {
    text-align: center;
    padding: 25px 15px;
}

.dashboard-summary .card h3 {
    margin-bottom: 12px;
    font-size: 17px;
}

.dashboard-summary .card p {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
}

.investment-list {
    display: grid;
    gap: 15px;
    margin-top: 20px;
}

.investment-list .card {
    margin: 0;
}

.status-active {
    display: inline-block;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: bold;
}

.dashboard-balance {
    text-align: center;
    margin-top: 20px;
}

.dashboard-balance p {
    font-size: 30px;
    font-weight: bold;
}

/* Mobile layout */

@media (max-width: 700px) {

    .dashboard-summary {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .dashboard-summary .card {
        padding: 20px 15px;
    }

    .dashboard-summary .card p {
        font-size: 22px;
    }

    .dashboard-balance p {
        font-size: 26px;
    }
}
/* Clean Home Page */

.hero-label {
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 15px;
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 25px;
    flex-wrap: wrap;
}

.secondary-btn {
    display: inline-block;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    border: 1px solid #ddd;
}

.section-text {
    text-align: center;
    margin-bottom: 25px;
}

.feature-icon {
    font-size: 32px;
    margin-bottom: 10px;
}

@media (max-width: 700px) {

    .hero h1 {
        font-size: 34px;
        line-height: 1.2;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: stretch;
    }

    .hero-buttons a {
        text-align: center;
    }
}
/* ===== IMPROVED NAVIGATION ===== */

header nav {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
}

header nav a {
    display: inline-block;
    padding: 7px 10px;
    border-radius: 7px;
}

header nav a:hover {
    background: var(--bg-card);
    color: var(--primary);
}

/* Mobile navigation */
@media (max-width: 640px) {

    header {
        padding: 14px 5%;
    }

    header nav {
        gap: 2px;
        justify-content: flex-end;
    }

    header nav a {
        margin-left: 4px;
        padding: 6px 7px;
        font-size: 12px;
    }

    .logo {
        font-size: 19px;
    }
}
/* ===== DASHBOARD WELCOME ===== */

.dashboard-welcome {
    background:
        radial-gradient(
            circle at top right,
            rgba(59,130,246,0.18),
            transparent 45%
        ),
        var(--bg-card);

    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    margin-bottom: 20px;
    animation: fadeUp 0.5s ease;
}

.dashboard-label {
    color: var(--primary);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 6px;
}

.dashboard-welcome h1 {
    font-size: 28px;
    margin-bottom: 6px;
}

.dashboard-welcome p:last-child {
    color: var(--text-dim);
    font-size: 14px;
}
/* ===== DASHBOARD SUMMARY CARDS ===== */

.dashboard-summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 25px;
}

.dashboard-summary .card {
    position: relative;
    overflow: hidden;
    padding: 24px;
    transition: transform 0.2s ease, border-color 0.2s ease;
}

.dashboard-summary .card:hover {
    transform: translateY(-3px);
    border-color: var(--primary);
}

.dashboard-summary .card h3 {
    color: var(--text-dim);
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 12px;
}

.dashboard-summary .card p {
    color: var(--text);
    font-size: 25px;
    font-weight: 800;
    margin: 0;
}

/* Mobile */
@media (max-width: 700px) {
    .dashboard-summary {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .dashboard-summary .card {
        padding: 20px;
    }
}
/* ===== LARGE INVESTMENT CARDS ===== */

.investment-list {
    display: grid;
    gap: 24px;
    margin-top: 25px;
}

.investment-list .card {
    padding: 32px;
    min-height: 240px;
    border-radius: 18px;
}

.investment-list .card h3 {
    font-size: 22px;
    margin-bottom: 20px;
}

.investment-list .card p {
    margin: 14px 0;
    font-size: 16px;
    color: var(--text-dim);
}

.investment-list .card strong {
    color: var(--text);
}

.status-active {
    display: inline-block;
    background: rgba(34, 197, 94, 0.12);
    color: var(--green);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
}

/* Mobile */
@media (max-width: 700px) {
    .investment-list .card {
        padding: 28px 24px;
        min-height: 230px;
    }

    .investment-list .card h3 {
        font-size: 21px;
    }

    .investment-list .card p {
        font-size: 15px;
        margin: 16px 0;
    }
}
/* ===== LARGE INVESTMENT PLAN CARDS ===== */

#plansContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 30px;
}

#plansContainer .card {
    padding: 32px 26px;
    min-height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 18px;
}

#plansContainer .card h3 {
    font-size: 22px;
    margin-bottom: 15px;
}

#plansContainer .card p {
    color: var(--text-dim);
    font-size: 15px;
    margin: 12px 0;
}

#plansContainer .card strong {
    color: var(--text);
}

#plansContainer .card .auth-btn {
    width: 100%;
    margin: 18px 0 0;
    padding: 14px;
}

/* Mobile */
@media (max-width: 700px) {

    #plansContainer {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    #plansContainer .card {
        min-height: 340px;
        padding: 28px 22px;
    }

    #plansContainer .card h3 {
        font-size: 21px;
    }
}
/* ===== PLAN BADGE ===== */

#plansContainer .card {
    position: relative;
}

#plansContainer .card::before {
    content: "DEMO PLAN";
    display: inline-block;
    width: fit-content;
    padding: 5px 10px;
    margin-bottom: 15px;
    border-radius: 20px;
    background: rgba(59, 130, 246, 0.12);
    color: var(--primary);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.6px;
}

#plansContainer .card .auth-btn {
    background: var(--primary);
    color: white;
}

#plansContainer .card .auth-btn:hover {
    background: var(--primary-hover);
}
/* ===== PLAN DETAILS ===== */

#plansContainer .card p {
    line-height: 1.7;
}

#plansContainer .card p strong {
    display: inline-block;
    min-width: 145px;
}

#plansContainer .card p:nth-of-type(2),
#plansContainer .card p:nth-of-type(3),
#plansContainer .card p:nth-of-type(4) {
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
}

/* Keep the Select Plan button clear */
#plansContainer .card .auth-btn {
    margin-top: 20px;
}
/* ===== LARGE DASHBOARD INVESTMENT CARDS ===== */

#investmentsContainer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 25px;
}

#investmentsContainer .card {
    width: 110%;
    min-height: 360px;
    padding: 32px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#investmentsContainer .card h3 {
    font-size: 25px;
    margin-bottom: 24px;
}

#investmentsContainer .card p {
    font-size: 17px;
    margin: 16px 0;
    line-height: 1.8;
}

#investmentsContainer .card strong {
    color: var(--text);
}

#investmentsContainer .status-active {
    padding: 7px 16px;
    font-size: 14px;
}

/* Mobile */
@media (max-width: 700px) {

    #investmentsContainer {
        gap: 24px;
    }

    #investmentsContainer .card {
        min-height: 350px;
        padding: 30px 24px;
    }

    #investmentsContainer .card h3 {
        font-size: 23px;
        margin-bottom: 24px;
    }

    #investmentsContainer .card p {
        font-size: 16px;
        margin: 18px 0;
    }
}
/* ===== DASHBOARD PLANS - EXTRA LARGE ===== */

#investmentsContainer .card {
    min-height: 420px;
    padding: 40px 32px;
    border-radius: 20px;
}

#investmentsContainer .card h3 {
    font-size: 27px;
    margin-bottom: 30px;
}

#investmentsContainer .card p {
    font-size: 18px;
    margin: 22px 0;
    line-height: 2;
}

#investmentsContainer .card .status-active {
    padding: 8px 18px;
    font-size: 15px;
}

/* Mobile */
@media (max-width: 700px) {

    #investmentsContainer .card {
        min-height: 400px;
        padding: 36px 28px;
    }

    #investmentsContainer .card h3 {
        font-size: 25px;
    }

    #investmentsContainer .card p {
        font-size: 17px;
        margin: 22px 0;
    }
}
/* =====================================================
   LARGE PROFESSIONAL DASHBOARD
   ===================================================== */

.dashboard-page {
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;
    padding: 35px 4%;
}


/* WELCOME */

.dashboard-welcome {
    min-height: 170px;
    padding: 30px 35px;

    display: flex;
    align-items: center;
    gap: 25px;

    border: 1px solid #2563eb;
    border-radius: 22px;

    background:
        radial-gradient(
            circle at 90% 20%,
            rgba(59,130,246,0.25),
            transparent 35%
        ),
        var(--bg-card);

    margin-bottom: 25px;
}

.welcome-icon {
    width: 85px;
    height: 85px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: var(--primary);

    font-size: 40px;
}

.dashboard-welcome span,
.balance-card span {
    color: var(--primary);

    font-size: 13px;
    font-weight: 800;

    letter-spacing: 1px;
}

.dashboard-welcome h1 {
    margin: 5px 0;

    font-size: 32px;
    font-weight: 800;
}

.dashboard-welcome p {
    color: var(--text-dim);
    font-size: 16px;
}

.welcome-chart {
    margin-left: auto;
    font-size: 65px;
}


/* BALANCE */

.balance-card {
    min-height: 150px;

    padding: 30px 35px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: var(--bg-card);

    border: 1px solid var(--border-light);
    border-radius: 20px;

    margin-bottom: 25px;
}

.balance-card h2 {
    margin-top: 8px;

    font-size: 38px;
    font-weight: 800;
}

.balance-icon {
    width: 70px;
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 18px;

    background: rgba(34,197,94,0.15);

    font-size: 35px;
}


/* SUMMARY */

.dashboard-summary {
    display: grid;

    grid-template-columns:
        repeat(3, minmax(0, 1fr));

    gap: 20px;

    margin: 25px 0;
}

.dashboard-stat {
    min-height: 145px;

    padding: 25px;

    display: flex;
    align-items: center;

    gap: 18px;

    background: var(--bg-card);

    border: 1px solid var(--border);

    border-radius: 18px;

    transition: 0.25s;
}

.dashboard-stat:hover {
    transform: translateY(-3px);

    border-color: var(--primary);

    box-shadow: var(--shadow);
}

.dashboard-stat span {
    display: block;

    color: var(--text-dim);

    font-size: 14px;

    margin-bottom: 8px;
}

.dashboard-stat strong {
    display: block;

    font-size: 27px;

    color: var(--text);
}

.stat-icon {
    width: 62px;
    height: 62px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 16px;

    background: var(--bg-input);

    font-size: 28px;
}


/* MY INVESTMENTS */

.my-investments {
    margin-top: 35px;
}

.section-heading {
    display: flex;

    justify-content: space-between;
    align-items: center;

    gap: 20px;

    margin-bottom: 25px;
}

.section-heading h2 {
    font-size: 30px;

    margin-bottom: 5px;
}

.section-heading p {
    color: var(--text-dim);

    font-size: 15px;
}

.dashboard-add-btn {
    display: inline-block;

    padding: 13px 22px;

    border-radius: 10px;

    background: var(--primary);

    color: white;

    text-decoration: none;

    font-weight: 700;

    white-space: nowrap;
}

.dashboard-add-btn:hover {
    background: var(--primary-hover);
}


/* LARGE INVESTMENT CARDS */

.investment-list {
    display: grid;

    grid-template-columns: 1fr;

    gap: 22px;
}

.investment-list .card {
    width: 100%;

    min-height: 280px;

    padding: 32px 38px;

    background: var(--bg-card);

    border: 1px solid var(--border-light);

    border-radius: 22px;

    box-shadow: var(--shadow);

    transition: 0.25s;
}

.investment-list .card:hover {
    transform: translateY(-3px);

    border-color: var(--primary);
}

.investment-list .card h3 {
    font-size: 28px;

    margin-bottom: 28px;
}

.investment-list .card p {
    font-size: 17px;

    margin: 18px 0;

    color: var(--text-dim);
}

.investment-list .card strong {
    color: var(--text);
}


/* STATUS */

.investment-list .status-active {
    display: inline-block;

    padding: 8px 18px;

    margin-left: 8px;

    border-radius: 30px;

    background: rgba(34,197,94,0.15);

    color: var(--green);

    font-weight: 800;
}


/* MOBILE */

@media (max-width: 800px) {

    .dashboard-page {
        padding: 25px 5%;
    }

    .dashboard-welcome {
        padding: 25px;

        min-height: 150px;
    }

    .welcome-icon {
        width: 65px;
        height: 65px;

        font-size: 30px;
    }

    .dashboard-welcome h1 {
        font-size: 25px;
    }

    .welcome-chart {
        display: none;
    }

    .dashboard-summary {
        grid-template-columns: 1fr;
    }

    .dashboard-stat {
        min-height: 125px;
    }

    .balance-card h2 {
        font-size: 30px;
    }

    .section-heading {
        flex-direction: column;

        align-items: flex-start;
    }

    .dashboard-add-btn {
        width: 100%;

        text-align: center;
    }

    .investment-list .card {
        min-height: 260px;

        padding: 28px 25px;
    }

    .investment-list .card h3 {
        font-size: 24px;
    }

    .investment-list .card p {
        font-size: 16px;
    }
}
/* ===== INVESTMENT CARD DETAILS ===== */

.dashboard-investment-card {
    min-height: 360px;
    padding: 32px;
}

.investment-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 25px;
}

.investment-detail {
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px;
}

.investment-detail span {
    display: block;
    color: var(--text-dim);
    font-size: 13px;
    margin-bottom: 8px;
}

.investment-detail strong {
    display: block;
    color: var(--text);
    font-size: 19px;
}

.investment-view-btn {
    width: 100%;
    margin-top: 10px;
    padding: 15px;
    border: none;
    border-radius: 10px;
    background: var(--primary);
    color: white;
    font-size: 15px;
    font-weight: 750;
    cursor: pointer;
}

.investment-view-btn:hover {
    background: var(--primary-dark);
}

@media (max-width: 700px) {

    .dashboard-investment-card {
        min-height: 400px;
        padding: 28px 22px;
    }

    .investment-details {
        grid-template-columns: 1fr;
    }

    .investment-detail {
        padding: 16px;
    }
}
/* ===== INVESTMENT DETAILS MODAL ===== */

.investment-modal {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.75);
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.investment-modal.active {
    display: flex;
}

.investment-modal-content {
    position: relative;
    width: 100%;
    max-width: 650px;
    max-height: 90vh;
    overflow-y: auto;
    background: var(--card);
    border: 1px solid var(--border-blue);
    border-radius: 20px;
    padding: 32px;
    box-shadow: var(--shadow), var(--blue-glow);
}

.investment-modal-content h2 {
    margin: 0 45px 8px 0;
    color: var(--text);
    font-size: 26px;
}

.investment-modal-content > p {
    color: var(--text-dim);
    margin-bottom: 25px;
}

.investment-modal-close {
    position: absolute;
    top: 18px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: var(--input);
    color: var(--text);
    font-size: 26px;
    cursor: pointer;
}

.investment-modal-close:hover {
    background: var(--primary);
}

.modal-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.modal-details > div {
    background: var(--input);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px;
}

.modal-details span {
    display: block;
    color: var(--text-dim);
    font-size: 13px;
    margin-bottom: 8px;
}

.modal-details strong {
    display: block;
    color: var(--text);
    font-size: 18px;
}

@media (max-width: 600px) {

    .investment-modal-content {
        padding: 25px 20px;
    }

    .modal-details {
        grid-template-columns: 1fr;
    }
}
/* ===== PLANS PAGE ===== */

#plansContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    margin: 35px auto;
}

#plansContainer .card {
    min-height: 390px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}

#plansContainer .card:hover {
    transform: translateY(-6px);
    border-color: var(--border-blue);
}

#plansContainer .card h3 {
    font-size: 25px;
    margin-bottom: 12px;
}

#plansContainer .card p {
    color: var(--text-dim);
    line-height: 1.7;
    margin: 10px 0;
}

#plansContainer .card strong {
    color: var(--text);
}

#plansContainer .card .auth-btn {
    width: 100%;
    margin-top: 20px;
    text-align: center;
}

/* Demo badge */

#plansContainer .card::before {
    content: "DEMO PLAN";
    display: inline-block;
    width: fit-content;
    margin-bottom: 18px;
    padding: 6px 10px;
    border-radius: 20px;
    background: rgba(37, 99, 235, 0.15);
    color: var(--primary-light);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.8px;
}

/* Mobile */

@media (max-width: 900px) {
    #plansContainer {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    #plansContainer {
        grid-template-columns: 1fr;
    }

    #plansContainer .card {
        min-height: 350px;
        padding: 25px;
    }
}
/* =========================
   REFERRAL PROGRAM
========================= */

.my-referrals {
    width: 100%;
    margin: 40px 0;
}

.referral-label {
    color: var(--primary-light);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.2px;
    margin-bottom: 8px;
}


/* Main Referral Card */

.referral-card {
    width: 100%;
    max-width: 1100px;
    margin: 25px auto 0;
    padding: 30px;
    background:
        linear-gradient(
            145deg,
            rgba(37, 99, 235, 0.12),
            var(--card) 45%
        );
    border: 1px solid var(--border-blue);
    border-radius: 20px;
    box-shadow: var(--shadow);
}


/* Header */

.referral-card-header {
    display: flex;
    align-items: center;
    gap: 18px;
    padding-bottom: 25px;
    border-bottom: 1px solid var(--border);
}

.referral-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(37, 99, 235, 0.15);
    border: 1px solid var(--border-blue);
    border-radius: 16px;
    font-size: 30px;
    flex-shrink: 0;
}

.referral-card-header h3 {
    margin: 0 0 5px;
    font-size: 23px;
}

.referral-card-header p {
    margin: 0;
    color: var(--text-dim);
}


/* Referral Code */

.referral-code-box {
    margin-top: 25px;
    padding: 20px;
    background: var(--input);
    border: 1px solid var(--border);
    border-radius: 14px;
}

.referral-code-box span,
.referral-link-box label {
    display: block;
    color: var(--text-dim);
    font-size: 13px;
    margin-bottom: 9px;
}

.referral-code-box strong {
    display: block;
    color: var(--primary-light);
    font-size: 26px;
    letter-spacing: 1px;
}


/* Referral Link */

.referral-link-box {
    margin-top: 18px;
}

.referral-link-row {
    display: flex;
    gap: 12px;
}

.referral-link-row input {
    flex: 1;
    min-width: 0;
    height: 52px;
    padding: 0 16px;
    background: var(--input);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 12px;
    outline: none;
    font-size: 14px;
}

.referral-link-row input:focus {
    border-color: var(--primary-light);
}

.referral-copy-btn {
    min-width: 120px;
    height: 52px;
    margin: 0;
}


/* Statistics */

.referral-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    margin-top: 22px;
}

.referral-stat {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 22px;
    background: var(--input);
    border: 1px solid var(--border);
    border-radius: 15px;
}

.referral-stat-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(37, 99, 235, 0.15);
    border-radius: 12px;
    font-size: 23px;
}

.referral-stat span {
    display: block;
    color: var(--text-dim);
    font-size: 13px;
    margin-bottom: 5px;
}

.referral-stat strong {
    display: block;
    color: var(--text);
    font-size: 23px;
}


/* Bonus Box */

.referral-bonus-box {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 22px;
    padding: 22px;
    background: rgba(34, 197, 94, 0.08);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 15px;
}

.bonus-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(34, 197, 94, 0.12);
    border-radius: 12px;
    font-size: 24px;
    flex-shrink: 0;
}

.bonus-content strong {
    display: block;
    color: var(--green);
    font-size: 18px;
    margin-bottom: 5px;
}

.bonus-content p {
    margin: 0;
    color: var(--text-dim);
    line-height: 1.6;
    font-size: 14px;
}


/* How It Works */

.referral-how {
    margin-top: 28px;
    padding-top: 25px;
    border-top: 1px solid var(--border);
}

.referral-how h3 {
    margin: 0 0 18px;
    font-size: 19px;
}

.referral-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.referral-step {
    display: flex;
    gap: 13px;
    padding: 18px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border);
    border-radius: 13px;
}

.step-number {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    font-weight: 800;
    flex-shrink: 0;
}

.referral-step strong {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
}

.referral-step p {
    margin: 0;
    color: var(--text-dim);
    font-size: 12px;
    line-height: 1.5;
}


/* Mobile */

@media (max-width: 700px) {

    .referral-card {
        padding: 20px;
    }

    .referral-card-header {
        align-items: flex-start;
    }

    .referral-card-header h3 {
        font-size: 20px;
    }

    .referral-icon {
        width: 52px;
        height: 52px;
        font-size: 25px;
    }

    .referral-code-box strong {
        font-size: 22px;
    }

    .referral-link-row {
        flex-direction: column;
    }

    .referral-copy-btn {
        width: 100%;
    }

    .referral-stats {
        grid-template-columns: 1fr;
    }

    .referral-steps {
        grid-template-columns: 1fr;
    }

    .referral-bonus-box {
        align-items: flex-start;
    }
}
/* =========================
   REFERRAL HISTORY
========================= */

.referral-history {
    margin-top: 28px;
    padding-top: 25px;
    border-top: 1px solid var(--border);
}

.referral-history-header h3 {
    margin: 0 0 6px;
    font-size: 20px;
}

.referral-history-header p {
    margin: 0;
    color: var(--text-dim);
    font-size: 14px;
}

.referral-history-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 18px;
}

.referral-history-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 15px;
    padding: 18px;
    background: var(--input);
    border: 1px solid var(--border);
    border-radius: 14px;
}

.referral-history-user {
    display: flex;
    align-items: center;
    gap: 13px;
}

.referral-history-avatar {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(37, 99, 235, 0.15);
    border-radius: 12px;
    font-size: 21px;
}

.referral-history-user strong {
    display: block;
    font-size: 15px;
    margin-bottom: 4px;
}

.referral-history-user span {
    color: var(--text-dim);
    font-size: 12px;
}

.referral-history-details {
    display: flex;
    align-items: center;
    gap: 20px;
}

.referral-history-detail span {
    display: block;
    color: var(--text-dim);
    font-size: 11px;
    margin-bottom: 4px;
}

.referral-history-detail strong {
    font-size: 14px;
}

.referral-status {
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
}

.referral-status.completed {
    background: rgba(34, 197, 94, 0.12);
    color: var(--green);
}

.referral-status.pending {
    background: rgba(245, 158, 11, 0.12);
    color: var(--yellow);
}

.referral-empty {
    padding: 25px;
    text-align: center;
    color: var(--text-dim);
    background: var(--input);
    border: 1px dashed var(--border);
    border-radius: 14px;
}

@media (max-width: 700px) {

    .referral-history-item {
        grid-template-columns: 1fr;
    }

    .referral-history-details {
        flex-wrap: wrap;
        gap: 14px;
    }
}
/* =========================
   ADVANCED WITHDRAWAL HISTORY
========================= */

.withdrawal-history {
    display: grid;
    gap: 20px;
    margin-top: 20px;
}

.withdrawal-history-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
    overflow: hidden;
}


/* TOP */

.withdrawal-history-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 15px;
}

.withdrawal-history-label {
    display: block;
    color: var(--text-light);
    font-size: 12px;
    margin-bottom: 5px;
}

.withdrawal-id {
    color: var(--text);
    font-size: 15px;
}


/* STATUS */

.withdrawal-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    text-transform: capitalize;
    white-space: nowrap;
}

.withdrawal-status.pending {
    background: rgba(245, 158, 11, 0.12);
    color: var(--yellow);
}

.withdrawal-status.processing {
    background: rgba(59, 130, 246, 0.12);
    color: var(--primary-light);
}

.withdrawal-status.completed {
    background: rgba(34, 197, 94, 0.12);
    color: var(--green);
}

.withdrawal-status.cancelled {
    background: rgba(239, 68, 68, 0.12);
    color: var(--red);
}


/* AMOUNT */

.withdrawal-amount-box {
    margin-top: 20px;
    padding: 18px;
    background: var(--bg-soft);
    border: 1px solid var(--border);
    border-radius: 14px;
}

.withdrawal-amount-box span {
    display: block;
    color: var(--text-dim);
    font-size: 13px;
    margin-bottom: 6px;
}

.withdrawal-amount-box strong {
    font-size: 26px;
    color: var(--text);
}


/* BANK DETAILS */

.withdrawal-bank-details {
    margin-top: 18px;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 5px 0;
}

.withdrawal-detail-row {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 12px 0;
}

.withdrawal-detail-row span {
    color: var(--text-dim);
    font-size: 13px;
}

.withdrawal-detail-row strong {
    color: var(--text);
    font-size: 13px;
    text-align: right;
}


/* DATE & TIME */

.withdrawal-date-time {
    display: flex;
    gap: 35px;
    margin-top: 16px;
}

.withdrawal-date-time div {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.withdrawal-date-time span {
    color: var(--text-light);
    font-size: 12px;
}

.withdrawal-date-time strong {
    color: var(--text-dim);
    font-size: 13px;
}


/* =========================
   STATUS TIMELINE
========================= */

.withdrawal-timeline {
    position: relative;
    margin-top: 25px;
    padding-left: 5px;
}

.timeline-step {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    min-height: 70px;
}

.timeline-dot {
    position: relative;
    z-index: 2;

    width: 30px;
    height: 30px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: var(--bg-soft);
    border: 2px solid var(--border);

    color: var(--text-light);
    font-size: 12px;
    font-weight: 700;
}

.timeline-step.active .timeline-dot {
    background: var(--primary);
    border-color: var(--primary-light);
    color: white;
}

.timeline-step div:last-child {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 2px;
}

.timeline-step strong {
    color: var(--text);
    font-size: 14px;
}

.timeline-step span {
    color: var(--text-light);
    font-size: 12px;
}

.timeline-line {
    position: absolute;

    left: 19px;
    top: 15px;
    bottom: 45px;

    width: 2px;

    background: var(--border);
}


/* CANCELLED */

.withdrawal-cancelled {
    margin-top: 15px;
    padding: 12px;
    border-radius: 10px;
    background: rgba(239, 68, 68, 0.08);
    color: var(--red);
    font-size: 13px;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

    .withdrawal-history-card {
        padding: 16px;
    }

    .withdrawal-history-top {
        gap: 10px;
    }

    .withdrawal-amount-box strong {
        font-size: 23px;
    }

    .withdrawal-detail-row {
        align-items: flex-start;
    }

    .withdrawal-detail-row strong {
        max-width: 55%;
        word-break: break-word;
    }

    .withdrawal-date-time {
        gap: 25px;
    }

}
/* =========================
   ADMIN WITHDRAWALS
========================= */

.admin-withdrawals {
    display: grid;
    gap: 18px;
    margin-top: 20px;
}

.admin-withdrawal-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
}

.admin-withdrawal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 15px;
}

.admin-withdrawal-header div {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.admin-withdrawal-header span:first-child {
    color: var(--text-light);
    font-size: 12px;
}

.admin-withdrawal-header strong {
    color: var(--text);
    font-size: 24px;
}

.admin-withdrawal-details {
    margin-top: 18px;
    padding: 5px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
}

.admin-withdrawal-details p {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin: 0;
    padding: 11px 0;
}

.admin-withdrawal-details p span {
    color: var(--text-dim);
    font-size: 13px;
}

.admin-withdrawal-details p strong {
    color: var(--text);
    font-size: 13px;
    text-align: right;
}

.admin-withdrawal-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
}

.admin-withdrawal-actions button {
    flex: 1;
    min-width: 120px;
}

.danger-btn {
    background: rgba(239, 68, 68, 0.12);
    color: var(--red);
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.danger-btn:hover {
    background: rgba(239, 68, 68, 0.2);
}

@media (max-width: 600px) {

    .admin-withdrawal-card {
        padding: 16px;
    }

    .admin-withdrawal-header {
        flex-direction: column;
    }

    .admin-withdrawal-header strong {
        font-size: 21px;
    }

    .admin-withdrawal-details p {
        align-items: flex-start;
    }

    .admin-withdrawal-details p strong {
        max-width: 55%;
        word-break: break-word;
    }

    .admin-withdrawal-actions {
        flex-direction: column;
    }

    .admin-withdrawal-actions button {
        width: 100%;
    }
}
*{margin:0;padding:0;box-sizing:border-box;font-family:'Inter',sans-serif}
:root{--bg:#0a0f1e;--card:#121a33;--muted:#8892b0;--green:#5ee9a0;--blue:#4fc3ff}
body{background:var(--bg);color:#fff;overflow-x:hidden}
a{text-decoration:none}

/* NAVBAR */
header{display:flex;justify-content:space-between;align-items:center;padding:18px 6%;position:fixed;top:0;width:100%;z-index:100;transition:.3s;border-bottom:1px solid transparent}
header.scrolled{background:rgba(10,15,30,0.85);backdrop-filter:blur(12px);border-color:rgba(255,255,255,0.06)}
.logo{font-weight:800;font-size:22px;letter-spacing:-1px}
.logo span{color:var(--green)}
nav a{color:#aab;margin-left:28px;font-size:14px;transition:.2s}
nav a:hover, nav a.active{color:#fff}
.btn-small{background:#fff;color:#000;padding:10px 18px;border-radius:24px;font-weight:600;margin-left:28px}

/* HERO */
.hero{position:relative;display:grid;grid-template-columns:1.2fr .8fr;gap:40px;align-items:center;padding:160px 6% 90px;overflow:hidden}
.hero-bg{position:absolute;top:-200px;left:-200px;width:800px;height:800px;background:radial-gradient(circle at center,rgba(94,233,160,0.15),transparent 70%);filter:blur(20px);z-index:0}
.hero-content{position:relative;z-index:1}
.hero-label{background:rgba(94,233,160,0.1);border:1px solid rgba(94,233,160,0.2);color:var(--green);display:inline-block;padding:6px 14px;border-radius:20px;font-size:12px;letter-spacing:1px;margin-bottom:18px}
.hero h1{font-size:56px;line-height:.9;letter-spacing:-2px;margin-bottom:18px}
.hero h1 span{background:linear-gradient(90deg,var(--green),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-desc{color:var(--muted);font-size:17px;line-height:1.6;max-width:520px;margin-bottom:28px}
.hero-buttons{display:flex;gap:14px;margin-bottom:35px}
.auth-btn{background:linear-gradient(90deg,var(--green),var(--blue));color:#000;padding:14px 28px;border-radius:30px;font-weight:700;transition:.3s;display:inline-block}
.auth-btn:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(94,233,160,0.35)}
.secondary-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:14px 28px;border-radius:30px;font-weight:600;transition:.3s}
.secondary-btn:hover{background:rgba(255,255,255,0.1)}
.trust-row{display:flex;gap:40px;border-top:1px solid rgba(255,255,255,0.06);padding-top:24px}
.trust-row b{font-size:24px;display:block}.trust-row span{font-size:12px;color:var(--muted)}

/* HERO CARD */
.hero-card{background:linear-gradient(180deg,#162042,#0f1730);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:24px;z-index:1;animation:float 6s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.card-header p{font-size:11px;letter-spacing:2px;color:var(--green)}.live{background:rgba(94,233,160,0.15);color:var(--green);padding:4px 10px;border-radius:20px;font-size:11px}
.hero-card h2{font-size:34px}.profit{color:var(--green);margin:6px 0 16px}
.mini-chart{height:70px;background:linear-gradient(180deg,rgba(94,233,160,0.15),transparent);border-radius:12px;padding:10px}
.card-stats{display:flex;justify-content:space-between;margin-top:18px;border-top:1px solid rgba(255,255,255,0.06);padding-top:16px}
.card-stats small{color:var(--muted);display:block;font-size:11px}.card-stats b{font-size:14px}

/* FEATURES */
.features{padding:80px 6%;text-align:center}
.features.alt{background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05)}
.features h2{font-size:32px;letter-spacing:-1px;margin-bottom:10px}
.section-text{color:var(--muted);margin-bottom:40px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;text-align:left}
.card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:28px;transition:.4s}
.card:hover{transform:translateY(-8px);background:rgba(255,255,255,0.05);border-color:rgba(94,233,160,0.2)}
.feature-icon{font-size:26px;background:rgba(255,255,255,0.05);width:48px;height:48px;display:grid;place-items:center;border-radius:12px}
.card h3{margin:16px 0 8px}.card p{color:var(--muted);font-size:14px;line-height:1.6}
.steps .step{position:relative}.num{font-size:42px;font-weight:800;opacity:.08;position:absolute;top:18px;right:24px}

/* CTA */
.cta{margin:80px 6%;background:linear-gradient(90deg,#121a33,#152a3a);border:1px solid rgba(255,255,255,0.06);border-radius:24px;padding:60px;text-align:center}
.cta h2{font-size:32px;margin-bottom:12px}.cta p{color:var(--muted);margin-bottom:24px}

/* FOOTER */
footer{text-align:center;padding:30px;color:var(--muted);font-size:13px;border-top:1px solid rgba(255,255,255,0.06)}

/* ANIMATION REVEAL */
.reveal{opacity:0;transform:translateY(30px);transition:0.8s cubic-bezier(.16,1,.3,1)}
.reveal.show{opacity:1;transform:translateY(0)}
.cards .reveal:nth-child(2){transition-delay:.1s}.cards .reveal:nth-child(3){transition-delay:.2s}

@media(max-width:900px){.hero{grid-template-columns:1fr;padding-top:120px}.hero h1{font-size:38px}.cards{grid-template-columns:1fr}header{padding:16px 5%}}
/* =========================
   DEMO DEPOSIT HISTORY
========================= */

.deposit-history {
    display: grid;
    gap: 18px;
    margin-top: 20px;
}

.deposit-history-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
}

.deposit-history-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
}

.deposit-history-top div {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.deposit-history-top span:first-child {
    color: var(--text-light);
    font-size: 12px;
}

.deposit-history-top strong {
    color: var(--text);
    font-size: 24px;
}

.deposit-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    text-transform: capitalize;
    white-space: nowrap;
}

.deposit-status.pending {
    background: rgba(245, 158, 11, 0.12);
    color: var(--yellow);
}

.deposit-status.approved {
    background: rgba(34, 197, 94, 0.12);
    color: var(--green);
}

.deposit-status.cancelled {
    background: rgba(239, 68, 68, 0.12);
    color: var(--red);
}

.deposit-history-details {
    margin-top: 18px;
    border-top: 1px solid var(--border);
    padding-top: 15px;
    display: grid;
    gap: 10px;
}

.deposit-history-details div {
    display: flex;
    justify-content: space-between;
    gap: 15px;
}

.deposit-history-details span {
    color: var(--text-dim);
    font-size: 13px;
}

.deposit-history-details strong {
    color: var(--text);
    font-size: 13px;
    text-align: right;
}


/* =========================
   ADMIN DEPOSITS
========================= */

.admin-deposits {
    display: grid;
    gap: 18px;
    margin-top: 20px;
}

.admin-deposit-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
}

.admin-deposit-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 15px;
}

.admin-deposit-header div {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.admin-deposit-header span:first-child {
    color: var(--text-light);
    font-size: 12px;
}

.admin-deposit-header strong {
    color: var(--text);
    font-size: 24px;
}

.admin-deposit-details {
    margin-top: 18px;
    padding: 5px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
}

.admin-deposit-details p {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin: 0;
    padding: 11px 0;
}

.admin-deposit-details p span {
    color: var(--text-dim);
    font-size: 13px;
}

.admin-deposit-details p strong {
    color: var(--text);
    font-size: 13px;
    text-align: right;
    max-width: 70%;
    word-break: break-word;
}

.admin-deposit-actions {
    display: flex;
    gap: 10px;
    margin-top: 18px;
}

.admin-deposit-actions button {
    flex: 1;
    min-width: 120px;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

    .deposit-history-card,
    .admin-deposit-card {
        padding: 16px;
    }

    .deposit-history-top,
    .admin-deposit-header {
        flex-direction: column;
    }

    .deposit-history-top strong,
    .admin-deposit-header strong {
        font-size: 21px;
    }

    .deposit-history-details div,
    .admin-deposit-details p {
        align-items: flex-start;
    }

    .admin-deposit-actions {
        flex-direction: column;
    }

    .admin-deposit-actions button {
        width: 100%;
    }
}