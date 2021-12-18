import { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import "./App.css";

function App() {
  const [products, setProducts] = useState(null);
  const [fields, setFields] = useState([]);
  const [rightFields, setRightFields] = useState([]);
  // const [leftList,setLeftList] = useState(null)
  let [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);

  const [show, setShow] = useState(false);

  let fileReader;

  useEffect(() => {
    if (products !== null) {
      const arrayProduct = Object.keys(products);
      if (arrayProduct.length > 0) {
        const product = products[arrayProduct[0]];
        console.log(product);
        const arr = Object.keys(product);
        setFields(arr);

        const temp = [];
        for (let i = 0; i < arr.length; i++) {
          temp.push({
            name: arr[i],
            selected: false,
          });
        }
        setLeftList(temp);
      }
    }
  }, [products]);

  const handleFileRead = (e) => {
    const content = fileReader.result;
    // console.log("displaying content");
    const obj = JSON.parse(content);
    setProducts(obj.products);
    // … do something with the 'content' …
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    // console.log(file);
  };

  const toggleSelection = (e) => {
    const element = e.target;
    const name = e.target.getAttribute("name");
    // console.log("toggling");

    const temp = [];
    for (let i = 0; i < leftList.length; i++) {
      if (leftList[i].name === name) {
        if (leftList[i].selected === true) {
          temp.push({
            name,
            selected: false,
          });
          element.classList.remove("selected");
        } else {
          temp.push({
            name,
            selected: true,
          });
          element.classList.add("selected");
        }
      } else {
        temp.push({
          ...leftList[i],
        });
      }
    }
    setLeftList(temp);
  };

  const toggleSelectionRight = (e) => {
    const element = e.target;
    const name = e.target.getAttribute("name");
    // console.log("right toggling : " + name);

    const temp = [];
    for (let i = 0; i < rightList.length; i++) {
      if (rightList[i].name === name) {
        if (rightList[i].selected === true) {
          temp.push({
            name,
            selected: false,
          });
          element.classList.remove("selected");
        } else {
          temp.push({
            name,
            selected: true,
          });
          element.classList.add("selected");
        }
      } else {
        temp.push({
          ...rightList[i],
        });
      }
    }
    setRightList(temp);
  };

  const moveToRight = () => {
    const temp = [];
    leftList.forEach((obj) => {
      if (obj.selected === true && !rightFields.includes(obj.name)) {
        temp.push(obj.name);
      }
    });

    setRightFields([...rightFields, ...temp]);

    const temp_rightList = [];

    temp.forEach((field) => {
      if (!rightFields.includes(field)) {
        temp_rightList.push({
          name: field,
          selected: false,
        });
      }
    });
    setRightList([...rightList, ...temp_rightList]);
  };

  const moveToLeft = () => {
    const fields = [];
    const temp = rightList.filter((obj) => {
      if (obj.selected === false) {
        fields.push(obj.name);
        return true;
      }
      return false;
    });

    setRightList(temp);
    if(fields.length === 0) setShow(false)

    setRightFields(fields);
  };

  const handleShowProducts = () => {
    setShow(true);
  };

  const handleCancelShowProducts = () => {
    setShow(false);
  };

  return (
    <div className="wrapper">
      <div className="container-top">
        <div className="container-step-1">
          <div className="col-1">Step 1:</div>
          <div className="col-2">
            <p>Select File</p>
            <input
              type="file"
              id="file"
              className="input-file"
              onChange={(e) => handleFileChosen(e.target.files[0])}
            />
            <p>Supported File Type(s): .CSV, .JSON</p>
          </div>
        </div>

        <div className="container-step-2">
          <div className="col-1">Step 2:</div>
          <div className="col-2">
            <p>Specify Format</p>

            <div>
              <span>File Type</span>
              <select name="pets" id="pet-select">
                <option value="dog">CSV</option>
                <option value="cat">JSON</option>
              </select>
            </div>
            <div>
              <span>Character Encoding</span>
              <select name="pets" id="pet-select">
                <option value="utf-8">UTF - 8</option>
              </select>
            </div>
            <div>
              <span>Delimiter</span>
              <select name="pets" id="pet-select">
                <option value="comma">Comma</option>
                
              </select>
            </div>
            <div>
              <span>Has Header</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-bottom">
        <div className="container-step-3">
          <div className="col-1">
            <p>Step 3:</p>
          </div>
          <div className="col-2">
            <p>Display Handling</p>
            <p>Select the fields to be displayed</p>
            <div className="table">
              <div className="table-col-1">
                <p>Available Fields</p>

                <div className="container-table-fields">
                  {fields !== null &&
                    fields.map((field) => {
                      return (
                        <p
                          key={field}
                          onClick={(e) => toggleSelection(e)}
                          value={field}
                          name={field}
                        >
                          {field}
                        </p>
                      );
                    })}
                </div>
              </div>
              <div className="table-col-2">
                <button onClick={moveToRight}>{`>>`}</button>
                <button onClick={moveToLeft}>{`<<`}</button>
              </div>
              <div className="table-col-3">
                <p>Fields to be Displayed</p>
                <div className="container-table-fields">
                  {rightFields.length > 0 &&
                    rightFields.map((field) => {
                      return (
                        <p
                          key={field}
                          onClick={(e) => toggleSelectionRight(e)}
                          value={field}
                          name={field}
                        >
                          {field}
                        </p>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-btn-action">
        <a href="/#productTable"><button onClick={handleShowProducts} className="btn-next">
          Next
        </button></a>
        <button onClick={handleCancelShowProducts} className="btn-cancel">
          Cancel
        </button>
      </div>

      <div className="container-productsTable">
        {show && <ProductTable fields={rightFields} prod={products} />}
      </div>
    </div>
  );
}

export default App;
