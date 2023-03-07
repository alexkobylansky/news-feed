import React, {useEffect, useState, useRef} from 'react';
import {ButtonWithSpinner} from "../component/ButtonWithSpinner";
import {NewsCard} from "../component/news-card/NewsCard";
import {getRandomPosts} from "../services/NewsService";
import {Grid, Typography, Skeleton, Stack, Box} from '@mui/material';
import {useNotification} from "../component/hook/useNotification";
import {Notification} from "../component/Notification";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const HomePage: React.FC = () => {
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [news, setPosts] = useState<IPost[]>([]);
  const firstInit = useRef(false);

  const {showNotification, handleNotificationClose, notificationOpen, notificationSeverity, notificationMessage} = useNotification();

  const skeletonArray = new Array(3).fill('');

  const getPosts = async () => {
    setLoadingMore(true);
    try {
      const post = await getRandomPosts(3);
      if (post) {
        setPosts(prevState => [...prevState, ...post]);
        setLoadingMore(false);
      }
    } catch(error: any) {
      console.log(error)
      showNotification(error.message, 'error');
    }
  };

  const getAnotherRandomPosts = async () => {
    setPosts([]);
    await getPosts();
  };

  useEffect(() => {
    if (!firstInit.current) {
      firstInit.current = true;
      void getPosts();
    }
  }, []);

  const content = news.map(item => <NewsCard key={item.id} id={item.id} title={item.title} body={item.body}/>)
  const skeletons = skeletonArray.map((_, index) => <Box key={index} display={"flex"} flexDirection={'column'} justifyContent={'space-between'} sx={{width: 'calc(100% / 3 -' +
      ' 16px)', height: '271.75px', margin:'16px 0 0 16px', padding: '16px'}}>
                                                              <Stack width={'100%'} spacing={2}>
                                                                <Skeleton variant="rounded" width={'100%'} />
                                                                <Skeleton variant="rounded" width={'100%'} />
                                                              </Stack>
                                                              <Stack width={'100%'} spacing={1}>
                                                                <Skeleton variant="rounded" width={'100%'}/>
                                                                <Skeleton variant="rounded" width={'100%'}/>
                                                                <Skeleton variant="rounded" width={'100%'}/>
                                                                <Skeleton variant="rounded" width={'100%'}/>
                                                              </Stack>
                                                            </Box>)

  return (
    <Box className="home-page">
      <Typography component="h1" variant="h2" sx={{textAlign: "center"}}>There is three random news</Typography>
      <Box component="main">
        <Grid container spacing={2} sx={{justifyContent: 'space-between'}}>
          {news.length === 3 ? content : skeletons}
        </Grid>
        <ButtonWithSpinner
          fetching={loadingMore}
          onLoading={getAnotherRandomPosts}
          title={"Load another random news"}/>
      </Box>
      <Notification notificationOpen={notificationOpen}
                    handleNotificationClose={handleNotificationClose}
                    notificationSeverity={notificationSeverity}
                    notificationMessage={notificationMessage}/>
    </Box>
  );
}