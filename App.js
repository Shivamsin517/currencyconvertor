import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
 
} from "react-native";
import axios from 'axios'


export default function App() {
  const [value, setValue] = useState("1");
  const [currency, setCurrency] = useState("USD");
  const [targetedCurrency, setTargetedCurrency] = useState("INR");
  const [convertedValue, setConvertedValue] = useState("0");
  const [items, setItems] = useState([]);
  const initialData = [{ source: "USA", target: "INR" }];
  const [newData, setData] = useState(initialData);


  console.log(newData);

  let data = [
    
  ];
  

  const list =
    "https://v6.exchangerate-api.com/v6/6917075a7648e65d5130c223/latest/USD";
  let currencyData;
 /* useEffect(() => {
    async function currencyList() {
      const response =await  fetch(list)
        .then(function (res) {
          return res.json();
        })
        .then(function (json) {
          return json;
        });
console.log('response received')
      console.log(response);
      //
      currencyData = Object.keys(response.conversion_rates);
      //  console.log(Object.keys(jsonData.conversion_rates))
      data = currencyData.map((currency) => {
        return {
          label: currency,
          value: currency,
        };
      });
      setItems(data);
      console.log("log data after map oprator");
      console.log(data);
    }
    currencyList();
  }, []);*/
  useEffect(()=>{

    var config = {
      method: 'get',
      url: 'https://v6.exchangerate-api.com/v6/4d1dfe2464123e090353a9b4/latest/USD',

      
    };
    axios(config)
.then(function (response) {
  //console.log(JSON.stringify(response.data));
  console.log('response received')
      console.log(response);
      //
      currencyData = Object.keys(response.data.conversion_rates);
      
      //  console.log(Object.keys(jsonData.conversion_rates))
      data = currencyData.map((currency) => {
        return {
          label: currency,
          value: currency,
        };
      });
      console.log(data)
      setItems(data)
})
.catch(function (error) {
  console.log(error);
});
  },[])
  console.log('item')
  console.log(items)

  // currencyList()

  const api = `https://v6.exchangerate-api.com/v6/4d1dfe2464123e090353a9b4/pair/${currency}/${targetedCurrency}/${value}`;

  async function convertCurrency() {
    const response = await fetch(api);
    const jsonData = await response.json();

    const data = jsonData.conversion_result.toString();
    console

    setConvertedValue(data);
  }

  const addObjectToArray = () => {
    const newObject = {
      // Your object properties go here
      //id: newData.length + 1, // For example, a simple ID based on the array length
      source: currency,
      target: targetedCurrency,
    };

    // Use the spread operator to create a new array with the new object added
    //initialData.push(newObject)
    setData([...newData, newObject]);

    console.log(newData);
    // console.log(...newData)
    //console.log(initialData)
  };
  //console.log(initialData)
  //console.log(newData)
  //console.log(newData)

 

  return (
    <View style={styles.container}>
      <Text>Enter Amount</Text>

      <TextInput
        value={value}
        onChangeText={(e) => {
          setValue(e);
        }}
        style={styles.input}
      />

      {}

     
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder=" Source Currency"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setCurrency(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
      
       <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Target Currency"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setTargetedCurrency(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />

     
    

      

     
       

      <Text>Converted Value</Text>
      <TextInput value={convertedValue} style={styles.input}></TextInput>
      <View style={styles.buttonStyle}>
      <Button  onPress={convertCurrency}  title="Convert"></Button></View>
      
      <Button onPress={addObjectToArray} title="add to favourites"></Button>

      <Text style={{ backgroundColor: "red" ,color:'white'}}>favourites List</Text>
      {newData.map((data) => (
        <Text style={styles.item}>
          {data.source} and {data.target}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },

  input: { height: 40, margin: 12, borderWidth: 1, padding: 10, width: 200 },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width:200
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
 buttonStyle: {
    marginBottom:10,
    backgroundColor:'green'
  }, item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  

});
