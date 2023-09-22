document.addEventListener("DOMContentLoaded", function () {
  const appointmentList = document.getElementById("appointment-list");

  // Carregar agendamentos do localStorage
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  function updateAppointmentList() {
    appointmentList.innerHTML = "";
    appointments.forEach((appointment, index) => {
      const li = document.createElement("li");
      li.textContent = `${appointment.time}:00 - ${appointment.name}`;

      // Botão de Editar com ID e classe
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.id = `edit-button-${index}`; // Adicionar um ID único
      editButton.className = "edit-button"; // Adicionar uma classe para estilização CSS

      // Botão de Remover com ID e classe
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remover";
      removeButton.id = `remove-button-${index}`; // Adicionar um ID único
      removeButton.className = "remove-button"; // Adicionar uma classe para estilização CSS

      li.appendChild(editButton);
      li.appendChild(removeButton);
      appointmentList.appendChild(li);

      // Adicionar evento de clique para editar
      editButton.addEventListener("click", () => {
        const newName = prompt("Novo nome:", appointment.name);
        if (newName !== null) {
          // Verificar se o novo nome já está agendado
          const isNameTaken = appointments.some(
            (app) => app.name.toLowerCase() === newName.toLowerCase()
          );

          if (!isNameTaken) {
            appointments[index].name = newName;
            localStorage.setItem("appointments", JSON.stringify(appointments));
            updateAppointmentList();
          } else {
            alert("Já existe alguém com este nome na agenda.");
          }
        }
      });

      // Adicionar evento de clique para remover
      removeButton.addEventListener("click", () => {
        if (confirm("Tem certeza de que deseja remover este agendamento?")) {
          appointments.splice(index, 1);
          localStorage.setItem("appointments", JSON.stringify(appointments));
          updateAppointmentList();
        }
      });
    });
  }

  updateAppointmentList();
});
