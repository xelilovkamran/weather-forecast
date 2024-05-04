import { regionName } from "../main.js";

const regionNameArea = document.querySelector(".right-side .region-name");
const selectedTimeWeatherIcon = document.querySelector(".img-container img");
const temperatureArea = document.querySelector(".left-side h3");
const selectedTimeArea = document.querySelector(".right-side .time");
const weatherConditionArea = document.querySelector(".right-side .weather");

function showGeneralInformationTab(data) {
    if (data && data.list) {
        regionNameArea.innerHTML = regionName;
        const selectedDay = document.querySelector(".active .name-of-day");
        for (let i = 0; i < data.list.length; i++) {
            const day = dayjs(data.list[i].dt_txt).locale("az").format("dddd");
            if (day === selectedDay.innerHTML) {
                selectedTimeWeatherIcon.src = `/svg/${data.list[i].weather[0].icon}.svg`;
                temperatureArea.innerHTML = `${Math.round(
                    data.list[i].main.temp
                )} <span>°C</span>`;
                const hour = new Date(data.list[i].dt_txt).getHours() + ":00";
                selectedTimeArea.innerHTML = `${day} - ${hour}`;
                weatherConditionArea.innerHTML = i18next.t(
                    data.list[i].weather[0].description
                );
                break;
            }
        }
    }
}

function updateGeneralInformationTab(data) {
    if (document.querySelector(".apexcharts-tooltip-title")) {
        const hour = document.querySelector(
            ".apexcharts-tooltip-title"
        ).innerHTML;
        const dayName = document.querySelector(
            ".active .name-of-day"
        ).innerHTML;
        const selectedTimeInformation = data.list.find((element) => {
            const date = dayjs(element.dt_txt);
            const day = dayjs(element.dt_txt).locale("az").format("dddd");
            const selectedTime = `${date.get("hour")}:00`;
            if (day === dayName && selectedTime === hour) {
                return element;
            }
        });

        if (hour && selectedTimeInformation) {
            temperatureArea.innerHTML = `${Math.round(
                selectedTimeInformation.main.temp
            )} <span>°C</sapn>`;
            selectedTimeArea.innerHTML = `${dayName} - ${hour}`;
            weatherConditionArea.innerHTML = i18next.t(
                selectedTimeInformation.weather[0].description
            );
            selectedTimeWeatherIcon.src = `/svg/${selectedTimeInformation.weather[0].icon}.svg`;
        }
    }
}

export { showGeneralInformationTab, updateGeneralInformationTab };
