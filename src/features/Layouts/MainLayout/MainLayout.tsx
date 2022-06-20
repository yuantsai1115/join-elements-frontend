import React, { ReactElement, FC } from 'react';
import { Box, Typography } from '@mui/material';
import JoinElements from '../../JoinElements';
import CheckStatus from '../../CheckStatus';

const MainLayout: FC<any> = (): ReactElement<any> => {
    return (
        <>
            <Typography variant="h3" gutterBottom component="div">
                Revit模型自動接合服務
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    py: '20px',
                }}
            >
                <JoinElements />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    py: '20px',
                }}
            >
                <CheckStatus />
            </Box>
        </>
    );
};

export default MainLayout;
