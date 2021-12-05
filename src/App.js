import * as React from "react";
import { Admin, Resource } from 'react-admin';
import japaneseMessages from '@bicstone/ra-language-japanese';
import japaneseDomainMessages from './i18n/ja_JP';
import jsonServerProvider from 'ra-data-json-server';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import Chat from './List/Chat';
import Config from './List/Configuration';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => {

  const messages = {
    ja: {
      ...japaneseMessages,
      ...japaneseDomainMessages,
    }
  };

  const i18nProvider = polyglotI18nProvider(locale => messages["ja"]);

  return (
      <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
          <Resource name="Chat" list={Chat} icon={ChatIcon} />
          <Resource name="Config" list={Config} icon={SettingsOutlinedIcon} />
      </Admin>
  );
}


export default App;