import React from 'react';
import './NewsCard.scss'
import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const NewsCard = ({id, userId, title, body}: IPost) => {

  return (
    <Grid item key={id} xs={12} sm={6} md={4}>
      <Card>
        <CardContent className="content-wrapper">
          <Typography gutterBottom variant="h5" component="h3">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="content">
            {body}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/news/${id}`} className="read-more">
            <Button size="small">Read More</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
};