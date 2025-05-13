import { Admin, Resource  } from "react-admin";
import authProvider from './authProvider';
import dataProvider from './dataProvider';

import { UserList } from './users/UserList';
import { ClientList }    from './clients/ClientList';
import { WarrantyList } from './warranties/WarrantyList';

// const dataProvider = simpleRestProvider('http://localhost:3001/api/admin');


const App: React.FC = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
    <Resource name="clients"    list={ClientList} />
    <Resource name="warranties" list={WarrantyList} />
    {/* add other Resources here */}
  </Admin>
);


export default App;