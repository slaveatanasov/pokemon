import React from 'react';
import PokeballComponent from './Pokeball'
import { Table, Tag } from 'antd';

interface Pokemon {
  id: number | string,
  name: string,
  types: string[],
  classification: string
  key?: number | string
}

interface incomingPokemonData {
  data: Pokemon[]
}

const TableComponent = (data: incomingPokemonData): JSX.Element => {
  let dataSource: Pokemon[] = data.data;

  const columns: any[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Classification',
      dataIndex: 'classification',
      key: 'classification',
    },
    {
      title: 'Types',
      dataIndex: 'types',
      key: 'types',
      render: (types: string[]) => (
        <span>
          {
            types.map((type: string) => {
              return (
                <Tag key={Math.random() + Math.random()} color={"grey"}>
                  {type.toUpperCase()}
                </Tag>
              )
            })
          }
        </span>
      )
    },
  ];

  return (
    <div>
      {dataSource.length >= 0 ? <Table pagination={{ defaultPageSize: 8 }} dataSource={dataSource} columns={columns} /> : <PokeballComponent />}
    </div>
  )
}

export default TableComponent;