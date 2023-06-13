// variaveis e seleção de elementos
const apiKey = "---Sua API KEY---"


const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")
//variaveis de cada elemento dinâmico do html
const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")


//funções
const getWeatherData = async(city) => { //essa acessa os dados da API(dados com lógica)
      //o parametro q= geralmente é usado pra indicar uma consulta ou pesquisa, isso é critério do criador da API então varia a nomeclatura   
      // o parametro units= geralmente é usado para especificar a unidade de medida que você deseja utilizar ao realizar uma solicitação para a API
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`; //todas url's foram pegas atravpes da documentação da api

    fetch(apiWeatherURL)
    .then(response => (response.json()))
    .then(data => { //neste then é aonde vc seta data como a detentora dos dados da API e faz uma função de como deseja usa-la ali
        console.log(data);//teste

        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp); 
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`); //setattribute pois é uma imagem, ("oque quer alterar", pelo oque quer alterar)
        countryElement.setAttribute("src", apiCountryURL = `https://flagsapi.com/${data.sys.country}/flat/64.png`)
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`

        return data;
    })
    .catch(error => console.error(error))


}
    

const showWeatherData = async  (city) => { //essa exibi os dados da API(dados com DOM)

const data = getWeatherData(city); //pegar os dados pra exibir 

weatherContainer.classList.remove("hide");

}



//eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault() //aqui ele impede do botão enviar o formulário logo de cara como é pré-definido

    const city = cityInput.value; //para pegar oque foi enviado no cityinput

    showWeatherData(city); //jogando na função
})

cityInput.addEventListener("keyup", (e) => { //keyup para pegar a tecla usada, passa para a função "e" e no e.code sabemos qual tecla é

    if (e.code === "Enter" || e.code === "NumpadEnter") {
      const city = e.target.value;
  
      showWeatherData(city);
    }
  });