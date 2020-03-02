import React, { useState } from 'react'
import { Button, Input } from 'antd';

const { Search } = Input;

const PanelComponent = (props: any): JSX.Element => {
  let { searchByType, searchByName, loadMore, reset } = props;
  const [inputType, setInputType] = useState<string>('type');

  return (
    <div className="panel-component">
      {/* {inputType === 'size' && <InputNumber className="panel-input" min={1} defaultValue={5} onChange={val => setSizeLimit(val)}/>} */}
      {inputType === 'type' && <Search className="panel-input" placeholder="Find by type" onSearch={val => searchByType(val)} enterButton />}
      {inputType === 'name' && <Search className="panel-input" placeholder="Find by name" onSearch={val => searchByName(val)} enterButton />}
      <div>
        {/* <Button className="panel-button" type="default" onClick={() => onSetInputType('size')}>Set Limit</Button> */}
        <Button className="panel-button" type="default" onClick={() => setInputType('name')}>Name Query</Button>
        <Button className="panel-button" type="default" onClick={() => setInputType('type')}>Type Query</Button>
        <Button className="panel-button" type="default" onClick={() => loadMore(true)}>Load More +</Button>
        <Button className="panel-button" type="default" onClick={() => reset(true)}>Reset</Button>
      </div>
    </div>
  )
}

export default PanelComponent;