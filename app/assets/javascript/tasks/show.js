/* eslint-disable no-undef */

const $ = (selector) => document.querySelector(selector);

const doneTaskBtn = $(".done-task-btn");
const taskCard = $(".task-card");
const commentsContainer = $(".comments-container");

// fix this using ENV
const { origin: backendUrl, pathname } = window.location;
const taskId = pathname.split("/").slice(-1)[0];
const teamId = pathname.split("/").slice(2)[0];

const colorCards = JSON.parse(localStorage.getItem("colorCards"));

const { firstColor, secondColor } = colorCards.find(
  (colorCard) => colorCard.taskId === Number(taskId)
);

const gradientColor = `linear-gradient(to right, ${firstColor}, ${secondColor})`;

taskCard.style.background = gradientColor;
commentsContainer.style.background = gradientColor;
document.body.style.background = gradientColor;

const doneTask = () => {
  const confirmation = confirm(
    "Are you secure that done this task? This task is archived"
  );

  if (!confirmation) return;
  try {
    (async () => {
      await fetch(`${backendUrl}/teams/${teamId}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "finished",
        }),
      });
      window.location = `${backendUrl}/teams/${teamId}/tasks`;
    })();
  } catch (e) {
    console.log(e);
  }
};

doneTaskBtn && doneTaskBtn.addEventListener("click", doneTask);
