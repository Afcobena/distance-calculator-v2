import { useEffect } from "react";

import deleteIcon from "../../../assets/images/deleteIcon.svg";

function SavedResultsCard({ saveResults, setSaveResults }) {

  useEffect(() => {
    getData();
  }, []);

  // FUNCTION TO GET THE RESULTS
  const getData = () => {
    const localData = JSON.parse(localStorage.getItem("savedResult"));
    setSaveResults(localData);
  };


  // FUNCTION TO FILTER AND SAVE THE NEW DATA
  const handleDeleteData = (id) => {
    const filteredData = saveResults.filter((data) => data.id !== id);

    localStorage.setItem("savedResult", JSON.stringify(filteredData));
    setSaveResults(filteredData);
  };

  return (
    <div className="saved--results">
      {saveResults === null ? (
        <p>saved</p>
      ) : (
        <>
          <p>saved</p>

          <div className="saved--results__container">
            {saveResults.map((data) => {
              return (
                <div key={data.id} className="saved--results__container--card">
                  <div className="saved--results__container--card__info">
                    <p>
                      {data.amount} {data.unit} → {data.result} {data.unitResult}
                    </p>
                  </div>

                  <div className="saved--results__container--card__button">
                    <img
                      onClick={() => handleDeleteData(data.id)}
                      src={deleteIcon}
                      alt="x delete button"
                    />
                  </div>

                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default SavedResultsCard;
