// Download button logic
document.getElementById("download").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt", // points
        format: "a4"
    });

    doc.html(document.body, {
        callback: function (pdf) {
            pdf.save("My-CV.pdf");
        },
        x: 10,
        y: 10,
        html2canvas: {
            scale: 0.6 // smaller = more fits on the page
        }
    });
});

// Dark mode toggle
const toggleBtn = document.getElementById("themeToggle");
const nav = document.getElementById("mainNav");
let darkMode = false;

toggleBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.setAttribute("data-bs-theme", "dark");
    nav.classList.remove("bg-light");
    nav.classList.add("bg-dark");
    toggleBtn.classList.remove("btn-outline-dark");
    toggleBtn.classList.add("btn-outline-light");
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    document.body.setAttribute("data-bs-theme", "light");
    nav.classList.remove("bg-dark");
    nav.classList.add("bg-light");
    toggleBtn.classList.remove("btn-outline-light");
    toggleBtn.classList.add("btn-outline-dark");
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});

// Dynamic greeting
function setGreeting() {
    const greetingEl = document.getElementById("greeting");
    const now = new Date();
    const hour = now.getHours();
    let greeting = "";
  
    if (hour < 12) {
      greeting = "🌅 Good Morning, welcome to my CV!";
    } else if (hour < 18) {
      greeting = "☀️ Good Afternoon, welcome to my CV!";
    } else {
      greeting = "🌙 Good Evening, welcome to my CV!";
    }
  
    greetingEl.textContent = greeting;
}
  
// Run greeting on page load
document.addEventListener("DOMContentLoaded", setGreeting);  
