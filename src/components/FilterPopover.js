import React, { useContext, useEffect, useState } from 'react';
import { Hospital, NetworkIcon, SaveIcon } from 'lucide-react';
import { NestedDropdown } from 'mui-nested-menu';

import { FaRegHospital } from 'react-icons/fa6';
import { FaHospitalAlt } from 'react-icons/fa';
import { SharedContext } from '../context/SharedContext';
//import { SidebarContext } from '../SidebarContext';

export function NewMenuBar() {
  const [selectedItem, setSelectedItem] = useState("");
  const api = localStorage.getItem("API")
  
  // Use context directly without destructuring
  const { setcontextHospitals, setLocationProfiles } = useContext(SharedContext);
 const { setDrNameContext } = useContext(SharedContext);

  // Handler function to manage item clicks
  const handleItemClick = (event, item) => {
    setSelectedItem(item.label);  // Update state with the clicked item's label
    console.log(`${item.label} clicked`, event, item);
    setcontextHospitals(item.label);  // Set the selected item in context
  };

  useEffect(() => {
    // This function will run whenever `selectedItem` changes
   
    async function filterApi(city) {
      try {
        const response = await fetch(`${api}/getfilterdata`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ state: " ", branch: city }),
        });
        const data = await response.json();
  
        setLocationProfiles(data.countOfProfiles);
        //setAllNames(data.result[0].businessNames);
        setDrNameContext(data.result[0].businessNames);
        //console.log("123 : " + data.result[0].businessNames);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (selectedItem) {
      filterApi(selectedItem);  // Call the API function when `selectedItem` changes
      console.log(" This function will run whenever `selectedItem` changes")
    }
  
    
  }, [selectedItem, setLocationProfiles]);


  
 
  useEffect(() => { 
    const handlePageRefresh = () => { 
      setLocationProfiles("");
    }
    window.addEventListener("beforeunload", handlePageRefresh);
  })
  

  const menuItemsData = {
    label: ` ${selectedItem? selectedItem : "Hospitals"}`,
    leftIcon: <SaveIcon className="text-blue-500" />,
    items: [
      {
        label: 'North West',
        leftIcon: <FaHospitalAlt className="text-indigo-500" />,
        items: [
          {
            label: 'Delhi - NCR',
            leftIcon: <FaHospitalAlt className="text-indigo-500" />,
            items: [
              {
                label: 'Delhi',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Ghaziabad',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Gurugram',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
            ],
          },
          {
            label: 'Jaipur',
            callback: handleItemClick, // Use the handler for clicks
          },
          {
            label: 'Patiala',
            callback: handleItemClick, // Use the handler for clicks
          },
          {
            label: 'Pune',
            leftIcon: <FaHospitalAlt className="text-indigo-500" />,
            items: [
              {
                label: 'Pune Kharadi',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks,
              },
              {
                label: 'Baner',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
            ],
          },
        ],
      },
      {
        label: 'Goa',
        callback: handleItemClick, // Use the handler for clicks
      },
      {
        label: 'Mangalore',
        callback: handleItemClick,
      },
      {
        label: 'South',
        leftIcon: <FaHospitalAlt className="text-indigo-500" />,
        items: [
          {
            label: 'Bengaluru',
            leftIcon: <FaHospitalAlt className="text-indigo-500" />,
            items: [
              {
                label: 'Doddaballapur',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Old Airport Road',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Sarjapur',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Jayanagar',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Varthur',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Malleshwaram',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Whitefield',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Millers road',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
              {
                label: 'Yeshwanthpur',
                leftIcon: <FaRegHospital className="text-green-500" />,
                callback: handleItemClick, // Use the handler for clicks
              },
            ],
          },
          {
            label: 'Salem',
            callback: handleItemClick, // Use the handler for clicks
          },
          {
            label: 'Mysore',
            callback: handleItemClick, // Use the handler for clicks
          },
        ],
      },
      {
        label: 'South East',
        leftIcon: <FaHospitalAlt className="text-indigo-500" />,
        items: [
          {
            label: 'Vijayawada',
            callback: handleItemClick, // Use the handler for clicks
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-purple-500 hover:bg-purple-400" style={{ backgroundColor: '#A19EC9', borderRadius: '10px',  }}>
      <NestedDropdown
        placeholder= "Hospital"
        menuItemsData={menuItemsData}
        MenuProps={{ elevation: 3, className: 'rounded-2xl shadow-lg' }}
        ButtonProps={{ variant: 'outlined', className: 'text-white bg-slate-400 hover:bg-purple-400 rounded-2xl px-4 py-2',    style: { borderRadius: '10px', height: '4.5vh' },  }}
        onClick={() => console.log('Clicked')}
      />
    </div>
  );
}
