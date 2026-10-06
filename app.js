/*
  MIAMI PREMIUM CARE
  ------------------
  This file currently uses placeholder data.

  LATER:
  Replace the MEMBERS array with your Excel data adapter.
  The visual interface does not need to change.

  Recommended Excel fields:
  id, memberNumber, name, memberSince, validThru,
  scaling, braces, whitening, xray, filling, nightGuard,
  fluoride, rct, crowns, veneers, bracesRemoval, bracketsWire,
  extraction, guestCleaning, guestInstallation, guestTreatment,
  priorityBooking, birthdayBenefit, familyMembers
*/

const MEMBERS = [
  {
    id: "CARD001",
    memberNumber: "",
    name: "",
    memberSince: "",
    validThru: "",
    benefits: {}
  },
  {
    id: "CARD002",
    memberNumber: "",
    name: "",
    memberSince: "",
    validThru: "",
    benefits: {}
  },
  {
    id: "CARD003",
    memberNumber: "",
    name: "",
    memberSince: "",
    validThru: "",
    benefits: {}
  },
  {
    id: "CARD004",
    memberNumber: "",
    name: "",
    memberSince: "",
    validThru: "",
    benefits: {}
  },
  {
    id: "CARD005",
    memberNumber: "",
    name: "",
    memberSince: "",
    validThru: "",
    benefits: {}
  },
  {
    id: "CARD006",
    memberNumber: "",
    name: "",
    memberSince: "",
    validThru: "",
    benefits: {}
  }
];

const benefitLabels = {
  scaling: "Scaling & Polishing + Full Mouth Examination",
  braces: "Braces Installation",
  whitening: "Nano Whitening",
  xray: "Periapical X-Ray / OPG",
  filling: "Composite Filling",
  nightGuard: "Night Guard / Retainer",
  fluoride: "Fluoride",
  rct: "RCT",
  crowns: "Crowns",
  veneers: "Veneers",
  bracesRemoval: "Braces Removal",
  bracketsWire: "Brackets / Wire Change",
  extraction: "Normal Extraction",
  guestCleaning: "Free Guest Cleaning + Polishing + Check up",
  guestInstallation: "Guest Installation + Adjustment",
  guestTreatment: "Guest First Treatment",
  priorityBooking: "Priority Booking",
  birthdayBenefit: "Birthday Benefit",
  familyMembers: "Family Members"
};

const grid = document.getElementById("memberGrid");
const search = document.getElementById("memberSearch");
const detailSection = document.getElementById("detailSection");
const closeDetail = document.getElementById("closeDetail");

function displayValue(value, fallback = "—") {
  return value === undefined || value === null || String(value).trim() === ""
    ? fallback
    : value;
}

function renderCards(filter = "") {
  const q = filter.trim().toLowerCase();

  const filtered = MEMBERS.filter(member => {
    return (
      !q ||
      member.id.toLowerCase().includes(q) ||
      String(member.memberNumber).toLowerCase().includes(q) ||
      String(member.name).toLowerCase().includes(q)
    );
  });

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state">No member found.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((member, index) => `
    <article class="member-tile" data-id="${member.id}">
      <div class="tile-top">
        <span class="tile-number">${member.id || `CARD00${index + 1}`}</span>
        <span class="tile-status">${member.name ? "Active" : "Ready for Excel"}</span>
      </div>

      <div class="tile-content">
        <div class="tile-miami">MIAMI</div>
        <div class="tile-sub">POLYCLINIC</div>

        <div class="tile-name">
          ${displayValue(member.name, "Awaiting Excel data")}
        </div>

        <div class="tile-meta">
          <div>
            <span>Member No.</span>
            <strong>${displayValue(member.memberNumber, "—")}</strong>
          </div>
          <div>
            <span>Valid Thru</span>
            <strong>${displayValue(member.validThru, "—")}</strong>
          </div>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".member-tile").forEach(tile => {
    tile.addEventListener("click", () => {
      const member = MEMBERS.find(m => m.id === tile.dataset.id);
      if (member) openMember(member);
    });
  });
}

function openMember(member) {
  detailSection.hidden = false;

  document.getElementById("detailTitle").textContent =
    displayValue(member.name, "Member");

  document.getElementById("detailNumber").textContent =
    displayValue(member.memberNumber, "MEMBER NUMBER");

  document.getElementById("detailName").textContent =
    displayValue(member.name, "Member name");

  document.getElementById("detailSince").textContent =
    displayValue(member.memberSince);

  document.getElementById("detailValid").textContent =
    displayValue(member.validThru);

  const tbody = document.getElementById("benefitsBody");
  const entries = Object.entries(member.benefits || {});

  if (!entries.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="2" style="text-align:center;color:#777;padding:40px 10px;">
          Benefits will appear here when Excel is connected.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = entries.map(([key, value]) => `
      <tr>
        <td>${benefitLabels[key] || key}</td>
        <td>${displayValue(value)}</td>
      </tr>
    `).join("");
  }

  detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

search.addEventListener("input", e => renderCards(e.target.value));

closeDetail.addEventListener("click", () => {
  detailSection.hidden = true;
});

renderCards();
