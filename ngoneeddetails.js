document.addEventListener("DOMContentLoaded", () => {
  const chatBtn = document.getElementById("chatArjunBtn");
  const skillsSelect = document.getElementById("skillsSelect");

  chatBtn.addEventListener("click", () => {
    alert("Opening chat with Arjun Mehta...");
  });

  skillsSelect.addEventListener("change", (e) => {
    console.log("Selected skill:", e.target.value);
  });
});