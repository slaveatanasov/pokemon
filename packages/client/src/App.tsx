import React, { useState } from 'react';
import './App.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TableComponent from './components/TableComponent';
import PanelComponent from './components/PanelComponent';
import PokeballComponent from './components/Pokeball';
import { Card } from 'antd';

const pokemonQuery = gql`
  query pokemons($limit: Int, $q: String, $type: String) {
    pokemons(limit: $limit, q: $q, type: $type) {
      edges {
        node {
          id
          name
          types
          classification
        }
      },
      pageInfo {
        hasNextPage
      }
    }
  }
`

interface nodePokemon {
  node: Pokemon
}

interface Pokemon {
  id: number | string,
  name: string,
  types: string[],
  classification: string
  key?: number | string
}

interface Variables {
  limit?: number,
  type?: string,
  q?: string,
  after?: number
}

function App(): JSX.Element {
  const [limitState, setLimitState] = useState<number>(8)
  const [typeState, setTypeState] = useState<string | undefined>();
  const [nameState, setNameState] = useState<string | undefined>();
  const [afterState, setAfterState] = useState();

  let variables: Variables = {
    limit: limitState,
    type: typeState,
    q: nameState,
    after: afterState
  };

  const { loading, error, data, refetch } = useQuery<any, Variables>(pokemonQuery, { variables });

  let pokemonDataSource: Pokemon[] = [];

  data?.pokemons.edges.map((item: nodePokemon) => {
    if (item.node) {
      item.node.key = item.node.id;
      pokemonDataSource.push(item.node)
    }
  });

  let onSearchByType = (val: string) => {
    if (val !== "" || null || undefined) {
      setTypeState(val);
      setNameState(undefined);
      setAfterState(undefined);
      refetch(variables);
    }
  }


  let onSearchByName = (val: string) => {
    if (val !== "" || null || undefined) {
      setNameState(val);
      setTypeState(undefined);
      setAfterState(undefined);
      refetch(variables);
    }
  }

  let onSizeLimit = (val: number) => {
    setLimitState(val);
    refetch(variables);
  }

  let onLoadMore = (val: boolean) => {
    if (data?.pokemons.pageInfo.hasNextPage && val) {
      setLimitState(limitState + 5)
      setNameState(nameState);
      setTypeState(typeState);
      setAfterState(afterState);
    }
  }

  let onReset = (val: boolean) => {
    if (val) {
      setLimitState(8)
      setNameState(nameState);
      setTypeState(typeState);
      setAfterState(afterState);
      refetch(variables);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <Card>
          <PanelComponent searchByType={onSearchByType} searchByName={onSearchByName} setSizeLimit={onSizeLimit} loadMore={onLoadMore} reset={onReset} />
          { error ? <h2>Error: {error.message}</h2> : null }  
          <h1>Pokémon</h1>
          { (loading && pokemonDataSource.length < 1) ? <PokeballComponent /> : <TableComponent data={pokemonDataSource} />}
        </Card>
      </div>
    </div>
  );
}

export default App;