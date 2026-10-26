async function extractData() {

  function getLabelValue(labelText) {
    const labels = [...document.querySelectorAll("label, span, div")];
    for (let el of labels) {
      if (el.innerText && el.innerText.trim().toUpperCase() === labelText.toUpperCase()) {
        let parent = el.closest("div");
        if (parent) {
          let valueEl = parent.querySelector("input, span:not(label), div:not(label)");
          if (valueEl) {
            return valueEl.value || valueEl.innerText || "";
          }
        }
      }
    }
    return "";
  }


  function safeText(selector) {
    return document.querySelector(selector)?.innerText?.trim() || "";
  }


  // 1️⃣ Expand Member Details if collapsed
  const memberSectionHeader = [...document.querySelectorAll("*")]
    .find(el => el.innerText?.trim().includes("Member Details"));


  if (memberSectionHeader) {
    memberSectionHeader.click();
    await new Promise(res => setTimeout(res, 1000));
  }


  // 2️⃣ Extract Main Customer Info
  const firstName = getLabelValue("FIRST NAME");
  const lastName = getLabelValue("LAST NAME");
  const fullName = `${firstName} ${lastName}`.trim();


  const data = {
    refId: getLabelValue("PARENT REF-ID") || getLabelValue("REF-ID"),
    createdDate: getLabelValue("CREATED DATE"),
    fullName: fullName,
    mobile: getLabelValue("MOBILE NUMBER"),
    email: getLabelValue("EMAIL"),
    nationality: getLabelValue("NATIONALITY"),
    dateOfBirth: getLabelValue("DATE OF BIRTH"),
    emirateOfVisa: getLabelValue("EMIRATE OF VISA"),
    gender: getLabelValue("GENDER"),
    memberCategory: getLabelValue("MEMBER CATEGORY"),
    members: []
  };


  // 3️⃣ Extract Member Table
  const rows = document.querySelectorAll("table tbody tr");


  rows.forEach(row => {
    const cells = row.querySelectorAll("td");


    if (cells.length > 3) {
      data.members.push({
        memberName: cells[0]?.innerText.trim(),
        policyPega: cells[1]?.innerText.trim(),
        gender: cells[2]?.innerText.trim(),
        dob: cells[3]?.innerText.trim(),
        relation: cells[4]?.innerText.trim(),
        nationality: cells[5]?.innerText.trim(),
        emirateOfVisa: cells[6]?.innerText.trim(),
        memberCategory: cells[7]?.innerText.trim()
      });
    }
  });


  // 4️⃣ Copy structured output
  const output = JSON.stringify(data, null, 2);


  await navigator.clipboard.writeText(output);


  console.log("Extracted Data:", data);
  alert("Lead data copied to clipboard!");

}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extract") {
    extractData();
  }
});
