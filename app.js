const list = document.querySelector('ul');

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
