import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser, uploadUserPhoto } from '../services/user.service';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ username: '', rut: '', password: '', email: '', roles: [] });
  const [editingUser, setEditingUser] = useState({ _id: '', username: '', rut: '', password: '', newPassword: '', email: '', roles: [] });
  const [enrollingUser, setEnrollingUser] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [editingPhotoFile, setEditingPhotoFile] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      if (Array.isArray(data)) {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers([]);
      setFilteredUsers([]);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.rut && user.rut.toLowerCase().includes(value.toLowerCase()));
      setFilteredUsers(filtered);
    }
  };

  const handleAddUser = async () => {
    try {
      const createdUser = await addUser(newUser);
      if (photoFile) {
        const formData = new FormData();
        formData.append('rut', createdUser.rut);
        formData.append('photo', photoFile);
        await uploadUserPhoto(formData);
      }
      setNewUser({ username: '', rut: '', password: '', email: '', roles: [] });
      setPhotoFile(null);
      loadUsers();
      toast.success('Usuario agregado exitosamente');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error al agregar usuario');
    }
  };

  const handleEditUser = async () => {
    console.log('Editando usuario:', editingUser);
    try {
      const { _id, username, rut, email, password, newPassword, roles } = editingUser;
      const userData = { username, rut, email, password, newPassword, roles };

      const response = await updateUser(_id, userData);
      if (editingPhotoFile) {
        const formData = new FormData();
        formData.append('rut', editingUser.rut);
        formData.append('photo', editingPhotoFile);
        await uploadUserPhoto(formData);
      }
      setEditingUser({ _id: '', username: '', rut: '', password: '', newPassword: '', email: '', roles: [] });
      setEditingPhotoFile(null);
      loadUsers();
      toast.success('Usuario editado exitosamente');
    } catch (error) {
      console.error('Error editing user:', error.response ? error.response.data : error.message);
      toast.error('Error al editar usuario');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      loadUsers();
      toast.success('Usuario eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error al eliminar usuario');
    }
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEnrollUser = async () => {
    setIsWaiting(true);
    try {
      await axios.post('http://localhost:3000/api/fingerprint/enroll', { rut: enrollingUser.rut });
      toast.success('Huella digital registrada exitosamente');
    } catch (error) {
      console.error('Error al registrar la huella:', error);
      toast.error('Error al registrar la huella');
    } finally {
      setIsWaiting(false);
    }
  };

  const handleDeleteFingerprint = async () => {
    setIsWaiting(true);
    try {
      await axios.post('http://localhost:3000/api/fingerprint/delete', { rut: enrollingUser.rut });
      toast.success('Huella digital eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la huella:', error);
      toast.error('Error al eliminar la huella');
    } finally {
      setIsWaiting(false);
    }
  };

  const renderFileInput = (setter) => (
    <label className="bg-blue-500 text-white p-2 rounded cursor-pointer custom-button">
      Seleccionar foto de perfil
      <input
        type="file"
        className="hidden"
        onChange={(e) => setter(e.target.files[0])}
      />
    </label>
  );

  return (
    <div className="user-management p-6 bg-white rounded shadow-md grid grid-cols-2 gap-4">
      <div className="add-user p-4 border rounded">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Agregar Usuario</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => handleInputChange(e, setNewUser)}
          className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
        />
        <input
          type="text"
          name="rut"
          placeholder="RUT"
          value={newUser.rut}
          onChange={(e) => handleInputChange(e, setNewUser)}
          className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => handleInputChange(e, setNewUser)}
          className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => handleInputChange(e, setNewUser)}
          className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
        />
        <select
          name="roles"
          value={newUser.roles.length > 0 ? newUser.roles[0] : ""}
          onChange={(e) => setNewUser({ ...newUser, roles: [e.target.value] })}
          className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
        >
          <option value="">Seleccione un rol</option>
          <option value="user">Usuario</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-center mt-2">
          {renderFileInput(setPhotoFile)}
        </div>
        <div className="flex justify-center">
          <button 
            onClick={handleAddUser}
            className="bg-blue-500 text-white p-2 rounded mt-2 block custom-button"
          >
            Registrar usuario
          </button>
        </div>
      </div>

      <div className="user-list p-4 border rounded">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Lista de Usuarios</h2>
        <input
          type="text"
          placeholder="Buscar por RUT"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
        />
        <div className="overflow-y-auto h-64">
          <ul className="space-y-2">
            {filteredUsers.map(user => (
              <li key={user._id} className="p-2 border border-gray-300 rounded flex justify-between items-center">
                <div className="text-black">
                  <span className="font-medium">{user.username}</span> - <span>{user.rut}</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setEditingUser({ ...user, password: '', newPassword: '' })} 
                    className="bg-yellow-500 text-white p-2 rounded custom-button"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user._id)} 
                    className="bg-red-500 text-white p-2 rounded custom-button"
                  >
                    Eliminar
                  </button>
                  <button 
                    onClick={() => setEnrollingUser(user)} 
                    className="bg-green-500 text-white p-2 rounded custom-button"
                  >
                    Enroll
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editingUser._id && (
        <div className="edit-user p-4 border rounded">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">Editar Usuario</h2>
          {editingUser.photoUrl && (
            <div className="flex flex-col items-center mb-4">
              <img src={`http://localhost:3000${editingUser.photoUrl}`} alt="Foto del usuario" className="w-32 h-32 object-cover rounded-full mb-2" />
              {renderFileInput(setEditingPhotoFile)}
            </div>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={editingUser.username}
            onChange={(e) => handleInputChange(e, setEditingUser)}
            className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
          />
          <input
            type="text"
            name="rut"
            placeholder="RUT"
            value={editingUser.rut}
            onChange={(e) => handleInputChange(e, setEditingUser)}
            className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={editingUser.password}
            onChange={(e) => handleInputChange(e, setEditingUser)}
            className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={editingUser.newPassword || ''}
            onChange={(e) => handleInputChange(e, setEditingUser)}
            className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) => handleInputChange(e, setEditingUser)}
            className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
          />
          <select
            name="roles"
            value={editingUser.roles.length > 0 ? editingUser.roles[0] : ""}
            onChange={(e) => setEditingUser({ ...editingUser, roles: [e.target.value] })}
            className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
          >
            <option value="">Seleccione un rol</option>
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
          <div className="text-center mt-4">
            <button 
              onClick={handleEditUser}
              className="bg-green-500 text-white p-2 rounded custom-button"
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {enrollingUser && (
        <div className="enroll-user p-4 border rounded flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">Enroll Huella Digital</h2>
          <img src={`http://localhost:3000${enrollingUser.photoUrl}`} alt="Foto del usuario" className="mb-4 w-32 h-32 object-cover rounded-full" />
          <div className="bg-gray-200 p-4 rounded text-black text-center mb-4 w-full">
            <span className="font-medium">{enrollingUser.username}</span> - <span>{enrollingUser.rut}</span>
          </div>
          {isWaiting ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 rounded">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-t-4 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-white">Por favor, ingrese su huella digital...</p>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleEnrollUser}
                className="bg-blue-500 text-white p-2 rounded custom-button"
              >
                Registrar Huella
              </button>
              <button 
                onClick={handleDeleteFingerprint}
                className="bg-red-500 text-white p-2 rounded custom-button"
              >
                Eliminar Huella
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
