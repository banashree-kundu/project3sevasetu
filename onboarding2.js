const slider = document.getElementById("radiusSlider");
const radiusValue = document.getElementById("radiusValue");
const skillsGroup = document.getElementById("skillsGroup");
const availabilityGroup = document.getElementById("availabilityGroup");
const form = document.getElementById("onboardingForm");
const saveLaterBtn = document.getElementById("saveLaterBtn");
// PHOTO UPLOAD HANDLER
const photoBtn = document.querySelector(".photo-add");
const photoInput = document.getElementById("photoInput");
const photoCircle = document.querySelector(".photo-circle");

photoBtn.addEventListener("click", () => {
  photoInput.click();
});

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      photoCircle.innerHTML = `<img src="${reader.result}" class="preview-img"/>`;
    };
    reader.readAsDataURL(file);
  }
});
function updateSlider() {
  const value = slider.value;
  radiusValue.textContent = value;
  const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, #2c8e64 ${percent}%, #d8e0ee ${percent}%)`;
}

function getSelectedSkills() {
  return [...skillsGroup.querySelectorAll(".chip.active")].map((btn) => btn.dataset.skill);
}

function getSelectedAvailability() {
  const active = availabilityGroup.querySelector(".segment.active");
  return active ? active.dataset.value : "";
}

skillsGroup.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  btn.classList.toggle("active");
  if (btn.classList.contains("active") && !btn.textContent.includes("✕")) {
    btn.innerHTML = `${btn.dataset.skill} ✕`;
  } else if (!btn.classList.contains("active") && btn.dataset.skill !== "Other") {
    btn.textContent = btn.dataset.skill;
  }
  if (btn.dataset.skill === "Other" && btn.classList.contains("active")) {
    const newSkill = prompt("Enter a skill:");
    if (newSkill && newSkill.trim()) {
      btn.textContent = `${newSkill.trim()} ✕`;
      btn.dataset.skill = newSkill.trim();
    } else {
      btn.classList.remove("active");
      btn.textContent = "+ Other";
      btn.dataset.skill = "Other";
    }
  }
});

availabilityGroup.addEventListener("click", (e) => {
  const btn = e.target.closest(".segment");
  if (!btn) return;
  availabilityGroup.querySelectorAll(".segment").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
});

slider.addEventListener("input", updateSlider);
updateSlider();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    skills: getSelectedSkills(),
    availability: getSelectedAvailability(),
    radius: slider.value
  };

  localStorage.setItem("sevaSetu_onboarding", JSON.stringify(data));
  alert(`Profile completed!\nSkills: ${data.skills.join(", ") || "None"}\nAvailability: ${data.availability}\nRadius: ${data.radius} KM`);
});

saveLaterBtn.addEventListener("click", () => {
  const data = {
    skills: getSelectedSkills(),
    availability: getSelectedAvailability(),
    radius: slider.value,
    savedAt: new Date().toISOString()
  };

  localStorage.setItem("sevaSetu_onboarding_draft", JSON.stringify(data));
  alert("Progress saved for later.");
});

document.addEventListener("DOMContentLoaded", () => {
  const draft = localStorage.getItem("sevaSetu_onboarding_draft");
  if (draft) {
    const saved = JSON.parse(draft);
    if (saved.radius) {
      slider.value = saved.radius;
      updateSlider();
    }
  }
});