
import React from 'react';
import { Button } from 'antd';
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
import { User, formatDate } from '../../types/user';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, BadgeCheck } from 'lucide-react';

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
          <TableHead>Phone</TableHead>
          <TableHead>User Type</TableHead>
          <TableHead>Activated</TableHead>
          <TableHead>MAAC Member</TableHead>
          <TableHead>Registered On</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-8">
              No users found matching your search criteria
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">
                {user.firstname} {user.lastname}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {user.type === 'flight_reviewer' && (
                    <BadgeCheck className="h-4 w-4 text-blue-500 mr-1" />
                  )}
                  <Badge 
                    variant={
                      user.type === 'admin' ? 'default' : 
                      user.type === 'supervisor' ? 'secondary' : 
                      user.type === 'flight_reviewer' ? 'outline' : 
                      'destructive'
                    }
                    className={
                      user.type === 'basic_user' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''
                    }
                  >
                    {user.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                {user.activated ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </TableCell>
              <TableCell>
                {user.maac_member ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </TableCell>
              <TableCell>
                {formatDate(user.registered_on)}
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
