const list = document.querySelector('ul');
const form = document.querySelector('form');

// getting data from firestore
const addRecipe = recipe => {
  const html = `
        <li>
            <p>${recipe.title}</p>
            <p>${recipe.created_at.toDate()}</p>
        </li>
    `;

  list.innerHTML += html;
};

db.collection('recipes')
  .get()
  .then(docs => {
    docs.forEach(doc => {
      addRecipe(doc.data());
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
