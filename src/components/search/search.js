import {useState} from 'react';
import {ForecastCard} from '../forecast-card/forecast-card';
import {fetchCity} from '../../services/api';

export function Search() {
  const [searchValue, setSearchValue] = useState('');

  const [cityInfo, setCityInfo] = useState({
    name: '',
    type: '',
    country: '',
  });

  const [weatherInfo, setWeatherInfo] = useState({
    min: '',
    max: '',
    phrase: '',
  });

  const forecastUnionProps = {...cityInfo, ...weatherInfo};

  const [errorNameMessage, setErrorNameMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getCity = (data) => {
    setErrorNameMessage('');
    setCityInfo({
      name: data[0].EnglishName,
      type: data[0].Type,
      country: data[0].Country['EnglishName'],
    });
  }

  const getWeather = (data) => {
    setErrorMessage('');
    setWeatherInfo({
      min: data.DailyForecasts[0].Temperature.Minimum.Value,
      max: data.DailyForecasts[0].Temperature.Maximum.Value,
      phrase: data.Headline.Text,
      icon: data.DailyForecasts[0].Day.Icon,
    })
  }

  const showErrorNameMessage = () => setErrorNameMessage(`Sorry, we didn't find this city. Try to enter the correct city name.`);

  const showErrorMessage = () => setErrorMessage('Sorry, the weather forecast is not available right now. Try again later.');

  const showForecastCard = () => {
    if (errorMessage !== '') {
      return errorMessage;
    } else if (errorNameMessage !== '') {
      return errorNameMessage;
    } else if (cityInfo.name === '') {
      return '';
    }
    return (<ForecastCard props={forecastUnionProps}/>);
  }

  return (
    <section className="vh-100" style={{backgroundColor: '#f5f6f7'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <form
              style={{marginBottom: '2em', display: 'flex', justifyContent: 'center'}}
              onSubmit={(evt) => {
                evt.preventDefault();
                fetchCity(searchValue, getCity, getWeather, showErrorNameMessage, showErrorMessage);
              }}
            >
              <input
                id="search"
                type="text"
                autoComplete="off"
                placeholder="Enter the name of a city"
                style={{marginRight: '1em', width: '100%'}}
                className='form-control'
                value={searchValue}
                onChange={(evt) => setSearchValue(evt.target.value)}
              />
              <button type="submit" style={{width: '100%'}} className='btn btn-primary'>
                <span>Show weather info</span>
              </button>
            </form>
            {showForecastCard()}
          </div>
        </div>
      </div>
    </section>
  )
}

