import { Refine, Authenticated, IResourceItem, Action } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
   ErrorComponent,
   notificationProvider,
   RefineThemes,
} from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";

import routerBindings, {
   CatchAllNavigate,
   DocumentTitleHandler,
   NavigateToResource,
   UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider } from "./rest-data-provider";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import {
   AccountCreate,
   AccountEdit,
   AccountList,
   AccountShow,
} from "./pages/accounts";
import { Layout } from "./pages/layout";

function App() {
   const toTitleCase = (str: string): string => {
      let result = str.replace(/_/g, " ").replace(/-/g, " ");

      // Convert camelCase to separate words
      result = result.replace(/([a-z])([A-Z])/g, "$1 $2");

      // Capitalize the first letter of each word
      result = result
         .split(" ")
         .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
         )
         .join(" ");

      return result;
   };

   const titleHandler = ({
      resource,
      action,
      params,
   }: {
      resource?: IResourceItem;
      action?: Action;
      params?: Record<string, string | undefined>;
   }): string => {
      let title = "Zeal | Building Opportunities.";

      if (resource && action && params) {
         let resourceName = toTitleCase(resource.name);
         switch (action) {
            case "list":
               title = `${resourceName} | Zeal`;
               break;
            case "edit":
               title = `#${params.id} Edit ${resourceName} | Zeal`;
               break;
            case "show":
               title = `#${params.id} Show ${resourceName} | Zeal`;
               break;
            case "create":
               title = `Create New ${resourceName} | Zeal`;
               break;
            case "clone":
               title = `#${params.id} Clone ${resourceName} | Zeal`;
               break;
            default:
               title = `Zeal | Building Opportunities.`;
               break;
         }
      }
      return title;
   };
   return (
      <BrowserRouter>
         <RefineKbarProvider>
            {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
            <ChakraProvider theme={RefineThemes.Blue}>
               <Refine
                  dataProvider={dataProvider("http://localhost:3000")}
                  notificationProvider={notificationProvider}
                  routerProvider={routerBindings}
                  authProvider={authProvider}
                  resources={[
                     {
                        name: "accounts",
                        list: "/accounts",
                        create: "/accounts/create",
                        show: "/accounts/show/:id",
                        edit: "/accounts/edit/:id",
                        meta: {
                           canDelete: true,
                        },
                     },
                  ]}
                  options={{
                     syncWithLocation: true,
                     warnWhenUnsavedChanges: true,
                     useNewQueryKeys: true,
                     projectId: "4rspVd-DYEvH9-LqSqRD",
                  }}
               >
                  <Routes>
                     <Route
                        element={
                           <Authenticated
                              key="authenticated-routes"
                              fallback={<CatchAllNavigate to="/login" />}
                           >
                              <Layout>
                                 <Outlet />
                              </Layout>
                           </Authenticated>
                        }
                     >
                        <Route
                           index
                           element={<NavigateToResource resource="accounts" />}
                        />
                        <Route path="accounts">
                           <Route index element={<AccountList />} />
                           <Route path="create" element={<AccountCreate />} />
                           <Route path="show/:id" element={<AccountShow />} />
                           <Route path="edit/:id" element={<AccountEdit />} />
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                     </Route>
                     
                     <Route
                        element={
                           <Authenticated
                              key="auth-pages"
                              fallback={<Outlet />}
                           >
                              <NavigateToResource />
                           </Authenticated>
                        }
                     >
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                     </Route>
                  </Routes>

                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler handler={titleHandler} />
               </Refine>
            </ChakraProvider>
         </RefineKbarProvider>
      </BrowserRouter>
   );
}

export default App;
