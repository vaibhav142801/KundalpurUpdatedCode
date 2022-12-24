import React, { useState, useRef, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import "./OptionsList.css";
const countries = [
  { id: 1, name: "Iश्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि" },
  { id: 2, name: "श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि" },
  { id: 3, name: "श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि " },
  { id: 4, name: "श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि" },
];
const UseraccountList = () => {
  const [open, setopen] = useState(false);
  const [value, setvalue] = useState(null);
  const [query, setquery] = useState("");
  const label = "name";
  const id = "id";
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.addEventListener("click", close);
  }, []);

  const close = (e) => {
    setopen(e && e.target === ref.current);
  };

  const filterr = (options) => {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  const onChange = (val) => {
    setvalue(val[label]);
  };

  return (
    <>
      <div className="mobileuserlist">
        <div className="userlistmain">
          <div>
            <div className="dropdown">
              <div className="control" onClick={() => setopen(!open)}>
                <div className="selected-value">
                  <input
                    type="text"
                    ref={ref}
                    placeholder={value ? value[label] : "Select Your account.."}
                    onClick={() => setopen(!open)}
                    value={value || query}
                    onChange={(e) => {
                      setquery(e.target.value);

                      onChange("");
                    }}
                  />
                  <div className={`arrow ${open ? "open " : null}`} />
                </div>
              </div>
              <div className={`options ${open ? "open " : null}`}>
                {/* {filterr(countries).map((option) => (
                  <div
                    key={option[id]}
                    className={`option ${
                      value === option ? "selected" : "" ? "open " : null
                    }`}
                    onClick={() => {
                      setquery("");
                      onChange(option);
                      setopen(false);
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <span style={{ marginleft: "10px" }}>
                        {" "}
                        {option[label]}
                      </span>

                      <div style={{ marginLeft: "10px" }}>
                        <ArrowDropDownIcon />
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UseraccountList;
