import React, { useState } from 'react';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Paper, } from '@material-ui/core';
import { MessageLeft, MessageRight } from '../components/Message';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { PartnerData, myData } from '../DB/data';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

const useStyles = makeStyles((theme) =>
    createStyles({
        frame: {
            maxWidth: "80%"
        },
        paper: {
            height: '50vw',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative'
        },
        paper2: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative'
        },
        container: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        messagesBody: {
            width: 'calc( 100% - 20px )',
            margin: 10,
            overflowY: 'scroll',
            height: 'calc( 100% - 80px )'
        },
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: `${theme.spacing(0)} auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
            margin: theme.spacing(1),
        },
    })
);

const Chat = () => {

    const classes = useStyles();

    // メッセージ保持
    const [message, setMessahe] = useState("");

    // メッセージ状態
    const [s_input, setinput] = useState(false);

    // messgae input
    const handleChangeCount = (event) => {
        console.log(event.target.value);
        setMessahe(event.target.value);
    };

    // Api送信
    const Send = async () => {

        console.log('ボタンが押されました');
        if (message === '') {
            console.log('メッセージを入力してください');
            setinput(true)
            return;
        }

        console.log('メッセージが入力されました');

        setMessahe('');

        // messageデータをオブジェクトに格納
        const data = {
            msg: message
        };
        // massageデータをlocalデータに保存
        myData.push(data);

        console.log(myData);

        const datas = await axios.get(`https://braikou.azurewebsites.net/api/braikou?converted_body=${message}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log(datas);

    }

    if (s_input === true) {
        setTimeout(() => {
            setinput(false);
        }, 2000);
    }
    return (
        <div className={classes.container}>
            <div className="frame">
                <Paper className={classes.paper} zDepth={2} >
                    <Paper id="style-1" className={classes.messagesBody}>
                        {PartnerData.map(i => {
                            return (
                                <MessageLeft message={i.msg} displayName={i.name} avatarDisp={true} />
                            )
                        })}
                        {myData.map(i => {
                            return (
                                <MessageRight message={i.msg} displayName="まさりぶ" avatarDisp={true} />
                            )
                        })}
                    </Paper>
                    {/* err通知 */}
                    {s_input &&
                        <div className={classes.wrapText}>
                            <Alert severity="error">
                                <div>メッセージを入力してください</div>
                            </Alert>
                        </div>
                    }
                    <form className={classes.wrapForm} noValidate autoComplete="off">
                        <TextField
                            id="standard-text"
                            label="メッセージを入力"
                            value={message}
                            className={classes.wrapText}
                            onChange={handleChangeCount}
                        //margin="normal"
                        />
                        <Button variant="contained" color="primary" className={classes.button} onClick={Send}>
                            <SendIcon />
                        </Button>
                    </form>
                </Paper>
            </div>
        </div>
    );
}


export default Chat;