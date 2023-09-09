import React, { useEffect, useState } from "react";
import {apiUrl , filterData} from "./data";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

const App = () => {

  const [courses,setCourses] = useState(null);
  const [loading,setloading] = useState(true);
  const [category,setCategory] = useState(filterData[0].title);

async function fetchData() {
  setloading(true);
  try{
    let response = await fetch(apiUrl);
    let output = await response.json();
    // output = 
    setCourses(output.data);
  }
  catch(error) {
    toast.error("Network Error");
  }
  setloading(false);
}

useEffect(() => {
  fetchData();
},[])

  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">

      <div className="bg-bgDark2" >
        <Navbar/>
      </div>

      <div>
        <Filter
          filterData = {filterData}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center bg-bgDark2">
        {
          loading ? (<Spinner/>) : (<Cards courses={courses} category={category} />)
        }
      </div>

    </div>
  );
};

export default App;
