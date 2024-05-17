import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const history = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
  });
  const [editMode, setEditMode] = useState(false); // état pour gérer le mode d'édition
  const [editedUserInfo, setEditedUserInfo] = useState({
    firstName: '',
    lastName: '',
  }); // état pour stocker les données modifiées

  useEffect(() => {
    // Récupérer les données du profil de l'utilisateur depuis le serveur lors du chargement initial de la page
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
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
      setUserInfo(userData.body);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      // Traiter l'erreur
    }
  };

  const handleLogout = () => {
    // Supprimer le token du local storage
    localStorage.removeItem("token");
    // Rediriger vers la page de connexion
    history("/login");
  };
  const handleEditClick = () => {
    // Afficher le champ de saisie avec les données existantes lors du clic sur le bouton "Edit Name"
    setEditMode(true);
    setEditedUserInfo(userInfo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prevEditedUserInfo) => ({
      ...prevEditedUserInfo,
      [name]: value,
    }));
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

      // Rafraîchir les données du profil après la mise à jour réussie
      fetchUserProfile();
      setEditMode(false); // Désactiver le mode d'édition après la mise à jour réussie
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      // Traiter l'erreur
    }
  
  };

  return (
    <span>
    <nav className="main-nav">
      <a className="main-nav-logo" href="./index.html">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        <a className="main-nav-item" href="./profile">
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
        {editMode ? (
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={editedUserInfo.firstName} onChange={handleInputChange} />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={editedUserInfo.lastName} onChange={handleInputChange} />
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        ) : (
          <div>
            <h1>Welcome back<br />{userInfo.firstName} {userInfo.lastName}!</h1>
            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
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
