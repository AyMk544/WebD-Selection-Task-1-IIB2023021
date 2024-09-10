"use strict";

async function loadAccordionData() {
  try {
    const res = await fetch("https://test-data-gules.vercel.app/data.json");
    const data = await res.json();
    populateAccordion(data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateAccordion(data) {
  const accContainer = document.querySelector(".acc_container");

  data.forEach((topic) => {
    const topic_el = document.createElement("div");
    topic_el.classList.add("topic_el");

    const heading = document.createElement("h1");
    heading.textContent = topic.title;
    heading.classList.add("heading");
    topic_el.appendChild(heading);

    topic.ques.forEach((que) => {
      if (que.title === null) return;

      const accordion_el = document.createElement("div");
      accordion_el.classList.add("accordion_el");

      const button = document.createElement("button");
      button.classList.add("accordion_btn", "flex");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("check");

      button.innerHTML = `
        <p class="ques_title">${que.title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      `;

      const panel = document.createElement("div");
      panel.classList.add("panel");
      panel.style.height = "0";
      panel.innerHTML = `<div class="flex panel_div">
      ${
        que.p1_link !== null
          ? `<div><a href=${que.p1_link} target="_blank">Link 1</a></div>`
          : ""
      }
      ${
        que.p2_link !== null
          ? `<div><a href=${que.p2_link} target="_blank">Link 2</a></div>`
          : ""
      }
      ${
        que.yt_link !== null
          ? `<div><a href=${que.yt_link} target="_blank">Youtube</a></div>`
          : ""
      }
      
        </div>`;

      const div = document.createElement("div");
      const divCheck = document.createElement("div");

      div.classList.add("division");
      divCheck.classList.add("divCheck");

      divCheck.appendChild(checkbox);
      divCheck.appendChild(button);

      div.appendChild(divCheck);
      div.appendChild(panel);

      accordion_el.appendChild(div);
      topic_el.appendChild(accordion_el);

      button.addEventListener("click", function () {
        const isActive = button.classList.contains("active");

        if (!isActive) {
          button.classList.add("active");
          button.querySelector(".lucide-chevron-down").classList.add("active");
          panel.style.height = panel.scrollHeight + "px";
        } else {
          button.classList.remove("active");
          button
            .querySelector(".lucide-chevron-down")
            .classList.remove("active");
          panel.style.height = "0";
        }
      });

      checkbox.addEventListener("click", function () {
        if (checkbox.checked) {
          button.style.backgroundColor = "#4FFFB0";
        } else {
          button.style.backgroundColor = "#eee";
        }
      });
    });

    accContainer.appendChild(topic_el);
  });
}

loadAccordionData();
