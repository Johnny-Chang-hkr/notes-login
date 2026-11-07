
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo }) => (
  <div className="profile-info">
    <div className="profile-avatar">{getInitials(userInfo?.fullName) || "N"}</div>
    <div className="profile-copy">
      <span className="profile-name">{userInfo?.fullName || "Your space"}</span>
      <span className="profile-status"><span /> Your personal workspace</span>
    </div>
  </div>
);

export default ProfileInfo;
