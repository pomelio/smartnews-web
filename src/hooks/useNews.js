import { useEffect, useContext } from 'react';
import { gql, request } from 'graphql-request';
import { AppContext } from '../Context';
import { GRAPHQL_ROOT } from '../conf';

const QUERY_ARTICLES = gql`
query News($skip: Int!, $limit: Int!) {
    articles(skip: $skip, limit: $limit) {
        _id
        title
        summary {
            english
            chinese
        }
        image
        link
        pubDate
    }
}
`;

export const useNews = (skip, limit) => {

    const { dispatch } = useContext(AppContext);

    useEffect(() => {
        
        async function run() {
            dispatch({ type: 'setLoading', loading: true });
            try {
               let data = await request(GRAPHQL_ROOT, QUERY_ARTICLES, {skip, limit});
                
                dispatch({ type: 'addArticles', articles: data.articles, skip, limit });
            } catch (err) {
                let message = err.message ? err.message : err;
                if (err.response && err.response.data) {
                    message = err.response.data;
                }
                dispatch({ type: 'setError', error: message });
                
            } finally {
                dispatch({ type: 'setLoading', loading: false });
            }

        }
        
        run();
        

        return () => { };
    }, [skip, limit]);

}