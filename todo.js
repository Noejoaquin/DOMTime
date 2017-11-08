
$l('.todo-button').on('click', () => {
  const newLi = $l('<li>');
  const todo = $l('.todo-input').htmlArray[0].value;
  const item = newLi.append(todo);
  $l('.todo-list').append(item);
})
