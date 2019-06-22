db.enablePersistence().catch(err => {
  if (err.code == "failed-precondition") {
    console.log("presistence failed");
  } else if (err.code == "unimplemented") {
    console.log("presistense is not available");
  }
});
db.collection("recipes").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(element => {
    //console.log(element, element.doc.data());
    if (element.type === "added") {
      recipeRender(element.doc.data(), element.doc.id);
    }
    if (element.type === "removed") {
      removeRecipe(element.doc.id);
    }
  });
});

//add new document
const form = document.querySelector("form");
form.addEventListener("submit", evt => {
  evt.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value
  };
  db.collection("recipes")
    .add(recipe)
    .catch(err => console.log(err));
  form.title.value = "";
  form.ingredients.value = "";
});

//delete document
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", evt => {
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    db.collection("recipes")
      .doc(id)
      .delete();
  }
});
