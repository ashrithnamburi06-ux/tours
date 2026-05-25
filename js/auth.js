// js/auth.js — session + navbar auth (requires api.js first)
(function () {
  'use strict';

  var AUTH_TOKEN_KEY = 'jwt_token';
  var USER_INFO_KEY = 'user_info';

  function persistSession(data) {
    if (data && data.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    }
    if (data && data.user) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.user));
    }
  }

  window.isAuthenticated = function () {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  };

  window.getCurrentUser = function () {
    var raw = localStorage.getItem(USER_INFO_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  };

  window.getAuthRedirectUrl = function (user) {
    var params = new URLSearchParams(window.location.search);
    var redirect = params.get('redirect');
    if (redirect) {
      try {
        return decodeURIComponent(redirect);
      } catch (e) {
        return redirect;
      }
    }
    if (user && user.role === 'admin') {
      return 'admin/index.html';
    }
    return 'index.html';
  };

  window.login = async function (email, password) {
    try {
      var result = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
      });
      if (!result.ok) {
        return { success: false, error: parseApiMessage(result.json) };
      }
      if (result.json && result.json.token) {
        persistSession(result.json);
        return { success: true, user: result.json.user };
      }
      return { success: false, error: 'No token received from server.' };
    } catch (e) {
      if (!navigator.onLine) {
        return { success: false, error: 'You appear to be offline. Check your connection.' };
      }
      return {
        success: false,
        error: 'Cannot reach the server. Start the backend or try again shortly.',
      };
    }
  };

  window.register = async function (name, email, password) {
    try {
      var result = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      if (!result.ok) {
        return { success: false, error: parseApiMessage(result.json) };
      }
      return { success: true };
    } catch (e) {
      if (!navigator.onLine) {
        return { success: false, error: 'You appear to be offline. Check your connection.' };
      }
      return {
        success: false,
        error: 'Cannot reach the server. Start the backend or try again shortly.',
      };
    }
  };

  window.logout = function () {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    window.location.href = 'index.html';
  };

  window.requireAuth = function () {
    if (!isAuthenticated()) {
      var next = encodeURIComponent(
        window.location.pathname.replace(/^\//, '') + window.location.search
      );
      window.location.href = 'login.html?redirect=' + next;
    }
  };

  function bindNavButton(btn, isAuth, user) {
    if (!btn) return;

    var newBtn = btn.cloneNode(false);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.className = btn.className;
    newBtn.classList.add('auth-nav-btn');

    if (isAuth) {
      var isAdmin = user && user.role === 'admin';
      newBtn.href = isAdmin ? 'admin/index.html' : 'index.html';
      newBtn.innerHTML =
        '<span><i class="bi bi-person-circle"></i> ' +
        (isAdmin ? 'Admin' : 'Profile') +
        '</span><span><i class="bi bi-box-arrow-right"></i> Logout</span>';
      newBtn.addEventListener('click', function (e) {
        var rect = newBtn.getBoundingClientRect();
        var clickRight = e.clientX > rect.left + rect.width / 2;
        if (clickRight || e.target.closest('.bi-box-arrow-right')) {
          e.preventDefault();
          logout();
        } else if (!isAdmin) {
          e.preventDefault();
          window.location.href = 'index.html';
        }
      });
    } else {
      newBtn.href = 'login.html';
      newBtn.innerHTML =
        '<span><i class="bi bi-box-arrow-in-right"></i> Login</span>' +
        '<span><i class="bi bi-person-plus"></i> Register</span>';
      newBtn.addEventListener('click', function (e) {
        var rect = newBtn.getBoundingClientRect();
        if (e.clientX > rect.left + rect.width / 2) {
          e.preventDefault();
          window.location.href = 'register.html';
        }
      });
    }
  }

  function ensureRegisterLink(navRight, isAuth) {
    var existing = document.getElementById('nav-register-link');
    if (isAuth) {
      if (existing) existing.remove();
      return;
    }
    if (existing || !navRight) return;
    var loginBtn = navRight.querySelector('.auth-nav-btn, .primary-btn1.black-bg');
    if (!loginBtn) return;
    var reg = document.createElement('a');
    reg.id = 'nav-register-link';
    reg.href = 'register.html';
    reg.className = 'text-decoration-none ms-2 small fw-semibold';
    reg.style.color = 'inherit';
    reg.textContent = 'Register';
    navRight.insertBefore(reg, loginBtn.nextSibling);
  }

  function updateNavbarAuth() {
    var isAuth = isAuthenticated();
    var user = getCurrentUser();

    var desktopBtn = document.querySelector('.topbar-right .primary-btn1.black-bg') || document.querySelector('.nav-right .primary-btn1.black-bg');
    var mobileBtn = document.querySelector('.main-menu .primary-btn1.black-bg.d-xl-none');
    var navRight = document.querySelector('.topbar-right') || document.querySelector('.nav-right');

    bindNavButton(desktopBtn, isAuth, user);
    bindNavButton(mobileBtn, isAuth, user);
    ensureRegisterLink(navRight, isAuth);

    if (window.location.pathname.indexOf('login.html') !== -1 && isAuth) {
      window.location.replace(getAuthRedirectUrl(user));
    }
    if (window.location.pathname.indexOf('register.html') !== -1 && isAuth) {
      window.location.replace(getAuthRedirectUrl(user));
    }
  }

  document.addEventListener('DOMContentLoaded', updateNavbarAuth);
})();
