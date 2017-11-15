
let todoCount = 1
$l('.todo-button').on('click', () => {
  const newLi = $l('<li>');
  newLi.addClass(`todo-${todoCount}`)
  const todoContent = $l('.todo-input').htmlArray[0].value; // grabs input value
  $l('.todo-input').htmlArray[0].value = '';
  newLi.append(todoContent);
  $l('.todo-list').append(newLi);
  $l(`.todo-${todoCount}`).on('click', (e) => {  // this event handles must come after the li has been appended to the document
    $l(e.currentTarget).toggleClass('crossed-out')
  })
  todoCount++;
})


const button = $l('<button>');
button.addClass('new-button')
button.append('lets make some more buttons! CLICK ME')
$l('.create-button-div').append(button)
$l('.new-button').on('click', () => {
  // debugger
  const addedButton = $l('<button>');
  addedButton.addClass(`added-button`);
  addedButton.append('click if you dare')
  let newLi = $l('<li>')
  newLi.append(addedButton)
  $l('.created-buttons').append(newLi)
  // $l(`.added-button`).on('click', () => {
  //   $l('body').addClass('change-color')
  // })
  // $l(`.added-button`).on('click', () => {
  //   debugger
  //   if ($l('.added-button').classList.includes('change-color')){
  //     $l('body').removeClass('change-color')
  //   }
  // })
})


const h1Input = $l('<input>')
h1Input.addClass('h1-generator-input')
$l('.update-todo-header-container').append(h1Input)
const changeTitleButton = $l('<button>')
changeTitleButton.addClass('todo-h1-generator-button')
changeTitleButton.append('Update title')
$l('.update-todo-header-container').append(changeTitleButton)
$l('.todo-h1-generator-button').on('click', () => {
  let newH1 = $l('<h1>')
  // debugger
  let h1Content = $l('.h1-generator-input').htmlArray[0].value
  newH1.append(h1Content)
  $l('.todo-header').remove()
  newH1.addClass('todo-header')
  $l('.todo-header-container').append(newH1)
})
