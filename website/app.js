/* Global Variables */
const key = "";
const generateBtn = document.querySelector("#generate");
const feelingInput = document.querySelector("#feelings");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// making async fn for useing fetch() and making GET req from the api
const getWeatherData = async (url = "") => {
  console.log(url);
  const res = await fetch(url);
  try {
    const DatafromApi = await res.json();
    console.log(DatafromApi);
    return DatafromApi;
  } catch (error) {
    console.log("error", error);
  }
};
//async fn for posting the data to the app endpoint object
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: `POST`,
    credentails: `same-Origin`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const newDataPosted = await res.json();
    return newDataPosted;
  } catch (error) {
    console.log("error", error);
  }
};
//async fn for returning the end point data to the app
const getDataLocally = async (url = "") => {
  const res = await fetch(url);
  try {
    const localData = await res.json();
    console.log(localData);
    return localData;
  } catch (error) {
    console.log("error", error);
  }
};
// using .then chaining for calling the fns and dynamically changing the UI
generateBtn.addEventListener("click", postAndGet);

function postAndGet() {
  const feelingValue = feelingInput.value;
  const zipInput = document.querySelector("#zip").value;
  if (zipInput == 0 || zipInput === "") {
    alert("enter vaild zip code");
  } else {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipInput}&units=metric&appid=${key}`;
    getWeatherData(baseUrl)
      .then(function (DatafromApi) {
        postData("http://localhost:8000/main", {
          name: DatafromApi.name,
          temp: DatafromApi.main.temp,
          date: newDate,
          feeling: feelingValue,
        });
      })

      .then(function () {
        getDataLocally("http://localhost:8000/all").then(function (localData) {
          updateUi(localData);
        });
      });
  }
  function updateUi(localData) {
    document.querySelector("#name").innerHTML = `${localData.name}`;
    document.querySelector("#date").innerHTML = `${localData.date}`;
    document.querySelector("#temp").innerHTML = `${localData.temp} C`;
    document.querySelector("#content").innerHTML = `${localData.feeling}`;
  }
}
