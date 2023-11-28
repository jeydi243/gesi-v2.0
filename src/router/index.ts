import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
  NavigationFailureType,
} from "vue-router";
import { useConfig } from "../store/config";

const studentsRoutes = [
  {
    path: "/students",
    meta: { layout: "main" },
    name: "index-students",
    component: () =>
      import(
        /* webpackChunkName: "index-students" */ "./views/students/index.vue"
      ),
  },
  {
    path: "/students/add",
    meta: { layout: "main" },
    name: "students-add",
    component: () =>
      import(/* webpackChunkName: "add-students" */ "./views/students/add.vue"),
  },
  {
    path: "/students/:id",
    meta: { layout: "main" },
    name: "students-details",
    component: () =>
      import(
        /* webpackChunkName: "details-student" */ "./views/students/details.vue"
      ),
  },
];
const teachersRoutes = [
  {
    path: "/teachers",
    meta: { layout: "main" },
    name: "index-teachers",
    component: () =>
      import(
        /* webpackChunkName: "index-teacher" */ "./views/teachers/index.vue"
      ),
  },
  //   {
  //     path: "/teachers/add",
  //     meta: { layout: "main" },
  //     name: "teachers-add",
  //     component: () => import(/* webpackChunkName: "add-teacher" */ "./views/teachers/add.vue"),
  //   },
  {
    path: "/teachers/:id",
    meta: { layout: "main" },
    name: "teachers-details",
    component: () =>
      import(
        /* webpackChunkName: "details-teacher" */ "./views/teachers/details.vue"
      ),
  },
];
const calendarRoutes = [
  {
    path: "/calendar",
    meta: { layout: "main" },
    name: "index-calendar",
    component: () =>
      import(
        /* webpackChunkName: "index-calendar" */ "./views/calendar/index.vue"
      ),
  },
];
const libraryRoutes = [
  {
    path: "/library",
    meta: { layout: "main" },
    name: "index-library",
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/library/index.vue"),
  },
];
const settingsRoutes = [
  {
    path: "/settings",
    meta: { layout: "main" },
    name: "index-settings",
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/settings/index.vue"),
  },
];
const employeesRoutes = {
  path: "employees",
  meta: { layout: "main" },
  component: () =>
    import(
      /* webpackChunkName: "employees" */ "./views/management/employees/index.vue"
    ),
  children: [
    {
      path: "",
      name: "employees-index",
      default: true,
      component: () =>
        import(
          /* webpackChunkName: "employees" */ "./views/management/employees/list.vue"
        ),
    },
    {
      path: "add",
      name: "employees-add",
      component: () =>
        import(
          /* webpackChunkName: "employees" */ "./views/management/employees/add.vue"
        ),
    },
    {
      path: "affectations",
      name: "affectations-employees",
      component: () =>
        import(
          /* webpackChunkName: "employees" */ "./views/management/employees/affectations.vue"
        ),
    },
    {
      path: "fonctions",
      name: "fonctions-employees",
      component: () =>
        import(
          /* webpackChunkName: "employees" */ "./views/management/employees/positions.vue"
        ),
    },
    {
      path: ":id",
      name: "employees-details",
      component: () =>
        import(
          /* webpackChunkName: "employees" */ "./views/management/employees/details_emp.vue"
        ),
    },
    {
      path: "update/:id",
      name: "employees-update",
      component: () =>
        import(
          /* webpackChunkName: "employees" */ "./views/management/employees/update.vue"
        ),
    },
  ],
};
const contentsRoutes = {
  path: "contents",
  meta: { layout: "main" },
  children: [
    {
      path: "add",
      name: "contents-add",
      component: () =>
        import(
          /* webpackChunkName: "contents" */ "./views/management/contents/add.vue"
        ),
    },
    {
      path: "details/:id",
      name: "contents-details",
      component: () =>
        import(
          /* webpackChunkName: "contents" */ "./views/management/contents/details.vue"
        ),
    },
    {
      path: "",
      default: true,
      name: "contents-index",
      component: () =>
        import(
          /* webpackChunkName: "employees" */ "./views/management/contents/list.vue"
        ),
    },
  ],
};
const managementRoutes = [
  {
    path: "/management",
    meta: { layout: "main" },
    name: "index-management",
    component: () =>
      import(
        /* webpackChunkName: "management" */ "./views/management/index.vue"
      ),
    children: [
      employeesRoutes,
      contentsRoutes,
      {
        path: "academique",
        meta: { layout: "main" },
        name: "academique-index",
        component: () =>
          import(
            /* webpackChunkName: "management" */ "./views/management/academique.vue"
          ),
      },
      {
        path: "filieres",
        meta: { layout: "main" },
        name: "filieres-index",
        component: () =>
          import(
            /* webpackChunkName: "management" */ "./views/management/filieres.vue"
          ),
      },
      {
        path: "documents",
        meta: { layout: "main" },
        name: "documents-index",
        component: () =>
          import(
            /* webpackChunkName: "management" */ "./views/management/documents.vue"
          ),
      },
      {
        path: "classes",
        meta: { layout: "main" },
        name: "classes",
        component: () =>
          import(
            /* webpackChunkName: "management" */ "./views/management/classes.vue"
          ),
      },
      {
        path: "lookups",
        meta: { layout: "main" },
        name: "lookups",
        component: () =>
          import(
            /* webpackChunkName: "management" */ "./views/management/lookups.vue"
          ),
      },
    ],
  },
];
const onboarding = [
  {
    name: "org",
    path: "/org",
    meta: { layout: "auth" },
    component: () =>
      import(
        /* webpackChunkName: "login" */ "./views/settings/onboarding/org.vue"
      ),
  },
  {
    name: "org-root",
    path: "/org-root",
    meta: { layout: "auth" },
    component: () =>
      import(
        /* webpackChunkName: "login" */ "./views/settings/onboarding/root_user.vue"
      ),
  },
];

const routes = [
  {
    path: "/home",
    alias: "/",
    name: "home",
    default: true,
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/account/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "auth" },
    component: () =>
      import(/* webpackChunkName: "login" */ "./views/account/login.vue"),
  },
  {
    path: "/profile",
    meta: { layout: "main" },
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "./views/account/profile.vue"),
  },
  {
    path: "/search",
    meta: { layout: "main" },
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "./views/account/search.vue"),
  },
  ...onboarding,
  ...studentsRoutes,
  ...teachersRoutes,
  ...calendarRoutes,
  ...libraryRoutes,
  ...settingsRoutes,
  ...managementRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.onError((error: any) => {
  console.error(error);
});

router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
    console.error(
      `Failed navigation \nVous avez été redirigé vers ${to.path}`,
      failure.message
    );
  } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
    console.error(
      `La navigation a été empêchée parce que tu tente d'aller à la meme route ${failure.to.path} .`
    );
  } else if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
    console.error(`${failure.message}.`);
  } else {
    // console.info(`From: ${from.name} to: ${to.name} ${to.params != null ? JSON.stringify(to.params) : ""}`)
  }
});
router.beforeEach((to, from, next) => {
  const config = useConfig();
  config.changeLayout(to.meta["layout"]);
  next();
});

export default router;
