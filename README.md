# Miami Premium Care Interface

A GitHub-ready front-end for the Miami Polyclinic Premium Care membership interface.

## Current state

The interface is intentionally separated from the data.

- `index.html` = structure
- `style.css` = visual design
- `app.js` = member data + rendering logic
- `assets/` = future logos/backgrounds/QR assets

There are six placeholder member records:

- CARD001
- CARD002
- CARD003
- CARD004
- CARD005
- CARD006

No real patient/member information is included.

## Later: connect Excel

The `MEMBERS` array in `app.js` is the temporary data layer.

The next step is to create an Excel adapter using SheetJS (`xlsx`) or connect the website to an online spreadsheet/database.

The visual interface should not need to be rebuilt.

Recommended Excel columns:

`id, memberNumber, name, memberSince, validThru, scaling, braces, whitening, xray, filling, nightGuard, fluoride, rct, crowns, veneers, bracesRemoval, bracketsWire, extraction, guestCleaning, guestInstallation, guestTreatment, priorityBooking, birthdayBenefit, familyMembers`

## GitHub Pages

Upload the project contents to a GitHub repository and enable:

Settings → Pages → Deploy from branch → main → / (root)

Then the interface can be opened as a normal website.

## Privacy

Do not commit a real Excel file containing personal/member information to a public GitHub repository.

For a production version, use an authenticated/private data source or a backend/database.
