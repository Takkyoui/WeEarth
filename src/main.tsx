import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import CommunityPage from "./pages/Community/CommunityPage.tsx";
import LoginPage from "./pages/UserPage/LoginPage.tsx";
import RegisterPage from "./pages/UserPage/RegisterPage.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { StateProvider } from "./utils/State.tsx";
import CalenderPage from "./pages/Calender/CalenderPage.tsx";
import WriteCalendarPage from "./pages/Calender/WriteCalendarPage.tsx";
import WriteCommunityPage from "./pages/Community/WriteCommunityPage.tsx";
import CommunityDetailPage from "./pages/Community/CommunityDetailPage/CommunityDetailPage.tsx";
import MyPage from "./pages/ MyPage/MyPage.tsx";
import MyCalendarPost from "./pages/Calender/MyCalendarPost/MyCalendarPost.tsx";
import EditCalendarPage from "./pages/Calender/EditCalendarPage.tsx";
import MyPost from "./pages/ MyPage/MyPost/MyPost.tsx";
import News from "./pages/News/News.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/community" element={<CommunityPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/calendar" element={<CalenderPage />}></Route>
        <Route path="/news" element={<News />}></Route>

        <Route path="/writediary" element={<WriteCalendarPage />}></Route>
        <Route path="/writecommunity" element={<WriteCommunityPage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/mypost" element={<MyPost />}></Route>
        <Route path="/calendar/:slug" element={<MyCalendarPost />}></Route>
        <Route
          path="/calendar/edit/:slug"
          element={<EditCalendarPage />}
        ></Route>
        <Route
          path="/community/:slug"
          element={<CommunityDetailPage />}
        ></Route>
      </Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <StateProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StateProvider>
  // </React.StrictMode>
);
