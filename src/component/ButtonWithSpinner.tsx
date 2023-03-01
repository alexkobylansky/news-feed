import React from 'react';
import {Box, Button, CircularProgress} from "@mui/material";

interface ButtonWithSpinnerProps {
  ended?: boolean | undefined;
  fetching: boolean;
  onLoading(): void;
  title: string
}

export const ButtonWithSpinner: React.FC<ButtonWithSpinnerProps> = ({ended, fetching, onLoading, title}) => {
  return (
    <Box className="load-more-wrapper" style={{display: ended ? "none" : "flex"}}>
      <Box sx={{ height: 40 }}>
        {fetching && <CircularProgress />}
      </Box>
      <Button onClick={onLoading} sx={{ m: 2 }}>
        {title}
      </Button>
    </Box>
  );
}