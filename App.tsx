import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  const [value, setValue] = useState('0');
  const [display, setDisplay] = useState(false);
  const [type, setType] = useState(null);
  const [values, setValues] = useState([0,0]);
  const [current, setCurent] = useState(0);

  function addDigit(n: any) {
    const clearDisplay = value === '0' || display

    if (n === '.' && !display && value.includes('.')) {
      return
    }

    const currentValue = clearDisplay ? '' : value
    const displayValue = currentValue + n 
    const valuesB = [...values]
    
    if (n != '.') {
      valuesB[current] = parseFloat(displayValue)
    }
    setValue(displayValue)
    setDisplay(false)
    setValues(valuesB)
  }

  function clearMemory(): void {
    setValue('0')
    setDisplay(false)
    setType(null)
    setValues([0,0])
    setCurent(0)
  }

  function setOperation(operation: any) {

    if (values[0] === 0) {
      return
    }

    if (current === 0) {

      setCurent(1)
      setType(operation)
      setDisplay(true)

    } else {

      const equal = operation === '='
      const valuesB = [...values]

      try {
        valuesB[0] = eval(`${valuesB[0]} ${type} ${valuesB[1]}`)
      } catch (error) { valuesB[0] = values[0] }

      valuesB[1] = 0

      setValue(`${valuesB[0]}`)
      setDisplay(true)
      setType(equal ? null : operation)
      setValues(valuesB)
      setCurent(equal ? 0 : 1)
    }
  }


  return (
    <SafeAreaView >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Display value={value}/>
          <View style={styles.buttons}>
            <Button label='AC' triple onClick={clearMemory}/>
            <Button label='/' operation onClick={setOperation}/>
            <Button label='7' onClick={addDigit}/>
            <Button label='8' onClick={addDigit}/>
            <Button label='9' onClick={addDigit}/>
            <Button label='*' operation onClick={setOperation}/>
            <Button label='4' onClick={addDigit}/>
            <Button label='5' onClick={addDigit}/>
            <Button label='6' onClick={addDigit}/>
            <Button label='-' operation onClick={setOperation}/>
            <Button label='1' onClick={addDigit}/>
            <Button label='2' onClick={addDigit}/>
            <Button label='3' onClick={addDigit}/>
            <Button label='+' operation onClick={setOperation}/>
            <Button label='0' double onClick={addDigit}/>
            <Button label='.' onClick={addDigit}/>
            <Button label='=' operation onClick={setOperation}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default App;
