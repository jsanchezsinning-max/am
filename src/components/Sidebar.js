import { removeSession } from "@/utils";
import { navigateTo } from "@/router/router";

export default function Sidebar() {
  setTimeout(() => {
    document.querySelector("#logoutBtn")?.addEventListener("click", () => {
      removeSession();
      navigateTo("/");
    });
  });

  return `
    <aside class="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h2 class="text-2xl font-bold mb-8">
        Workspace App
      </h2>

      <nav class="flex flex-col gap-4">
        <a href="/home" class="px-3 py-2 bg-slate-700 rounded-xl hover:bg-slate-600" data-link>
          Home
        </a>

        <button
          id="logoutBtn"
          class="text-left cursor-pointer text-red-300 hover:text-white hover:bg-red-500 px-3 py-2 rounded-xl"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  `;
}
