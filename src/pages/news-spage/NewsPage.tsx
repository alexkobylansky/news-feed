import React, {useState, useEffect, useRef} from 'react';
import {NewsCard} from "../../component/news-card/NewsCard";
import './NewsPage.scss';
import {getAllPosts} from "../../services/NewsService";
import {ButtonWithSpinner} from "../../component/ButtonWithSpinner";
import {Grid, Typography} from "@mui/material";
import {Spinner} from "../../component/Spinner";

export const NewsPage: React.FC = () => {
  const firstInit = useRef(false);

  const [news, setNews] = useState<IPost[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const [newsEnded, setNewsEnded] = useState<boolean>(false);

  const getPosts = async (count: number) => {
   await getAllPosts(count)
      .then(data => {
        if (data) {
          setNews(data);
          setCount(prevState => prevState + 12);
        }
      })
      .catch(error => console.log(error))
  };

  const handleClickLoading = async () => {
    setLoadingMore(true);
     await getAllPosts(count)
      .then(data => {
        if (data) {
          setNews(prevState => [...prevState, ...data]);
          setCount(prevState => prevState + 12);
        }
        if (data.length < 12) {
          setNewsEnded(true)
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoadingMore(false))
  };

  useEffect(() => {
    if (!firstInit.current) {
      getPosts(count);
    }
    firstInit.current = true;
  }, []);

  return (
    <>
      <Typography component="h1" variant="h2">News</Typography>
      <Grid container spacing={2} className="news-wrapper">
        {!!news.length ? news.map((item) => <NewsCard
                                                    key={item.id}
                                                    title={item.title}
                                                    id={item.id}
                                                    body={item.body}
                                                    userId={item.userId}/>) : <Spinner/>
        }
      </Grid>
      <ButtonWithSpinner
        fetching={loadingMore}
        onLoading={handleClickLoading}
        ended={newsEnded}
        title={"load more"}/>
    </>
  );
};