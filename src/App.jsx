import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
 Text
} from 'rebass';

import React, { useReducer } from 'react';
import { AppContext } from './Context';
import News from "./screens/News";


const router = createBrowserRouter([
  {
    path: "*",
    element: <News />
  }

]);

let initState = {
  session: {
    token: null,
    error: null,
    loading: false,
    account: null,
  },
  news: {
    articles: [],
    skip: 0,
    limit: 10,
    noMore: false,
  }

};

function reducer(state, action) {

  switch (action.type) {
    case 'addArticles': {
      let articles = state.news.articles.concat(action.articles);
      let skip = action.skip;
      let limit = action.limit;
      let noMore = false;
      if (articles.length < limit) {
        noMore = true;
      }
      return { ...state, news: { articles, skip, limit, noMore} };
    }
    case 'setAccount': {
      return { ...state, session: { ...state.session, account: action.account } };
    }
    case 'setError': {
      return { ...state, session: { ...state.session, error: action.error } };
    }

    case 'setLoading': {
      return { ...state, session: { ...state.session, loading: action.loading } };
    }
    
    default:
      throw new Error('action type is not found - ' + action.type);
  }
}

function App() {
  let [state, dispatch] = useReducer(reducer, initState);
  let loading = state.session.loading;
  return (
    <>
     
        <AppContext.Provider value={{ dispatch, state }}>
          {loading ? <Text position="fixed"  p={1} color='white' bg='red' css={
            {
              position: 'fixed',
              top: 0,
              textAlign:'center',
            }
          }>loading...</Text> : null }
          <RouterProvider router={router} /> 
        </AppContext.Provider>
     
      
    </>
  )
}

export default App
