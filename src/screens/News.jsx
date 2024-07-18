import { AppContext } from '../Context';
import React, { useContext } from "react";
import { useNews } from '../hooks/useNews';
import { useNewsActions } from '../hooks/useNewsActions';

import {
    Card,
    Flex,
    Button,
    Box,
    Text,
  } from 'rebass';


export default function News() {
    const { state } = useContext(AppContext);

    let {loadArticles} = useNewsActions();
    
    let skip = state.news.skip;
    let limit = state.news.limit;
    
    useNews(0, limit);

    let articles = state.news.articles;
    let noMore = state.news.noMore;

    const rows = articles.map((article) => {
        let chineseLines = article.summary.chinese.split("。");
        let englishLines = article.summary.english.split(".");

        chineseLines = chineseLines.filter( l => l.length > 0);
        englishLines = englishLines.filter( l => l.length > 0);
       
        return (
            <Card
                key={article._id}
                bg='#f6f6ff'
                borderRadius={8}
                m={2}
                boxShadow='0 0 16px rgba(0, 0, 0, .25)'
            >
                
                <Text fontSize={3} p={1} fontWeight='bold'>{article.title}</Text>
                <Box px={2}>
                    {chineseLines.map((chineseLine, index) => {
                        let englishLine = englishLines[index];
                        return (<Box key={index} p={0}>
                            <Text fontSize={3} pt={2}>
                                {chineseLine}。
                            </Text>
                            <Text fontSize={3} pt={0}>
                                {englishLine}.
                            </Text>
                        </Box>);
                    })}
                </Box>
            </Card>
        );
    });

    return (
        <Flex flexDirection="column" >
            {rows}
            {noMore ? null : <Button bg='navy' color='white' onClick={
                () => {
                    loadArticles(skip + limit, limit);
                }
            }>more...</Button>}
        </Flex>
    );


}