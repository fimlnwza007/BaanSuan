const notice = (message) => {
  let element = document.querySelector(".action-notice");
  if (!element) {
    element = document.createElement("p");
    element.className = "action-notice";
    element.setAttribute("aria-live", "polite");
    document.body.append(element);
  }
  element.textContent = message;
};

if (document.body.classList.contains("page-favorites")) {
  document.querySelectorAll(".saved-card .heart-button").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".saved-card").remove();
      notice("นำรายการออกจากรายการบันทึกแล้ว");
    });
  });
}

if (document.body.classList.contains("page-results")) {
  document.querySelectorAll(".result-info .heart-button").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "favorites-page.html";
    });
  });
}

if (document.body.classList.contains("page-settings")) {
  const preferenceKey = "baansuan-settings";
  const toggles = [...document.querySelectorAll(".toggle-row input[type=checkbox]")];
  const language = document.querySelector(".language-field select");

  try {
    const saved = JSON.parse(localStorage.getItem(preferenceKey) || "null");
    if (saved?.toggles?.length === toggles.length) {
      toggles.forEach((toggle, index) => {
        toggle.checked = Boolean(saved.toggles[index]);
      });
    }
    if (saved?.language && language) language.value = saved.language;
  } catch (error) {
    notice("ไม่สามารถโหลดการตั้งค่าที่บันทึกไว้ได้");
  }

  document.querySelector(".settings-actions .button:not(.button-ghost)")?.addEventListener("click", () => {
    try {
      localStorage.setItem(
        preferenceKey,
        JSON.stringify({
          toggles: toggles.map((toggle) => toggle.checked),
          language: language?.value || "",
        }),
      );
      notice("บันทึกการตั้งค่าในอุปกรณ์นี้แล้ว");
    } catch (error) {
      notice("บันทึกการตั้งค่าไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  });

  document.querySelector(".danger-panel button")?.addEventListener("click", () => {
    notice("การลบบัญชียังไม่เปิดใช้งานในตัวอย่างเว็บไซต์นี้");
  });
}
