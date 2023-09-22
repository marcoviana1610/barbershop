document.addEventListener("DOMContentLoaded", function () {
    const timeList = document.getElementById("time-list");
    const appointmentForm = document.getElementById("appointment-form");
    const timeSelect = document.getElementById("time");
  
    const availableTimes = Array.from({ length: 13 }, (_, i) => i + 8);
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  
    function updateAvailableTimes() {
      timeSelect.innerHTML = "";
      availableTimes.forEach((time) => {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = `${time}:00`;
        timeSelect.appendChild(option);
      });
    }
  
    function updateAppointmentsList() {
        timeList.innerHTML = "";
        appointments.forEach((appointment) => {
          const li = document.createElement("li");
          li.textContent = `${appointment.time}:00 - ${appointment.name}`;
          timeList.appendChild(li);
        });
      }
  
    updateAvailableTimes();
    updateAppointmentsList();
  
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const selectedTime = document.getElementById("time").value;
      const selectedTimeInt = parseInt(selectedTime);
  
      if (!name || !selectedTime) {
        alert("Por favor, preencha seu nome e escolha um horário.");
        return;
      }
  
      const existingAppointment = appointments.find(
        (appointment) =>
          appointment.name.toLowerCase() === name.toLowerCase() &&
          appointment.time === selectedTime
      );
  
      if (existingAppointment) {
        alert("Já existe alguém com este nome na agenda neste horário.");
        return;
      }
  
      if (availableTimes.includes(selectedTimeInt)) {
        const index = availableTimes.indexOf(selectedTimeInt);
        availableTimes.splice(index, 1);
        updateAvailableTimes();
  
        appointments.push({ time: selectedTime, name });
        localStorage.setItem("appointments", JSON.stringify(appointments));
        updateAppointmentsList();
  
        document.getElementById("name").value = "";
        document.getElementById("time").value = "";
      } else {
        alert("Desculpe, este horário já está ocupado. Por favor, escolha outro.");
      }
    });
  });
  