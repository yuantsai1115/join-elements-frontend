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
    Typography,
    Radio,
    RadioGroup,
    Stack,
} from '@mui/material';
import { RevitVersionEnum } from './RevitVersionEnum';
import ModelService from '../../services/Model/model.service';

const FILE_SIZE_LIMIT = 50; //MB

const JoinElements: FC<any> = (): ReactElement => {
    const [selectedRevitVersion, setSelectedRevitVersion] = useState(RevitVersionEnum.RVT2020);
    const handleRevitVersionChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
    };

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const handleFileSelected = (e: React.FormEvent<HTMLInputElement>) => {
        const fileList: FileList | null = e.currentTarget.files;
        if (!fileList) {
            setIsButtonDisabled(true);
            return;
        }
        setSelectedFile(fileList[0]);
        setIsButtonDisabled(false);
        console.log(fileList[0]);
    };

    const [workItemId, setWorkItemId] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const clearMessage = () => {
        setErrorMessage('');
    };
    const handleUploadClicked = (i: number) => async (e: React.MouseEvent<HTMLElement>) => {
        // console.log(i);
        clearMessage();
        if (!!selectedFile) {
            if (selectedFile.size > FILE_SIZE_LIMIT * 1024 * 1024) {
                setErrorMessage(`檔案過大，請上傳小於 ${FILE_SIZE_LIMIT} MB 的模型`);
                return;
            }

            setShowProgress(true);
            setIsButtonDisabled(true);
            let data = await ModelService.uploadModel(selectedFile);
            console.log(data);

            setWorkItemId(data._id);
            setShowProgress(false);
            setIsButtonDisabled(false);
        }
    };

    return (
        <>
            <Box>
                {/* <Typography variant="h3">JoinElements</Typography> */}
                <Card sx={{ minWidth: 350 }}>
                    <CardContent>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">選擇要接合的Revit模型：</FormLabel>
                            <RadioGroup
                                aria-label="Revit版本"
                                name="controlled-radio-buttons-group"
                                value={selectedRevitVersion}
                                onChange={handleRevitVersionChange}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Revit 2020" />
                            </RadioGroup>
                            <label htmlFor="contained-button-file">
                                <input
                                    accept=".rvt"
                                    style={{ display: 'none' }}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleFileSelected}
                                />
                                <Button variant="text" component="span" style={{ marginRight: '8px' }}>
                                    選擇檔案
                                </Button>
                                <Typography variant="caption" display="inline" gutterBottom>
                                    {selectedFile?.name}
                                </Typography>
                            </label>
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'right', verticalAlign: 'center' }}>
                            {showProgress ? (
                                <Box sx={{ marginRight: '15px' }} component={Stack} direction="column" justifyContent="center">
                                    <CircularProgress size={20} />
                                </Box>
                            ) : (
                                <></>
                            )}
                            <Button disabled={isButtonDisabled} variant="contained" style={{ color: 'white' }} onClick={handleUploadClicked(1)}>
                                上傳
                            </Button>
                        </Box>
                        {!!workItemId ? (
                            <>
                                <Divider sx={{ my: '20px' }} />
                                <Box sx={{ justifyContent: 'center', verticalAlign: 'center' }}>
                                    <Typography variant="body2" color="gray" textAlign="center">
                                        案件編號
                                    </Typography>
                                    <Box textAlign="center">
                                        <Chip label={workItemId} variant="outlined" color="secondary" size="medium" />
                                    </Box>
                                    <Box sx={{ my: '20px' }}>
                                        <Typography variant="body2" color="gray" textAlign="center">
                                            請勿遺失案件編號!
                                        </Typography>
                                        <Typography variant="caption" color="gray" textAlign="center">
                                            案件編號用來查詢模型接合進度，若遺失請重新上傳模型。
                                        </Typography>
                                    </Box>
                                </Box>
                            </>
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
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default JoinElements;
