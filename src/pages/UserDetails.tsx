
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Divider, Form, Spin } from 'antd';
import { ArrowLeftIcon, BadgeCheck, CheckCircle2, XCircle, MapPin, Package } from 'lucide-react';
import { mockUsers, formatDate } from '@/types/user';
import { mockReviewPackages } from '@/types/reviewPackage';
import { mockReviewAddresses } from '@/types/reviewAddress';
import { Button } from '@/components/ui/button';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [userPackages, setUserPackages] = useState<any[]>([]);
  const [userAddresses, setUserAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundUser = mockUsers.find(u => u.id === id);
      if (foundUser) {
        setUser(foundUser);

        // If user is a reviewer, get packages and addresses
        if (foundUser.type === 'flight_reviewer') {
          const packages = mockReviewPackages.filter(p => p.reviewer_id === id);
          setUserPackages(packages);
          
          const addresses = mockReviewAddresses.filter(a => a.reviewer_id === id);
          setUserAddresses(addresses);
        }
      }
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <Spin size="large" tip="Loading user details..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/users')}
            className="mr-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <h1 className="text-2xl font-light">User Not Found</h1>
        </div>
        <Card>
          <div className="text-center py-8">
            <p>The requested user could not be found</p>
          </div>
        </Card>
      </div>
    );
  }

  const isReviewer = user.type === 'flight_reviewer';

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/users')}
            className="mr-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <h1 className="text-2xl font-light">User Details</h1>
          {isReviewer && (
            <div className="ml-3 flex items-center">
              <BadgeCheck className="h-5 w-5 text-blue-500 mr-1" />
              <span className="text-blue-500 text-sm font-medium">Flight Reviewer</span>
            </div>
          )}
        </div>
      </div>

      {/* User Base Information */}
      <Card className="mb-6 shadow-sm">
        <h2 className="text-xl font-medium mb-4">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">User ID</label>
            <p className="mt-1">{user.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">First Name</label>
            <p className="mt-1">{user.firstname}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Last Name</label>
            <p className="mt-1">{user.lastname}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Phone</label>
            <p className="mt-1">{user.phone || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">User Type</label>
            <p className="mt-1">
              {user.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Status</label>
            <p className="mt-1 capitalize">{user.status}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Activated</label>
            <p className="mt-1 flex items-center">
              {user.activated ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span>Yes</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span>No</span>
                </>
              )}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">MAAC Member</label>
            <p className="mt-1 flex items-center">
              {user.maac_member ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span>Yes</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span>No</span>
                </>
              )}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Registered On</label>
            <p className="mt-1">{formatDate(user.registered_on)}</p>
          </div>
          {user.loggedOn && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Last Login</label>
              <p className="mt-1">{formatDate(user.loggedOn, true)}</p>
            </div>
          )}
          {user.locale && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Locale</label>
              <p className="mt-1">{user.locale}</p>
            </div>
          )}
        </div>

        {(user.street || user.city || user.province || user.postalcode) && (
          <>
            <Divider />
            <h3 className="text-lg font-medium mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.street && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Street</label>
                  <p className="mt-1">{user.street}</p>
                </div>
              )}
              {user.city && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">City</label>
                  <p className="mt-1">{user.city}</p>
                </div>
              )}
              {user.province && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Province</label>
                  <p className="mt-1">{user.province}</p>
                </div>
              )}
              {user.postalcode && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Postal Code</label>
                  <p className="mt-1">{user.postalcode}</p>
                </div>
              )}
            </div>
          </>
        )}

        {(user.card_brand || user.card_last4 || user.plan_type || user.plan_freq) && (
          <>
            <Divider />
            <h3 className="text-lg font-medium mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(user.card_brand || user.card_last4) && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Card Information</label>
                  <p className="mt-1">
                    {user.card_brand} **** **** **** {user.card_last4}
                  </p>
                </div>
              )}
              {user.plan_type && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Plan Type</label>
                  <p className="mt-1 capitalize">{user.plan_type}</p>
                </div>
              )}
              {user.plan_freq && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Plan Frequency</label>
                  <p className="mt-1 capitalize">{user.plan_freq}</p>
                </div>
              )}
              {user.cancelled !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Cancelled</label>
                  <p className="mt-1 flex items-center">
                    {user.cancelled ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-red-500 mr-2" />
                        <span>Yes</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>No</span>
                      </>
                    )}
                  </p>
                </div>
              )}
              {user.stripe_user_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Stripe User ID</label>
                  <p className="mt-1">{user.stripe_user_id}</p>
                </div>
              )}
            </div>
          </>
        )}
      </Card>

      {/* Review Packages Section (if user is a reviewer) */}
      {isReviewer && (
        <Card className="mb-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Package className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-medium">Review Packages</h2>
          </div>
          
          {userPackages.length === 0 ? (
            <p className="text-gray-500">This reviewer has no packages.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userPackages.map(pkg => (
                    <tr key={pkg.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pkg.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{pkg.description.length > 50 ? `${pkg.description.substring(0, 50)}...` : pkg.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(pkg.price / 100).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{pkg.package_type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {pkg.enabled ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* Review Addresses Section (if user is a reviewer) */}
      {isReviewer && (
        <Card className="mb-6 shadow-sm">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-medium">Review Addresses</h2>
          </div>
          
          {userAddresses.length === 0 ? (
            <p className="text-gray-500">This reviewer has no addresses.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Postal Code</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Province</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userAddresses.map(address => (
                    <tr key={address.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{address.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {address.address_customized || address.street || address.review_street || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{address.postal_code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{address.province}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{address.city}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {address.enabled ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default UserDetails;
