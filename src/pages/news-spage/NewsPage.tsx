import React, {useState, useEffect, useRef} from 'react';
import {NewsCard} from "../../component/news-card/NewsCard";
import './NewsPage.scss';
import {getPosts, deletePost} from "../../services/NewsService";
import {ButtonWithSpinner} from "../../component/ButtonWithSpinner";
import {Grid, Typography, Box} from "@mui/material";
import {Spinner} from "../../component/Spinner";

export const NewsPage: React.FC = () => {
  const firstInit = useRef(false);

  const [news, setNews] = useState<IPost[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const [buttonStatus, setButtonStatus] = useState(true);

  const [newsEnded, setNewsEnded] = useState<boolean>(false);

  const getAllPosts = async (count: number, limit: number) => {
   try {
     const news = await getPosts(count, limit);
     if (news) {
       setNews(news);
       setCount(prevState => prevState + 12);
     }
   } catch (error) {
     console.log(error);
   }
  };

  const handleDeletePost = async (id: number) => {
    setButtonStatus(false)
    const res = await deletePost(id);
    if (res) {
      setNews(prevState => prevState.filter(post => post.id !== id));
    }
    setButtonStatus(true)
  };

  const handleClickLoading = async () => {
    try {
      setLoadingMore(true);
      const news = await getPosts(count, 12)
      if (news) {
        setNews(prevState => [...prevState, ...news]);
        setCount(prevState => prevState + 12);
      }
      if (news && news.length < 12) {
        setNewsEnded(true)
      }
    } catch(error) {
      console.log(error)
    } finally {
      setLoadingMore(false)
    }
  };

  useEffect(() => {
    if (!firstInit.current) {
      getAllPosts(count, 12);
    }
    firstInit.current = true;
    return () => {
      setNews([]);
    }
  }, []);

  return (
    <Box className="news-page">
      <Typography component="h1" variant="h2">News</Typography>
      <Box component="main">
        <Grid container spacing={2} className="news-wrapper">
          {!!news.length ? news.map((item) => <NewsCard
            key={item.id}
            title={item.title}
            id={item.id}
            body={item.body}
            buttonStatus={buttonStatus}
            deletePost={handleDeletePost}/>) : <Spinner/>
          }
        </Grid>
        <ButtonWithSpinner
          fetching={loadingMore}
          onLoading={handleClickLoading}
          ended={newsEnded}
          title={"load more"}/>
      </Box>
    </Box>
  );
};