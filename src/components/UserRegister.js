import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import { UserRegisters } from '../API/api';
import { PartnerData, myData } from '../DB/data';
import BootstrapInput from './ButtonStyles';

const useStyles = makeStyles((theme) =>
    createStyles({
        director: {
            marginLeft: '20px',
            paddingRight: '24px',
            width: '100px',
            height: '30px',
            fontSize: '20px'
        },
        botton: {
            fontSize: 19,
            padding: '3px 20px 3px 20px',
            marginTop: 56,
            marginLeft: 12,
            '& > *': {
                margin: theme.spacing(0.2),
            }
        },
        wrapText: {
            width: "100%"
        },
        margin: {
            marginTop: 0,
            margin: theme.spacing(1),
        },
    })
);


const UserRegister = () => {
    const classes = useStyles();

    const [position, setDosition] = useState('');

    const [userName, setUserName] = useState('');

    // input監視
    const [s_input, setinput] = useState(false);

    // エラー名を保持
    const [err, setErr] = useState('');

    const HandleChangeDirector = (event) => {
        setDosition(event.target.value);
    }

    const HandleChangeUserName = (event) => {
        setUserName(event.target.value);
    };

    const UserRegisterSend = async () => {

        try {
            if (position === "" || userName === "") {
                setinput(true);
                throw new Error('役職名または名前が入力されていません');
            }
            const Data = {
                position: position,
                name: userName
            };

            // const res = await UserRegisters(Data.director, Data.name);

            // if (res === null) {
            //     setinput(true);
            //     throw new Error('ユーザーを登録することができませんでした');
            // }
            // console.log(res);


            PartnerData.user[Data.name] = [
                {
                    position: Data.position,
                    name: Data.name,
                    msg: `${Data.position}です`
                }
            ];

            // d.push();

            console.log(PartnerData);

        } catch (e) {
            console.log(e.message);
            setErr(e.message);
        }
    }

    if (s_input === true) {
        setTimeout(() => {
            setinput(false);
        }, 2000);
    }

    return (
        <div>
            {s_input &&
                <div className={classes.wrapText}>
                    <Alert severity="error">
                        <div>{err}</div>
                    </Alert>
                </div>
            }
            <FormControl>
                <p className={classes.name}>役職</p>
                <NativeSelect
                    className="select"
                    id="demo-customized-select-native"
                    value={position}
                    onChange={HandleChangeDirector}
                    input={<BootstrapInput />}
                >
                    <option aria-label="None" value="" />
                    <option value={'社員'}>社員</option>
                    <option value={'主任'}>主任</option>
                    <option value={'部長'}>部長</option>
                    <option value={'課長'}>課長</option>
                </NativeSelect>
            </FormControl>
            <FormControl className={classes.margin}>
                <p className={classes.name}>ユーザー名</p>
                <BootstrapInput id="demo-customized-textbox" value={userName} onChange={HandleChangeUserName} />
            </FormControl>
            <Button className={classes.botton} variant="contained" color="primary" onClick={UserRegisterSend}>
                登録
            </Button>
        </div>
    )
}

export default UserRegister;