import React, { useState, useEffect, useRef } from 'react';

export default function Select({ name, options, selected, onChangeFunction }) {
  const [selectOptions, setSelectOptions] = useState([]);
  let selectRef = useRef();

  useEffect(() => {
    switch (typeof options) {
      case 'number': {
        let tempOptions = [];
        for (let num = 1; num <= options; num++) {
          tempOptions.push(num);
        }
        setSelectOptions(tempOptions);
        break;
      }
      case 'object': {
        if (Array.isArray(options)) {
          setSelectOptions(options);
        } else {
          setSelectOptions([]);
        }
        break;
      }
      default:
        console.log(name, ': Select: wrong option');
    }
  }, []);

  useEffect(() => {
    selectRef.current.value = selected ? selected : selectRef.current.value;
  });

  return (
    <select ref={selectRef} onChange={(e) => onChangeFunction(e.target.value)}>
      {selectOptions.map((option, i) => {
        return (
          <option key={name + '-option-' + i} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
