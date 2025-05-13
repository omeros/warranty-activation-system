import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
} from 'react-admin';

export const ClientList: React.FC = props => (
  <List {...props} title="Clients">
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <EmailField source="email" label="Email" />
      <TextField source="phone" label="Phone" />
      <TextField source="address" label="Address" />
      <DateField source="createdAt" label="Created At" />
    </Datagrid>
  </List>
);
