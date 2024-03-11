import { useState } from "react";

export default function Input() {
  let count = 0;
  const [value, setValue] = useState("");
  const [disable, setDisable] = useState(true);
  const [showDetails, setShowDetails] = useState([]);

  function disableHandle() {
    if (value != "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }

  function onClickHandle() {
    setShowDetails([
      ...showDetails,
      { id: count++, result: value, flag: false },
    ]);
    setValue("");
    setDisable(true);
  }

  function onChangeHandle(index) {
    {
      const newArr = showDetails.map((obj, i) => {
        if (i === index && obj.flag === false) {
          return {
            ...obj,
            flag: true,
          };
        } else {
          return {
            ...obj,
            flag: false,
          };
        }
      });
      setShowDetails(newArr);
    }
  }
  function onDelete(index1) {
    {
      const newArr2 = showDetails.filter((obj, i) => i !== index1);
      setShowDetails(newArr2);
    }
  }
  return (
    <>
      <input
        type="string"
        placeholder="Enter your task"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyUp={disableHandle}
      />
      <button onClick={onClickHandle} disabled={disable}>
        ADD
      </button>
      <div>
        {showDetails.map((item, i) => (
          <li key={i}>
            <input
              type="checkbox"
              onChange={() => {
                onChangeHandle(i);
              }}
            />
            {item.flag ? <del>{item.result}</del> : item.result}
            {item.flag ? (
              <button disabled={true}>Delete</button>
            ) : (
              <button
                onClick={() => {
                  onDelete(i);
                }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </div>
    </>
  );
}
