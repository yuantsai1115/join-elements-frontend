import React, { ReactElement, FC, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Link,
    Stack,
    TextField,
    Typography,
    Radio,
    RadioGroup,
} from '@mui/material';
import ModelService from '../../services/Model/model.service';
import { NestCamWiredStandTwoTone } from '@mui/icons-material';
import { WorkItemStatusEnum } from './WorkItemStatusEnum';
import { useAnalyticsEventTracker } from '../../helpers/GaHelper';

const CheckStatus: FC<any> = (): ReactElement => {
    const gaEventTracker = useAnalyticsEventTracker('Join Elements');
    const [workItemId, setWorkItemId] = useState('');
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleWorkItemIdOnChange = (i: number) => {
        return (e: React.ChangeEvent<any>) => {
            let text = e.target.value;
            text.length > 0 ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
            setWorkItemId(text);
        };
    };

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [workItemStatus, setWorkItemStatus] = useState(WorkItemStatusEnum.unknown);
    const [downloadLink, setDownloadLink] = useState<string>('');
    const clearStatus = () => {
        setErrorMessage('');
        setMessage('');
        setDownloadLink('');
        setWorkItemStatus(WorkItemStatusEnum.unknown);
    };

    const handleCheckClicked = (id: string) => async (e: React.MouseEvent<HTMLElement>) => {
        clearStatus();
        if (id.length != 24) {
            setErrorMessage('不正確的案件編號，請再試一次');
            return;
        }
        setErrorMessage('');
        setShowProgress(true);
        let data = await ModelService.getWorkItemStatus(id);
        console.log(data);
        setShowProgress(false);

        if (data.status == WorkItemStatusEnum.pending) {
            setWorkItemStatus(WorkItemStatusEnum.pending);
            setMessage('排隊處理中，請稍後再查詢');
            return;
        }

        if (data.status == WorkItemStatusEnum.success) {
            let processTime: number = 0;
            if (!!data.stats.timeDownloadStarted && !!data.stats.timeUploadEnded) {
                console.log(new Date(data.stats.timeUploadEnded).valueOf());
                console.log(new Date(data.stats.timeDownloadStarted).valueOf());
                processTime = new Date(data.stats.timeUploadEnded).valueOf() - new Date(data.stats.timeDownloadStarted).valueOf();
            }
            let workItemData = await ModelService.getWorkItem(id);
            console.log(workItemData);
            if (!!workItemData.daWorkItem) {
                setDownloadLink(workItemData.daWorkItem.arguments.result.url);
            }

            setWorkItemStatus(WorkItemStatusEnum.success);
            setMessage(`接合處理成功${processTime > 0 ? `，共處理 ${Math.floor(processTime / 1000).toString()} 秒` : ''}`);
            gaEventTracker('check model', WorkItemStatusEnum.success);
            return;
        }

        if (data.status == WorkItemStatusEnum.inprogress) {
            let processTime: number = 0;
            if (!!data.stats.timeDownloadStarted) {
                processTime = new Date().valueOf() - new Date(data.stats.timeDownloadStarted).valueOf();
            }

            setWorkItemStatus(WorkItemStatusEnum.inprogress);
            setMessage(`接合中，${processTime > 0 ? '已執行 ' + Math.floor(processTime / 1000).toString() + ' 秒，' : ''}請稍後再查詢`);
            return;
        }

        if (data.status == WorkItemStatusEnum.cancelled) {
            setWorkItemStatus(WorkItemStatusEnum.cancelled);
            setErrorMessage('工作已取消');
            gaEventTracker('check model', WorkItemStatusEnum.cancelled);
            return;
        }

        //error happened
        if (data.status == WorkItemStatusEnum.failedDownload) {
            setWorkItemStatus(WorkItemStatusEnum.failedDownload);
            setErrorMessage('伺服器下載模型錯誤');
            return;
        }
        if (data.status == WorkItemStatusEnum.failedInstructions) {
            setWorkItemStatus(WorkItemStatusEnum.failedInstructions);
            setErrorMessage('伺服器開始接合模型失敗');
            gaEventTracker('check model', WorkItemStatusEnum.failedInstructions);
            return;
        }
        if (data.status == WorkItemStatusEnum.failedLimitProcessingTime) {
            setWorkItemStatus(WorkItemStatusEnum.failedLimitProcessingTime);
            setErrorMessage('接合模型處理時間過長，超過伺服器限制');
            gaEventTracker('check model', WorkItemStatusEnum.failedLimitProcessingTime);
            return;
        }
        if (data.status == WorkItemStatusEnum.failedUpload) {
            setWorkItemStatus(WorkItemStatusEnum.failedUpload);
            setErrorMessage('伺服器上傳接合成果失敗');
            gaEventTracker('check model', WorkItemStatusEnum.failedUpload);
            return;
        }
        if (data.status == WorkItemStatusEnum.failedUploadOptional) {
            setWorkItemStatus(WorkItemStatusEnum.failedUploadOptional);
            setErrorMessage('伺服器未完全上傳接合成果');
            gaEventTracker('check model', WorkItemStatusEnum.failedUploadOptional);
            return;
        }
        setErrorMessage('發生未預期錯誤，請再試一次');
    };

    return (
        <Box>
            <Card sx={{ minWidth: 350 }}>
                <CardContent>
                    <Typography variant="body2" display="inline" gutterBottom>
                        查詢案件進度：
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'left', my: '15px' }}>
                        <TextField id="outlined-basic" label="案件編號" variant="outlined" size="small" onChange={handleWorkItemIdOnChange(1)} />
                        <Button
                            disabled={isButtonDisabled}
                            variant="contained"
                            style={{ marginLeft: '10px', color: 'white' }}
                            onClick={handleCheckClicked(workItemId)}
                        >
                            查詢
                        </Button>
                    </Box>
                    <Box sx={{ justifyContent: 'center', verticalAlign: 'center' }}>
                        {!!showProgress ? (
                            <Box sx={{ mt: '15px' }} component={Stack} direction="column" justifyContent="center">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box sx={{ justifyContent: 'center', verticalAlign: 'center' }}>
                        {workItemStatus != WorkItemStatusEnum.unknown ? (
                            <Box sx={{ mt: '5px' }} component={Stack} direction="column" justifyContent="center">
                                {/* <Divider sx={{ my: '20px' }} /> */}
                                {workItemStatus == WorkItemStatusEnum.success ? (
                                    <Typography variant="h6" color="success.main">
                                        接合成功
                                    </Typography>
                                ) : workItemStatus == WorkItemStatusEnum.pending || workItemStatus == WorkItemStatusEnum.inprogress ? (
                                    <Typography variant="h6" color="warning.main">
                                        處理中
                                    </Typography>
                                ) : (
                                    <Typography variant="h6" color="error.main">
                                        接合失敗
                                    </Typography>
                                )}
                            </Box>
                        ) : (
                            <></>
                        )}
                        {errorMessage.length > 0 ? (
                            <Box sx={{ mt: '5px' }} component={Stack} direction="column" justifyContent="center">
                                <Typography variant="body2" color="error.main">
                                    {errorMessage}
                                </Typography>
                            </Box>
                        ) : (
                            <></>
                        )}
                        {message.length > 0 ? (
                            <Box sx={{ mt: '5px' }} component={Stack} direction="column" justifyContent="center">
                                <Typography variant="body2" color="gray">
                                    {message}
                                </Typography>
                            </Box>
                        ) : (
                            <></>
                        )}
                        {downloadLink.length > 0 ? (
                            <Box sx={{ mt: '5px' }} component={Stack} direction="column" justifyContent="center">
                                <Divider sx={{ my: '10px' }} />
                                {/* <Typography variant="body1" color="info.main">
                                    {downloadLink}
                                </Typography> */}
                                <Link href={downloadLink} underline="always">
                                    下載連結
                                </Link>
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CheckStatus;
