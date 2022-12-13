/* eslint-disable no-undef */

const $ = (selector) => document.querySelector(selector);
const doneTaskBtn = $(".done-task-btn");

// fix this using ENV
const { origin: backendUrl, pathname } = window.location;
const taskId = pathname.split("/").slice(-1)[0];

const doneTask = () => {
  const confirmation = confirm(
    "Are you secure that done this task? This task is archived"
  );

  if (!confirmation) return;
  try {
    (async () => {
      await fetch(`${backendUrl}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "finished",
        }),
      });
      window.location = "/";
    })();
  } catch (e) {
    console.log(e);
  }
};

doneTaskBtn && doneTaskBtn.addEventListener("click", doneTask);
