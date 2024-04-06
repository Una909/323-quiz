const container = document.querySelector(".container");
const addFlashcardSection = document.getElementById("create-flashcard");
const saveButton = document.getElementById("save-flashcard-btn");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const errorMessage = document.getElementById("error-message");
const addFlashcardBtn = document.getElementById("add-flashcard-btn");
const closeBtn = document.getElementById("close-btn");
let isEditing = false;

addFlashcardBtn.addEventListener("click", () => {
  container.classList.add("hide");
  questionInput.value = "";
  answerInput.value = "";
  addFlashcardSection.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
  container.classList.remove("hide");
  addFlashcardSection.classList.add("hide");
  if (isEditing) {
    isEditing = false;
    saveFlashcard();
  }
});

saveButton.addEventListener("click", () => {
  isEditing = false;
  const tempQuestion = questionInput.value.trim();
  const tempAnswer = answerInput.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove("hide");
  } else {
    container.classList.remove("hide");
    errorMessage.classList.add("hide");
    displayFlashcards();
    questionInput.value = "";
    answerInput.value = "";
  }
});

function displayFlashcards() {
  const flashcardList = document.getElementsByClassName("flashcard-list")[0];
  const newFlashcard = document.createElement("div");
  newFlashcard.classList.add("flashcard");
  newFlashcard.innerHTML += `
  <p class="question">${questionInput.value}</p>`;
  const answerDisplay = document.createElement("p");
  answerDisplay.classList.add("answer", "hide");
  answerDisplay.innerText = answerInput.value;

  const toggleButton = document.createElement("a");
  toggleButton.setAttribute("href", "#");
  toggleButton.setAttribute("class", "show-hide-btn");
  toggleButton.innerHTML = "Show/Hide";
  toggleButton.addEventListener("click", () => {
    answerDisplay.classList.toggle("hide");
  });

  newFlashcard.appendChild(toggleButton);
  newFlashcard.appendChild(answerDisplay);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons");
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    isEditing = true;
    editFlashcard(editButton, true);
    addFlashcardSection.classList.remove("hide");
  });
  buttonsContainer.appendChild(editButton);
  disableButtons(false);

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    editFlashcard(deleteButton);
  });
  buttonsContainer.appendChild(deleteButton);

  newFlashcard.appendChild(buttonsContainer);
  flashcardList.appendChild(newFlashcard);
  hideFlashcardSection();
}

const editFlashcard = (button, edit = false) => {
  const parentFlashcard = button.parentElement.parentElement;
  const parentQuestion = parentFlashcard.querySelector(".question").innerText;
  if (edit) {
    const parentAnswer = parentFlashcard.querySelector(".answer").innerText;
    answerInput.value = parentAnswer;
    questionInput.value = parentQuestion;
    disableButtons(true);
  }
  parentFlashcard.remove();
};

const disableButtons = (value) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((button) => {
    button.disabled = value;
  });
};

const hideFlashcardSection = () => {
  container.classList.remove("hide");
  addFlashcardSection.classList.add("hide");
};
