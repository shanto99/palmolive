const axios = window.axios;
let assignedUserInput;
let taskForm = document.getElementById("task-form");
let subordinates = [];
let designations = [];

axios.get('/rcca/subordinates').then(function(res) {
    res.data.forEach(function(user, index) {
        let values = Object.values(user);
        if(designations.indexOf(values[2]) < 0) designations.push({value: `designation_${values[2]}`, text: `All ${values[2]}`});
        subordinates.push({value: values[0], text: `${values[0]}-${values[1]}`})
    });
    assignedUserInput = new TomSelect('#input-tags',{
        plugins: {
            remove_button:{
                title:'Remove this item',
            }
        },
        options: [...subordinates, ...designations],
        persist: false,
        onDelete: function(values) {
            return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
        },
        onChange: handleOnChange
    });
});

function handleOnChange(values) {
    let shareType = getRadioValue(taskForm, "ShareType");
    if(shareType === "private") {
        values = values.split(",");
        if(values.length > 1) {
            assignedUserInput.clear();
            assignedUserInput.addItem(values[0]);
        }
    }
}

function getAssignedUsers() {
    let assignedUsers = assignedUserInput.getValue();
    let users = assignedUsers.split(",");
    let userIds = [];
    users.forEach(function(userId) {
        if(userId.includes('designation')) {
            let designation = userId.split(",")[1];
            subordinates.forEach(function(subordinate) {
               if(subordinate.Designation === designation) {
                   userIds.push(subordinate.value);
               }
            });
        } else {
            userIds.push(userId);
        }
    });

    userIds = userIds.filter((userId, index) => userIds.indexOf(userId) === index);

    return userIds;
}

taskForm.onsubmit = function(e) {
    e.preventDefault();
    let form = e.currentTarget;

    assignedUsers = getAssignedUsers();

    let categoryId = getRadioValue(form, "Category");
    let typeId = getRadioValue(form, "Type");
    let shareType = getRadioValue(form, "ShareType");
    let details = form.querySelector("#details").value;

    axios.post('/rcca/save-task', {
        Category: categoryId,
        Type: typeId,
        Details: details,
        AssignedUsers: JSON.stringify(assignedUsers),
        ShareType: shareType
    })
        .then(function (response) {
            assignedUserInput.clear()
            form.reset();
            swal("Saved!", "Task saved successfully!", "success");
        })
        .catch(function (error) {
            console.log(error);
        });

}

function getRadioValue(form, name) {
    let radios = [...form.querySelectorAll(`input[name=${name}]`)];
    for(let i=0; i<radios.length; i++) {
        let radioElement = radios[i];
        if(radioElement.checked) {
            return radioElement.value;
        }
    }
}

function changeSubordinateOptions(isPrivate) {
    assignedUserInput.clear();

    designations.forEach(function(designation) {
        if(isPrivate) {
            assignedUserInput.removeOption(designation.value);
        } else {
            designations.forEach(function(designation) {
                assignedUserInput.addOption(designation);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("share-type-private").addEventListener('change', function() {
        assignedUserInput.clear();
        changeSubordinateOptions(true);
    });
    document.getElementById("share-type-public").addEventListener('change', function() {
       changeSubordinateOptions(false);
    });
    let taskId = document.getElementById("task-id").value;
    if(taskId) {
        axios.get(`/get-task/${taskId}`)
            .then(res => {
                let task = res.data;
                if(task.Category){
                    document.getElementById(`category-${task.Category}`).checked = true;
                }
                if(task.Type) {
                    document.getElementById(`type-${task.Type}`).checked = true;
                }
                if(task.Details) {
                    document.getElementById('details').value = task.Details;
                }
                if(task.ShareType === "private") {
                    document.getElementById('share-type-private').checked = true;
                } else if (task.ShareType === "public") {
                    document.getElementById('share-type-public').checked = true;
                }

                if(task.assigned_users) {
                    task.assigned_users.forEach(function(user) {
                        assignedUserInput.addItem(user.UserID);
                    });
                }
            })
    }
});
