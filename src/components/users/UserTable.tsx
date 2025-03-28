
import React from 'react';
import { Button, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { User } from '../../types/user';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>User Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              No users found matching your search criteria
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Tag 
                  color={
                    user.type === 'admin' ? 'blue' : 
                    user.type === 'supervisor' ? 'purple' : 
                    'green'
                  }
                >
                  {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                </Tag>
              </TableCell>
              <TableCell>
                <Tag 
                  color={user.status === 'active' ? 'success' : 'error'}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Tag>
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/users/${user.id}`}>
                  <Button type="primary" size="small" icon={<EyeOutlined />}>View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
