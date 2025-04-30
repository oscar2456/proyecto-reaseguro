const API_URL = 'http://localhost:4000/api/contratos'; //url api
const contratoForm = document.getElementById('contrato-form');
const contratosList = document.getElementById('contratos-list');
const contratoIdInput = document.getElementById('contratoId');
const submitButton = document.getElementById('submit-button');

// funcion para obtener todos los contratos
async function getContratos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contratos = await response.json();
        displayContratos(contratos);
    } catch (error) {
        console.error('Error al obtener los contratos:', error);
    }
}

// funcion para mostrar los contratos en la lista
function displayContratos(contratos) {
    contratosList.innerHTML = '';
    contratos.forEach(contrato => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${contrato.nombre} - $${contrato.montoPrima}</span>
            <div>
                <button class="edit-button" data-id="${contrato.id}">Editar</button>
                <button class="delete-button" data-id="${contrato.id}">Eliminar</button>
            </div>
        `;
        contratosList.appendChild(listItem);
    });
}

// funcion para crear o actualizar un contrato
async function createOrUpdateContrato(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const montoPrima = document.getElementById('montoPrima').value;
    const contratoId = contratoIdInput.value;

    const contratoData = {
        nombre: nombre,
        montoPrima: parseFloat(montoPrima)
    };

    try {
        let response;
        if (contratoId) {
            // Actualizar
            response = await fetch(`${API_URL}/${contratoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contratoData)
            });
        } else {
            // Crear
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contratoData)
            });
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Limpiar el formulario
        contratoForm.reset();
        contratoIdInput.value = '';
        submitButton.textContent = 'Crear';

        // Recargar los contratos
        getContratos();
    } catch (error) {
        console.error('Error al crear/actualizar el contrato:', error);
    }
}

// funcion para eliminar un contrato
async function deleteContrato(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        getContratos();
    } catch (error) {
        console.error('Error al eliminar el contrato:', error);
    }
}

// Event Listeners
contratoForm.addEventListener('submit', createOrUpdateContrato);

contratosList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
        const id = event.target.dataset.id;
        await deleteContrato(id);
    } else if (event.target.classList.contains('edit-button')) {
        const id = event.target.dataset.id;
        // Cargar el contrato en el formulario para editar
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contrato = await response.json();
            document.getElementById('nombre').value = contrato.nombre;
            document.getElementById('montoPrima').value = contrato.montoPrima;
            contratoIdInput.value = contrato.id;
            submitButton.textContent = 'Actualizar';
        } catch (error) {
            console.error('Error al cargar el contrato para editar:', error);
        }
    }
});

// Cargar los contratos al cargar la página
getContratos();