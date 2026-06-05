import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import notFound from "@/views/notFound";
import { isAuthenticated } from "@/utils";

const routes = {
  "/": loginView,
  "/home": homeView,
};

const publicRoutes = ["/"];
const privateRoutes = ["/home"];

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");
  const path = window.location.pathname;
  const authenticated = isAuthenticated();

  if (privateRoutes.includes(path) && !authenticated) {
    navigateTo("/");
    return;
  }

  if (publicRoutes.includes(path) && authenticated) {
    navigateTo("/home");
    return;
  }

  const view = routes[path] || notFound;
  app.innerHTML = view();
};

window.addEventListener("popstate", router);

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");

  if (!link) return;

  event.preventDefault();
  navigateTo(link.getAttribute("href"));
});
