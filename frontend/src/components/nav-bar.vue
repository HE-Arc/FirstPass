<script setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
const logged = localStorage.getItem("user");
</script>
<script>
export default {
  methods: {
    toggleNavbar() {
      let navToggleButton = document.getElementById("nav-toggle-button");

      const currentNavState = navToggleButton.getAttribute("data-state");
      const navMenu = document.getElementById("primary-navigation");

      if (!currentNavState || currentNavState === "closed") {
        navToggleButton.setAttribute("data-state", "opened");
        navToggleButton.setAttribute("aria-expanded", "true");

        navMenu.style.transform = "translateY(0)";
        navMenu.style.marginTop = "1rem";
      } else {
        navToggleButton.setAttribute("data-state", "closed");
        navToggleButton.setAttribute("aria-expanded", "false");

        navMenu.style.transform = "translateY(-100%)";
        navMenu.style.marginTop = "-10rem";
      }
    },
    logout() {
      useAuthStore().logout();
    },
  },
};
</script>
<!-- Hamburger toggler taken from https://codepen.io/kevinpowell/pen/gOKpOyy made by Kevin Powell -->
<template>
  <nav class="navbar">
    <div class="navbar-logo navbar-section">
      <RouterLink class="nav-logo-link" to="/">
        <span class="logo-first-word">First</span>
        <span class="logo-second-word">Pass</span>
      </RouterLink>
      <button
        class="nav-toggle-button"
        id="nav-toggle-button"
        aria-controls="primary-navigation"
        aria-expanded="false"
        data-state="closed"
        v-on:click="toggleNavbar()"
      >
        <svg
          stroke="var(--color-text)"
          class="hamburger"
          viewBox="0 0 100 100"
          width="250"
        >
          <line
            class="line top"
            x1="90"
            x2="10"
            y1="40"
            y2="40"
            stroke-width="10"
            stroke-linecap="round"
            stroke-dasharray="80"
            stroke-dashoffset="0"
          ></line>
          <line
            class="line bottom"
            x1="10"
            x2="90"
            y1="60"
            y2="60"
            stroke-width="10"
            stroke-linecap="round"
            stroke-dasharray="80"
            stroke-dashoffset="0"
          ></line>
        </svg>
      </button>
    </div>
    <div class="toggleable-section" id="primary-navigation">
      <div class="navbar-links navbar-section">
        <RouterLink to="/" class="nav-link" v-show="logged">Vaults</RouterLink>
        <RouterLink to="/account" class="nav-link" v-show="logged"
          >Account</RouterLink
        >
      </div>
      <div class="navbar-buttons navbar-section">
        <RouterLink to="login" class="nav-link" v-show="!logged"
          >Login</RouterLink
        >
        <RouterLink to="register">
          <button class="navbar-buttons--signup" v-show="!logged">
            Sign Up
          </button>
        </RouterLink>
        <a v-on:click="logout()" class="nav-link" v-show="logged">Logout</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-logo-link {
  text-decoration: none;
  font-size: 2rem;
}
.logo-first-word {
  color: var(--color-text);
  transition: all 0.2s ease-in-out;
}
.logo-second-word {
  color: var(--lastpass-red);
  transition: all 0.2s ease-in-out;
}

.nav-logo-link:hover .logo-first-word {
  color: var(--lastpass-red);
}
.nav-logo-link:hover .logo-second-word {
  color: var(--color-text);
}
.navbar {
  top: 0;
  left: 0;
  position: sticky;
  font-family: "Staatliches", cursive;
  letter-spacing: 0.12rem;
  font-size: 1.5rem;

  z-index: 100;

  background-color: var(--color-background);
  color: var(--color-text);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  height: var(--navbar-height);

  font-variant: small-caps;
}

.navbar-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: column;
}

.navbar-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  width: fit-content;
  height: 3rem;
}

.navbar-logo-img {
  max-height: 2.3rem;
  object-fit: cover;
  margin-inline: 1rem;
}

.navbar-buttons--login,
.navbar-buttons--signup {
  font-family: "Staatliches", cursive;
  letter-spacing: 0.12rem;
  color: white;
  font-size: 1.4rem;

  background-color: var(--lastpass-red);
  margin-inline: 1rem;
  padding: 0.2rem 1rem;
  width: 130px;

  border: none;
  border-radius: 5rem;
  cursor: pointer;
}

.nav-link {
  font-size: 1.2rem;
  font-weight: bold;

  color: var(--color-text);
  text-decoration: none;

  cursor: pointer;
}

.nav-toggle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 1rem;
  height: fit-content;
  max-height: 3rem;
  width: fit-content;
  max-width: 3rem;
  background: transparent;
  border: 3px solid var(--color-text);
  border-radius: 0.5rem;

  cursor: pointer;
  margin-inline: 1rem;
}

.nav-toggle-button[data-state="closed"] :is(.top, .bottom) {
  animation: to-open-icon 1s forwards;
}

.nav-toggle-button[data-state="opened"] :is(.top, .bottom) {
  animation: to-close-icon 1s forwards;
}

.nav-toggle-button .hamburger {
  transition: rotate 800ms 100ms;
}

.nav-toggle-button[data-state="opened"] .hamburger {
  -webkit-rotate: 1turn;
  rotate: 1turn;
}

.nav-toggle-button .line.top {
  --rotation: -45deg;
  transform-origin: 65px 45px;
}

.nav-toggle-button .line.bottom {
  --rotation: 45deg;
  transform-origin: 60px 55px;
}

@keyframes to-close-icon {
  0% {
    stroke-dashoffset: 0;
  }
  40% {
    stroke-dashoffset: 79.9;
  }
  60% {
    stroke-dashoffset: 79.9;
    -webkit-rotate: var(--rotation);
    rotate: var(--rotation);
  }
  100% {
    stroke-dashoffset: 0;
    -webkit-rotate: var(--rotation);
    rotate: var(--rotation);
  }
}
@keyframes to-open-icon {
  0% {
    stroke-dashoffset: 0;
    -webkit-rotate: var(--rotation);
    rotate: var(--rotation);
  }
  40% {
    stroke-dashoffset: 79.9;
    -webkit-rotate: var(--rotation);
    rotate: var(--rotation);
  }
  60% {
    stroke-dashoffset: 79.9;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.toggleable-section {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 4rem;
  padding-bottom: 1rem;
  z-index: -1;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  transform: translateY(-200%);
  margin-top: -30rem;
  margin-bottom: 1rem;
  transition: all 0.5s ease;
  background-color: var(--color-background);
  gap: 2rem;
}

.nav-link {
  font-size: 1.5rem;
  font-weight: bold;

  color: var(--color-text);
  text-decoration: none;
}

@media screen and (min-width: 1024px) {
  .toggleable-section {
    display: flex;
    width: 100%;
    transform: translateY(0);
    margin: 0;
    margin-bottom: 0;
    flex-direction: row;
    justify-content: space-between;
    min-height: 0;
    height: fit-content;
    gap: none;
    position: relative;
    padding: 0;
  }
  .nav-toggle-button {
    display: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .navbar {
    top: 0;
    position: sticky;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* padding: 0 2rem; */
    padding-block: 0.5rem;
    height: var(--navbar-height);
    width: 100%;
  }
  .navbar-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-inline: 2rem;
    height: 100%;
  }

  .navbar-logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
    height: var(--navbar-height);
    transition: all 0.2s ease-in-out;
    flex-direction: row;
  }

  .navbar-logo-img {
    max-height: 2.3rem;
    object-fit: cover;
    transition: all 0.2s ease-in-out;
  }

  .navbar-links {
    display: flex;
    justify-content: left;
    width: 75%;
  }

  .nav-link {
    font-size: 1.2rem;
    font-weight: bold;

    display: flex;
    height: 100%;
    width: fit-content;
    justify-content: center;
    align-items: center;
    padding-inline: 1rem;
    margin-inline: 0.25rem;

    color: var(--color-text);
    text-decoration: none;

    transition: all 0.2s ease-in-out;
  }

  .nav-link:hover {
    color: var(--lastpass-red);
  }

  .navbar-buttons {
    display: flex;
    justify-content: right;
    width: 25%;
  }

  .navbar-buttons--login,
  .navbar-buttons--signup {
    transition: all 0.2s ease-in-out;
  }

  .navbar-buttons--login:hover,
  .navbar-buttons--signup:hover {
    background-color: var(--lastpass-red-dark);
  }
}
</style>
