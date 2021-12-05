import React, { useState } from 'react';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Paper, } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { MessageLeft, MessageRight } from '../components/Message';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { PartnerData, myData, UserName } from '../DB/data';
import { Alert } from '@material-ui/lab';
import { MsgSend } from '../API/api';
import BootstrapInput from '../components/ButtonStyles';


const useStyles = makeStyles((theme) =>
    createStyles({
        frame: {
            maxWidth: "80%"
        },
        paper: {
            height: '43vw',
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

    const [partner, setPartner] = useState('山田');

    const [user, setUser] = useState(PartnerData.user["山田"]);

    // メッセージ保持
    const [message, setMessahe] = useState("");

    // メッセージ状態
    const [s_input, setinput] = useState(false);

    // エラー名を保持
    const [err, setErr] = useState('');

    // messgae input
    const handleChangeCount = (event) => {
        console.log(event.target.value);
        setMessahe(event.target.value);
    };

    // Api送信
    const Send = async () => {

        try {
            console.log('ボタンが押されました');
            if (message === '') {
                console.log('メッセージを入力してください');
                setinput(true);
                throw new Error('メッセージを入力してください');
            }

            console.log('メッセージが入力されました');

            setMessahe('');


            const res = MsgSend(message);
    
            console.log(res);

            if (res === null) {
                setinput(true);
                throw new Error('データを送信できませんでした');
            }

            // messageデータをオブジェクトに格納
            const data = {
                msg: message
            };
            // massageデータをlocalデータに保存
            myData.push(data);
            // console.log(myData);

        } catch (e) {
            console.log(e.message);
            setErr(e.message);
        }

    }

    // チャットする相手選択
    const HandleChangeName = (event) => {
        console.log(event.target.value);
        setPartner(PartnerData.user[event.target.value]);
        setUser(PartnerData.user[event.target.value]);
        console.log(user);
    }
    if (s_input === true) {
        setTimeout(() => {
            setinput(false);
        }, 2000);
    }
    return (
        <div className={classes.container}>
            <FormControl>
                <p className={classes.name}>チャットする相手</p>
                <NativeSelect
                    className="select"
                    id="demo-customized-select-native"
                    value={partner}
                    onChange={HandleChangeName}
                    input={<BootstrapInput />}
                >
                    <option value={'山田'}>山田</option>
                    <option value={'田中'}>田中</option>
                </NativeSelect>
            </FormControl>
            <div className="frame">
                <Paper className={classes.paper} zDepth={2} >
                    <Paper id="style-1" className={classes.messagesBody}>
                        {user.map(i => {
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
                                <div>{err}</div>
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