import ReservationCard from "@/components/ReservationCard";
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "@/services/reservation.service";
import { getSession } from "@/utils";

const renderReservations = async () => {
  const container = document.querySelector("#reservationsContainer");
  const user = getSession();

  if (!container || !user) return;

  const reservations = await getReservations();

  const filteredReservations =
    user.role === "admin"
      ? reservations
      : reservations.filter((reservation) => Number(reservation.userId) === Number(user.id));

  container.innerHTML = filteredReservations.length
    ? filteredReservations.map((reservation) => ReservationCard(reservation)).join("")
    : `
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-slate-500">No hay reservas disponibles</p>
      </div>
    `;
};

export const homeController = async () => {
  const form = document.querySelector("#reservationForm");
  const container = document.querySelector("#reservationsContainer");
  const user = getSession();

  await renderReservations();

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const startHour = formData.get("startHour");
    const endHour = formData.get("endHour");

    if (startHour >= endHour) {
      alert("La hora de inicio debe ser menor que la hora final");
      return;
    }

    const newReservation = {
      userId: user.id,
      workspace: formData.get("workspace"),
      date: formData.get("date"),
      startHour,
      endHour,
      reason: formData.get("reason"),
      status: "pending",
    };

    await createReservation(newReservation);
    form.reset();
    await renderReservations();
  });

  container?.addEventListener("click", async (event) => {
    const id = event.target.dataset.id;

    if (!id) return;

    if (event.target.classList.contains("approveBtn")) {
      await updateReservation(id, { status: "approved" });
    }

    if (event.target.classList.contains("rejectBtn")) {
      await updateReservation(id, { status: "rejected" });
    }

    if (event.target.classList.contains("cancelBtn")) {
      await updateReservation(id, { status: "cancelled" });
    }

    if (event.target.classList.contains("deleteBtn")) {
      const confirmDelete = confirm("¿Seguro que deseas eliminar esta reserva?");
      if (!confirmDelete) return;
      await deleteReservation(id);
    }

    await renderReservations();
  });
};
