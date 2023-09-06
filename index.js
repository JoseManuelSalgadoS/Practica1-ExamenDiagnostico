const URL = 'https://reqres.in/api';

const getAll = () => {
    fetch(`${URL}/users`)
        .then(response => response.json())
        .then(data => {
            content = "";
            let table = document.getElementById("table");
            for (i = 0; i < data.data.length; i++) {
                content += `
                <tr>
                    <td scope="row">${data.data[i].id}</td>
                    <td>${data.data[i].first_name}</td>
                    <td>${data.data[i].last_name}</td>
                    <td>${data.data[i].email}</td>
                    <td>
                        <button type="button" onclick="getById(${data.data[i].id})" data-bs-toggle="modal" data-bs-target="#update" class="btn btn-warning"><i class="fas fa-edit"></i></button>
                    </td>
                    <td>
                        <button onclick="deleteR(${data.data[i].id})" class="btn btn-danger"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`
            }
            table.innerHTML = content;
        })
}

const create = () => {
    const create = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(create)
    }
    fetch(`${URL}/users`, options)
        .then(response => response.json())
        .then(data => {
            if (!data.id) {
                alert('No se pudo registrar');
            } else {
                document.getElementById("closeCreate").click();
                alert('Registro exitoso');
                getAll();
            }
        })
}

const getById = (id) => {
    fetch(`${URL}/users/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('first_nameM').value = data.data.first_name
        document.getElementById('last_nameM').value = data.data.last_name
        document.getElementById('emailM').value = data.data.email;
        document.getElementById('idM').value = data.data.id;
    })
}

const update = () => {
    const update = {
        first_name: document.getElementById('first_nameM').value,
        last_name: document.getElementById('last_nameM').value,
        email: document.getElementById('emailM').value,
        id: document.getElementById('idM').value
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    }
    fetch(`${URL}/users/${update.id}`, options)
        .then(response => response.json())
        .then(data => {
            if (!data.id) {
                alert('No se pudo modificar');
            } else {
                document.getElementById("closeUpdate").click();
                alert('Modificación exitosa');
                getAll();
            }
        })
}

const deleteR = (id) => {
    fetch(`${URL}/users/${id}`, 
        {method: 'DELETE',
        })
    .then(response => {
        if (response.status !== 204) {
            alert('No se pudo eliminar');
        } else {
            console.log(response)
            alert('Eliminación exitosa');
            getAll();
        }
    })
}
