const list = document.querySelector('ul');
const form = document.querySelector('form');

// getting data from firestore
const addRecipe = (recipe, id) => {
  const html = `
        <li data-id="${id}">
            <p>${recipe.title}</p>
            <p>${recipe.created_at.toDate()}</p>
            <button class="btn btn-danger btn-sm my-2">delete</button>
        </li>
    `;

  list.innerHTML += html;
};

db.collection('recipes')
  .get()
  .then(docs => {
    docs.forEach(doc => {
      addRecipe(doc.data(), doc.id);
    });
  })
  .catch(err => console.log(err.message));

// saving record in firestore
form.addEventListener('submit', e => {
  e.preventDefault();
  const now = new Date();

  const recipe = {
    title: form.recipe.value,
    created_at: firebase.firestore.Timestamp.fromDate(now)
  };

  db.collection('recipes')
    .add(recipe)
    .then(() => console.log('recipe added!'))
    .catch(err => console.log(rr.message));
});

// deleting a recipe from firestore
list.addEventListener('click', e => {
  if (e.target.tagName == 'BUTTON') {
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('recipes')
      .doc(id)
      .delete()
      .then(() => console.log('recipe deleted'))
      .catch(err => console.log(err));
  }
});
