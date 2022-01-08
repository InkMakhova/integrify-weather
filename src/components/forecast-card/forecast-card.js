import {formatNumber} from "../../util";
import {IMAGES_URL} from "../../const";

export function ForecastCard({props}) {
  const {name, type,  country, min, max, phrase, icon} = props;

  return (
    <div className="card bg-dark text-white">
      <div className="card-img-overlay text-dark p-5">
          <img
            width={40}
            length={40}
            style={{marginBottom: '1em'}}
            src={`${IMAGES_URL}${formatNumber(icon)}.svg`}
            alt="Weather icon"
          />
        <h4 className="mb-0" style={{marginBottom: '1em'}}>{name}, {type}, {country}</h4>
        <p className="mb-2" style={{marginBottom: '1em'}}><strong>{min} F - {max} F</strong></p>
        <h5>{phrase}</h5>
      </div>
    </div>
  );
}
