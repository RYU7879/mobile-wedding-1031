/* =========================================================
   ★★★ 여기만 수정하면 됩니다 ★★★
   사진/이름/날짜/예식장/계좌번호 등 청첩장 내용을
   한 곳에서 관리하도록 만들어 두었습니다.
   ========================================================= */

const WEDDING = {
  groom: {
    name: "류성길",
    parents: "아버지 ○○○ · 어머니 ○○○",
    accountName: "류성길 / 국민은행 000000-00-000000"
  },

  bride: {
    name: "형가희",
    parents: "아버지 ○○○ · 어머니 ○○○",
    accountName: "형가희 / 국민은행 000000-00-000000"
  },

  date: {
    iso: "2026-10-31T17:30:00+09:00",
    display: "2026년 10월 31일 토요일",
    short: "2026.10.31",
    year: "2026",
    month: "10",
    day: "31",
    weekday: "SATURDAY",
    time: "오후 5시 30분"
  },

  venue: {
    name: "그레이스K 전주점",
    address: "전북특별자치도 전주시 완산구 춘향로 5216",
    parking: "주차 안내는 예식장 안내에 맞춰 최종 수정하세요."
  },

  invitation:
    "서로가 마주보며 다져온 사랑을<br>" +
    "이제 함께 한 곳을 바라보며 걸어갈 수 있게<br>" +
    "큰 사랑으로 보살펴 주신 분들을 모십니다.<br><br>" +
    "저희 두 사람이 사랑의 이름으로<br>" +
    "지켜나갈 수 있게 앞날을<br>" +
    "축복해 주시면 감사하겠습니다.",

  /*
    ★ 사진 파일명만 바꾸면 됩니다.
    현재 저장소의 main-photo.jpg는 그대로 첫 사진으로 사용합니다.

    예:
    images/photo-01.jpg
    images/photo-02.jpg
    ...
  */
  photos: [
    "main-photo.jpg",
    "images/photo-01.jpg",
    "images/photo-02.jpg",
    "images/photo-03.jpg",
    "images/photo-04.jpg",
    "images/photo-05.jpg",
    "images/photo-06.jpg"
  ],

  maps: {
    // 주소가 최종 확정되면 아래 URL도 원하는 장소 검색 링크로 교체 가능
    naver: "https://map.naver.com/p/search/%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%8A%A4K%20%EC%A0%84%EC%A3%BC%EC%A0%90",
    kakao: "https://map.kakao.com/?q=%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%8A%A4K%20%EC%A0%84%EC%A3%BC%EC%A0%90"
  },

  /*
    ★ 참석의사 전달 데이터를 실제로 받으려면
    Google Apps Script 웹앱 URL을 여기에 넣으세요.

    아직 연결하지 않았다면 빈 문자열("") 그대로 두어도
    청첩장 화면과 입력창은 정상 작동합니다.
  */
  RSVP_ENDPOINT: ""
};


/* ---------------- 기본 정보 출력 ---------------- */

document.querySelectorAll("[data-names]").forEach(el => {
  el.textContent = `${WEDDING.groom.name} & ${WEDDING.bride.name}`;
});

document.querySelectorAll("[data-date]").forEach(el => {
  el.textContent = WEDDING.date.display;
});

document.querySelectorAll("[data-time]").forEach(el => {
  el.textContent = WEDDING.date.time;
});

document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = WEDDING.date.year;
});

document.querySelectorAll("[data-venue]").forEach(el => {
  el.textContent = WEDDING.venue.name;
});

document.querySelectorAll("[data-address]").forEach(el => {
  el.textContent = WEDDING.venue.address;
});

document.querySelectorAll("[data-parking]").forEach(el => {
  el.textContent = WEDDING.venue.parking;
});

document.querySelectorAll("[data-groom-name]").forEach(el => {
  el.textContent = WEDDING.groom.name;
});

document.querySelectorAll("[data-bride-name]").forEach(el => {
  el.textContent = WEDDING.bride.name;
});

document.querySelectorAll("[data-groom-parents]").forEach(el => {
  el.textContent = WEDDING.groom.parents;
});

document.querySelectorAll("[data-bride-parents]").forEach(el => {
  el.textContent = WEDDING.bride.parents;
});

document.querySelectorAll("[data-groom-account-name]").forEach(el => {
  el.textContent = WEDDING.groom.accountName;
});

document.querySelectorAll("[data-bride-account-name]").forEach(el => {
  el.textContent = WEDDING.bride.accountName;
});

const invitation = document.querySelector("[data-invitation]");
if (invitation) invitation.innerHTML = WEDDING.invitation;


/* ---------------- 지도 버튼 ---------------- */

["naver-map", "naver-map-2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = WEDDING.maps.naver;
});

["kakao-map", "kakao-map-2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = WEDDING.maps.kakao;
});


/* ---------------- D-Day ---------------- */

function updateDday() {
  const target = new Date(WEDDING.date.iso).getTime();
  const now = Date.now();
  const diff = target - now;

  const number = document.getElementById("dday-number");
  const label = document.getElementById("dday-label");

  if (!number || !label) return;

  if (diff > 0) {
    const days = Math.ceil(diff / 86400000);
    number.textContent = `D-${days}`;
    label.textContent = "D-DAY";
  } else if (diff > -86400000) {
    number.textContent = "D-DAY";
    label.textContent = "TODAY";
  } else {
    number.textContent = "THANK YOU";
    label.textContent = "OUR DAY";
  }
}

updateDday();
setInterval(updateDday, 60000);


/* ---------------- 스크롤 등장 애니메이션 ---------------- */

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add("visible"));
}


/* ---------------- 사진 갤러리 ---------------- */

const photoGrid = document.getElementById("photo-grid");

function buildGallery() {
  if (!photoGrid) return;

  WEDDING.photos.forEach((src, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "photo-item";
    item.setAttribute("aria-label", `웨딩 사진 ${index + 1}`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `웨딩 사진 ${index + 1}`;
    img.loading = index === 0 ? "eager" : "lazy";

    img.addEventListener("error", () => {
      item.classList.add("is-missing");
    });

    item.appendChild(img);
    photoGrid.appendChild(item);

    item.addEventListener("click", () => openLightbox(src));
  });
}

buildGallery();


/* ---------------- 사진 확대 ---------------- */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(src) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});


/* ---------------- 계좌 복사 ---------------- */

const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

document.querySelectorAll("[data-copy-account]").forEach(button => {
  button.addEventListener("click", async () => {
    const side = button.dataset.copyAccount;
    const account = side === "groom"
      ? WEDDING.groom.accountName
      : WEDDING.bride.accountName;

    try {
      await navigator.clipboard.writeText(account);
      showToast("계좌번호가 복사되었습니다.");
    } catch {
      showToast("계좌번호를 길게 눌러 복사해주세요.");
    }
  });
});


/* ---------------- RSVP 모달 ---------------- */

const rsvpModal = document.getElementById("rsvp-modal");
const openRsvp = document.getElementById("open-rsvp");
const closeRsvpButtons = document.querySelectorAll("[data-close-rsvp]");
const rsvpForm = document.getElementById("rsvp-form");
const rsvpStatus = document.getElementById("rsvp-status");
const rsvpSubmit = document.getElementById("rsvp-submit");
const guestCountWrap = document.getElementById("guest-count-wrap");

function openRsvpModal() {
  rsvpModal?.classList.add("open");
  rsvpModal?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeRsvpModal() {
  rsvpModal?.classList.remove("open");
  rsvpModal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

openRsvp?.addEventListener("click", openRsvpModal);
closeRsvpButtons.forEach(button => button.addEventListener("click", closeRsvpModal));

document.querySelectorAll('input[name="attendance"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const attending = document.querySelector('input[name="attendance"]:checked')?.value === "참석";
    if (guestCountWrap) guestCountWrap.style.display = attending ? "grid" : "none";
  });
});


/* ---------------- RSVP 제출 ---------------- */

rsvpForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);
  const data = Object.fromEntries(formData.entries());

  data.groom = WEDDING.groom.name;
  data.bride = WEDDING.bride.name;
  data.weddingDate = WEDDING.date.iso;
  data.submittedAt = new Date().toISOString();

  if (!data.name || !data.attendance || !data.privacy) return;

  rsvpSubmit.disabled = true;
  rsvpSubmit.textContent = "전달 중...";
  rsvpStatus.textContent = "";

  try {
    if (WEDDING.RSVP_ENDPOINT.trim()) {
      /*
        Google Apps Script 웹앱을 연결할 경우:
        JSON을 그대로 POST합니다.
        별도의 Content-Type 헤더를 지정하지 않아
        브라우저 CORS preflight를 피하도록 구성했습니다.
      */
      const response = await fetch(WEDDING.RSVP_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("RSVP endpoint error");

      showToast("참석의사가 전달되었습니다.");
      rsvpForm.reset();
      closeRsvpModal();
    } else {
      /*
        아직 서버를 연결하지 않은 상태.
        테스트용으로 이 기기에만 저장합니다.
      */
      const saved = JSON.parse(localStorage.getItem("wedding_rsvp_demo") || "[]");
      saved.push(data);
      localStorage.setItem("wedding_rsvp_demo", JSON.stringify(saved));

      rsvpStatus.textContent =
        "현재 테스트 모드입니다. 실제로 전달하려면 RSVP_ENDPOINT를 연결해주세요.";
      showToast("테스트 입력이 저장되었습니다.");
    }
  } catch (error) {
    console.error(error);
    rsvpStatus.textContent =
      "전달에 실패했습니다. 잠시 후 다시 시도해주세요.";
  } finally {
    rsvpSubmit.disabled = false;
    rsvpSubmit.textContent = "전달하기";
  }
});


/* ---------------- ESC 닫기 ---------------- */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeRsvpModal();
    closeLightbox();
  }
});
