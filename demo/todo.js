$l(() => {

  let todoCount = 1
  $l('.todo-form').on('submit', (e) => {
    e.preventDefault();
    const newLi = $l('<li>');
    newLi.addClass(`todo-${todoCount}`)
    const todoContent = $l('.basic-input').htmlArray[0].value; // grabs input value
    if (todoContent === '') return;
    $l('.clear').removeClass('clear-button-hidden')
    $l('.clear').addClass('clear-button')
    $l('.clear-todo-container').addClass('reveal')
    $l('.basic-input').htmlArray[0].value = '';
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

  function createRain(){
    const audio = new Audio('./sound/Blop-Mark_DiAngelo-79054334.wav')
    audio.play()
  }


  $('.color-tile').on('mouseover', (e) => {
      let hexChars = '0123456789ABCDEF'
      var color = ''
      for (let i = 0; i < 6; i++){
        color += hexChars[Math.floor(Math.random() * 16)]
      }
      $l(e.currentTarget).setColor(color)
      // createRain();
  })

  $l('.clear-easel').on('click', () => {
    $l('.color-tile').each( tile => {
      $l(tile).setColor('778EC8')
    })
  })



  $l('.weather-form').on('submit', (e) => {
    debugger
    e.preventDefault()
    $l('.weather-specifics').remove()
    let weatherSpecs = $l('<ul>')
    weatherSpecs.addClass('weather-specifics')
    $l('.weather-details').append(weatherSpecs)
    let city = $l('.weather-input').htmlArray[0].value
    $l.ajax({
      type: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bcb83c4b54aee8418983c2aff3073b3b`,
      success(data) {
        console.log("We have your weather!")
        console.log(data);
        // debugger
        console.log(Object.keys(data))
        let datum = JSON.parse(data)
        let city = datum.name;
        let country = datum.sys.country;
        let description = datum.weather[0].description;
        let temperature = Math.floor(((9/5) * (datum.main.temp - 273)) + 32)
        let weatherNote = $l("<li>")
        weatherNote.append(`${city}, ${country} is currently experiencing...`)
        let weatherDescription = $l('<li>')
        weatherDescription.append(`${description};`)
        let weatherTemperature =  $l('<li>')
        weatherTemperature.append(`The current temperature is ${temperature} degrees `) // here!
        let tempSpecifics = $l('<li>')
        tempSpecifics.append(`The high today is ${Math.floor(((9/5) * (datum.main.temp_max - 273)) + 32)}, the low is ${Math.floor(((9/5) * (datum.main.temp_min - 273)) + 32)} `)
        debugger
        $l('.weather-specifics').append(weatherNote)
        $l('.weather-specifics').append(weatherDescription)
        $l('.weather-specifics').append(weatherTemperature)
        $l('.weather-specifics').append(tempSpecifics)
      },
      error() {
        console.error("An error occurred.");
        let errorLi = $l('<li>')
        errorLi.append(`Sorry, no weather could be found for "${city}". Maybe check the spelling.`)
        $l('.weather-specifics').append(errorLi)
      },
    });

  })
})
