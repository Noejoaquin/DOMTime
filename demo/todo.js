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
    $l('.todo-list').remove()
    $l('.clear-todo-container').removeClass('reveal')
    $l('.clear').removeClass('clear-button')
    $l('.clear').addClass('clear-button-hidden')
    let newTodoList = $l('<ul>')
    newTodoList.addClass('todo-list')
    $l('.list-container').append(newTodoList)
  })


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


  $l('.color-tile').on('mouseover', (e) => {
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
    e.preventDefault()
    $l('.weather-specifics').remove()
    let weatherSpecs = $l('<ul>')
    weatherSpecs.addClass('weather-specifics')
    $l('.weather-details').append(weatherSpecs)
    let city = $l('.weather-input').htmlArray[0].value
    $l.ajax({
      type: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3351d61872a5b81e62b6bf2b9546efe3`,
      success(data) {
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
        $l('.weather-specifics').append(weatherNote)
        $l('.weather-specifics').append(weatherDescription)
        $l('.weather-specifics').append(weatherTemperature)
        $l('.weather-specifics').append(tempSpecifics)
      },
      error() {
        let errorLi = $l('<li>')
        errorLi.append(`Sorry, no weather could be found for "${city}". Maybe check the spelling.`)
        $l('.weather-specifics').append(errorLi)
      },
    });

  })
})
