// MOBILE MENU
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// AUCTION FILTER
function filterAuction(category) {
  const cards = document.querySelectorAll(".auction-card");
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach(card => {
    if (category === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.classList.contains(category) ? "block" : "none";
    }
  });
}

// BID SYSTEM
function placeBid(id) {
  const bidSpan = document.getElementById("bid" + id);
  const input = document.getElementById("input" + id);

  let currentBid = parseInt(bidSpan.innerText);
  let newBid = parseInt(input.value);

  if (isNaN(newBid)) {
    alert("Enter a valid bid amount!");
    return;
  }

  if (newBid <= currentBid) {
    alert("Bid must be higher than current bid!");
    return;
  }

  bidSpan.innerText = newBid;
  input.value = "";

  alert("Bid placed successfully! New Bid: ₹" + newBid);
}

// ORDER MODAL
let selectedPlan = "";
let selectedPrice = 0;

function orderPlan(plan, price) {
  selectedPlan = plan;
  selectedPrice = price;

  document.getElementById("modalPlan").innerText = plan;
  document.getElementById("modalPrice").innerText = price;

  document.getElementById("orderModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("orderModal").style.display = "none";
}

// PAYMENT CONFIRM
function confirmPayment() {
  const name = document.getElementById("custName").value;
  const email = document.getElementById("custEmail").value;
  const mc = document.getElementById("mcName").value;

  if (!name || !email || !mc) {
    alert("Please fill all billing details!");
    return;
  }

  localStorage.setItem("activePlan", selectedPlan);
  localStorage.setItem("lastPayment", selectedPrice);

  alert("Payment Submitted! Admin will verify soon.");

  closeModal();
  loadDashboard();
}

// REGISTER
function registerUser() {
  const user = document.getElementById("regUser").value;
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;

  if (!user || !email || !pass) {
    alert("Fill all register fields!");
    return;
  }

  const account = { user, email, pass };
  localStorage.setItem("account", JSON.stringify(account));

  alert("Registered Successfully! Now Login.");
}

// LOGIN
function loginUser() {
  const loginUser = document.getElementById("loginUser").value;
  const loginPass = document.getElementById("loginPass").value;

  const saved = JSON.parse(localStorage.getItem("account"));

  if (!saved) {
    alert("No account found! Please register first.");
    return;
  }

  if ((loginUser === saved.user || loginUser === saved.email) && loginPass === saved.pass) {
    localStorage.setItem("loggedIn", "yes");
    alert("Login Successful!");
    loadDashboard();
  } else {
    alert("Wrong username/email or password!");
  }
}

// LOGOUT
function logoutUser() {
  localStorage.removeItem("loggedIn");
  alert("Logged Out!");
  document.getElementById("dashboard").style.display = "none";
}

// LOAD DASHBOARD
function loadDashboard() {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn === "yes") {
    const saved = JSON.parse(localStorage.getItem("account"));
    document.getElementById("dashUser").innerText = saved.user;

    const plan = localStorage.getItem("activePlan") || "None";
    const payment = localStorage.getItem("lastPayment") || "0";

    document.getElementById("activePlan").innerText = plan;
    document.getElementById("lastPayment").innerText = payment;

    document.getElementById("dashboard").style.display = "block";
  }
}

window.onload = loadDashboard;
