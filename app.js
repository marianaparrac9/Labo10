class Tarea {
    constructor(nombre, estado = 'pendiente') {
        this.nombre = nombre;
        this.estado = estado;
    }
}

class GestorTareas {
    constructor() {
        this.tareas = [];
        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('add-task-button').addEventListener('click', () => this.agregarTarea());
    }

    agregarTarea() {
        const taskInput = document.getElementById('task-input');
        const nombre = taskInput.value.trim();
        if (nombre) {
            const nuevaTarea = new Tarea(nombre);
            this.tareas.push(nuevaTarea);
            taskInput.value = '';
            this.actualizarInterfaz();
        }
    }

    actualizarInterfaz() {
        document.getElementById('pending-tasks').innerHTML = '';
        document.getElementById('in-progress-tasks').innerHTML = '';
        document.getElementById('completed-tasks').innerHTML = '';

        this.tareas.forEach((tarea, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            taskElement.textContent = tarea.nombre;

            if (tarea.estado === 'pendiente') {
                const moveRightBtn = this.crearBoton('→', () => this.cambiarEstado(index, 'haciendo'));
                taskElement.appendChild(moveRightBtn);
                document.getElementById('pending-tasks').appendChild(taskElement);
            } else if (tarea.estado === 'haciendo') {
                const moveLeftBtn = this.crearBoton('←', () => this.cambiarEstado(index, 'pendiente'));
                const moveRightBtn = this.crearBoton('→', () => this.cambiarEstado(index, 'completada'));
                taskElement.appendChild(moveLeftBtn);
                taskElement.appendChild(moveRightBtn);
                document.getElementById('in-progress-tasks').appendChild(taskElement);
            } else if (tarea.estado === 'completada') {
                document.getElementById('completed-tasks').appendChild(taskElement);
            }
        });
    }

    crearBoton(simbolo, accion) {
        const boton = document.createElement('button');
        boton.textContent = simbolo;
        boton.onclick = accion;
        return boton;
    }

    cambiarEstado(index, nuevoEstado) {
        this.tareas[index].estado = nuevoEstado;
        this.actualizarInterfaz();
    }
}

document.addEventListener('DOMContentLoaded', () => new GestorTareas());
