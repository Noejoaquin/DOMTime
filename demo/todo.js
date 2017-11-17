$l(() => {
  
  let todoCount = 1
  $l('.todo-form').on('submit', (e) => {
    e.preventDefault();
    const newLi = $l('<li>');
    newLi.addClass(`todo-${todoCount}`)
    const todoContent = $l('.todo-input').htmlArray[0].value; // grabs input value
    if (todoContent === '') return;
    $l('.clear').removeClass('clear-button-hidden')
    $l('.clear').addClass('clear-button')
    $l('.clear-todo-container').addClass('reveal')
    $l('.todo-input').htmlArray[0].value = '';
    newLi.append(todoContent);
    $l('.todo-list').prepend(newLi);
    $l(`.todo-${todoCount}`).on('click', (e) => {  // this event handles must come after the li has been appended to the document
      $l(e.currentTarget).toggleClass('crossed-out')
    })
    todoCount++;
  })
  
  $l('.clear').on('click', (e) => {
    debugger
    $l('.todo-list').remove()
    $l('.clear-todo-container').removeClass('reveal')
    $l('.clear').removeClass('clear-button')
    $l('.clear').addClass('clear-button-hidden')
    let newTodoList = $l('<ul>')
    newTodoList.addClass('todo-list')
    $l('.list-container').append(newTodoList)
  })
  
  
  // const button = $l('<button>');
  // let buttonCount = 1
  // button.addClass('new-button')
  // button.append('lets make some more buttons! CLICK ME')
  // $l('.create-button-div').append(button)
  // $l('.new-button').on('click', () => {
  //   // debugger
  //   const addedButton = $l('<button>');
  //   addedButton.addClass(`added-button-${buttonCount}`);
  //   addedButton.addClass('created-button')
  //   addedButton.append('click if you dare')
  //   let newLi = $l('<li>')
  //   newLi.append(addedButton)
  //   $l('.created-buttons').append(newLi)
  //   $l(`.added-button-${buttonCount}`).on('click', () => {
  //     $l('body').toggleClass('change-color')
  //   })
  //   buttonCount++;
  // })
  
  
  // const h1Input = $l('<input>')
  // h1Input.addClass('h1-generator-input')
  // $l('.update-todo-header-container').append(h1Input)
  // const changeTitleButton = $l('<button>')
  // changeTitleButton.addClass('todo-h1-generator-button')
  // changeTitleButton.append('Update title')
  // $l('.update-todo-header-container').append(changeTitleButton)
  // $l('.todo-h1-generator-button').on('click', () => {
  //   let newH1 = $l('<h1>')
  //   // debugger
  //   let h1Content = $l('.h1-generator-input').htmlArray[0].value
  //   newH1.append(h1Content)
  //   $l('.todo-header').remove()
  //   newH1.addClass('todo-header')
  //   $l('.todo-header-container').append(newH1)
  // })
  
  // $l('weather-button').on('click', () => {
  //   $l.ajax({
  //     url:
  //   })
  // })
  
  
  function createLis(){
    let count = 0;
    while (count < 400){
       let newLi = $l('<li>')
       newLi.addClass('color-tile')
      $l('.grid').append(newLi)
      count++;
    }
  }
  
  $l(createLis)
  
  
  $('.color-tile').on('mouseover', (e) => {
    // $l('.color-tile').each( tile => {
      let hexChars = '0123456789ABCDEF'
      var color = ''
      for (let i = 0; i < 6; i++){
        debugger
        color += hexChars[Math.floor(Math.random() * 16)] 
      }
      debugger
      $l(e.currentTarget).setColor(color)
    // })
  })
  
  $l('.clear-easel').on('click', () => {
    $l('.color-tile').each( tile => {
      $l(tile).setColor('778EC8')
    })
  })
})

