import React, { Fragment } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import UserRegister from '../components/UserRegister';

const useStyles = makeStyles((theme) =>
    createStyles({
        title: {
            fontSize: 30,
            marginLeft: 50,
        },
        Pcicon: {
            position: 'relative',
            bottom: '75px',
            left: '35px',
            fontSize: 38,
            transform: 'rotateY(180deg)',
        },
        smartphone: {
            position: 'relative',
            bottom: '69px',
            left: '35px',
            fontSize: 38,
            transform: 'rotateY(180deg)',
        },
        Rewrite: {
            marginLeft: 35,
        },
        from: {
            marginLeft: 35,
        }
    })
);

const Config = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <div>
                <h1 className={classes.title}>
                    ユーザー登録
                </h1>
            </div>
            <div>
                <div className={classes.from}>
                    <UserRegister />
                </div>
            </div>
        </Fragment>
    )
}

export default Config;