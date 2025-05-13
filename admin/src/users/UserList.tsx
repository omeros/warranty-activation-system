import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  FunctionField,
  ReferenceField,
} from 'react-admin';

// List view for installer users
export const UserList: React.FC = props => (
  <List {...props} title="Installers">
    <Datagrid rowClick="edit">
      <TextField source="_id" label="ID" />
      <TextField source="username" label="Username" />
      <EmailField source="email" label="Email" />
      <TextField source="fullname" label="Full Name" />
      <FunctionField
        label="Role"
        render={record => record.role}
      />
      <DateField source="createdAt" label="Created At" />
    </Datagrid>
  </List>
);
