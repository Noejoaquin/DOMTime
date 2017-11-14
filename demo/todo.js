


$l('.todo-button').on('click', () => {
  const newLi = $l('<li>');
  const todoContent = $l('.todo-input').htmlArray[0].value;
  debugger
  newLi.append(todoContent);
  $l('.todo-list').append(newLi);
})
