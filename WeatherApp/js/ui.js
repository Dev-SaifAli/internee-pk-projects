import { WEATHER_BACKGROUNDS } from "./constants.js";

function getWeatherBg(description) {
  const desc = description.toLowerCase();

  for (const [key, imageURL] of Object.entries(WEATHER_BACKGROUNDS)) {
    if (desc.includes(key)) {
      return imageURL;
    }
  }
}
export function applyWeatherBackground(description) {
  const imageURL =
    getWeatherBg(description) || WEATHER_BACKGROUNDS["clear sky"];

  document.body.style.backgroundImage = `url('${imageURL}')`;
  document.body.style.backgroundSize = `cover`;
  document.body.style.backgroundPosition = `center`;
  document.body.style.backgroundRepeat = `no-repeat`;
  document.body.style.backgroundAttachment = `fixed`;
}
