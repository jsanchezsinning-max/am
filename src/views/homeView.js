import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex bg-slate-100 min-h-screen">
      ${Sidebar()}

      <main class="flex-1 p-6">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-slate-800">
            Bienvenido ${user?.name}
          </h1>
          <p class="text-slate-500">
            Rol: ${user?.role}
          </p>
        </div>

        <section class="bg-white p-5 rounded-2xl shadow mb-6">
          <h2 class="font-bold text-xl mb-2">
            ${user?.role === "admin" ? "Panel Administrador" : "Panel Usuario"}
          </h2>
          <p class="text-slate-600">
            ${
              user?.role === "admin"
                ? "Puedes visualizar todas las reservas, aprobarlas, rechazarlas o eliminarlas."
                : "Puedes crear reservas y ver únicamente tus propias reservas."
            }
          </p>
        </section>

        <section class="bg-white p-5 rounded-2xl shadow mb-6">
          <h2 class="font-bold text-xl mb-4">Crear reserva</h2>

          <form id="reservationForm" class="grid gap-4 md:grid-cols-2">
            <select name="workspace" class="border p-3 rounded-xl" required>
              <option value="">Selecciona un espacio</option>
              <option value="Sala A">Sala A</option>
              <option value="Sala B">Sala B</option>
              <option value="Oficina Privada">Oficina Privada</option>
              <option value="Coworking">Coworking</option>
              <option value="Auditorio">Auditorio</option>
            </select>

            <input type="date" name="date" class="border p-3 rounded-xl" required>
            <input type="time" name="startHour" class="border p-3 rounded-xl" required>
            <input type="time" name="endHour" class="border p-3 rounded-xl" required>

            <input
              type="text"
              name="reason"
              placeholder="Motivo de la reserva"
              class="border p-3 rounded-xl md:col-span-2"
              required
            >

            <button class="bg-blue-600 text-white px-4 py-3 rounded-xl md:col-span-2 hover:bg-blue-700">
              Guardar reserva
            </button>
          </form>
        </section>

        <section class="bg-white p-5 rounded-2xl shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl">Reservas</h2>
            <span class="text-sm text-slate-500">
              ${user?.role === "admin" ? "Mostrando todas las reservas" : "Mostrando únicamente tus reservas"}
            </span>
          </div>

          <div id="reservationsContainer" class="grid gap-4 md:grid-cols-2">
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">Cargando reservas ...</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;
}
