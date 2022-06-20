import React, { ReactElement, FC } from 'react';
import { Box, Typography } from '@mui/material';
import JoinElements from '../../JoinElements';
import CheckStatus from '../../CheckStatus';

const MainLayout: FC<any> = (): ReactElement<any> => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                <Typography variant="h4" component="div">
                    模型元件自動接合服務
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <Typography variant="h6" gutterBottom component="div">
                    上傳下載，接合完成。
                </Typography>
            </Box>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="caption" color="gray" gutterBottom component="p">
                    本服務不儲存使用者的模型，所有模型僅保留24小時即刪除。
                </Typography>
            </Box>
        </>
    );
};

export default MainLayout;
