import React from 'react';

const profiles = [
    { name: 'Charis Ching', imageUrl: 'profile/charis.jpg' },
    { name: 'Chaelsey Park', imageUrl: 'profile/chaelsey.jpg' },
    { name: 'Jeremy Sedillo', imageUrl: 'profile/jeremy.jpg' },
    { name: 'Hemosoo Woo', imageUrl: 'profile/hemosoo.jpg' },
  ];
  
export const ProfileGrid: React.FC = () => {
    return (
      <div className="profile-grid">
        {profiles.map((profile, index) => (
          <div className="profile-item" key={index}>
            <img src={profile.imageUrl} alt={profile.name} className="profile-picture" />
            <h1 className="profile-name">{profile.name}</h1>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProfileGrid;