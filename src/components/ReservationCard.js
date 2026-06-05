import { getSession } from "@/utils";

const statusClasses = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-slate-200 text-slate-700",
};

export default function ReservationCard(reservation) {
  const {
    id,
    workspace,
    date,
    startHour,
    endHour,
    reason,
    status,
    userId,
  } = reservation;

  const user = getSession();
  const isAdmin = user?.role === "admin";
  const canUserEdit = user?.id === userId && status === "pending";

  return `
    <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex items-start justify-between gap-4 mb-3">
        <h3 class="font-bold text-lg text-slate-800">${workspace}</h3>

        <span class="px-3 py-1 rounded-full text-xs font-semibold ${
          statusClasses[status] || "bg-slate-100 text-slate-700"
        }">
          ${status}
        </span>
      </div>

      <div class="space-y-1 text-sm text-slate-600">
        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Horario:</strong> ${startHour} - ${endHour}</p>
        <p><strong>Motivo:</strong> ${reason}</p>

        ${
          isAdmin
            ? `<p><strong>ID usuario:</strong> ${userId}</p>`
            : ""
        }
      </div>

      <div class="flex flex-wrap gap-2 mt-4">

        ${
          isAdmin && status === "pending"
            ? `
              <button
                class="approveBtn bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                data-id="${id}"
              >
                Aprobar
              </button>

              <button
                class="rejectBtn bg-orange-500 text-white px-3 py-1 rounded-lg text-sm"
                data-id="${id}"
              >
                Rechazar
              </button>
            `
            : ""
        }

        ${
          isAdmin
            ? `
              <button
                class="editBtn bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                data-id="${id}"
              >
                Editar
              </button>
            `
            : ""
        }

        ${
          canUserEdit
            ? `
              <button
                class="cancelBtn bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                data-id="${id}"
              >
                Cancelar
              </button>
            `
            : ""
        }

        ${
          isAdmin
            ? `
              <button
                class="deleteBtn bg-slate-800 text-white px-3 py-1 rounded-lg text-sm"
                data-id="${id}"
              >
                Eliminar
              </button>
            `
            : ""
        }

      </div>
    </article>
  `;
}
