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

// Toggle Experience table
const toggleBtnExp = document.getElementById("toggleExperience");
const expTable = document.getElementById("experienceTable");

toggleBtnExp.addEventListener("click", () => {
  if (expTable.style.display === "none") {
    expTable.style.display = "table";
    toggleBtnExp.textContent = "Hide Experience";
  } else {
    expTable.style.display = "none";
    toggleBtnExp.textContent = "Show Experience";
  }
});

// Toggle Contact Info
const toggleBtnContact = document.getElementById("toggleContact");
const contactInfo = document.getElementById("contactInfo");

toggleBtnContact.addEventListener("click", () => {
  if (contactInfo.style.display === "none") {
    contactInfo.style.display = "block";
    toggleBtnContact.textContent = "Hide Contact Info";
  } else {
    contactInfo.style.display = "none";
    toggleBtnContact.textContent = "Show Contact Info";
  }
});

// ---- Skill search (filter) ----
document.addEventListener("DOMContentLoaded", () => {
const searchInput = document.getElementById("skillSearch");
const skillsGrid = document.getElementById("skillsGrid");
const skillCards = () => skillsGrid.querySelectorAll(".skill-card");
const noResults = document.getElementById("skillsNoResults");
  
// Debounce helper para no ejecutar el filtrado en cada pulsación rápidamente
function debounce(fn, wait = 250) {
    let t;
    return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
    };
}
  
function filterSkills() {
    const q = (searchInput.value || "").trim().toLowerCase();
    let visibleCount = 0;

    skillCards().forEach(card => {
    // Texto del card: título + contenido (li)
    const text = card.textContent.toLowerCase();

    // Si el query aparece en el texto del card -> mostrar; si no -> ocultar
    if (!q || text.includes(q)) {
        // muestra como bloque (respeta diseño de grid)
        card.style.display = "";
        visibleCount += 1;
    } else {
        card.style.display = "none";
    }
    });

    // Mostrar u ocultar mensaje de "no results"
    noResults.style.display = visibleCount === 0 ? "block" : "none";
}
  
// Añadir listener con debounce
if (searchInput) {
    searchInput.addEventListener("input", debounce(filterSkills, 150));
}

// Ejecutar una vez al cargar para estado inicial (por ejemplo si el input tiene texto)
filterSkills();
});

// Toggle Education Table
const toggleBtnEdu = document.getElementById("toggleEducation");
const eduTable = document.getElementById("educationTable");

toggleBtnEdu.addEventListener("click", () => {
  if (eduTable.style.display === "none") {
    eduTable.style.display = "table";
    toggleBtnEdu.textContent = "Hide Education";
  } else {
    eduTable.style.display = "none";
    toggleBtnEdu.textContent = "Show Education";
  }
});