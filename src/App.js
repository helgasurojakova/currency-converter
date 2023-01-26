import './App.css';
import CurrencyInput from './component/CurrencyInput';
import {useState, useEffect} from "react";
import axios from "axios";

function App() {

  const [amountFirst, setAmountFirst] = useState(1);
  const [amountSecond, setAmountSecond] = useState(1);

  const [currencyFirst, setCurrencyFirst] = useState('USD');
  const [currencySecond, setCurrencySecond] = useState('RUB');

  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get(`https://api.apilayer.com/fixer/latest?symbols=&base=`, {
      headers: {
        apikey: 'EygXOggFD9HiK6EGxtlxR9wm1NQl2ML3'
      }
    })
      .then(response => {
        setRates(response.data.rates);
        console.log('response', response)
      })
  }, [])

  useEffect(() => {
    if (!!rates) {
      convertAmountFirstChange(1)
    }
  }, [rates])

  function format(number) {
    return number.toFixed(3);
  }

  function convertAmountFirstChange(amountFirst) {
    setAmountSecond(format(amountFirst * rates[currencySecond] / rates[currencyFirst]))
    setAmountFirst(amountFirst)
  }

  function convertCurrencyFirstChange(currencyFirst) {
    setAmountSecond(format(amountFirst * rates[currencySecond] / rates[currencyFirst]))
    setCurrencyFirst(currencyFirst)
  }

  function convertAmountSecondChange(amountSecond) {
    setAmountFirst(format(amountSecond * rates[currencyFirst] / rates[currencySecond]))
    setAmountSecond(amountSecond)
  }

  function convertCurrencySecondChange(currencySecond) {
    setAmountSecond(format(amountFirst * rates[currencyFirst] / rates[currencySecond]))
    setCurrencySecond(currencySecond)
  }

  return (
    <div>
      <h1>Currency<br></br>Converter</h1>
      <CurrencyInput
        onAmountChange={convertAmountFirstChange}
        onCurrencyChange={convertCurrencyFirstChange}
        currencies={Object.keys(rates)} 
        amount={amountFirst} 
        currency={currencyFirst} />
      <CurrencyInput 
        onAmountChange={convertAmountSecondChange}
        onCurrencyChange={convertCurrencySecondChange}
        currencies={Object.keys(rates)} 
        amount={amountSecond} 
        currency={currencySecond} />
    </div>
  );
}

export default App;
