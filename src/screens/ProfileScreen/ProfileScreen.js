import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userBoards as initialBoards } from '../../data/boardsData';
import './ProfileScreen.css';

export default function ProfileScreen() {
    const [username, setUsername] = useState('User123');
    const [profilePic, setProfilePic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&s');
    const [boards, setBoards] = useState(initialBoards);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [boardToDelete, setBoardToDelete] = useState(null);
    const navigate = useNavigate();
  
    const handleProfileClick = () => {
      setShowProfileModal(true);
    };
  
    const handleDeleteClick = (boardId, e) => {
      e.stopPropagation();
      setBoardToDelete(boardId);
      setShowDeleteModal(true);
    };
  
    const confirmDelete = () => {
      setBoards(boards.filter(board => board.id !== boardToDelete));
      setShowDeleteModal(false);
      setBoardToDelete(null);
    };
  
    const handleProfileSave = (newUsername, newProfilePic) => {
      if (newUsername) setUsername(newUsername);
      if (newProfilePic) setProfilePic(newProfilePic);
      setShowProfileModal(false);
    };

const handleBoardClick = (board) => {
  navigate(`/board/${board.id}`, { 
    state: { 
      board: {
        ...board,
        images: board.images || [] // Ensure images array exists
      }
    } 
  });
};
  
    return (
      <div className="profile-page">
        <div className="profile-header">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <h2>{username}</h2>
          <button className="edit-btn" onClick={handleProfileClick}>Edit Profile</button>
        </div>
  
        <h3>Your Boards</h3>
        <div className="boards-container">
          {boards.map(board => (
            <div 
              className="board-card" 
              key={board.id}
              onClick={() => handleBoardClick(board)}
            >
              <img src={board.image} alt={board.name} />
              <p>{board.name}</p>
              <button 
                className="board-menu-btn" 
                onClick={(e) => handleDeleteClick(board.id, e)}
              >
                ⋮
              </button>
            </div>
          ))}
        </div>
  
        {showProfileModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setShowProfileModal(false)}>×</button>
              <h3>Edit Profile</h3>
              <img src={profilePic} alt="Profile" className="profile-preview" />
              <input type="file" onChange={(e) => setProfilePic(URL.createObjectURL(e.target.files[0]))} />
              <input type="text" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
              <button onClick={() => handleProfileSave(username, profilePic)}>Save</button>
            </div>
          </div>
        )}
  
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setShowDeleteModal(false)}>×</button>
              <h3>Are you sure you want to delete this board?</h3>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button onClick={confirmDelete}>Confirm</button>
            </div>
          </div>
        )}
      </div>
    );
};