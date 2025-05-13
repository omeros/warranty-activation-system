// src/warranties/WarrantyList.tsx
import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
} from 'react-admin';

export const WarrantyList: React.FC = props => (
  <List {...props} title="Warranties">
    <Datagrid rowClick="edit">
      <TextField    source="id"    label="ID" />
      <ReferenceField 
        source="installerId" 
        reference="users" 
        label="Installer"
      >
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField 
        source="clientId" 
        reference="clients" 
        label="Client"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField    source="productInfo"      label="Product Info" />
      <DateField    source="installationDate" label="Installed On" />
      <DateField    source="invoiceDate"      label="Invoice Date" />
      <TextField    source="status"           label="Status" />
      <DateField    source="createdAt"        label="Submitted At" />
    </Datagrid>
  </List>
);
