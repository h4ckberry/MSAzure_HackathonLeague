import React, { useState } from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { Alert } from '@material-ui/lab';

const BootstrapInput = withStyles((theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(1.5),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 20,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }),
)(InputBase);

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

    const [director, setDirector] = useState('');

    const [userName, setUserName] = useState('');

    // input監視
    const [s_input, setinput] = useState(false);

    // エラー名を保持
    const [err, setErr] = useState('');

    const HandleChangeDirector = (event) => {
        setDirector(event.target.value);
    }

    const HandleChangeUserName = (event) => {
        setUserName(event.target.value);
    };

    const UserRegisterSend = () => {

        try {
            if (director === "" || userName === "") {
                setinput(true);
                throw new Error('役職名または名前が入力されていません')
            }
            const Data = {
                director: director,
                name: userName
            };

            console.log(Data);

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
                    value={director}
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