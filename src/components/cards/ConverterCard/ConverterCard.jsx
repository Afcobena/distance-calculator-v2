import { useEffect, useState } from "react";
import icon from "../../../assets/images/iconWhite.svg";
import heartIcon from "../../../assets/images/heartIcon.svg";
import SavedResultsCard from "../SavedResultsCard/SavedResultsCard";

function ConverterCard() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("0");
  const [unit, setUnit] = useState("");
  const [result, setResult] = useState("0");
  const [unitResult, setUnitResult] = useState("km");
  const [saveResults, setSaveResults] = useState([]);
  const [resultsSaved, setResultsSaved] = useState([]);

  useEffect(() => {
    handleResult(category, amount);
  }, [category, amount]);

  // HANDLE THE CATEGORY STATE WHEN HAS BEEN CHANGED
  const handleCategoryChange = (event) => {
    const newCategoryState = event.target.value;
    setCategory(newCategoryState);
    handleUnit(newCategoryState);
    handleButtonConvert(newCategoryState);
  };

  // HANDLE THE AMOUNT STATE WHEN HAS BEEN MODIFIED
  const handleAmountChange = (event) => {
    const newAmountState = event.target.value;
    setAmount(newAmountState);
  };

  // HANDLE THE UNIT STATE WHEN THE CATEGORY CHANGE
  const handleUnit = (category) => {
    switch (category) {
      case "kmMil":
        setUnit("km");
        setUnitResult("miles");
        break;
      case "milKm":
        setUnit("mil");
        setUnitResult("kilometers");
        break;
      case "mFt":
        setUnit("m");
        setUnitResult("feets");
        break;
      case "ftM":
        setUnit("ft");
        setUnitResult("meters");
        break;
      case "cmIn":
        setUnit("cm");
        setUnitResult("inches");
        break;
      case "inCm":
        setUnit("in");
        setUnitResult("centimeters");
        break;
      default:
        setUnit("km");
        setUnitResult("miles");
        break;
    }
  };

  // FUNCTION TO CHANGE THE REVERSE FORMULA
  const handleButtonConvert = (category) => {
    switch (category) {
      case "kmMil":
        setCategory("milKm");
        handleUnit(category);
        break;
      case "milKm":
        setCategory("kmMil");
        handleUnit(category);
        break;
      case "mFt":
        setCategory("ftM");
        handleUnit(category);
        break;
      case "ftM":
        setCategory("mFt");
        handleUnit(category);
        break;
      case "cmIn":
        setCategory("inCm");
        handleUnit(category);
        break;
      case "inCm":
        setCategory("cmIn");
        handleUnit(category);
        break;
      default:
        setCategory("kmMil");
        setUnit("km");
        setUnitResult("miles");
        break;
    }
  };

  // FUNCTION TO OPERATE BETWEEN THE DIFERENTS CONVERTIONS
  const handleResult = (category, amount) => {
    switch (category) {
      case "kmMil":
        handleResultSliced(amount, 0.621371);
        break;
      case "milKm":
        handleResultSliced(amount, 1.60934);
        break;
      case "mFt":
        handleResultSliced(amount, 3.28084);
        break;
      case "ftM":
        handleResultSliced(amount, 0.3048);
        break;
      case "cmIn":
        handleResultSliced(amount, 0.393701);
        break;
      case "inCm":
        handleResultSliced(amount, 2.54);
        break;
      default:
        setResult(0);
        break;
    }
  };

  // FUNCTION TO SLICE THE RESULT
  const handleResultSliced = (amount, modif) => {
    const newResultSliced = (amount * modif).toString().slice(0, 5);
    // habria que recorrer el string

    if (newResultSliced.slice(0, 1).includes(".")) {
      setResult((amount * modif).toString().slice(0, 4));
    } else {
      setResult((amount * modif).toString().slice(0, 5));
    }
  };

  // FUNCTION TO SAVE THE RESULTS
  const handleSaveResults = () => {
    const localId = new Date();

    const newObjectResult = {
      id: localId,
      amount: amount,
      unit: unit,
      result: result,
      unitResult: unitResult,
    };

    const updatedSaveResults = [...saveResults, newObjectResult];
    localStorage.setItem("savedResult", JSON.stringify(updatedSaveResults));
    setSaveResults(updatedSaveResults);

    const localData = JSON.parse(localStorage.getItem("savedResult"));
    setResultsSaved(localData);
  };

  return (
    <div className="converter">
      <div className="converter--calculator">
        <div className="converter--calculator__title">
          <h2>convert</h2>
        </div>

        <div className="converter--calculator__form">
          <div className="converter--calculator__form--row1">
            <div className="converter--calculator__form--row1__left">
              <select
                className="converter--calculator__form--row1__left--selection"
                onChange={handleCategoryChange}
                value={category}
              >
                <option value="select">select</option>
                <option value="kmMil">km → mil</option>
                <option value="milKm">mil → km</option>
                <option value="mFt">m → ft</option>
                <option value="ftM">ft → m</option>
                <option value="cmIn">cm → in</option>
                <option value="inCm">in → cm</option>
              </select>
              <div className="converter--calculator__form--row1__left--image">
                <img
                  onClick={() => handleButtonConvert(category)}
                  src={icon}
                  alt="two ways arrows"
                />
              </div>
            </div>

            <div className="converter--calculator__form--row1__right">
              <input
                className="converter--calculator__form--row1__right--input"
                type="text"
                onChange={handleAmountChange}
                value={amount}
              />
              <div className="converter--calculator__form--row1__right--unit">
                <span>{unit}</span>
              </div>
            </div>
          </div>

          <div className="converter--calculator__form--row2">
            <div className="converter--calculator__form--row2__button">
              <img
                onClick={handleSaveResults}
                src={heartIcon}
                alt="heart icon to save results"
              />
            </div>
            <div className="converter--calculator__form--row2__results">
              <span className="converter--calculator__form--row2__results--numbers">
                {result}
              </span>
              <span className="converter--calculator__form--row2__results--units">
                {unitResult}
              </span>
            </div>
          </div>
        </div>
      </div>

      <SavedResultsCard 
      saveResults={saveResults}
      setSaveResults={setSaveResults}
      />
    </div>
  );
}

export default ConverterCard;
