import React, { useEffect } from 'react';
import logo from "../asset/argentBankLogo.png";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEditMode } from '../reducers/editModeSlice';
import { setUserInfo, clearUserInfo } from '../reducers/userInfoSlice';
import { setEditedUserInfo, clearEditedUserInfo } from '../reducers/editedUserInfoSlice';

function Profile() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.editMode);
  const userInfo = useSelector((state) => state.userInfo);
  const editedUserInfo = useSelector((state) => state.editedUserInfo);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));

      if (!token) {
        history('/login', { replace: true });
        return;
      }

      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = await response.json();
      dispatch(setUserInfo(userData.body));
      if (rememberMe === false) {
        localStorage.clear()
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      if (error.message === 'Failed to fetch user profile') {
        history('/login', { replace: true });
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUserInfo());
    dispatch(clearEditedUserInfo());
    history("/login");
  };

  const handleEditClick = () => {
    dispatch(setEditMode(true));
    dispatch(setEditedUserInfo(userInfo));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditedUserInfo({ [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        history('/login', { replace: true });
        return;
      }

      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUserInfo),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      fetchUserProfile();
      dispatch(setEditMode(false));
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  const token = localStorage.getItem('token'); // Token for conditional rendering

  return (
    <span>
      <nav className="main-nav">
        <a className="main-nav-logo">
          <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item-other">
            <i className="fa fa-user-circle"></i>
            {userInfo.firstName}
          </a>
          <a className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          {token ? (
            editMode ? (
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editedUserInfo.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editedUserInfo.lastName}
                  onChange={handleInputChange}
                />
                <button onClick={handleSaveChanges}>Save Changes</button>
              </div>
            ) : (
              <div>
                <h1>Welcome back<br />{userInfo.firstName} {userInfo.lastName}!</h1>
                <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
              </div>
            )
          ) : (
            <div>
              <h1>Welcome back<br />{userInfo.firstName} {userInfo.lastName}!</h1>
            </div>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </main>
    </span>
  );
}

function Account({ title, amount, description }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

export default Profile;
