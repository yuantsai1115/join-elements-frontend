import React, { ReactElement, FC } from 'react';
import { Box, Typography } from '@mui/material';

const JoinElements: FC<any> = (): ReactElement => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: 'whitesmoke',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h3">JoinElements</Typography>
        </Box>
    );
};

export default JoinElements;
