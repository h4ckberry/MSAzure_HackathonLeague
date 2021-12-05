import axios from 'axios';


// メッセージ送信API
export const MsgSend = async (msg) => {

    try {

        const response = await axios.get(`https://braikou.azurewebsites.net/api/braikou?converted_body=${msg}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const res = response.data;
        console.log(res);

        return res;
        
    } catch (e) {
        console.error(e);
        const err = null;

        return err;
    }
}



// ユーザー登録API
export const UserRegisters = async (director, userName) => {

    try {
        
        const response = await axios.get(`https://braikou.azurewebsites.net/api/braikou/member?name=${director}&position=${userName}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const res = response.data;
        console.log(res);

        return res;
        
    } catch (e) {
        console.error(e);
        const err = null;

        return err;
    }
}