import axios from "axios";
import swal from "sweetalert";

const UserManager = {
  getMenus: function(callback) {
    let url = "/palmolive/menus";
    axios.get(url).then(response => {
      callback(response.data);
    });
  },

  createUser: function({name, email, designation, userName, userMenus, password}, cb) {

    axios.post('/palmolive/create-user', {name, userName, designation, userMenus, email, password}).then(res => {
      swal("Succeed", "User creation successful", "success");
      cb();
    }).finally(() => {
        cb();
        swal("Succeed", "User creation successful", "success");
    })
  },

    getUserMenus: function(cb){
      axios.get('/palmolive/user-menus').then(res => {
          cb(res.data);
      })
    },

    getAllUsers: function(cb)
    {
        axios.get('/palmolive/get_users').then(res => cb(res.data));
    },

    updatePassword: function(userId, currentPassword, newPassword)
    {
      return new Promise((resolve, reject) => {
        axios.post("/palmolive/update-password", {
          userId: userId,
          currentPassword: currentPassword,
          newPassword: newPassword
        }).then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.response.data);
        });
      });
    }
};

export default UserManager;
