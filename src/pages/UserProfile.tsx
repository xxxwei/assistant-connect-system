
import { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../types/user';
import { mockDrones } from '../types/drone';
import { mockPilots } from '../types/pilot';
import { mockReviewPackages } from '../types/reviewPackage';
import { mockReviewAddresses } from '../types/reviewAddress';
import UserProfileHeader from '../components/profile/UserProfileHeader';
import UserDrones from '../components/profile/UserDrones';
import UserPilots from '../components/profile/UserPilots';
import UserReviewPackages from '../components/profile/UserReviewPackages';
import UserReviewAddresses from '../components/profile/UserReviewAddresses';

const { TabPane } = Tabs;

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [userDrones, setUserDrones] = useState([]);
  const [userPilots, setUserPilots] = useState([]);
  const [userPackages, setUserPackages] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundUser = mockUsers.find(u => u.id === id);
    
    if (foundUser) {
      setUser(foundUser);
      
      // Get user drones
      const drones = mockDrones.filter(d => d.user_id === id);
      setUserDrones(drones);
      
      // Get user pilots
      const pilots = mockPilots.filter(p => p.user_id === id);
      setUserPilots(pilots);
      
      // If user is a flight reviewer, get packages and addresses
      if (foundUser.type === 'flight_reviewer') {
        const packages = mockReviewPackages.filter(p => p.reviewer_id === id);
        setUserPackages(packages);
        
        const addresses = mockReviewAddresses.filter(a => a.reviewer_id === id);
        setUserAddresses(addresses);
      }
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading user profile...</div>;
  }

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  return (
    <div className="p-6">
      <UserProfileHeader user={user} />
      
      <Card className="mt-6">
        <Tabs defaultActiveKey="drones">
          <TabPane tab="Drones" key="drones">
            <UserDrones drones={userDrones} />
          </TabPane>
          <TabPane tab="Pilots" key="pilots">
            <UserPilots pilots={userPilots} />
          </TabPane>
          
          {user.type === 'flight_reviewer' && (
            <>
              <TabPane tab="Review Packages" key="packages">
                <UserReviewPackages packages={userPackages} />
              </TabPane>
              <TabPane tab="Review Addresses" key="addresses">
                <UserReviewAddresses addresses={userAddresses} />
              </TabPane>
            </>
          )}
        </Tabs>
      </Card>
    </div>
  );
};

export default UserProfile;
